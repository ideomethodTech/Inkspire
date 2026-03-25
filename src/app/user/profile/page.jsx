"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2, Mail, Phone, Plus } from "lucide-react";
import {
  Body1,
  Body2,
  Caption,
  Label,
  Subheading2,
} from "@/components/typography";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return <div className="p-8 text-center">Loading profile...</div>;

  const addresses = user.addresses || [];

  const handleAddAddress = () => {
    // ⭐ next step we will open modal here
    alert("Open Add Address Modal");
  };

  return (
    <div className="flex-1 space-y-8">
      {/* PROFILE */}
      <section className="rounded-lg bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <Subheading2 className="text-[24px] font-semibold uppercase tracking-[0.1em] text-[#20262B]">
            My Profile
          </Subheading2>

          <button className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-white">
            <Edit size={16} />
            <span className="text-[12px] font-medium uppercase tracking-[0.08em]">
              Edit
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* LEFT */}
          <div className="space-y-6">
            <ProfileItem label="Full Name" value={user.displayName} />
            <ProfileItem label="Mobile Number" value={user.phoneNumber} />
            <ProfileItem
              label="Date of Birth"
              value={
                user.dob
                  ? new Date(user.dob).toLocaleDateString()
                  : "N/A"
              }
            />
          </div>

          {/* RIGHT */}
          <div className="space-y-3">
            <VerificationBox
              icon={Mail}
              iconColor="text-green-500"
              label="Email"
              value={user.email}
              status={
                user.emailVerified ? "Verified" : "Not Verified"
              }
              statusColor={
                user.emailVerified
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }
            />

            <VerificationBox
              icon={Phone}
              iconColor="text-orange-500"
              label="Mobile"
              value={user.phoneNumber || "N/A"}
              status="Not Verified"
              statusColor="bg-orange-100 text-orange-700"
            />
          </div>
        </div>
      </section>

      {/* ADDRESSES */}
      <section className="rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-6">
          <Subheading2 className="text-[24px] font-semibold uppercase tracking-[0.1em] text-[#20262B]">
            My Addresses
          </Subheading2>
        </div>

        <div className="space-y-4">
          {addresses.length > 0 ? (
            addresses.map((addr, i) => (
              <AddressCard key={i} address={addr} />
            ))
          ) : (
            <div className="rounded-lg border border-dashed p-6 text-center text-sm text-gray-500">
              You have not added any address yet.
            </div>
          )}

          {/* ADD BUTTON */}
          <button
            onClick={handleAddAddress}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-neutral-300 bg-transparent p-8 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
          >
            <Plus size={20} className="text-[#6D6D6D]" />
            <span className="text-[14px] font-medium uppercase tracking-[0.08em] text-[#6D6D6D]">
              Add New Address
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function ProfileItem({ label, value }) {
  return (
    <div>
      <Caption className="mb-2 text-[11px] uppercase tracking-[0.16em] text-[#6D6D6D]">
        {label}
      </Caption>
      <Body1 className="text-[14px] font-medium text-[#20262B]">
        {value || "N/A"}
      </Body1>
    </div>
  );
}

function VerificationBox({
  icon: Icon,
  iconColor,
  label,
  value,
  status,
  statusColor,
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3">
      <div className="flex items-center gap-3">
        <Icon size={20} className={iconColor} />
        <div>
          <Label className="text-[12px] uppercase tracking-[0.16em] text-[#6D6D6D]">
            {label}
          </Label>
          <Body2 className="text-[14px] text-[#20262B]">
            {value}
          </Body2>
        </div>
      </div>

      <span
        className={`rounded-full px-3 py-1 text-[12px] font-semibold ${statusColor}`}
      >
        {status}
      </span>
    </div>
  );
}

function AddressCard({ address }) {
  return (
    <div className="relative rounded-lg border border-gray-200 bg-white p-6">
      <div className="absolute right-4 top-4 flex gap-2">
        <button className="rounded-full p-2 hover:bg-neutral-100">
          <Edit size={16} />
        </button>
        <button className="rounded-full p-2 hover:bg-neutral-100">
          <Trash2 size={16} />
        </button>
      </div>

      <div className="mb-3 inline-flex rounded-full bg-neutral-100 px-3 py-1">
        <Caption className="text-[11px] uppercase tracking-[0.16em] text-[#6D6D6D]">
          {address.name || "Address"}
        </Caption>
      </div>

      <div className="space-y-1">
        <Body2>{address.addressLine}</Body2>
        <Body2>
          {address.city} {address.state}
        </Body2>
        <Body2>{address.phone}</Body2>
      </div>
    </div>
  );
}