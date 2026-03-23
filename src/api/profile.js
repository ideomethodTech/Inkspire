import api from "@/lib/api";

export const getProfile = async () => {
  const res = await api.get("/protected/profile");
  return res.data;
};
