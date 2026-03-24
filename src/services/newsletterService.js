import api from "../lib/api";

export const subscribeNewsletter = async (email) => {
  const response = await api.post("/api/newsletter/subscribe", { email });
  return response.data;
};
