import axios from "axios";

const couponApi = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

couponApi.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem("token")
      : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getCoupons = async () => {
  const response = await couponApi.get("/api/coupons/");
  return response.data;
};

export const applyCoupon = async (code, orderTotal) => {
  const payload = { 
    code,
    orderTotal: Number(orderTotal)
  };
  const response = await couponApi.post("/api/coupons/apply", payload);
  return response.data;
};

export const validateCoupon = async (code, orderTotal) => {
  const payload = { 
    code,
    orderTotal: Number(orderTotal)
  };
  const response = await couponApi.post("/api/coupons/apply", payload);
  return response.data;
};

export const removeCoupon = async () => {
  const response = await couponApi.delete("/api/coupons/remove");
  return response.data;
};
