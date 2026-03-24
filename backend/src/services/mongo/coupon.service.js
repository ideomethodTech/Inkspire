import Coupon from '../../models/mongo/coupon.model.js';

export class CouponService {
  // Create coupon (Admin)
  static async createCoupon(data) {
    const coupon = new Coupon(data);
    return await coupon.save();
  }

  // Update coupon (Admin)
  static async updateCoupon(id, data) {
    const coupon = await Coupon.findByIdAndUpdate(id, data, { new: true });
    if (!coupon) throw new Error('Coupon not found');
    return coupon;
  }

  // Delete coupon (Admin)
  static async deleteCoupon(id) {
    const coupon = await Coupon.findByIdAndDelete(id);
    if (!coupon) throw new Error('Coupon not found');
    return coupon;
  }

  // Get all coupons (Admin)
  static async getAllCoupons(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const coupons = await Coupon.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await Coupon.countDocuments();
    return { coupons, pagination: { total, page, pages: Math.ceil(total / limit) } };
  }

  // Get active coupons (User - public list if needed, usually coupons are hidden but requirement says "Users Can view available coupons")
  static async getAvailableCoupons(userId) {
    const now = new Date();
    // Fetch active, non-expired coupons
    const query = {
      isActive: true,
      expiryDate: { $gt: now },
      $or: [
        { usageLimit: null },
        { $expr: { $lt: ['$usedCount', '$usageLimit'] } }
      ]
    };

    // If userId provided, filter applicableUsers
    /*
      Note: Ideally we filter in DB, but applicableUsers array logic is tricky with standard find if we want "empty means all" OR "contains userId".
      $or: [ { applicableUsers: { $size: 0 } }, { applicableUsers: userId } ]
    */
    if (userId) {
       query.$or = [
         { applicableUsers: { $size: 0 } },
         { applicableUsers: userId }
       ];
    } else {
       // Only show public coupons
       query.applicableUsers = { $size: 0 };
    }

    return await Coupon.find(query).select('-usedCount -__v');
  }

  // Apply/Validate Coupon
  static async applyCoupon(code, userId, orderTotal) {
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });
    
    if (!coupon) {
      throw new Error('Invalid coupon code');
    }

    const validation = coupon.isValid(userId, orderTotal);
    if (!validation.valid) {
      throw new Error(validation.reason);
    }

    const discountAmount = coupon.calculateDiscount(orderTotal);
    
    // Ensure discount doesn't exceed total
    const finalDiscount = Math.min(discountAmount, orderTotal);

    return {
      success: true,
      couponCode: coupon.code,
      discountAmount: finalDiscount,
      finalTotal: orderTotal - finalDiscount
    };
  }
}