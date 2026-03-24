"use client";

import { useEffect, useState } from "react";
import { Edit, Trash2, Mail, Phone, Plus, X, Check } from "lucide-react";
import { Body1, Body2, Caption, Label, Subheading2 } from "@/components/typography";
import { useProfile } from "@/lib/hooks/useProfile";
import { useAddress } from "@/lib/hooks/useAddress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  return <DesktopProfilePage />;
}

function DesktopProfilePage() {
  const { profile, loading: profileLoading, error: profileError, updateProfile } = useProfile();
  const { addresses, loading: addressLoading, error: addressError, addAddress, updateAddress: editAddress, deleteAddress } = useAddress();
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: "", dob: "", phone_number: "" });
  
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState({ 
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    zip: ""
  });

  useEffect(() => {
    if (profile) {
      setProfileForm({
        name: profile.name || profile.displayName || "",
        dob: profile.dob || profile.dateOfBirth || "",
        phone_number: profile.phone_number || profile.phone || profile.mobile || ""
      });
    }
  }, [profile]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profileForm);
      setIsEditingProfile(false);
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    
    // Basic Validation
    if (!addressForm.name || !addressForm.phone || !addressForm.addressLine || !addressForm.city || !addressForm.state || !addressForm.zip) {
      alert("All address fields are required");
      return;
    }

    try {
      console.log("Saving address payload:", addressForm);
      if (editingAddressId) {
        await editAddress(editingAddressId, addressForm);
      } else {
        await addAddress(addressForm);
      }
      setShowAddressForm(false);
      setEditingAddressId(null);
      setAddressForm({ 
        name: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        zip: ""
      });
    } catch (err) {
      console.error("Failed to save address", err);
    }
  };

  const startEditAddress = (address) => {
    setEditingAddressId(address.id || address._id);
    setAddressForm({
      name: address.name || "",
      phone: address.phone || "",
      addressLine: address.addressLine || "",
      city: address.city || "",
      state: address.state || "",
      zip: address.zip || ""
    });
    setShowAddressForm(true);
  };

  if (profileLoading && !profile) return <div className="p-10 text-center">Loading profile...</div>;

  return (
    <div className="flex-1 space-y-8">
      {(profileError || addressError) && (
        <p className="text-sm text-red-500 bg-red-50 p-3 rounded">{profileError || addressError}</p>
      )}

      {/* Profile Card */}
      <section className="rounded-lg bg-white p-8 shadow-sm border border-neutral-100">
        <div className="mb-6 flex items-center justify-between">
          <Subheading2 className="text-[20px] font-semibold uppercase tracking-[0.1em] text-[#20262B]">
            My Profile
          </Subheading2>
          {!isEditingProfile ? (
            <button
              onClick={() => setIsEditingProfile(true)}
              className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-white transition-colors hover:bg-[#20262B]"
            >
              <Edit size={14} />
              <span className="text-[11px] font-medium uppercase tracking-[0.08em]">Edit</span>
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditingProfile(false)}
                className="flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-2 text-neutral-600 transition-colors hover:bg-neutral-200"
              >
                <X size={14} />
                <span className="text-[11px] font-medium uppercase tracking-[0.08em]">Cancel</span>
              </button>
            </div>
          )}
        </div>

        {isEditingProfile ? (
          <form onSubmit={handleProfileSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block text-[11px] uppercase tracking-wider text-neutral-500">Full Name</Label>
                <Input 
                  value={profileForm.name} 
                  onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                  className="bg-neutral-50"
                  required
                />
              </div>
              <div>
                <Label className="mb-2 block text-[11px] uppercase tracking-wider text-neutral-500">Date of Birth</Label>
                <Input 
                  value={profileForm.dob} 
                  onChange={(e) => setProfileForm({...profileForm, dob: e.target.value})}
                  placeholder="MM / DD / YYYY"
                  className="bg-neutral-50"
                  required
                />
              </div>
              <div>
                <Label className="mb-2 block text-[11px] uppercase tracking-wider text-neutral-500">Mobile Number</Label>
                <Input 
                  value={profileForm.phone_number} 
                  onChange={(e) => setProfileForm({...profileForm, phone_number: e.target.value})}
                  className="bg-neutral-50"
                  required
                />
              </div>
              <Button type="submit" className="mt-4 bg-black text-white px-8 uppercase tracking-widest text-[11px]">Save Changes</Button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <Caption className="mb-1 text-[11px] uppercase tracking-[0.16em] text-[#6D6D6D]">Full Name</Caption>
                <Body1 className="text-[15px] font-medium text-[#20262B]">{profileForm.name || "Not provided"}</Body1>
              </div>
              <div>
                <Caption className="mb-1 text-[11px] uppercase tracking-[0.16em] text-[#6D6D6D]">Mobile Number</Caption>
                <Body1 className="text-[15px] font-medium text-[#20262B]">{profileForm.phone_number || "Not provided"}</Body1>
              </div>
              <div>
                <Caption className="mb-1 text-[11px] uppercase tracking-[0.16em] text-[#6D6D6D]">Date of Birth</Caption>
                <Body1 className="text-[15px] font-medium text-[#20262B]">{profileForm.dob || "Not provided"}</Body1>
              </div>
            </div>
            <div className="space-y-3">
              <VerificationBox
                icon={Mail}
                iconColor="text-green-500"
                label="Email"
                value={profile?.email || "Not provided"}
                status="Verified"
                statusColor="bg-green-100 text-green-700"
              />
              <VerificationBox
                icon={Phone}
                iconColor="text-orange-500"
                label="Mobile"
                value={profileForm.phone_number || "Not provided"}
                status={profileForm.phone_number ? "Verified" : "Not Verified"}
                statusColor={profileForm.phone_number ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}
              />
            </div>
          </div>
        )}
      </section>

      {/* Addresses */}
      <section className="rounded-lg bg-white p-8 shadow-sm border border-neutral-100">
        <div className="mb-6 flex items-center justify-between">
          <Subheading2 className="text-[20px] font-semibold uppercase tracking-[0.1em] text-[#20262B]">
            My Addresses
          </Subheading2>
        </div>

        {showAddressForm && (
          <form onSubmit={handleAddressSubmit} className="mb-8 p-6 bg-neutral-50 rounded-lg border border-neutral-200">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label className="mb-2 block text-[11px] uppercase tracking-wider text-neutral-500">Receiver Name</Label>
                <Input 
                  value={addressForm.name} 
                  onChange={(e) => setAddressForm({...addressForm, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label className="mb-2 block text-[11px] uppercase tracking-wider text-neutral-500">Phone</Label>
                <Input 
                  value={addressForm.phone} 
                  onChange={(e) => setAddressForm({...addressForm, phone: e.target.value})}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label className="mb-2 block text-[11px] uppercase tracking-wider text-neutral-500">Address Line</Label>
                <Input 
                  value={addressForm.addressLine} 
                  onChange={(e) => setAddressForm({...addressForm, addressLine: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label className="mb-2 block text-[11px] uppercase tracking-wider text-neutral-500">City</Label>
                <Input 
                  value={addressForm.city} 
                  onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label className="mb-2 block text-[11px] uppercase tracking-wider text-neutral-500">State</Label>
                <Input 
                  value={addressForm.state} 
                  onChange={(e) => setAddressForm({...addressForm, state: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label className="mb-2 block text-[11px] uppercase tracking-wider text-neutral-500">Zip Code</Label>
                <Input 
                  value={addressForm.zip} 
                  onChange={(e) => setAddressForm({...addressForm, zip: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <Button type="submit" className="bg-black text-white uppercase tracking-widest text-[11px]">
                {editingAddressId ? "Update Address" : "Save Address"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => { setShowAddressForm(false); setEditingAddressId(null); }}
                className="uppercase tracking-widest text-[11px]"
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {addressLoading && <div className="col-span-full py-4 text-center text-neutral-400">Loading addresses...</div>}
          {!addressLoading && addresses.length === 0 && !showAddressForm && (
            <div className="col-span-full py-8 text-center text-neutral-400 border border-dashed border-neutral-200 rounded-lg">
              No saved addresses found.
            </div>
          )}
          {addresses.map((address) => (
            <AddressCard 
              key={address.id || address._id} 
              address={address} 
              onEdit={() => startEditAddress(address)}
              onDelete={() => deleteAddress(address.id || address._id)}
            />
          ))}

          {!showAddressForm && (
            <button 
              onClick={() => {
                setEditingAddressId(null);
                setAddressForm({ 
                  name: "",
                  phone: "",
                  addressLine: "",
                  city: "",
                  state: "",
                  zip: ""
                });
                setShowAddressForm(true);
              }}
              className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-neutral-200 bg-transparent p-6 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
            >
              <Plus size={20} className="text-neutral-400" />
              <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-neutral-500">Add New Address</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

function VerificationBox({ icon: Icon, iconColor, label, value, status, statusColor }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-neutral-100 bg-neutral-50/50 px-4 py-3">
      <div className="flex items-center gap-3">
        <Icon size={18} className={iconColor} />
        <div>
          <Label className="text-[10px] uppercase tracking-[0.16em] text-[#6D6D6D]">{label}</Label>
          <Body2 className="text-[13px] font-medium text-[#20262B]">{value}</Body2>
        </div>
      </div>
      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColor}`}>
        {status}
      </span>
    </div>
  );
}

function AddressCard({ address, onEdit, onDelete }) {
  return (
    <div className="relative rounded-lg border border-neutral-100 bg-white p-6 hover:shadow-md transition-shadow">
      <div className="absolute right-4 top-4 flex gap-1">
        <button onClick={onEdit} className="p-1.5 text-neutral-400 hover:text-black hover:bg-neutral-50 rounded-full transition-colors" title="Edit">
          <Edit size={14} />
        </button>
        <button onClick={onDelete} className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors" title="Delete">
          <Trash2 size={14} />
        </button>
      </div>

      <div className="mb-4 inline-flex items-center rounded bg-neutral-100 px-2 py-0.5">
        <Caption className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#6D6D6D]">
          {address.name || "Address"}
        </Caption>
      </div>

      <div className="space-y-1">
        <Body2 className="text-[14px] text-[#20262B]">{address.addressLine}</Body2>
        <Body2 className="text-[14px] text-[#20262B]">{address.city}, {address.state} {address.zip}</Body2>
        {address.phone && (
          <div className="mt-3 flex items-center gap-2 text-neutral-500">
            <Phone size={12} />
            <span className="text-[13px]">{address.phone}</span>
          </div>
        )}
      </div>
    </div>
  );
}
