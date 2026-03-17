import api from "@/lib/api";

// Get current user's cart
export const getCart = async () => {
  try {
    const res = await api.get("/api/cart");
    return res.data;
  } catch (err) {
    console.error("Error fetching cart:", err);
    return { success: false, items: [] };
  }
};

// Add item to cart
export const addToCart = async ({ productId, variantIndex = 0, quantity = 1 }) => {
  try {
    const res = await api.post("/api/cart/add", { productId, variantIndex, quantity });
    return res.data;
  } catch (err) {
    console.error("Error adding to cart:", err);
    return { success: false };
  }
};

// Update item quantity
export const updateCartItem = async ({ productId, variantIndex = 0, quantity }) => {
  try {
    const res = await api.put(`/api/cart/${productId}`, { variantIndex, quantity });
    return res.data;
  } catch (err) {
    console.error("Error updating cart item:", err);
    return { success: false };
  }
};

// Remove item from cart
export const removeCartItem = async ({ productId, variantIndex = 0 }) => {
  try {
    const res = await api.delete(`/api/cart/${productId}`, { data: { variantIndex } });
    return res.data;
  } catch (err) {
    console.error("Error removing cart item:", err);
    return { success: false };
  }
};

// Clear entire cart
export const clearCart = async () => {
  try {
    const res = await api.delete("/api/cart");
    return res.data;
  } catch (err) {
    console.error("Error clearing cart:", err);
    return { success: false };
  }
};