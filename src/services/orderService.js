// Order API Service (backend)

import api from "@/lib/api";

export async function createOrder(orderData) {
  const res = await api.post("/api/orders", orderData);
  return res.data;
}

export async function getOrders(page = 1, limit = 10) {
  const res = await api.get(`/api/orders?page=${page}&limit=${limit}`);
  return res.data;
}

export async function getOrderById(id) {
  const res = await api.get(`/api/orders/${id}`);
  return res.data;
}

export async function cancelOrder(id) {
  const res = await api.put(`/api/orders/${id}/cancel`);
  return res.data;
}
