import api from "../lib/api";

export const getAddresses = async () => {
  const response = await api.get("/api/address");
  return response.data;
};

/**
 * Expected backend schema:
 * {
 *   name: string,
 *   phone: string,
 *   addressLine: string,
 *   city: string,
 *   state: string,
 *   zip: string
 * }
 */
export const addAddress = async (addressData) => {
  const response = await api.post("/api/address", addressData);
  return response.data;
};

export const updateAddress = async (id, addressData) => {
  const response = await api.put(`/api/address/${id}`, addressData);
  return response.data;
};

export const deleteAddress = async (id) => {
  const response = await api.delete(`/api/address/${id}`);
  return response.data;
};
