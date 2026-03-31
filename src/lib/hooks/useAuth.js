import { useState } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/authService";
import { useAuthContext } from "@/context";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { logout: clearGlobalState } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Call backend logout API
      await logoutUser();
      
      // 2. Clear local storage & global state
      clearGlobalState();
      
      // 3. Redirect to home page (full reload to reset all states)
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Logout hook error:", err);
      setError(err?.response?.data?.message || err.message || "Logout failed");
      
      // Even if API fails, we should clear local storage for a robust signout
      clearGlobalState();
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    logout,
    loading,
    error
  };
};
