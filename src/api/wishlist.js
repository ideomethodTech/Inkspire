import api from "@/lib/api";

// Get current user's wishlist
export const getWishlist = async () => {
  try {
    const res = await api.get("/api/wishlist");
    return res.data;
  } catch (err) {
    // ✅ Silently ignore 404 — route may not exist for this user type
    if (err?.response?.status === 404) {
      return { success: false, data: { products: [] } };
    }
    console.error("Error fetching wishlist:", err);
    return { success: false, data: { products: [] } };
  }
};

// Add product to wishlist
export const addToWishlist = async (productId) => {
  try {
    const res = await api.post("/api/wishlist/add", { productId });
    return res.data;
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    return { success: false };
  }
};

// Remove product from wishlist
export const removeFromWishlist = async (productId) => {
  try {
    const res = await api.delete(`/api/wishlist/remove/${productId}`);
    return res.data;
  } catch (err) {
    console.error("Error removing from wishlist:", err);
    return { success: false };
  }
};

// Clear wishlist
export const clearWishlist = async () => {
  try {
    const res = await api.delete("/api/wishlist/clear");
    return res.data;
  } catch (err) {
    console.error("Error clearing wishlist:", err);
    return { success: false };
  }
};
