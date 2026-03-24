import express from 'express';
import { CouponController } from '../controllers/coupon.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public / User routes
// (Optional auth for personalized coupons)
router.get('/', authenticate, CouponController.getCoupons); 

// Apply coupon (usually called during checkout, but can be standalone validation)
router.post('/apply', authenticate, CouponController.applyCoupon);

export default router;