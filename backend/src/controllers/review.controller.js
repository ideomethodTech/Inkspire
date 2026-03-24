import { ReviewService } from '../services/mongo/review.service.js';

export class ReviewController {
  // Get reviews for a product
  static async getProductReviews(req, res) {
    try {
      const { productId } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await ReviewService.getProductReviews(productId, page, limit);
      return res.status(200).json({ success: true, ...result });
    } catch (error) {
      console.error('Get Reviews Error:', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // Add review
  static async addReview(req, res) {
    try {
      const userId = req.user.userId;
      const userName = req.user.displayName || 'User'; // Or fetch from DB if needed
      const { productId, rating, comment } = req.body;

      if (!productId || !rating) {
        return res.status(400).json({ success: false, message: 'Product ID and rating are required' });
      }

      const review = await ReviewService.createReview(userId, userName, productId, rating, comment);
      return res.status(201).json({ success: true, message: 'Review added successfully', review });
    } catch (error) {
      console.error('Add Review Error:', error);
      if (error.code === 11000) {
        return res.status(400).json({ success: false, message: 'You have already reviewed this product' });
      }
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // Update review
  static async updateReview(req, res) {
    try {
      const userId = req.user.userId;
      const { id } = req.params; // reviewId
      const { rating, comment } = req.body;

      const review = await ReviewService.updateReview(userId, id, rating, comment);
      return res.status(200).json({ success: true, message: 'Review updated successfully', review });
    } catch (error) {
      console.error('Update Review Error:', error);
      const status = error.message.includes('not found') ? 404 : 500;
      return res.status(status).json({ success: false, message: error.message });
    }
  }

  // Delete review
  static async deleteReview(req, res) {
    try {
      const userId = req.user.userId;
      const { id } = req.params; // reviewId
      // Check if user is admin (optional, if we want admins to delete reviews)
      // For now, assuming standard user deletion of their own review
      const isAdmin = req.user.role === 'admin';

      await ReviewService.deleteReview(userId, id, isAdmin);
      return res.status(200).json({ success: true, message: 'Review deleted successfully' });
    } catch (error) {
      console.error('Delete Review Error:', error);
      const status = error.message.includes('not found') ? 404 : 500;
      return res.status(status).json({ success: false, message: error.message });
    }
  }
}