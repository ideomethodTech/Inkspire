import { useState, useEffect } from "react";
import { getCoupons, validateCoupon, removeCoupon as removeCouponApi } from "@/services/couponService";
import { useCart } from "@/context/CartContext";

export function useCoupons() {
  const [coupons, setCoupons] = useState([]);
  const { appliedCoupon, setCoupon, removeCoupon: clearCoupon } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const data = await getCoupons();
      const couponsArray =
        data?.coupons ||
        data?.data?.coupons ||
        data?.data ||
        (Array.isArray(data) ? data : []);
      setCoupons(Array.isArray(couponsArray) ? couponsArray : []);
      setError(null);
    } catch (err) {
      console.error("Fetch coupons error:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch coupons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const applyCoupon = async (code, orderTotal) => {
    setLoading(true);
    setError(null);
    try {
      const result = await validateCoupon(code, orderTotal);
      
      if (!result || (result.success === false)) {
        throw new Error(result?.message || "Invalid coupon");
      }

      const normalized = {
        code: result?.coupon?.code || result?.code || code,
        discount: result?.discount,
        newTotal: result?.newTotal || result?.updatedTotal,
        discountType: result?.coupon?.discountType || result?.discountType,
        value: result?.coupon?.value || result?.value,
        message: result?.message,
      };
      
      setCoupon(normalized);
      return result;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Invalid coupon";
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const removeCoupon = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await removeCouponApi();
      if (res?.success) {
        clearCoupon();
        return res;
      } else {
        throw new Error(res?.message || "Failed to remove coupon");
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to remove coupon";
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    coupons,
    appliedCoupon,
    loading,
    error,
    applyCoupon,
    removeCoupon,
    fetchCoupons,
  };
}
