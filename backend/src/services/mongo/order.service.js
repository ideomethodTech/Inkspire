import Order from '../../models/mongo/order.model.js';
import Cart from '../../models/mongo/cart.model.js';
import Product from '../../models/mongo/product.model.js';
import mongoose from 'mongoose';

export class OrderService {
    // Generate unique order number
    static async generateOrderNumber() {
        const date = new Date();
        const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');

        // Find the last order of the day
        const startOfDay = new Date(date.setHours(0, 0, 0, 0));
        const endOfDay = new Date(date.setHours(23, 59, 59, 999));

        const lastOrder = await Order.findOne({
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        }).sort({ createdAt: -1 });

        let sequence = 1;
        if (lastOrder && lastOrder.orderNumber) {
            const lastSequence = parseInt(lastOrder.orderNumber.split('-').pop());
            sequence = lastSequence + 1;
        }

        return `ORD-${dateStr}-${String(sequence).padStart(3, '0')}`;
    }

    // Create order from cart (Checkout)
    static async createOrder(userId, userEmail, userName, shippingAddress, paymentMethod = 'cod', notes = '') {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // 1. Get user's cart
            const cart = await Cart.findOne({ userId }).populate('items.productId').session(session);

            if (!cart || cart.items.length === 0) {
                throw new Error('Cart is empty');
            }

            // 2. Validate stock and prepare order items
            const orderItems = [];
            let subtotal = 0;

            for (const cartItem of cart.items) {
                const product = cartItem.productId;

                if (!product || !product.active) {
                    throw new Error(`Product ${cartItem.productId} is no longer available`);
                }

                const variant = product.variants?.[cartItem.variantIndex];
                const price = variant?.price || product.price;
                const itemTotal = price * cartItem.quantity;

                // Check stock
                if (variant && variant.stock < cartItem.quantity) {
                    throw new Error(`Insufficient stock for ${product.name} (${variant.size})`);
                }

                orderItems.push({
                    productId: product._id,
                    name: product.name,
                    image: product.images?.[0] || '',
                    variant: variant?.size || 'Standard',
                    variantIndex: cartItem.variantIndex,
                    price,
                    quantity: cartItem.quantity,
                    itemTotal
                });

                subtotal += itemTotal;
            }

            // 3. Calculate totals
            const shipping = subtotal > 500 ? 0 : 50; // Free shipping above ₹500
            const tax = subtotal * 0.18; // 18% GST
            const total = subtotal + shipping + tax;

            // 4. Generate order number
            const orderNumber = await this.generateOrderNumber();

            // 5. Create order
            const order = new Order({
                orderNumber,
                user: {
                    userId,
                    email: userEmail,
                    name: userName
                },
                items: orderItems,
                shippingAddress,
                paymentMethod: {
                    method: paymentMethod,
                    status: paymentMethod === 'cod' ? 'pending' : 'pending'
                },
                totals: {
                    subtotal,
                    shipping,
                    tax,
                    discount: 0,
                    total
                },
                status: {
                    current: 'pending',
                    history: [{
                        status: 'pending',
                        timestamp: new Date(),
                        note: 'Order placed'
                    }]
                },
                notes
            });

            await order.save({ session });

            // 6. Reduce product stock
            for (const item of orderItems) {
                const product = await Product.findById(item.productId).session(session);

                if (product.variants && product.variants[item.variantIndex]) {
                    product.variants[item.variantIndex].stock -= item.quantity;
                    await product.save({ session });
                }
            }

            // 7. Clear cart
            await Cart.findOneAndUpdate(
                { userId },
                { items: [], total: 0, itemCount: 0 },
                { session }
            );

            // 8. Update trending products (async, don't wait)
            this.updateTrendingProducts().catch(err => console.error('Trending update error:', err));

            await session.commitTransaction();

            return {
                success: true,
                message: 'Order created successfully',
                data: {
                    orderId: order._id,
                    orderNumber: order.orderNumber,
                    total: order.totals.total,
                    status: order.status.current,
                    items: order.items.length,
                    estimatedDelivery: this.calculateEstimatedDelivery()
                }
            };

        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    // Get user's order history
    static async getUserOrders(userId, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;

            const [orders, total] = await Promise.all([
                Order.find({ 'user.userId': userId })
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit)
                    .lean(),
                Order.countDocuments({ 'user.userId': userId })
            ]);

            const formattedOrders = orders.map(order => ({
                id: order._id,
                orderNumber: order.orderNumber,
                items: order.items.map(item => ({
                    name: item.name,
                    image: item.image,
                    quantity: item.quantity,
                    price: item.price
                })),
                total: order.totals.total,
                status: order.status.current,
                createdAt: order.createdAt,
                shippingAddress: order.shippingAddress
            }));

            return {
                success: true,
                data: {
                    orders: formattedOrders,
                    total,
                    page,
                    pages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            throw new Error(`Failed to get orders: ${error.message}`);
        }
    }

    // Get specific order details
    static async getOrderById(orderId, userId) {
        try {
            const order = await Order.findOne({
                _id: orderId,
                'user.userId': userId
            }).lean();

            if (!order) {
                throw new Error('Order not found');
            }

            return {
                success: true,
                data: {
                    id: order._id,
                    orderNumber: order.orderNumber,
                    items: order.items,
                    shippingAddress: order.shippingAddress,
                    paymentMethod: order.paymentMethod,
                    totals: order.totals,
                    status: order.status,
                    notes: order.notes,
                    createdAt: order.createdAt,
                    updatedAt: order.updatedAt
                }
            };
        } catch (error) {
            throw new Error(`Failed to get order: ${error.message}`);
        }
    }

    // Cancel order (user)
    static async cancelOrder(orderId, userId) {
        try {
            const order = await Order.findOne({
                _id: orderId,
                'user.userId': userId
            });

            if (!order) {
                throw new Error('Order not found');
            }

            if (!['pending', 'confirmed'].includes(order.status.current)) {
                throw new Error('Order cannot be cancelled at this stage');
            }

            order.status.current = 'cancelled';
            order.status.history.push({
                status: 'cancelled',
                timestamp: new Date(),
                note: 'Cancelled by customer'
            });

            await order.save();

            // Restore stock
            for (const item of order.items) {
                const product = await Product.findById(item.productId);
                if (product && product.variants && product.variants[item.variantIndex]) {
                    product.variants[item.variantIndex].stock += item.quantity;
                    await product.save();
                }
            }

            return {
                success: true,
                message: 'Order cancelled successfully',
                data: { orderId: order._id, status: order.status.current }
            };
        } catch (error) {
            throw new Error(`Failed to cancel order: ${error.message}`);
        }
    }

    // Get all orders (Admin)
    static async getAllOrders(page = 1, limit = 20, status = null) {
        try {
            const skip = (page - 1) * limit;
            const query = status ? { 'status.current': status } : {};

            const [orders, total] = await Promise.all([
                Order.find(query)
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit)
                    .lean(),
                Order.countDocuments(query)
            ]);

            return {
                success: true,
                data: {
                    orders,
                    total,
                    page,
                    pages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            throw new Error(`Failed to get all orders: ${error.message}`);
        }
    }

    // Update order status (Admin)
    static async updateOrderStatus(orderId, newStatus, note = '') {
        try {
            const order = await Order.findById(orderId);

            if (!order) {
                throw new Error('Order not found');
            }

            order.status.current = newStatus;
            order.status.history.push({
                status: newStatus,
                timestamp: new Date(),
                note: note || `Status updated to ${newStatus}`
            });

            await order.save();

            return {
                success: true,
                message: 'Order status updated',
                data: {
                    orderId: order._id,
                    orderNumber: order.orderNumber,
                    status: order.status.current
                }
            };
        } catch (error) {
            throw new Error(`Failed to update order status: ${error.message}`);
        }
    }

    // Update trending products based on recent sales
    static async updateTrendingProducts() {
        try {
            const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

            // Get top selling products from last 7 days
            const trendingData = await Order.aggregate([
                {
                    $match: {
                        createdAt: { $gte: sevenDaysAgo },
                        'status.current': { $nin: ['cancelled'] }
                    }
                },
                { $unwind: '$items' },
                {
                    $group: {
                        _id: '$items.productId',
                        totalSold: { $sum: '$items.quantity' },
                        revenue: { $sum: '$items.itemTotal' }
                    }
                },
                { $sort: { totalSold: -1 } },
                { $limit: 10 }
            ]);

            // Reset all products' trending status
            await Product.updateMany({}, { trending: false });

            // Set trending for top products
            if (trendingData.length > 0) {
                const productIds = trendingData.map(p => p._id);
                await Product.updateMany(
                    { _id: { $in: productIds } },
                    { trending: true }
                );
            }

            console.log(`✅ Updated ${trendingData.length} trending products`);
        } catch (error) {
            console.error('Update trending products error:', error);
        }
    }

    // Calculate estimated delivery date
    static calculateEstimatedDelivery() {
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 5); // 5 days from now
        return deliveryDate.toISOString().split('T')[0];
    }
}
