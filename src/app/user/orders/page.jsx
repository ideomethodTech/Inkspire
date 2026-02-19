"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { Body1, Body2, Caption, Label, Subheading2 } from "@/components/typography";
import Button from "@/components/ui/Buttons";

const ORDERS = [
  {
    id: "CTH-89765",
    eta: "20 May, 2025",
    status: "On Deliver",
    statusColor: "bg-red-500 text-white",
    steps: ["Placed", "Shipped", "Out for Delivery", "Delivery"],
    completedSteps: [0, 1], // Placed and Shipped are completed
    currentStep: 2, // Out for Delivery is current
    items: [
      {
        id: 1,
        title: "LOREM IPSUM",
        size: "A3",
        price: 399,
        image: "/products/509e4f2b10c9e62dfc885e829716feb3618ae498.jpg",
      },
      {
        id: 2,
        title: "LOREM IPSUM",
        size: "A3",
        price: 399,
        image: "/products/4ad9203dd2a598811e58c6fc9a3fca19c5bccd53.jpg",
      },
    ],
  },
  {
    id: "CTH-89766",
    eta: "25 May, 2025",
    status: "Shipped",
    statusColor: "bg-blue-500 text-white",
    steps: ["Placed", "Shipped", "Out for Delivery", "Delivery"],
    completedSteps: [0, 1],
    currentStep: 1,
    items: [
      {
        id: 3,
        title: "LOREM IPSUM",
        size: "A4",
        price: 299,
        image: "/products/509e4f2b10c9e62dfc885e829716feb3618ae498.jpg",
      },
    ],
  },
];

export default function OrdersPage() {
  return (
    <div className="flex-1 space-y-6">
      <Subheading2 className="text-[24px] font-semibold uppercase tracking-[0.1em] text-[#20262B]">
        My Orders
      </Subheading2>
      
      <div className="space-y-6">
        {ORDERS.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

function OrderCard({ order }) {
  const total = order.items.reduce((sum, item) => sum + item.price, 0);

  return (
    <section className="rounded-lg bg-white p-6 shadow-sm">
      {/* Order Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShoppingBag size={20} className="text-[#6D6D6D]" />
          <div>
            <Label className="text-[12px] uppercase tracking-[0.16em] text-[#6D6D6D]">
              Order ID
            </Label>
            <Body2 className="text-[14px] font-medium text-[#20262B]">{order.id}</Body2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Caption className="text-[12px] text-[#6D6D6D] uppercase tracking-[0.16em]">
            Estimated arrival: {order.eta}
          </Caption>
          <span className={`rounded-full px-3 py-1 text-[12px] font-semibold ${order.statusColor}`}>
            {order.status}
          </span>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="relative mb-6">
        <div className="flex items-center justify-between">
          {order.steps.map((step, idx) => {
            const isCompleted = order.completedSteps.includes(idx);
            const isCurrent = idx === order.currentStep;
            return (
              <div key={step} className="flex flex-1 flex-col items-center">
                <div className="relative flex w-full items-center">
                  <div
                    className={`relative z-10 h-3 w-3 rounded-full ${
                      isCompleted || isCurrent
                        ? "bg-orange-500"
                        : "bg-gray-300"
                    }`}
                  >
                    {isCurrent && (
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <div className="relative">
                          <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-red-500" />
                          <div className="rounded bg-red-500 px-2 py-1">
                            <Caption className="text-[10px] font-semibold text-white">
                              {order.status}
                            </Caption>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {idx < order.steps.length - 1 && (
                    <div
                      className={`absolute left-[12px] h-[2px] w-full ${
                        isCompleted ? "bg-orange-500" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
                <Caption className="mt-2 text-[11px] text-[#6D6D6D]">{step}</Caption>
              </div>
            );
          })}
        </div>
      </div>

      {/* Items */}
      <div className="mb-6 space-y-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <div className="relative h-24 w-20 overflow-hidden rounded-md bg-gray-100">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div className="flex-1">
              <Body1 className="text-[14px] font-semibold uppercase tracking-[0.08em] text-[#20262B]">
                {item.title}
              </Body1>
              <Caption className="text-[11px] text-[#6D6D6D]">Size: {item.size}</Caption>
            </div>
            <Body1 className="text-[14px] text-[#20262B]">
              Rs. {item.price.toFixed(2)}
            </Body1>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#20262B]" />
            <div>
              <Body1 className="text-[16px] font-semibold text-[#20262B]">
                Total: Rs. {total.toFixed(2)}
              </Body1>
              <Caption className="text-[11px] text-[#6D6D6D]">
                ({order.items.length} Items)
              </Caption>
            </div>
          </div>
          <Button className="bg-black text-white hover:bg-gray-800 uppercase tracking-[0.08em]">
            Details
          </Button>
        </div>
      </div>
    </section>
  );
}

