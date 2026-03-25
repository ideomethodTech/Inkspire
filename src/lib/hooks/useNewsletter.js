import { useState } from "react";
import { subscribeNewsletter as subscribeApi } from "@/services/newsletterService";

export function useNewsletter() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const subscribe = async (email) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await subscribeApi(email);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Subscription failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    subscribe,
    loading,
    error,
    success,
  };
}
