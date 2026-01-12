import { OrderService } from '../services/mongo/order.service.js';

export class OrderController {
    // Create order (Checkout)
    static async createOrder(req, res) {
        try {
            const userId = req.user.userId;
            const userEmail = req.user.email;
            const userName = req.user.displayName || req.user.email;

            const { shippingAddress, paymentMethod = 'cod', notes = '' } = req.body;

            // Validate shipping address
            if (!shippingAddress || !shippingAddress.name || !shippingAddress.street ||
                !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode ||
                !shippingAddress.phone) {
                return res.status(400).json({
                    success: false,
                    message: 'Complete shipping address is required'
                });
            }

            const result = await OrderService.createOrder(
                userId,
                userEmail,
                userName,
                shippingAddress,
                paymentMethod,
                notes
            );

            return res.status(201).json(result);
        } catch (error) {
            console.error('[CREATE ORDER] Error:', error);
            return res.status(500).json({
                success: false,
                message: error.message || 'Failed to create order'
            });
        }
    }

    // Get user's order history
    static async getUserOrders(req, res) {
        try {
            const userId = req.user.userId;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const result = await OrderService.getUserOrders(userId, page, limit);

            return res.status(200).json(result);
        } catch (error) {
            console.error('[GET USER ORDERS] Error:', error);
            return res.status(500).json({
                success: false,
                message: error.message || 'Failed to get orders'
            });
        }
    }

    // Get specific order details
    static async getOrderById(req, res) {
        try {
            const userId = req.user.userId;
            const { orderId } = req.params;

            const result = await OrderService.getOrderById(orderId, userId);

            return res.status(200).json(result);
        } catch (error) {
            console.error('[GET ORDER] Error:', error);
            const status = error.message?.includes('not found') ? 404 : 500;
            return res.status(status).json({
                success: false,
                message: error.message || 'Failed to get order'
            });
        }
    }

    // Cancel order
    static async cancelOrder(req, res) {
        try {
            const userId = req.user.userId;
            const { orderId } = req.params;

            const result = await OrderService.cancelOrder(orderId, userId);

            return res.status(200).json(result);
        } catch (error) {
            console.error('[CANCEL ORDER] Error:', error);
            return res.status(500).json({
                success: false,
                message: error.message || 'Failed to cancel order'
            });
        }
    }

    // Get all orders (Admin)
    static async getAllOrders(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const status = req.query.status || null;

            const result = await OrderService.getAllOrders(page, limit, status);

            return res.status(200).json(result);
        } catch (error) {
            console.error('[GET ALL ORDERS] Error:', error);
            return res.status(500).json({
                success: false,
                message: error.message || 'Failed to get orders'
            });
        }
    }

    // Update order status (Admin)
    static async updateOrderStatus(req, res) {
        try {
            const { orderId } = req.params;
            const { status, note } = req.body;

            if (!status) {
                return res.status(400).json({
                    success: false,
                    message: 'Status is required'
                });
            }

            const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
                });
            }

            const result = await OrderService.updateOrderStatus(orderId, status, note);

            return res.status(200).json(result);
        } catch (error) {
            console.error('[UPDATE ORDER STATUS] Error:', error);
            return res.status(500).json({
                success: false,
                message: error.message || 'Failed to update order status'
            });
        }
    }
}
