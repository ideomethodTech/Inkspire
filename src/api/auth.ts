import api from "@/lib/api";

export const loginUser = async (idToken: string) => {
  try {
    const response = await api.post("/auth/login", { idToken });

    return response.data; // { success, token, user }
  } catch (err: any) {
    // Mock Firebase behavior: user not found
    if (err.response?.status === 404) {
      throw new Error("User not found"); // frontend can show sign-up modal
    }
    throw new Error(err.message || "Login failed");
  }
};