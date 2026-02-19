"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Edit, Trash2, MapPin, Wallet, CreditCard, Info, ShieldCheck, CheckCircle2, ChevronRight, PlusCircle } from "lucide-react";
import { Body1, Body2, Caption, Subheading2 } from "@/components/typography";

const ADDRESSES = [
  {
    id: 1,
    label: "Home",
    line1: "123 Dreamy Lane, Apt 4B",
    line2: "Fantasyland, FL 12345",
    phone: "+1 123-456-7890",
  },
];

export default function MobileProfilePage() {
  const pathname = usePathname();
  const router = useRouter();

  const getInitialTab = () => {
    if (pathname.includes("/orders")) return "orders";
    if (pathname.includes("/coupons")) return "coupons";
    if (pathname.includes("/wallets")) return "wallets";
    if (pathname.includes("/payments")) return "payments";
    return "profile";
  };

  const [activeTab, setActiveTabState] = useState(getInitialTab());
  const [couponTab, setCouponTab] = useState("available");
  const [isEditing, setIsEditing] = useState(false);
  const [scrollPage, setScrollPage] = useState(0);

  useEffect(() => {
    setActiveTabState(getInitialTab());
    if (getInitialTab() === "payments" || getInitialTab() === "wallets") {
      setScrollPage(1);
    } else {
      setScrollPage(0);
    }
  }, [pathname]);

  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    if (tab === "profile") router.push("/user/profile");
    else router.push(`/user/${tab}`);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] pt-4">
      {/* Breadcrumb */}
      <div className="px-4 mb-4">
        <Caption className="text-[11px] text-[#6D6D6D]">
          <span className="underline underline-offset-2">Home</span> / Support
        </Caption>
      </div>

      {/* Tab navigation */}
      <section className="px-0 relative">
        <div
          className="flex w-full snap-x snap-mandatory overflow-x-auto scrollbar-hide pb-2"
          onScroll={(e) => {
            const scrollLeft = e.currentTarget.scrollLeft;
            const width = e.currentTarget.clientWidth;
            // if we've scrolled more than half the container width, we're on the second page
            if (scrollLeft > width / 2) {
              setScrollPage(1);
            } else {
              setScrollPage(0);
            }
          }}
        >
          {/* Page 1: 3 items */}
          <div className="flex w-full min-w-full flex-shrink-0 snap-center items-start justify-evenly px-4">
            {/* My Profile (active) */}
            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full ${activeTab === "profile"
                  ? "bg-[#FDE4E4] text-[#E11B1B]"
                  : "bg-neutral-100 text-[#9CA3AF]"
                  }`}
              >
                <span
                  className={`h-3 w-3 rounded-full ${activeTab === "profile" ? "bg-[#E11B1B]" : "bg-[#9CA3AF]"
                    }`}
                />
              </span>
              <span
                className={`text-[10px] whitespace-nowrap font-semibold tracking-[0.1em] uppercase ${activeTab === "profile" ? "text-[#E11B1B]" : "text-[#9CA3AF]"
                  }`}
              >
                My Profile
              </span>
            </button>

            {/* My Orders */}
            <button
              type="button"
              onClick={() => setActiveTab("orders")}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full ${activeTab === "orders"
                  ? "bg-[#FDE4E4] text-[#E11B1B]"
                  : "bg-neutral-100 text-[#9CA3AF]"
                  }`}
              >
                🛒
              </span>
              <span
                className={`text-[10px] whitespace-nowrap font-medium tracking-[0.1em] uppercase ${activeTab === "orders" ? "text-[#E11B1B]" : "text-[#9CA3AF]"
                  }`}
              >
                My Orders
              </span>
            </button>

            {/* My Coupons */}
            <button
              type="button"
              onClick={() => setActiveTab("coupons")}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full ${activeTab === "coupons"
                  ? "bg-[#FDE4E4] text-[#E11B1B]"
                  : "bg-neutral-100 text-[#9CA3AF]"
                  }`}
              >
                ₵
              </span>
              <span
                className={`text-[10px] whitespace-nowrap font-medium tracking-[0.1em] uppercase ${activeTab === "coupons" ? "text-[#E11B1B]" : "text-[#9CA3AF]"
                  }`}
              >
                My Coupons
              </span>
            </button>
          </div>

          {/* Page 2: 2 items */}
          <div className="flex w-full min-w-full flex-shrink-0 snap-center items-start justify-evenly px-4">
            {/* My Wallets */}
            <button
              type="button"
              onClick={() => setActiveTab("wallets")}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full ${activeTab === "wallets"
                  ? "bg-[#FDE4E4] text-[#E11B1B]"
                  : "bg-neutral-100 text-[#9CA3AF]"
                  }`}
              >
                <Wallet size={16} />
              </span>
              <span
                className={`text-[10px] whitespace-nowrap font-medium tracking-[0.1em] uppercase ${activeTab === "wallets" ? "text-[#E11B1B]" : "text-[#9CA3AF]"
                  }`}
              >
                My Wallets
              </span>
            </button>

            {/* My Saved Payments */}
            <button
              type="button"
              onClick={() => setActiveTab("payments")}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full ${activeTab === "payments"
                  ? "bg-[#FDE4E4] text-[#E11B1B]"
                  : "bg-neutral-100 text-[#9CA3AF]"
                  }`}
              >
                <CreditCard size={16} />
              </span>
              <span
                className={`text-[10px] whitespace-nowrap font-medium tracking-[0.1em] uppercase ${activeTab === "payments" ? "text-[#E11B1B]" : "text-[#9CA3AF]"
                  }`}
              >
                Saved Payment
              </span>
            </button>

            {/* Invisible placeholder item to maintain exact 1/3 item width distribution */}
            <div className="flex flex-1" aria-hidden="true" />
          </div>
        </div>

        {/* Pagination dots */}
        <div className="mt-2 mb-4 flex justify-center gap-2">
          <span className={`h-1.5 w-4 rounded-full transition-colors ${scrollPage === 0 ? "bg-black" : "bg-neutral-300"}`} />
          <span className={`h-1.5 w-4 rounded-full transition-colors ${scrollPage === 1 ? "bg-black" : "bg-neutral-300"}`} />
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 pb-8 space-y-6">
        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <>
            {/* Profile Section */}
            <section className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <Subheading2 className="text-[18px] font-semibold text-[#111827] normal-case">
                  My Profile
                </Subheading2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex h-9 items-center gap-2 rounded-full bg-black px-4 text-white transition-colors hover:bg-[#111827]"
                >
                  <Edit size={14} />
                  <span className="text-[11px] font-medium uppercase tracking-[0.16em]">
                    Edit
                  </span>
                </button>
              </div>

              {/* User Details */}
              <div className="space-y-4">
                <div>
                  <Caption className="mb-1 text-[11px] uppercase tracking-[0.16em] text-[#9CA3AF]">
                    Full Name
                  </Caption>
                  <Body1 className="text-[14px] font-medium text-[#111827]">
                    Samantha Smith
                  </Body1>
                </div>

                <div>
                  <Caption className="mb-1 text-[11px] uppercase tracking-[0.16em] text-[#9CA3AF]">
                    Email
                  </Caption>
                  <div className="flex items-center gap-2">
                    <Body1 className="text-[14px] font-medium text-[#111827]">
                      smantha@gmail.com
                    </Body1>
                    <span className="rounded-full bg-[#E8F5E9] px-3 py-1 text-[10px] font-semibold text-[#2E7D32]">
                      Verified
                    </span>
                  </div>
                </div>

                <div>
                  <Caption className="mb-1 text-[11px] uppercase tracking-[0.16em] text-[#9CA3AF]">
                    Mobile Number
                  </Caption>
                  <div className="flex items-center gap-2">
                    <Body1 className="text-[14px] font-medium text-[#111827]">
                      +123 456 7890
                    </Body1>
                    <span className="rounded-full bg-[#FFF4E5] px-3 py-1 text-[10px] font-semibold text-[#C05621]">
                      Not Verified
                    </span>
                  </div>
                </div>

                <div>
                  <Caption className="mb-1 text-[11px] uppercase tracking-[0.16em] text-[#9CA3AF]">
                    Date of Birth
                  </Caption>
                  <Body1 className="text-[14px] font-medium text-[#111827]">
                    12/12/1990
                  </Body1>
                </div>
              </div>
            </section>

            {/* Addresses Section */}
            <section className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="mb-4">
                <Subheading2 className="text-[16px] font-semibold text-[#111827] normal-case">
                  My Addresses
                </Subheading2>
              </div>

              <div className="space-y-3">
                {/* Saved Address */}
                <div className="relative rounded-2xl border border-gray-200 bg-white p-4">
                  {/* Edit/Delete Icons */}
                  <div className="absolute right-3 top-3 flex gap-2">
                    <button
                      className="rounded-full p-1.5 text-gray-500 transition-colors hover:bg-gray-100"
                      aria-label="Edit address"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      className="rounded-full p-1.5 text-gray-500 transition-colors hover:bg-gray-100"
                      aria-label="Delete address"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Home Badge */}
                  <div className="mb-3 inline-flex items-center rounded-full bg-gray-100 px-3 py-1">
                    <Caption className="text-[10px] font-medium uppercase tracking-[0.16em] text-gray-600">
                      Home
                    </Caption>
                  </div>

                  {/* Address Details */}
                  <div className="space-y-1">
                    <Body2 className="text-[13px] text-[#111827]">
                      123 Dreamy Lane, Apt 4B
                    </Body2>
                    <Body2 className="text-[13px] text-[#111827]">
                      Fantasyland, FL 12345
                    </Body2>
                    <Body2 className="text-[13px] text-[#111827]">
                      +1 123-456-7890
                    </Body2>
                  </div>
                </div>

                {/* Add New Address */}
                <button className="mt-1 flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 bg-transparent py-8 transition-colors hover:border-gray-400 hover:bg-gray-50">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-[#6B7280]">
                    <MapPin size={18} />
                  </span>
                  <span className="text-[13px] font-medium text-[#6B7280]">
                    Add New Address
                  </span>
                </button>
              </div>
            </section>
          </>
        )}

        {/* ORDERS TAB */}
        {activeTab === "orders" && (
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between text-[11px] text-[#6D6D6D]">
              <div>
                <p className="mb-1">Order ID</p>
                <p className="flex items-center gap-2 text-[13px] font-semibold text-[#111827]">
                  <span>🛍</span>
                  <span>CTH-89765</span>
                </p>
              </div>
              <div className="text-right">
                <p className="mb-1">Estimated arrival:</p>
                <p className="text-[13px] font-semibold text-[#111827]">
                  20 May, 2025
                </p>
                <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#FDECEC] px-3 py-1 text-[10px] font-semibold text-[#E11B1B]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E11B1B]" />
                  <span>On Deliver</span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-[10px] text-[#6D6D6D]">
                {["Placed", "Shipped", "Out for Delivery", "Delivery"].map(
                  (label, idx) => (
                    <div key={label} className="flex-1 text-center">
                      <div className="mb-2 flex items-center justify-center">
                        <span
                          className={`h-2 w-2 rounded-full ${idx < 3 ? "bg-[#F59E0B]" : "bg-[#E5E7EB]"
                            }`}
                        />
                      </div>
                      <span>{label}</span>
                    </div>
                  )
                )}
              </div>
              <div className="mt-2 h-[2px] w-full rounded-full bg-[#E5E7EB]">
                <div className="h-full w-3/4 rounded-full bg-[#FBBF24]" />
              </div>
            </div>

            {/* Items */}
            <div className="mb-4 space-y-4 border-t border-b border-[#F3F4F6] py-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-16 w-14 flex-shrink-0 overflow-hidden rounded-md bg-neutral-200" />
                  <div className="flex-1 text-[12px] text-[#111827]">
                    <p className="font-semibold tracking-[0.08em] uppercase">
                      Lorem Ipsum
                    </p>
                    <p className="mt-1 text-[#6B7280]">Size: A3</p>
                  </div>
                  <p className="text-[12px] font-medium text-[#111827]">
                    Rs. 399.00
                  </p>
                </div>
              ))}
            </div>

            {/* Total + button */}
            <div className="mb-4 flex items-center justify-between text-[12px] text-[#111827]">
              <div className="flex items-center gap-2">
                <span>🛍</span>
                <span>
                  Total : <span className="font-semibold">Rs. 798.00</span>
                </span>
              </div>
              <span className="text-[#6B7280]">(2 items)</span>
            </div>

            <button className="mt-1 h-11 w-full rounded-full bg-black text-[13px] font-medium text-white">
              Details
            </button>
          </section>
        )}

        {/* COUPONS TAB (placeholder) */}
        {activeTab === "coupons" && (
          <section className="space-y-4">
            {/* Heading */}
            <div className="px-1">
              <Subheading2 className="text-[18px] font-semibold text-[#111827] normal-case">
                My Coupons
              </Subheading2>
            </div>

            {/* Coupon tabs */}
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="mb-3 flex border-b border-[#F3F4F6] text-[13px] font-semibold">
                {[
                  { id: "available", label: "Available" },
                  { id: "used", label: "Used" },
                  { id: "expired", label: "Expired" },
                ].map((tab) => {
                  const isActive = couponTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setCouponTab(tab.id)}
                      className={`relative flex-1 pb-2 text-center ${isActive ? "text-[#E11B1B]" : "text-[#9CA3AF]"
                        }`}
                    >
                      {tab.label}
                      {isActive && (
                        <span className="absolute inset-x-0 -bottom-[1px] mx-auto block h-[2px] w-10 rounded-full bg-[#E11B1B]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Coupon list - mimic Available view from design */}
              {couponTab === "available" && (
                <div className="space-y-3">
                  {/* Auto-applied coupon */}
                  <div className="rounded-xl bg-white px-4 py-3 shadow-[0_4px_12px_rgba(15,23,42,0.04)]">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <p className="text-[13px] font-semibold text-[#111827]">
                          $300 OFF
                        </p>
                        <p className="mt-1 text-[11px] text-[#6B7280]">
                          Flat discount on all Framed Posters
                        </p>
                        <p className="mt-1 text-[10px] text-[#9CA3AF]">
                          On orders above $99
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="inline-flex items-center rounded-full bg-[#E8F5E9] px-3 py-1 text-[10px] font-semibold text-[#2E7D32]">
                          Auto-applied
                        </span>
                        <button className="text-[11px] font-semibold text-[#E11B1B]">
                          View details &gt;
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Code coupon */}
                  <div className="rounded-xl bg-white px-4 py-3 shadow-[0_4px_12px_rgba(15,23,42,0.04)]">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <p className="text-[13px] font-semibold text-[#111827]">
                          FREE SHIPPING
                        </p>
                        <div className="mt-1 inline-flex items-center gap-2 text-[10px]">
                          <span className="text-[#6B7280]">Code:</span>
                          <span className="rounded-md bg-[#EEF2FF] px-2 py-[2px] font-semibold text-[#4F46E5]">
                            SHIPFREE
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] text-[#6B7280]">
                          Flat discount on all Framed Posters
                        </p>
                        <p className="mt-1 text-[10px] text-[#9CA3AF]">
                          On orders above $99
                        </p>
                      </div>
                      <button className="mt-1 text-[11px] font-semibold text-[#111827]">
                        Copy Code
                      </button>
                    </div>
                  </div>

                  {/* Expiring soon coupon */}
                  <div className="rounded-xl bg-white px-4 py-3 shadow-[0_4px_12px_rgba(15,23,42,0.04)]">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <p className="text-[13px] font-semibold text-[#111827]">
                          FREE SHIPPING
                        </p>
                        <p className="mt-1 text-[11px] text-[#6B7280]">
                          Flat discount on all Framed Posters
                        </p>
                        <p className="mt-1 text-[10px] text-[#9CA3AF]">
                          On orders above $99
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="inline-flex items-center rounded-full bg-[#FEF3C7] px-3 py-1 text-[10px] font-semibold text-[#B45309]">
                          Expires in 2 days
                        </span>
                        <button className="text-[11px] font-semibold text-[#E11B1B]">
                          Shop Now &gt;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Simple placeholders for Used / Expired */}
              {couponTab === "used" && (
                <div className="py-6 text-center text-[12px] text-[#9CA3AF]">
                  You have no used coupons yet.
                </div>
              )}
              {couponTab === "expired" && (
                <div className="py-6 text-center text-[12px] text-[#9CA3AF]">
                  You have no expired coupons.
                </div>
              )}
            </div>

            {/* Recently used section */}
            <div className="mt-4 space-y-2 px-1">
              <Caption className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9CA3AF]">
                Recently Used
              </Caption>
              <div className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-[11px] text-[#9CA3AF]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#9CA3AF]">$300 OFF</p>
                    <p className="mt-1">Flat discount on all Framed Posters</p>
                  </div>
                  <p className="text-right">
                    Used on <br />
                    <span className="font-medium text-[#6B7280]">
                      Sep 12, 2023
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
        {/* WALLETS TAB */}
        {activeTab === "wallets" && (
          <div className="space-y-6">
            <Subheading2 className="text-[20px] font-semibold text-[#111827] normal-case px-1">
              My Wallet
            </Subheading2>

            <section className="rounded-2xl bg-white p-6 shadow-sm text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-black">
                <Wallet size={24} fill="currentColor" />
              </div>
              <Caption className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9CA3AF]">
                WALLET BALANCE
              </Caption>
              <div className="mb-4 text-[32px] font-bold text-[#111827]">
                $ 2,450.00
              </div>
              <div className="mb-6 flex items-center justify-center gap-2 text-[11px] text-[#9CA3AF]">
                <Info size={14} className="text-[#9CA3AF]" />
                <span>Usable on all poster and frame orders</span>
              </div>
              <button className="h-12 w-full rounded-md bg-[#E11B1B] text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-700">
                USE WALLET AT CHECKOUT
              </button>
            </section>

            <div className="space-y-4 px-1">
              <Subheading2 className="text-[16px] font-semibold text-[#111827] normal-case">
                Wallet Activity
              </Subheading2>

              <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
                {[
                  {
                    type: "debited",
                    title: "Purchased: Vintage Travel Set",
                    date: "Oct 24 • 2023 • 4:20 PM",
                    amount: "- $20.00",
                    status: "Debited",
                  },
                  {
                    type: "credited",
                    title: "Refund: Vintage Travel Set",
                    date: "Oct 24 • 2023 • 4:20 PM",
                    amount: "+ $20.00",
                    status: "Credited",
                  },
                  {
                    type: "credited",
                    title: "Cashback: Vintage Travel Set",
                    date: "Oct 24 • 2023 • 4:20 PM",
                    amount: "+ $20.00",
                    status: "Credited",
                  },
                  {
                    type: "debited",
                    title: "Purchased: Vintage Travel Set",
                    date: "Oct 24 • 2023 • 4:20 PM",
                    amount: "- $20.00",
                    status: "Debited",
                  },
                  {
                    type: "credited",
                    title: "Added: Vintage Travel Set",
                    date: "Oct 24 • 2023 • 4:20 PM",
                    amount: "+ $20.00",
                    status: "Credited",
                  },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-4 p-4 ${i !== 4 ? 'border-b border-gray-100' : ''}`}>
                    <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gray-200" />
                    <div className="flex-1">
                      <p className="text-[13px] font-medium text-[#111827]">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[11px] text-[#9CA3AF]">
                        {item.date}
                      </p>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <p
                        className={`text-[13px] font-bold ${item.type === "credited" ? "text-green-600" : "text-black"
                          }`}
                      >
                        {item.amount}
                      </p>
                      <p className="mt-1 text-[9px] text-gray-400 capitalize">
                        {item.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PAYMENTS TAB */}
        {activeTab === "payments" && (
          <section className="space-y-6">
            <div className="px-1">
              <Subheading2 className="text-[20px] font-semibold text-[#111827] normal-case">
                My Saved Payments
              </Subheading2>
            </div>

            {/* Secure Payment Storage */}
            <div className="rounded-xl border border-[#E5E7EB] bg-[#F5F9FF] p-4 shadow-sm flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#D6E6FF] text-[#2563EB]">
                <ShieldCheck size={20} />
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-bold text-[#111827]">
                  Secure Payment Storage
                </p>
                <p className="mt-1 text-[10px] leading-relaxed text-[#6B7280]">
                  Your payment details are securely stored and encrypted using industry-standard protocols.
                </p>
              </div>
              <div className="mt-1 flex-shrink-0 text-[#2563EB]">
                <CheckCircle2 size={16} className="fill-[#2563EB] text-white" />
              </div>
            </div>

            {/* Credit and Debit Cards */}
            <div className="px-1 mt-4">
              <Subheading2 className="text-[16px] font-semibold text-[#111827] normal-case mb-4">
                Credit and Debit Cards
              </Subheading2>

              <div className="space-y-4">
                {/* Primary Card */}
                <div className="rounded-xl bg-white p-5 shadow-sm space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-[#B4A06B] mb-2">
                        PRIMARY CARD
                      </p>
                      <div className="flex items-center gap-3 text-[20px] font-bold tracking-[0.1em] text-[#111827]">
                        <span className="flex gap-1 text-[16px]">
                          <span>•</span><span>•</span><span>•</span><span>•</span>
                          <span className="ml-1">•</span><span>•</span><span>•</span><span>•</span>
                          <span className="ml-1">•</span><span>•</span><span>•</span><span>•</span>
                        </span>
                        <span className="text-[18px]">4242</span>
                      </div>
                    </div>
                    <div className="h-8 w-12 rounded bg-neutral-100 flex-shrink-0" />
                  </div>

                  <div className="flex justify-between border-t border-gray-100 pt-3">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-[#B4A06B] mb-1">
                        CARD HOLDER
                      </p>
                      <p className="text-[12px] font-bold uppercase tracking-wide text-[#111827]">
                        JANE DOE
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-[#B4A06B] mb-1">
                        EXPIRES
                      </p>
                      <p className="text-[12px] font-bold tracking-wide text-[#111827]">
                        12/25
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="rounded-full bg-[#E6F8F0] px-3 py-1 text-[9px] font-bold uppercase text-[#10B981]">
                      PRIMARY
                    </span>
                    <button className="text-[11px] font-bold text-[#E11B1B]">
                      Remove
                    </button>
                  </div>
                </div>

                {/* Secondary Card */}
                <div className="rounded-xl bg-white p-5 shadow-sm space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-[#B4A06B] mb-2">
                        PRIMARY CARD
                      </p>
                      <div className="flex items-center gap-3 text-[20px] font-bold tracking-[0.1em] text-[#111827]">
                        <span className="flex gap-1 text-[16px]">
                          <span>•</span><span>•</span><span>•</span><span>•</span>
                          <span className="ml-1">•</span><span>•</span><span>•</span><span>•</span>
                          <span className="ml-1">•</span><span>•</span><span>•</span><span>•</span>
                        </span>
                        <span className="text-[18px]">8839</span>
                      </div>
                    </div>
                    <div className="h-8 w-12 rounded bg-neutral-100 flex-shrink-0" />
                  </div>

                  <div className="flex justify-between border-t border-gray-100 pt-3">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-[#B4A06B] mb-1">
                        CARD HOLDER
                      </p>
                      <p className="text-[12px] font-bold uppercase tracking-wide text-[#111827]">
                        JANE DOE
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-[#B4A06B] mb-1">
                        EXPIRES
                      </p>
                      <p className="text-[12px] font-bold tracking-wide text-[#111827]">
                        12/25
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end pt-2">
                    <button className="text-[11px] font-bold text-[#E11B1B]">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* UPI & Wallets */}
            <div className="px-1 mt-6">
              <Subheading2 className="text-[16px] font-semibold text-[#111827] normal-case mb-4">
                UPI & Wallets
              </Subheading2>

              <div className="rounded-xl bg-white p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-neutral-100 flex-shrink-0" />
                  <div>
                    <p className="text-[13px] font-bold text-[#111827] mb-1">
                      jane.doe@oksdi
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-[#9CA3AF]">
                      <span>Jane Doe</span>
                      <span className="h-2 w-[1px] bg-neutral-300" />
                      <span>UPI ID</span>
                    </div>
                  </div>
                </div>
                <button className="text-[11px] font-bold text-[#E11B1B]">
                  Remove
                </button>
              </div>
            </div>

            {/* Add New Method Button */}
            <div className="px-1 pt-4">
              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#111827] py-4 text-white transition-colors hover:bg-black">
                <PlusCircle size={18} />
                <span className="text-[13px] font-medium">Add New Payment Method</span>
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
