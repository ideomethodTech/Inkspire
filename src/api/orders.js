import api from "@/lib/api";

export const getOrders = async (page = 1, limit = 10) => {
  const res = await api.get(`/orders?page=${page}&limit=${limit}`);
  return res.data;
};

export const getOrderDetails = async (orderId) => {
  const res = await api.get(`/orders/${orderId}`);
  return res.data;
};

export const cancelOrder = async (orderId) => {
  const res = await api.put(`/orders/${orderId}/cancel`);
  return res.data;
};