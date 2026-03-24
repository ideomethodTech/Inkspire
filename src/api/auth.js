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

export const registerUser = async (registrationData) => {
  try {
    const response = await api.post("/auth/register", registrationData);
    return response.data;
  } catch (err) {
    console.error("Registration error:", err);
    throw err;
  }
};