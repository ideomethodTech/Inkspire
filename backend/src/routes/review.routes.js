import express from 'express';
import { ReviewController } from '../controllers/review.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Get reviews (Public)
router.get('/:productId', ReviewController.getProductReviews);

// Add/Update/Delete (Protected)
router.use(authenticate);
router.post('/', ReviewController.addReview);
router.put('/:id', ReviewController.updateReview);
router.delete('/:id', ReviewController.deleteReview);

export default router;