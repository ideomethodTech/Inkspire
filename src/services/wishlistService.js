// Wishlist API Service

const API_URL = '/api/wishlist';

export async function getWishlist() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function addToWishlist(productId) {
  const res = await fetch(`${API_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId }),
  });
  return res.json();
}

export async function removeFromWishlist(productId) {
  const res = await fetch(`${API_URL}/remove/${productId}`, {
    method: 'DELETE',
  });
  return res.json();
}

export async function clearWishlist() {
  const res = await fetch(`${API_URL}/clear`, {
    method: 'DELETE',
  });
  return res.json();
}
