import express from 'express';
import { OrderController } from '../controllers/order.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { adminOnly } from '../middlewares/admin.middleware.js';

const router = express.Router();

// All order routes require authentication
router.use(authenticate);

// User order routes
router.post('/', OrderController.createOrder);
router.get('/', OrderController.getUserOrders);
router.get('/:orderId', OrderController.getOrderById);
router.put('/:orderId/cancel', OrderController.cancelOrder);

// Tracking (User)
router.get('/:orderId/tracking', OrderController.getOrderTracking);

// Admin order routes
router.get('/admin/all', adminOnly, OrderController.getAllOrders);
router.put('/admin/:orderId', adminOnly, OrderController.updateOrderStatus);

// Tracking (Admin)
router.put('/admin/:orderId/tracking', adminOnly, OrderController.updateOrderTracking);

export default router;
