"use client";

import { useState } from "react";
import { Body1, Body2, Caption, Subheading2 } from "@/components/typography";
import Button from "@/components/ui/Buttons";

const AVAILABLE_COUPONS = [
  {
    id: 1,
    code: "INK20",
    title: "20% OFF YOUR FIRST ORDER",
    desc: "Join our wall art club and get 20% off your first order.",
    expiry: "Expires: 30 Jun 2025",
  },
  {
    id: 2,
    code: "SHIPFREE",
    title: "FREE SHIPPING",
    desc: "Free shipping on orders above Rs. 500.",
    expiry: "Expires: 15 Jul 2025",
  },
];

const USED_COUPONS = [
  {
    id: 3,
    code: "SAVE10",
    title: "10% OFF",
    desc: "Get 10% off on all posters",
    expiry: "Used on 15 Jan 2025",
  },
];

const EXPIRED_COUPONS = [
  {
    id: 4,
    code: "WELCOME25",
    title: "25% WELCOME OFFER",
    desc: "Welcome offer for new users",
    expiry: "Expired on 31 Dec 2024",
  },
];

const TABS = [
  { id: "available", label: "Available", count: 2 },
  { id: "used", label: "Used", count: 1 },
  { id: "expired", label: "Expired", count: 1 },
];

export default function CouponsPage() {
  const [activeTab, setActiveTab] = useState("available");

  const getCoupons = () => {
    switch (activeTab) {
      case "available":
        return AVAILABLE_COUPONS;
      case "used":
        return USED_COUPONS;
      case "expired":
        return EXPIRED_COUPONS;
      default:
        return AVAILABLE_COUPONS;
    }
  };

  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div>
        <Subheading2 className="text-[24px] font-semibold uppercase tracking-[0.1em] text-[#20262B]">
          My Coupons
        </Subheading2>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-[14px] font-medium uppercase tracking-[0.08em] transition-colors relative ${
                activeTab === tab.id
                  ? "text-[#20262B] border-b-2 border-[#20262B]"
                  : "text-[#6D6D6D] hover:text-[#20262B]"
              }`}
            >
              {tab.label}
              <span className="ml-2 rounded-full bg-gray-100 px-2 py-1 text-[12px] text-[#6D6D6D]">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Coupons Grid */}
      <section className="space-y-4">
        {getCoupons().map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} status={activeTab} />
        ))}
      </section>
    </div>
  );
}

function CouponCard({ coupon, status }) {
  const getButtonProps = () => {
    switch (status) {
      case "available":
        return {
          text: "Apply",
          className: "bg-black text-white hover:bg-gray-800",
        };
      case "used":
        return {
          text: "Used",
          className: "bg-gray-100 text-gray-500 cursor-not-allowed",
          disabled: true,
        };
      case "expired":
        return {
          text: "Expired",
          className: "bg-red-100 text-red-500 cursor-not-allowed",
          disabled: true,
        };
      default:
        return {
          text: "Apply",
          className: "bg-black text-white hover:bg-gray-800",
        };
    }
  };

  const buttonProps = getButtonProps();

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-gray-200 pb-4">
        <Body1 className="text-[16px] font-semibold uppercase tracking-[0.12em] text-[#20262B]">
          {coupon.title}
        </Body1>
        <span className="rounded-full bg-black px-3 py-1 text-[12px] font-semibold text-white">
          {coupon.code}
        </span>
      </div>
      <Body2 className="mt-4 text-[14px] text-[#6D6D6D]">{coupon.desc}</Body2>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-[12px] text-[#6D6D6D]">{coupon.expiry}</span>
        <Button
          size="sm"
          className={buttonProps.className}
          disabled={buttonProps.disabled}
        >
          {buttonProps.text}
        </Button>
      </div>
    </div>
  );
}

