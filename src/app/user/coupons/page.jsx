"use client";

import { useState } from "react";
import { Body1, Body2, Caption, Subheading2 } from "@/components/typography";
import Button from "@/components/ui/Buttons";
import { useCoupons } from "@/lib/hooks/useCoupons";
import { useRouter } from "next/navigation";

export default function CouponsPage() {
  const [activeTab, setActiveTab] = useState("available");
  const { coupons, loading, error, appliedCoupon } = useCoupons();
  const router = useRouter();

  const isAlreadyApplied = !!appliedCoupon;

  const normalizedCoupons = coupons.map((coupon) => {
    const expiryDate = coupon.expiryDate || coupon.expiry || coupon.expiresAt;
    const isExpired = expiryDate ? new Date(expiryDate) < new Date() : false;
    const isActive = typeof coupon.isActive === "boolean" ? coupon.isActive : true;
    const status = !isActive || isExpired ? "expired" : "available";

    return {
      id: coupon._id || coupon.id,
      code: coupon.code,
      description: coupon.description || coupon.desc || "",
      discountType: coupon.discountType,
      value: coupon.value,
      minOrderValue: coupon.minOrderValue,
      expiryDate,
      status,
    };
  });

  const getCouponsByStatus = (status) => {
    return normalizedCoupons.filter((coupon) => coupon.status === status);
  };

  const availableCoupons = getCouponsByStatus("available");
  const usedCoupons = getCouponsByStatus("used");
  const expiredCoupons = getCouponsByStatus("expired");

  const TABS = [
    { id: "available", label: "Available", count: availableCoupons.length },
    { id: "used", label: "Used", count: usedCoupons.length },
    { id: "expired", label: "Expired", count: expiredCoupons.length },
  ];

  const currentCoupons = activeTab === "available" ? availableCoupons 
    : activeTab === "used" ? usedCoupons 
    : expiredCoupons;

  const handleApply = (coupon) => {
    // In a real app, applying from here might redirect to cart or just show a message
    router.push("/cart");
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
        {loading ? (
          <div className="py-10 text-center">Loading coupons...</div>
        ) : error ? (
          <div className="py-10 text-center text-red-500">{error}</div>
        ) : currentCoupons.length === 0 ? (
          <div className="py-10 text-center text-gray-500">No coupons found.</div>
        ) : (
          currentCoupons.map((coupon) => (
            <CouponCard 
              key={coupon.id} 
              coupon={coupon} 
              status={activeTab} 
              isAlreadyApplied={isAlreadyApplied}
              onApply={() => handleApply(coupon)}
            />
          ))
        )}
      </section>
    </div>
  );
}

function CouponCard({ coupon, status, onApply, isAlreadyApplied }) {
  const getButtonProps = () => {
    switch (status) {
      case "available":
        if (isAlreadyApplied) {
          return {
            text: "Already Applied",
            className: "bg-gray-100 text-gray-500 cursor-not-allowed",
            disabled: true,
          };
        }
        return {
          text: "Apply",
          className: "bg-black text-white hover:bg-gray-800",
          onClick: onApply
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
          onClick: onApply
        };
    }
  };

  const buttonProps = getButtonProps();

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-gray-200 pb-4">
        <Body1 className="text-[16px] font-semibold uppercase tracking-[0.12em] text-[#20262B]">
          {coupon.discountType === "percentage"
            ? `${coupon.value}% OFF`
            : `Rs.${coupon.value} OFF`}
        </Body1>
        <span className="rounded-full bg-black px-3 py-1 text-[12px] font-semibold text-white">
          {coupon.code}
        </span>
      </div>
      <Body2 className="mt-4 text-[14px] text-[#6D6D6D]">
        {coupon.description || "Use this coupon for extra savings."}
      </Body2>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-[12px] text-[#6D6D6D]">
          {coupon.minOrderValue
            ? `Min order: Rs.${coupon.minOrderValue} · `
            : ""}
          {coupon.expiryDate
            ? status === "available"
              ? `Expires: ${new Date(coupon.expiryDate).toLocaleDateString()}`
              : `Expired on ${new Date(coupon.expiryDate).toLocaleDateString()}`
            : "No expiry date"}
        </span>
        <Button
          size="sm"
          className={buttonProps.className}
          disabled={buttonProps.disabled}
          onClick={buttonProps.onClick}
        >
          {buttonProps.text}
        </Button>
      </div>
    </div>
  );
}
