import { useState, useEffect, useCallback } from "react";
import {
  getAddresses,
  addAddress as addAddressApi,
  updateAddress as updateAddressApi,
  deleteAddress as deleteAddressApi,
} from "@/services/addressService";

export function useAddress() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAddresses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAddresses();
      // Handle potential different response structures
      const addressesArray = res?.data || res?.addresses || (Array.isArray(res) ? res : []);
      setAddresses(Array.isArray(addressesArray) ? addressesArray : []);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch addresses");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const addAddress = async (addressData) => {
    setLoading(true);
    try {
      const result = await addAddressApi(addressData);
      await fetchAddresses();
      return result;
    } catch (err) {
      setError(err.message || "Failed to add address");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateAddress = async (id, addressData) => {
    setLoading(true);
    try {
      const result = await updateAddressApi(id, addressData);
      await fetchAddresses();
      return result;
    } catch (err) {
      setError(err.message || "Failed to update address");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (id) => {
    setLoading(true);
    try {
      const result = await deleteAddressApi(id);
      await fetchAddresses();
      return result;
    } catch (err) {
      setError(err.message || "Failed to delete address");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    addresses,
    loading,
    error,
    addAddress,
    updateAddress,
    deleteAddress,
    fetchAddresses,
  };
}
