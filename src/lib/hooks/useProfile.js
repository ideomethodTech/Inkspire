import { useState, useEffect, useCallback } from "react";
import { getProfile, updateProfile as updateProfileApi } from "@/api/profile.js";

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProfile();
      setProfile(data?.user || data?.data || data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (profileData) => {
    setLoading(true);
    try {
      const result = await updateProfileApi(profileData);
      setProfile(result?.user || result?.data || result);
      return result;
    } catch (err) {
      setError(err.message || "Failed to update profile");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    fetchProfile,
  };
}
