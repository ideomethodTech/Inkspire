// Product API Service

const API_URL = '/api/products';

export async function getProducts(params = {}) {
  const searchParams = new URLSearchParams(params);
  const res = await fetch(`${API_URL}?${searchParams}`);
  return res.json();
}

export async function getProductById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Product not found');
  return res.json();
}

export async function searchProducts(query) {
  return getProducts({ search: query });
}
