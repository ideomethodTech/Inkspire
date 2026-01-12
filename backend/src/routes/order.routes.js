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

// Admin order routes
router.get('/admin/all', adminOnly, OrderController.getAllOrders);
router.put('/admin/:orderId', adminOnly, OrderController.updateOrderStatus);

export default router;
