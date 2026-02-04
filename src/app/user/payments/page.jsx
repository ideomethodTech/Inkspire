"use client";

import { Lock, CheckCircle2, Plus } from "lucide-react";
import { Body1, Body2, Caption, Label, Subheading2 } from "@/components/typography";
import Button from "@/components/ui/Buttons";

const PAYMENTS = [
  {
    type: "Credit/Debit Card",
    last4: "4242",
    name: "Jane Doe",
    expiry: "12/25",
    primary: true,
  },
  {
    type: "Credit/Debit Card",
    last4: "8839",
    name: "Jane Doe",
    expiry: "12/25",
    primary: false,
  },
];

const UPI = [
  {
    id: 1,
    upi: "jane.doe@oksdi",
    name: "Jane Doe",
    label: "UPI ID",
  },
];

export default function PaymentsPage() {
  return (
    <div className="flex-1 space-y-6">
      {/* Page header */}
      <div>
        <Subheading2 className="text-[28px] font-semibold text-[#20262B] normal-case">
          My Saved Payments
        </Subheading2>
        <Caption className="mt-2 text-[14px] text-[#6D6D6D]">
          Manage your cards and payments methods for faster checkout
        </Caption>
      </div>

      {/* Secure storage banner */}
      <div className="flex items-center justify-between gap-4 rounded-lg border border-blue-200 bg-blue-50 px-5 py-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <Lock size={18} className="text-blue-600" />
          </div>
          <div>
            <Body2 className="text-[14px] font-semibold text-[#20262B]">
              Secure Payment Storage
            </Body2>
            <Caption className="mt-1 text-[12px] text-[#6D6D6D]">
              Your payment details are securely stored and encrypted using industry-standard protocols.
              We never store your CVV.
            </Caption>
          </div>
        </div>
        <CheckCircle2 size={20} className="text-blue-600" />
      </div>

      {/* Cards */}
      <section className="space-y-4 pt-2">
        <Body1 className="text-[18px] font-semibold text-[#20262B]">
          Credit and Debit Cards
        </Body1>

        {PAYMENTS.map((payment) => (
          <div key={payment.last4} className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-12 rounded-md bg-neutral-100" />
                <div>
                  <div className="flex items-center gap-4">
                    <div className="text-[22px] font-semibold tracking-[0.06em] text-[#20262B]">
                      •••• •••• •••• {payment.last4}
                    </div>
                    {payment.primary && (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-green-700">
                        Primary
                      </span>
                    )}
                  </div>
                  <Caption className="mt-2 text-[12px] text-[#6D6D6D]">
                    {payment.name} <span className="mx-2 text-neutral-300">|</span> Expires {payment.expiry}
                  </Caption>
                </div>
              </div>

              <button type="button" className="text-[13px] font-semibold text-[#E11B1B] hover:underline">
                Remove
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* UPI */}
      <section className="space-y-4 pt-6">
        <Body1 className="text-[18px] font-semibold text-[#20262B]">
          UPI & Wallets
        </Body1>

        {UPI.map((u) => (
          <div key={u.id} className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-12 rounded-md bg-neutral-100" />
                <div>
                  <div className="text-[18px] font-semibold text-[#20262B]">{u.upi}</div>
                  <Caption className="mt-2 text-[12px] text-[#6D6D6D]">
                    {u.name} <span className="mx-2 text-neutral-300">|</span> {u.label}
                  </Caption>
                </div>
              </div>
              <button type="button" className="text-[13px] font-semibold text-[#E11B1B] hover:underline">
                Remove
              </button>
            </div>
          </div>
        ))}
      </section>

      <div className="pt-6">
        <Button className="h-14 w-full max-w-md bg-black text-white hover:bg-black">
          <span className="inline-flex items-center justify-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
              <Plus size={16} />
            </span>
            <span className="uppercase tracking-[0.12em]">Add New Payment Method</span>
          </span>
        </Button>
      </div>
    </div>
  );
}

