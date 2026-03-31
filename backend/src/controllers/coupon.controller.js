import { CouponService } from '../services/mongo/coupon.service.js';

export class CouponController {
  // Get available coupons (User)
  static async getCoupons(req, res) {
    try {
      // If user is logged in, show personalized coupons too
      // Auth middleware might not be strictly required for this if public coupons exist,
      // but let's assume we use req.user if available (optional auth).
      // Since specific route requirement said "Users: Can view available coupons", likely authenticated.
      const userId = req.user?.userId;
      
      const coupons = await CouponService.getAvailableCoupons(userId);
      return res.json({ success: true, coupons });
    } catch (error) {
      console.error('Get Coupons Error:', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // Apply coupon
  static async applyCoupon(req, res) {
    try {
      const { code, orderTotal } = req.body;
      const userId = req.user.userId;

      if (!code || !orderTotal) {
        return res.status(400).json({ success: false, message: 'Coupon code and order total required' });
      }

      const result = await CouponService.applyCoupon(code, userId, orderTotal);
      return res.json(result);
    } catch (error) {
      // Don't log expected validation errors as errors
      if (error.message === 'Invalid coupon code' || error.message.includes('expired') || error.message.includes('usage limit')) {
          return res.status(400).json({ success: false, message: error.message });
      }
      console.error('Apply Coupon Error:', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // Remove coupon
  static async removeCoupon(req, res) {
    try {
      const userId = req.user.userId;
      const result = await CouponService.removeCoupon(userId);
      return res.json(result);
    } catch (error) {
      console.error('Remove Coupon Error:', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // Admin: Create Coupon
  static async createCoupon(req, res) {
    try {
      const result = await CouponService.createCoupon(req.body);
      return res.status(201).json({ success: true, message: 'Coupon created', coupon: result });
    } catch (error) {
      console.error('Create Coupon Error:', error);
      if (error.code === 11000) return res.status(400).json({ success: false, message: 'Coupon code already exists' });
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // Admin: Update Coupon
  static async updateCoupon(req, res) {
    try {
      const { id } = req.params;
      const result = await CouponService.updateCoupon(id, req.body);
      return res.json({ success: true, message: 'Coupon updated', coupon: result });
    } catch (error) {
      console.error('Update Coupon Error:', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // Admin: Delete Coupon
  static async deleteCoupon(req, res) {
    try {
      const { id } = req.params;
      await CouponService.deleteCoupon(id);
      return res.json({ success: true, message: 'Coupon deleted' });
    } catch (error) {
      console.error('Delete Coupon Error:', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}