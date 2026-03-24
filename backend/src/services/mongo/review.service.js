import Review from '../../models/mongo/review.model.js';
import Order from '../../models/mongo/order.model.js'; // To verify purchase if needed

export class ReviewService {
  // Get reviews for a product
  static async getProductReviews(productId, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ productId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'displayName photoURL'); // Populate reviewer info

    const total = await Review.countDocuments({ productId });

    return {
      reviews,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    };
  }

  // Create review
  static async createReview(userId, userName, productId, rating, comment) {
    // Optional: Check if user purchased the product
    /*
    const hasPurchased = await Order.findOne({
      'user.userId': userId,
      'items.productId': productId,
      'status.current': 'delivered'
    });
    if (!hasPurchased) {
      throw new Error('You can only review products you have purchased and received.');
    }
    */

    const review = new Review({
      userId,
      userName,
      productId,
      rating,
      comment
    });

    return await review.save();
  }

  // Update review
  static async updateReview(userId, reviewId, rating, comment) {
    const review = await Review.findOne({ _id: reviewId, userId });

    if (!review) {
      throw new Error('Review not found or unauthorized');
    }

    review.rating = rating;
    review.comment = comment;
    review.updatedAt = new Date();

    return await review.save();
  }

  // Delete review
  static async deleteReview(userId, reviewId, isAdmin = false) {
    const query = { _id: reviewId };
    if (!isAdmin) {
      query.userId = userId;
    }

    const review = await Review.findOne(query);

    if (!review) {
      throw new Error('Review not found or unauthorized');
    }

    return await review.deleteOne(); // Use deleteOne to trigger document middleware
  }
}