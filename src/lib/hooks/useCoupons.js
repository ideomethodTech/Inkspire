import { useState, useEffect } from "react";
import { getCoupons, applyCoupon as applyCouponApi } from "@/services/couponService";

export function useCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const data = await getCoupons();
      const couponsArray = data?.data || (Array.isArray(data) ? data : []);
      setCoupons(Array.isArray(couponsArray) ? couponsArray : []);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch coupons");
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
      const result = await applyCouponApi(code, orderTotal);
      setAppliedCoupon(result?.data || result);
      return result;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Invalid coupon";
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
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
