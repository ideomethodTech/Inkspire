import api from "../lib/api";

export const getProductReviews = async (productId) => {
  const response = await api.get(`/api/reviews/${productId}`);
  return response.data;
};

export const submitReview = async (reviewData) => {
  const response = await api.post("/api/reviews", reviewData);
  return response.data;
};

export const updateReview = async (reviewId, reviewData) => {
  const response = await api.put(`/api/reviews/${reviewId}`, reviewData);
  return response.data;
};

export const deleteReview = async (reviewId) => {
  const response = await api.delete(`/api/reviews/${reviewId}`);
  return response.data;
};
