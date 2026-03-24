import { useState, useEffect, useCallback } from "react";
import {
  getProductReviews,
  submitReview,
  updateReview,
  deleteReview,
} from "@/services/reviewService";

export function useReviews(productId) {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReviews = useCallback(async () => {
    if (!productId) return;
    setLoading(true);
    try {
      const data = await getProductReviews(productId);
      
      // Handle potential different response structures
      const apiData = data?.data || data;
      
      if (apiData && typeof apiData === 'object' && !Array.isArray(apiData)) {
        const reviewsArray = Array.isArray(apiData.reviews) ? apiData.reviews : [];
        setReviews(reviewsArray);
        
        // Use averageRating from API or calculate it
        if (typeof apiData.averageRating === 'number') {
          setAverageRating(apiData.averageRating);
        } else {
          const avg = reviewsArray.length 
            ? reviewsArray.reduce((acc, curr) => acc + (curr.rating || 0), 0) / reviewsArray.length 
            : 0;
          setAverageRating(avg);
        }
        
        // Use totalReviews from API or use length
        setTotalReviews(typeof apiData.totalReviews === 'number' ? apiData.totalReviews : reviewsArray.length);
      } else if (Array.isArray(apiData)) {
        setReviews(apiData);
        setTotalReviews(apiData.length);
        const avg = apiData.length 
          ? apiData.reduce((acc, curr) => acc + (curr.rating || 0), 0) / apiData.length 
          : 0;
        setAverageRating(avg);
      } else {
        setReviews([]);
        setAverageRating(0);
        setTotalReviews(0);
      }
      
      setError(null);
    } catch (err) {
      console.error("Fetch reviews error:", err);
      setError(err.message || "Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const addReview = async (reviewData) => {
    setLoading(true);
    try {
      const result = await submitReview({ ...reviewData, productId });
      await fetchReviews();
      return result;
    } catch (err) {
      setError(err.message || "Failed to submit review");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editReview = async (reviewId, reviewData) => {
    setLoading(true);
    try {
      const result = await updateReview(reviewId, reviewData);
      await fetchReviews();
      return result;
    } catch (err) {
      setError(err.message || "Failed to update review");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeReview = async (reviewId) => {
    setLoading(true);
    try {
      const result = await deleteReview(reviewId);
      await fetchReviews();
      return result;
    } catch (err) {
      setError(err.message || "Failed to delete review");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    reviews,
    averageRating,
    totalReviews,
    loading,
    error,
    addReview,
    editReview,
    removeReview,
    fetchReviews,
  };
}
