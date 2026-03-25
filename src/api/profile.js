import api from "@/lib/api";

export const getProfile = async () => {
  const res = await api.get("/protected/profile");
  return res.data;
};

export const updateProfile = async (profileData) => {
  const res = await api.put("/protected/profile", profileData);
  return res.data;
};
