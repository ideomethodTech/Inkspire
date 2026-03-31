// Complete src/models/mongo/cart.model.js
import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  variantIndex: {
    type: Number,
    default: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  addedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [cartItemSchema],
  total: {
    type: Number,
    default: 0
  },
  appliedCoupon: {
    type: String,
    default: null
  },
  discountAmount: {
    type: Number,
    default: 0
  },
  discountedTotal: {
    type: Number,
    default: 0
  },
  itemCount: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp before saving
cartSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

cartSchema.index({ userId: 1 });
cartSchema.index({ updatedAt: -1 });

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
