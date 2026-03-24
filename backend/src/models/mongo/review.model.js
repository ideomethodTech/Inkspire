import mongoose from 'mongoose';
import Product from './product.model.js';

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: String, // Store snapshot of name
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to prevent multiple reviews from same user for same product
reviewSchema.index({ userId: 1, productId: 1 }, { unique: true });
reviewSchema.index({ productId: 1, rating: -1 }); // Optimized for fetching top reviews

// Static method to calculate average rating
reviewSchema.statics.calcAverageRating = async function(productId) {
  const stats = await this.aggregate([
    {
      $match: { productId: productId }
    },
    {
      $group: {
        _id: '$productId',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      totalReviews: stats[0].nRating,
      averageRating: Math.round(stats[0].avgRating * 10) / 10 // Round to 1 decimal place
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      totalReviews: 0,
      averageRating: 0
    });
  }
};

// Call calcAverageRating after save
reviewSchema.post('save', function() {
  this.constructor.calcAverageRating(this.productId);
});

// Call calcAverageRating before remove (using findOneAndDelete middleware usually)
// But for document instance remove:
reviewSchema.post('remove', function() {
  this.constructor.calcAverageRating(this.productId);
});

// For findOneAndUpdate and findOneAndDelete
reviewSchema.post(/^findOneAnd/, async function(doc) {
  if (doc) {
    await doc.constructor.calcAverageRating(doc.productId);
  }
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;