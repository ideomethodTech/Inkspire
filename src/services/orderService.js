// Order API Service

const API_URL = '/api/orders';

export async function createOrder(orderData) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  return res.json();
}

export async function getOrders() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function getOrderById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}
