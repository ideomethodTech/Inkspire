"use client";

import { Body1, Body2, Caption, Subheading2 } from "@/components/typography";
import Button from "@/components/ui/Buttons";

const COUPONS = [
  {
    code: "INK20",
    title: "20% OFF YOUR FIRST ORDER",
    desc: "Join our wall art club and get 20% off your first order.",
    expiry: "Expires: 30 Jun 2025",
  },
  {
    code: "SHIPFREE",
    title: "FREE SHIPPING",
    desc: "Free shipping on orders above Rs. 500.",
    expiry: "Expires: 15 Jul 2025",
  },
];

export default function CouponsPage() {
  return (
    <div className="flex-1 space-y-6">
      <section className="space-y-4">
        {COUPONS.map((coupon) => (
          <div
            key={coupon.code}
            className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-neutral-200 pb-3">
              <Body1 className="text-[16px] font-semibold uppercase tracking-[0.12em] text-[#20262B]">
                {coupon.title}
              </Body1>
              <span className="rounded-full bg-black px-3 py-1 text-[12px] font-semibold text-white">
                {coupon.code}
              </span>
            </div>
            <Body2 className="mt-3 text-[14px] text-[#6D6D6D]">{coupon.desc}</Body2>
            <div className="mt-4 flex items-center justify-between text-[12px] text-[#6D6D6D]">
              <span>{coupon.expiry}</span>
              <Button
                size="sm"
                className="bg-[#202125] text-white hover:bg-[#202125]"
              >
                Apply
              </Button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

