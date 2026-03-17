// src/api/auth.js
import api from "@/lib/api";

export const loginUser = async (idToken) => {
  try {
    const response = await api.post("/auth/login", { idToken });
    return response.data;
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
};