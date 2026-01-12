import express from 'express';
import { CartController } from '../controllers/cart.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All cart routes require authentication
router.use(authenticate);

router.get('/', CartController.getCart);
router.post('/add', CartController.addToCart);
router.put('/:productId', CartController.updateCartItem);
router.delete('/:productId', CartController.removeCartItem);
router.delete('/', CartController.clearCart);

export default router;