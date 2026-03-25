import { useState, useEffect, useCallback } from "react";
import { getOrderTracking } from "@/services/trackingService";

export function useOrderTracking(orderId) {
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTracking = useCallback(async () => {
    if (!orderId) return;
    setLoading(true);
    try {
      const data = await getOrderTracking(orderId);
      setTracking(data?.data || data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch tracking details");
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchTracking();
  }, [fetchTracking]);

  return {
    tracking,
    loading,
    error,
    fetchTracking,
  };
}
