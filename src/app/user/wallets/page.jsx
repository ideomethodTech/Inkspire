"use client";

import { Wallet, CalendarDays } from "lucide-react";
import { Body1, Body2, Caption, Label, Subheading2 } from "@/components/typography";
import Button from "@/components/ui/Buttons";

export default function WalletsPage() {
  const balance = 2450.0;
  const activity = [
    {
      id: 1,
      title: "Purchased: Vintage Travel Set",
      date: "Oct 24 • 2023 • 4:20 PM",
      amount: -20,
      note: "Credited",
    },
    {
      id: 2,
      title: "Refund for order #PS1021",
      date: "Oct 24 • 2023 • 4:20 PM",
      amount: 20,
      note: "Credited",
    },
    {
      id: 3,
      title: "Wallet Top-up",
      date: "Oct 24 • 2023 • 4:20 PM",
      amount: 200,
      note: "Credited",
    },
    {
      id: 4,
      title: "Purchased: Abstract Geometry",
      date: "Oct 24 • 2023 • 4:20 PM",
      amount: -20,
      note: "Credited",
    },
    {
      id: 5,
      title: "Refund for order #PS1021",
      date: "Oct 24 • 2023 • 4:20 PM",
      amount: 20,
      note: "Credited",
    },
  ];

  return (
    <div className="flex-1 space-y-6">
      {/* Page header */}
      <div>
        <Subheading2 className="text-[28px] font-semibold text-[#20262B] normal-case">
          My Wallet
        </Subheading2>
        <Caption className="mt-2 text-[14px] text-[#6D6D6D]">
          Manage your balance and view transaction history
        </Caption>
      </div>

      {/* Balance card */}
      <section className="rounded-lg border border-neutral-200 bg-white p-10 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
            <Wallet size={18} className="text-[#20262B]" />
          </div>
          <Caption className="text-[12px] uppercase tracking-[0.16em] text-[#6D6D6D]">
            Wallet Balance
          </Caption>
          <div className="mt-3 text-[44px] font-semibold text-[#20262B]">
            ${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
          <div className="mt-2 flex items-center gap-2 text-[#6D6D6D]">
            <span className="h-2 w-2 rounded-full bg-neutral-300" />
            <Caption className="text-[12px] text-[#6D6D6D]">
              Usable on all poster and frame orders
            </Caption>
          </div>

          <Button className="mt-8 h-12 w-full max-w-sm bg-[#E11B1B] text-white hover:bg-[#E11B1B] uppercase tracking-[0.12em]">
            Use Wallet At Checkout
          </Button>
        </div>
      </section>

      {/* Activity */}
      <section className="pt-4">
        <div className="mb-4 flex items-center justify-between">
          <Body1 className="text-[18px] font-semibold text-[#20262B]">
            Wallet Activity
          </Body1>
          <div className="flex items-center gap-2 text-[#6D6D6D]">
            <CalendarDays size={16} />
            <Caption className="text-[12px] text-[#6D6D6D]">Last 30 days</Caption>
          </div>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-white shadow-sm">
          {activity.map((row, idx) => {
            const positive = row.amount > 0;
            return (
              <div
                key={row.id}
                className={`flex items-center justify-between gap-6 px-6 py-5 ${
                  idx !== 0 ? "border-t border-neutral-200" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-neutral-200" />
                  <div>
                    <Body2 className="text-[14px] font-medium text-[#20262B]">
                      {row.title}
                    </Body2>
                    <Caption className="mt-1 text-[12px] text-[#6D6D6D]">
                      {row.date}
                    </Caption>
                  </div>
                </div>

                <div className="text-right">
                  <Body2
                    className={`text-[14px] font-semibold ${
                      positive ? "text-green-600" : "text-[#20262B]"
                    }`}
                  >
                    {positive ? "+" : "-"} ${Math.abs(row.amount).toFixed(2)}
                  </Body2>
                  <Caption className="mt-1 text-[12px] text-[#B6B6B6]">
                    {row.note}
                  </Caption>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-6 text-center">
          <button
            type="button"
            className="text-[13px] font-semibold text-[#E11B1B] hover:underline"
          >
            View all Transactions →
          </button>
        </div>
      </section>
    </div>
  );
}

