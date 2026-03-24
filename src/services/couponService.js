import api from "../lib/api";

export const getCoupons = async () => {
  const response = await api.get("/api/coupons");
  return response.data;
};

export const applyCoupon = async (code, orderTotal) => {
  const payload = { code };
  if (Number.isFinite(orderTotal)) {
    payload.orderTotal = orderTotal;
  }
  const response = await api.post("/api/coupons/apply", payload);
  return response.data;
};
