"use client";

import { useState } from "react";
import { addAddress } from "@/api/address";

export default function AddAddressModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    isDefault: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const newAddress = await addAddress(token, form); // Save to backend
      onSuccess(newAddress); // Add to ProfilePage state
      onClose();
    } catch (err) {
      alert("Failed to add address");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-lg bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">Add Address</h2>
        <input name="name" placeholder="Label (Home/Office)" className="input" onChange={handleChange} />
        <input name="phone" placeholder="Phone" className="input mt-2" onChange={handleChange} />
        <input name="addressLine" placeholder="Address line" className="input mt-2" onChange={handleChange} />
        <input name="city" placeholder="City" className="input mt-2" onChange={handleChange} />
        <input name="state" placeholder="State" className="input mt-2" onChange={handleChange} />
        <input name="zip" placeholder="Zip code" className="input mt-2" onChange={handleChange} />
        <input name="country" placeholder="Country" className="input mt-2" onChange={handleChange} />
        <label className="mt-3 flex items-center gap-2">
          <input type="checkbox" name="isDefault" onChange={handleChange} />
          Set as default
        </label>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2">Cancel</button>
          <button onClick={handleSubmit} className="rounded bg-black px-4 py-2 text-white">Save Address</button>
        </div>
      </div>
    </div>
  );
}