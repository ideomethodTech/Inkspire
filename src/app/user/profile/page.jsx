"use client";

import { useEffect, useState } from "react";
import { Edit, Trash2, Mail, Phone, Plus } from "lucide-react";
import { Body1, Body2, Caption, Label, Subheading2 } from "@/components/typography";
import { getProfile } from "@/api/profile";

const ADDRESSES = [
  {
    id: 1,
    label: "Home",
    line1: "123 Dreamy Lane, Apt 4B",
    line2: "Fantasyland, FL 12345",
    phone: "+1 123-456-7890",
  },
];

export default function ProfilePage() {
  return (
    <DesktopProfilePage />
  );
}

function DesktopProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const token =
        typeof window !== "undefined" ? window.localStorage.getItem("token") : null;
      if (!token) {
        setError("Please sign in to view your profile.");
        return;
      }

      try {
        const stored = window.localStorage.getItem("user");
        if (stored) {
          setProfile(JSON.parse(stored));
        }
      } catch (err) {
        console.warn("Failed to parse stored user", err);
      }

      try {
        const res = await getProfile();
        const data = res?.data || res?.user || res;
        if (data) {
          setProfile((prev) => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.warn("Failed to load profile", err);
        if (!profile) {
          setError("Unable to load profile.");
        }
      }
    };

    loadProfile();
  }, []);

  const fullName =
    profile?.displayName ||
    profile?.name ||
    (profile?.email ? profile.email.split("@")[0] : "User");
  const email = profile?.email || "Not provided";
  const phone = profile?.phone || profile?.mobile || "Not provided";
  const dob = profile?.dob || profile?.dateOfBirth || "Not provided";

  return (
    <div className="flex-1 space-y-8">
      {error && (
        <p className="text-sm text-gray-500">{error}</p>
      )}
      {/* Profile Card */}
      <section className="rounded-lg bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <Subheading2 className="text-[24px] font-semibold uppercase tracking-[0.1em] text-[#20262B]">
            My Profile
          </Subheading2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-white transition-colors hover:bg-[#20262B]"
          >
            <Edit size={16} />
            <span className="text-[12px] font-medium uppercase tracking-[0.08em]">Edit</span>
          </button>
        </div>

        {/* User Details - Two Column Layout */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left Column - Personal Information */}
          <div className="space-y-6">
            <div>
              <Caption className="mb-2 text-[11px] uppercase tracking-[0.16em] text-[#6D6D6D]">
                Full Name
              </Caption>
              <Body1 className="text-[14px] font-medium text-[#20262B]">
                {fullName}
              </Body1>
            </div>
            <div>
              <Caption className="mb-2 text-[11px] uppercase tracking-[0.16em] text-[#6D6D6D]">
                Mobile Number
              </Caption>
              <Body1 className="text-[14px] font-medium text-[#20262B]">
                {phone}
              </Body1>
            </div>
            <div>
              <Caption className="mb-2 text-[11px] uppercase tracking-[0.16em] text-[#6D6D6D]">
                Date of Birth
              </Caption>
              <Body1 className="text-[14px] font-medium text-[#20262B]">
                {dob}
              </Body1>
            </div>
          </div>

          {/* Right Column - Contact Verification */}
          <div className="space-y-3">
            <VerificationBox
              icon={Mail}
              iconColor="text-green-500"
              label="Email"
              value={email}
              status={email === "Not provided" ? "Not Verified" : "Verified"}
              statusColor={
                email === "Not provided"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-green-100 text-green-700"
              }
            />
            <VerificationBox
              icon={Phone}
              iconColor="text-orange-500"
              label="Mobile"
              value={phone}
              status={phone === "Not provided" ? "Not Verified" : "Verified"}
              statusColor={
                phone === "Not provided"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-green-100 text-green-700"
              }
            />
          </div>
        </div>
      </section>

      {/* Addresses */}
      <section className="rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-6">
          <Subheading2 className="text-[24px] font-semibold uppercase tracking-[0.1em] text-[#20262B]">
            My Addresses
          </Subheading2>
        </div>
        <div className="space-y-4">
          {ADDRESSES.map((address) => (
            <AddressCard key={address.id} address={address} />
          ))}

          {/* Add New Address */}
          <button className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-neutral-300 bg-transparent p-8 transition-colors hover:border-neutral-400 hover:bg-neutral-50">
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

function VerificationBox({ icon: Icon, iconColor, label, value, status, statusColor }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3">
      <div className="flex items-center gap-3">
        <Icon size={20} className={iconColor} />
        <div>
          <Label className="text-[12px] uppercase tracking-[0.16em] text-[#6D6D6D]">
            {label}
          </Label>
          <Body2 className="text-[14px] text-[#20262B]">{value}</Body2>
        </div>
      </div>
      <span className={`rounded-full px-3 py-1 text-[12px] font-semibold ${statusColor}`}>
        {status}
      </span>
    </div>
  );
}

function AddressCard({ address }) {
  return (
    <div className="relative rounded-lg border border-gray-200 bg-white p-6">
      {/* Edit/Delete Icons */}
      <div className="absolute right-4 top-4 flex gap-2">
        <button
          className="rounded-full p-2 text-[#6D6D6D] transition-colors hover:bg-neutral-100"
          aria-label="Edit address"
        >
          <Edit size={16} />
        </button>
        <button
          className="rounded-full p-2 text-[#6D6D6D] transition-colors hover:bg-neutral-100"
          aria-label="Delete address"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Home Badge */}
      <div className="mb-4 inline-flex items-center rounded-full bg-neutral-100 px-3 py-1">
        <Caption className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#6D6D6D]">
          {address.label}
        </Caption>
      </div>

      {/* Address Details */}
      <div className="space-y-1">
        <Body2 className="text-[14px] text-[#20262B]">{address.line1}</Body2>
        <Body2 className="text-[14px] text-[#20262B]">{address.line2}</Body2>
        <Body2 className="text-[14px] text-[#20262B]">{address.phone}</Body2>
      </div>
    </div>
  );
}
