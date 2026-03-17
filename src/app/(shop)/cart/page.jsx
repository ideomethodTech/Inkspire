"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PageWrapper from "@/components/layout/PageWrapper";
import { Headline, Body2, Label } from "@/components/typography";
import Button from "@/components/ui/Buttons";
import { getCart } from "@/api/cart";

// fallback constant stays here but won't be used
const FALLBACK_ITEMS = [
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
  const [items, setItems] = useState([]); // start empty
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found, user not logged in");
        setLoading(false);
        return;
      }

      try {
        const res = await getCart();
        console.log("Cart API response:", res); // <-- see what the API returns
        if (res?.success && res?.data?.items?.length > 0) {
          setItems(res.data.items);
        } else {
          setItems([]); // empty cart if API has no items
        }
      } catch (err) {
        console.error("Cart fetch error:", err);
        setItems([]); // empty cart on error
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  if (loading) return <div className="p-10">Loading cart...</div>;

  return (
    <PageWrapper>
      <div className="py-10">
        <Headline className="text-[44px] tracking-[0.16em] text-[#20262B]">
          Your Cart
        </Headline>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_420px]">
          {/* Items */}
          <div className="space-y-10">
            {items.length === 0 && <p>Your cart is empty</p>}
            {items.map((item) => (
              <div
                key={item.id || item._id}
                className="grid gap-6 md:grid-cols-[220px_1fr]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Body2 className="text-[14px] uppercase tracking-[0.12em] text-[#20262B]">
                    {item.title}
                  </Body2>
                  <Body2 className="text-[14px] font-semibold text-[#20262B]">
                    Rs. {item.price}
                  </Body2>
                  <div className="text-[12px]">Qty: {item.quantity}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <aside className="space-y-6">
            <div className="border border-neutral-200 bg-white p-8">
              <div className="mt-6 space-y-3 text-[13px] text-[#20262B]">
                <div className="flex items-center justify-between">
                  <span>Order Value</span>
                  <span>Rs.{subtotal}</span>
                </div>
              </div>

              <div className="mt-10 flex items-center justify-between">
                <Label>Total</Label>
                <Body2 className="text-[18px] font-semibold text-[#20262B]">
                  Rs.{total}
                </Body2>
              </div>

              <Button className="mt-6 h-12 w-full bg-black text-white">
                Continue to checkout
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </PageWrapper>
  );
}