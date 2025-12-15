// Auth API Service

const API_URL = '/api/auth';

export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function register(userData) {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return res.json();
}

export async function logout() {
  const res = await fetch(`${API_URL}/logout`, { method: 'POST' });
  return res.json();
}

export async function getCurrentUser() {
  const res = await fetch(`${API_URL}/me`);
  return res.json();
}
