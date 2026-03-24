import express from 'express';
import { CouponController } from '../controllers/coupon.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { adminOnly } from '../middlewares/admin.middleware.js';

const router = express.Router();

router.use(authenticate);
router.use(adminOnly);

router.post('/', CouponController.createCoupon);
router.put('/:id', CouponController.updateCoupon);
router.delete('/:id', CouponController.deleteCoupon);

export default router;