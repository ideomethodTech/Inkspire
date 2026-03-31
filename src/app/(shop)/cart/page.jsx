"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import PageWrapper from "@/components/layout/PageWrapper";
import { Headline, Body2, Label, Caption } from "@/components/typography";
import Button from "@/components/ui/Buttons";
import {
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "@/api/cart";
import { getProductById } from "@/services";
import { useCoupons } from "@/lib/hooks/useCoupons";

const FALLBACK_IMAGE =
  "/products/4ad9203dd2a598811e58c6fc9a3fca19c5bccd53.jpg";

const normalizeCartItems = (rawItems = []) => {
  return rawItems.map((item, index) => {
    // Handling backend specific fields like productName, productImage, variantPrice
    const productId = item.productId;
    const title = item.productName || "Product";
    const image = item.productImage || FALLBACK_IMAGE;
    const price = item.variantPrice || 0;
    const size = item.variant || "N/A";
    const quantity = item.quantity ?? 1;

    return {
      id: `${productId || "item"}-${index}`,
      productId,
      title,
      price,
      size,
      quantity,
      image,
    };
  });
};

const enrichCartItems = async (rawItems = []) => {
  const normalized = normalizeCartItems(rawItems);
  // Optional: Add further enrichment if backend fields are incomplete
  return normalized;
};

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const { 
    applyCoupon, 
    appliedCoupon, 
    removeCoupon, 
    error: couponError, 
    loading: couponLoading 
  } = useCoupons();
  const [couponCode, setCouponCode] = useState("");

  const emitCartUpdate = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cart:updated"));
    }
  };

  const fetchCart = useCallback(async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      console.warn("No token found, user not logged in");
      setItems([]);
      setError("Please sign in to view your cart.");
      setLoading(false);
      return;
    }

    try {
      const res = await getCart();
      const data = res?.data || res || null;
      const apiItems = data?.items || [];
      
      if (res?.success && apiItems.length > 0) {
        const hydrated = await enrichCartItems(apiItems);
        setItems(hydrated);
        setApiData(data);
        setError("");
        emitCartUpdate();
      } else {
        setItems([]);
        setApiData(null);
        emitCartUpdate();
      }
    } catch (err) {
      console.error("Cart fetch error:", err);
      setItems([]);
      setApiData(null);
      setError("Unable to load cart.");
      emitCartUpdate();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const subtotal = useMemo(() => {
    if (apiData && Number.isFinite(apiData.total)) return apiData.total;
    return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }, [items, apiData]);

  const discount = useMemo(() => {
    if (apiData && Number.isFinite(apiData.discountAmount)) return apiData.discountAmount;
    return 0;
  }, [apiData]);

  const total = useMemo(() => {
    if (apiData && Number.isFinite(apiData.discountedTotal)) return apiData.discountedTotal;
    if (apiData && Number.isFinite(apiData.total)) return apiData.total;
    return subtotal - discount;
  }, [apiData, subtotal, discount]);

  const handleApplyCoupon = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    const orderTotal = subtotal;
    const code = couponCode.trim();
    try {
      const res = await applyCoupon(code, orderTotal);
      setCouponCode("");
      if (res) {
        fetchCart(); 
      }
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      await removeCoupon();
      fetchCart(); 
    } catch (err) {
      console.error("Failed to remove coupon", err);
    }
  };

  const handleQuantityChange = async (item, nextQty) => {
    if (!item.productId || nextQty < 1) return;
    try {
      const res = await updateCartItem({
        productId: item.productId,
        quantity: nextQty,
      });
      if (res?.success) {
        setItems((prev) =>
          prev.map((it) =>
            it.id === item.id ? { ...it, quantity: nextQty } : it
          )
        );
        fetchCart(); 
      }
    } catch (err) {
      console.error("Failed to update cart item", err);
    }
  };

  const handleRemoveItem = async (item) => {
    if (!item.productId) return;
    try {
      const res = await removeCartItem({
        productId: item.productId,
      });
      if (res?.success) {
        setItems((prev) => prev.filter((it) => it.id !== item.id));
        fetchCart(); 
      }
    } catch (err) {
      console.error("Failed to remove cart item", err);
    }
  };

  const handleClearCart = async () => {
    try {
      const res = await clearCart();
      if (res?.success) {
        setItems([]);
        setApiData(null);
        emitCartUpdate();
      }
    } catch (err) {
      console.error("Failed to clear cart", err);
    }
  };

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
            {items.length === 0 && (
              <p className="text-sm text-neutral-500">
                {error || "Your cart is empty"}
              </p>
            )}
            {items.map((item) => (
              <div
                key={item.id}
                className="grid gap-6 md:grid-cols-[220px_1fr]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Body2 className="text-[14px] uppercase tracking-[0.12em] text-[#20262B]">
                    {item.title}
                  </Body2>
                  <Body2 className="text-[14px] font-semibold text-[#20262B]">
                    Rs. {item.price}
                  </Body2>
                  <div className="text-[12px] text-neutral-500">
                    Size: {item.size}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        handleQuantityChange(item, Math.max(1, item.quantity - 1))
                      }
                      className="h-8 w-8 rounded-full border border-neutral-300 text-sm"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="min-w-[2ch] text-center text-sm">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(item, item.quantity + 1)}
                      className="h-8 w-8 rounded-full border border-neutral-300 text-sm"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item)}
                      className="ml-4 text-[11px] uppercase tracking-[0.16em] text-neutral-500 hover:text-black"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <aside className="space-y-6">
            <div className="border border-neutral-200 bg-white p-8">
              {/* Coupon Section */}
              <div className="mb-6 border-b border-neutral-100 pb-6">
                <Label className="mb-3 block text-[12px] uppercase tracking-wider">Apply Coupon</Label>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 border border-neutral-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  <button
                    type="submit"
                    disabled={couponLoading}
                    className="bg-black px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-white disabled:bg-neutral-300"
                  >
                    Apply
                  </button>
                </form>
                {couponError && <p className="mt-2 text-[11px] text-red-500">{couponError}</p>}
                {(appliedCoupon || apiData?.appliedCoupon) && (
                  <div className="mt-3 flex items-center justify-between rounded bg-green-50 p-2 text-[11px] text-green-700">
                    <span>
                      Coupon <strong>{apiData?.appliedCoupon || appliedCoupon?.code}</strong>{" "}
                      applied!
                    </span>
                    <button onClick={handleRemoveCoupon} className="font-bold underline">Remove</button>
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-3 text-[13px] text-[#20262B]">
                <div className="flex items-center justify-between">
                  <span>Order Value</span>
                  <span>Rs.{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between text-green-600 font-medium">
                    <span>Coupon Discount</span>
                    <span>- Rs.{discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="mt-10 flex items-center justify-between">
                <Label>Total</Label>
                <Body2 className="text-[18px] font-semibold text-[#20262B]">
                  Rs.{total.toFixed(2)}
                </Body2>
              </div>

              {discount > 0 && (
                <div className="mt-4 rounded-md bg-green-50 p-3 text-center">
                  <Caption className="text-[12px] font-medium text-green-700">
                    You saved Rs.{discount.toFixed(2)} on this order! 🎉
                  </Caption>
                </div>
              )}

              <Button
  className={`mt-6 h-12 w-full ${
    items.length === 0
      ? "bg-neutral-300 cursor-not-allowed"
      : "bg-black text-white"
  }`}
  onClick={() => {
    if (items.length > 0) {
      router.push("/checkout");
    }
  }}
  disabled={items.length === 0}
>
  Continue to checkout
</Button>
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearCart}
                  className="mt-4 w-full text-[11px] uppercase tracking-[0.16em] text-neutral-500 hover:text-black"
                >
                  Clear cart
                </button>
              )}
            </div>
          </aside>
        </div>
      </div>
    </PageWrapper>
  );
}
