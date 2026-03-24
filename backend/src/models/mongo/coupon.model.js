import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  description: String,
  discountType: {
    type: String,
    enum: ['percentage', 'flat'],
    required: true
  },
  value: {
    type: Number,
    required: true,
    min: 0
  },
  minOrderValue: {
    type: Number,
    default: 0
  },
  expiryDate: {
    type: Date,
    required: true
  },
  usageLimit: {
    type: Number,
    default: null // null means unlimited
  },
  usedCount: {
    type: Number,
    default: 0
  },
  applicableUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }], // If empty, applicable to all
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

couponSchema.index({ code: 1 });
couponSchema.index({ expiryDate: 1 });

// Check if coupon is valid
couponSchema.methods.isValid = function(userId, orderTotal) {
  const now = new Date();
  
  if (!this.isActive) return { valid: false, reason: 'Coupon is inactive' };
  if (this.expiryDate < now) return { valid: false, reason: 'Coupon expired' };
  if (this.usageLimit !== null && this.usedCount >= this.usageLimit) return { valid: false, reason: 'Usage limit reached' };
  if (orderTotal < this.minOrderValue) return { valid: false, reason: `Minimum order value of ${this.minOrderValue} required` };
  
  // Check if user is allowed (if restricted)
  if (this.applicableUsers && this.applicableUsers.length > 0) {
    if (!userId) return { valid: false, reason: 'User login required for this coupon' };
    const isAllowed = this.applicableUsers.some(id => id.toString() === userId.toString());
    if (!isAllowed) return { valid: false, reason: 'Coupon not applicable for this user' };
  }

  return { valid: true };
};

// Calculate discount amount
couponSchema.methods.calculateDiscount = function(orderTotal) {
  if (this.discountType === 'percentage') {
    return (orderTotal * this.value) / 100;
  }
  return this.value; // Flat amount
};

const Coupon = mongoose.model('Coupon', couponSchema);
export default Coupon;