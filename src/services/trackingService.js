import api from "../lib/api";

export const getOrderTracking = async (orderId) => {
  const response = await api.get(`/api/orders/${orderId}/tracking`);
  return response.data;
};
