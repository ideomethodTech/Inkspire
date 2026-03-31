import Order from '../../models/mongo/order.model.js';
import Cart from '../../models/mongo/cart.model.js';
import Product from '../../models/mongo/product.model.js';
import Coupon from '../../models/mongo/coupon.model.js';
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
    static async createOrder(userId, userEmail, userName, shippingAddress, paymentMethod = 'cod', notes = '', couponCode = null) {
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

            // 3. Coupon Logic
            let discount = 0;
            let couponApplied = null;

            // Use provided coupon code OR the one already in the cart
            const effectiveCouponCode = couponCode || cart.appliedCoupon;

            if (effectiveCouponCode) {
                const coupon = await Coupon.findOne({ code: effectiveCouponCode.toUpperCase() }).session(session);
                if (!coupon) {
                    // Only throw error if the user EXPLICITLY provided a wrong coupon
                    // If it was just an old cart coupon, we can ignore it (it will be cleared)
                    if (couponCode) {
                        throw new Error('Invalid coupon code');
                    }
                } else {
                    // Manual validation since we are inside a transaction/session context
                    const validation = coupon.isValid(userId, subtotal);
                    if (!validation.valid) {
                        // Same logic: throw error only if user explicitly provided it
                        if (couponCode) {
                            throw new Error(validation.reason);
                        }
                    } else {
                        discount = coupon.calculateDiscount(subtotal);
                        discount = Math.min(discount, subtotal); // Ensure discount <= subtotal
                        
                        couponApplied = {
                            code: coupon.code,
                            discount: discount
                        };

                        // Increment usage count
                        coupon.usedCount += 1;
                        await coupon.save({ session });
                    }
                }
            }

            // 4. Calculate totals
            const shipping = subtotal > 500 ? 0 : 50; // Free shipping above ₹500
            const tax = (subtotal - discount) * 0.18; // 18% GST on discounted price? Or subtotal? Usually discounted.
            const total = (subtotal - discount) + shipping + tax;

            // 5. Generate order number
            const orderNumber = await this.generateOrderNumber();

            // 6. Create order
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
                    status: paymentMethod === 'cod' ? 'pending' : 'pending' // Integrate payment gateway later
                },
                totals: {
                    subtotal,
                    shipping,
                    tax,
                    discount,
                    total
                },
                coupon: couponApplied,
                status: {
                    current: 'pending',
                    history: [{
                        status: 'pending',
                        timestamp: new Date(),
                        note: 'Order placed'
                    }]
                },
                tracking: {
                    currentStatus: 'processing',
                    history: [{
                        status: 'processing',
                        timestamp: new Date(),
                        note: 'Order processing started'
                    }]
                },
                notes
            });

            await order.save({ session });

            // 7. Reduce product stock
            for (const item of orderItems) {
                const product = await Product.findById(item.productId).session(session);

                if (product.variants && product.variants[item.variantIndex]) {
                    product.variants[item.variantIndex].stock -= item.quantity;
                    await product.save({ session });
                }
            }

            // 8. Clear cart
            await Cart.findOneAndUpdate(
                { userId },
                { items: [], total: 0, itemCount: 0 },
                { session }
            );

            await session.commitTransaction();

            // 9. Update trending products (async, don't wait)
            this.updateTrendingProducts().catch(err => console.error('Trending update error:', err));

            return {
                success: true,
                message: 'Order created successfully',
                data: {
                    orderId: order._id,
                    orderNumber: order.orderNumber,
                    total: order.totals.total,
                    status: order.status.current,
                    trackingId: order.tracking?.trackingId,
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
                trackingStatus: order.tracking?.currentStatus,
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
                    coupon: order.coupon,
                    status: order.status,
                    tracking: order.tracking,
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

    // NEW: Update Order Tracking (Admin)
    static async updateOrderTracking(orderId, trackingData) {
        try {
            const { trackingId, carrier, status, location, note } = trackingData;
            
            const order = await Order.findById(orderId);
            if (!order) throw new Error('Order not found');

            if (trackingId) order.tracking.trackingId = trackingId;
            if (carrier) order.tracking.carrier = carrier;
            if (status) order.tracking.currentStatus = status;

            order.tracking.history.push({
                status: status || order.tracking.currentStatus,
                location: location || '',
                note: note || 'Tracking update',
                timestamp: new Date()
            });

            // Sync main status if logical
            if (status === 'delivered') {
                order.status.current = 'delivered';
                order.status.history.push({ status: 'delivered', timestamp: new Date(), note: 'Delivered (Tracking Auto-update)' });
            } else if (status === 'shipped' && order.status.current !== 'shipped') {
                order.status.current = 'shipped';
                order.status.history.push({ status: 'shipped', timestamp: new Date(), note: 'Shipped (Tracking Auto-update)' });
            }

            await order.save();

            return {
                success: true,
                message: 'Tracking updated',
                tracking: order.tracking
            };
        } catch (error) {
            throw new Error(`Failed to update tracking: ${error.message}`);
        }
    }

    // NEW: Get Order Tracking
    static async getOrderTracking(orderId) {
        try {
            const order = await Order.findById(orderId).select('tracking orderNumber');
            if (!order) throw new Error('Order not found');

            return {
                success: true,
                orderNumber: order.orderNumber,
                tracking: order.tracking
            };
        } catch (error) {
            throw new Error(`Failed to get tracking: ${error.message}`);
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