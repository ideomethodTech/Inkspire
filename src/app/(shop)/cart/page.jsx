"use client";

import Image from "next/image";
import Link from "next/link";
import PageWrapper from "@/components/layout/PageWrapper";
import { Headline, Body2, Caption, Label } from "@/components/typography";
import Button from "@/components/ui/Buttons";

const ITEMS = [
  {
    id: 1,
    title: "CAPTAIN AMERICA | MCU POSTER",
    price: 199,
    size: "A3",
    quantity: 1,
    image: "/products/509e4f2b10c9e62dfc885e829716feb3618ae498.jpg",
  },
  {
    id: 2,
    title: "CAPTAIN AMERICA | MCU POSTER",
    price: 199,
    size: "A3",
    quantity: 1,
    image: "/products/4ad9203dd2a598811e58c6fc9a3fca19c5bccd53.jpg",
  },
];

export default function CartPage() {
  const subtotal = ITEMS.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  return (
    <PageWrapper>
      <div className="py-10">
        <Headline className="text-[44px] tracking-[0.16em] text-[#20262B]">
          Your Cart
        </Headline>
        <Caption className="mt-3 text-[11px] uppercase tracking-[0.16em] text-[#6D6D6D]">
          Premium posters, fair prices — inclusive of revised GST
        </Caption>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_420px]">
          {/* Items */}
          <div className="space-y-10">
            {ITEMS.map((item) => (
              <div key={item.id} className="grid gap-6 md:grid-cols-[220px_1fr]">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="220px"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <div>
                    <Body2 className="text-[14px] uppercase tracking-[0.12em] text-[#20262B]">
                      {item.title}
                    </Body2>
                    <Body2 className="mt-2 text-[14px] font-semibold text-[#20262B]">
                      Rs. {item.price.toFixed(2)}
                    </Body2>
                  </div>

                  <div className="grid max-w-sm grid-cols-[70px_1fr] gap-y-2 text-[12px] text-[#20262B]">
                    <span className="text-[#6D6D6D]">Size:</span>
                    <span>{item.size}</span>
                    <span className="text-[#6D6D6D]">Quantity:</span>
                    <span>{item.quantity}</span>
                    <span className="text-[#6D6D6D]">Total</span>
                    <span>Rs.{(item.price * item.quantity).toFixed(2)}</span>
                  </div>

                  <div className="mt-3 inline-flex items-center gap-6 rounded-md border border-neutral-300 px-4 py-3 w-[170px]">
                    <button
                      type="button"
                      aria-label="Remove"
                      className="text-[#E11B1B]"
                    >
                      🗑
                    </button>
                    <span className="text-[#20262B] font-medium">
                      {item.quantity}
                    </span>
                    <button type="button" aria-label="Increase" className="text-[#20262B] text-xl">
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <aside className="space-y-6">
            <div className="border border-neutral-200 bg-white p-8">
              <div className="flex items-start justify-between">
                <Label className="text-[12px] uppercase tracking-[0.16em] text-[#20262B]">
                  Discounts
                </Label>
                <button className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#20262B] underline underline-offset-4">
                  Add
                </button>
              </div>

              <div className="mt-6 space-y-3 text-[13px] text-[#20262B]">
                <div className="flex items-center justify-between">
                  <span className="text-[#6D6D6D]">Order Value</span>
                  <span>Rs.{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6D6D6D]">Estimated delivery fee</span>
                  <span>{deliveryFee === 0 ? "Free" : `Rs.${deliveryFee.toFixed(2)}`}</span>
                </div>
              </div>

              <div className="mt-10 flex items-center justify-between">
                <Label className="text-[12px] uppercase tracking-[0.16em] text-[#20262B]">
                  Total
                </Label>
                <Body2 className="text-[18px] font-semibold text-[#20262B]">
                  Rs.{total.toFixed(2)}
                </Body2>
              </div>

              <Button className="mt-6 h-12 w-full bg-black text-white hover:bg-black uppercase tracking-[0.12em]">
                Continue to checkout
              </Button>

              <Caption className="mt-3 text-center text-[11px] text-[#6D6D6D]">
                Taxes and <span className="underline underline-offset-2">shipping</span> calculated at checkout
              </Caption>

              <div className="mt-6 space-y-3 text-[11px] text-[#6D6D6D]">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#20262B]">UPI</span>
                  <span className="font-semibold text-[#20262B]">VISA</span>
                </div>
                <div>
                  15 days free returns. Read more about{" "}
                  <span className="underline underline-offset-2">return and refund policy</span>.
                </div>
                <div>
                  Need help? Please contact{" "}
                  <span className="underline underline-offset-2">Customer Support</span>.
                </div>
                <div>
                  Customers would receive an SMS/WhatsApp notifications regarding deliveries on the
                  registered phone number.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </PageWrapper>
  );
}
