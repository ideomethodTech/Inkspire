// Cart API Service

const API_URL = '/api/cart';

export async function getCart() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function addToCart(productId, quantity = 1) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity }),
  });
  return res.json();
}

export async function updateCartItem(productId, quantity) {
  const res = await fetch(`${API_URL}/${productId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  });
  return res.json();
}

export async function removeFromCart(productId) {
  const res = await fetch(`${API_URL}/${productId}`, {
    method: 'DELETE',
  });
  return res.json();
}
