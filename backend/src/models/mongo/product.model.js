import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  size: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  sku: String
});

const productSchema = new mongoose.Schema({
  // Basic Info
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['poster', 'kit', 'sticker'],
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },

  // Pricing & Inventory
  price: {
    type: Number,
    required: true,
    min: 0
  },
  variants: [variantSchema],

  // Content
  description: {
    type: String,
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  tags: [{
    type: String,
    lowercase: true
  }],

  // Flags for homepage sections
  featured: {
    type: Boolean,
    default: false
  },
  trending: {
    type: Boolean,
    default: false
  },
  bestseller: {
    type: Boolean,
    default: false
  },

  // Ratings
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },

  // Status
  active: {
    type: Boolean,
    default: true
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ FIXED: Update timestamp before saving - now with next() call
productSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next(); // Critical: this was missing and caused all saves to hang
});

// Define ALL indexes HERE (not in field definitions)
productSchema.index({ type: 1 });
productSchema.index({ category: 1 });
productSchema.index({ featured: 1 });
productSchema.index({ trending: 1 });
productSchema.index({ bestseller: 1 });
productSchema.index({ active: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ price: 1 });

// Text search index (for search functionality)
productSchema.index({
  name: 'text',
  description: 'text',
  tags: 'text'
});

const Product = mongoose.model('Product', productSchema);
export default Product;