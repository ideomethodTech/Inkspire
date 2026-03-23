"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageWrapper from "@/components/layout/PageWrapper";
import { Headline, Body2, Label } from "@/components/typography";
import Button from "@/components/ui/Buttons";
import {
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "@/api/cart";
import { getProductById } from "@/services";

const FALLBACK_IMAGE =
  "/products/4ad9203dd2a598811e58c6fc9a3fca19c5bccd53.jpg";

const normalizeCartItems = (rawItems = []) => {
  return rawItems.map((item, index) => {
    const product = item.product || item;
    const productId = item.productId || product.id || product._id || item.id;
    const variantIndex =
      typeof item.variantIndex === "number" ? item.variantIndex : 0;
    const variant = product?.variants?.[variantIndex];
    const price = item.price ?? variant?.price ?? product?.price ?? 0;
    const size = item.size || variant?.size || "N/A";
    const image = product?.images?.[0] || item.image || FALLBACK_IMAGE;
    const title = product?.name || product?.title || item.title || "Product";
    const quantity = item.quantity ?? 1;

    return {
      id: `${productId || "item"}-${variantIndex}-${index}`,
      productId,
      variantIndex,
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
  const cache = new Map();

  const enriched = await Promise.all(
    normalized.map(async (item) => {
      if (!item.productId) return item;
      const needsProduct =
        item.price === 0 ||
        item.title === "Product" ||
        item.image === FALLBACK_IMAGE;
      if (!needsProduct) return item;

      if (!cache.has(item.productId)) {
        cache.set(item.productId, getProductById(item.productId));
      }

      try {
        const product = await cache.get(item.productId);
        const variants = Array.isArray(product?.variants) ? product.variants : [];
        const variant = variants[item.variantIndex] || variants[0];
        return {
          ...item,
          title: product?.title || product?.name || item.title,
          image: product?.images?.[0] || item.image || FALLBACK_IMAGE,
          price: item.price || variant?.price || product?.price || item.price,
          size: item.size || variant?.size || item.size,
        };
      } catch (err) {
        console.warn("Failed to enrich cart item", err);
        return item;
      }
    })
  );

  return enriched;
};

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const emitCartUpdate = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cart:updated"));
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
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
        const apiItems = res?.data?.items || res?.items || [];
        if (res?.success && apiItems.length > 0) {
          const hydrated = await enrichCartItems(apiItems);
          setItems(hydrated);
          setError("");
          emitCartUpdate();
        } else {
          setItems([]);
          emitCartUpdate();
        }
      } catch (err) {
        console.error("Cart fetch error:", err);
        setItems([]);
        setError("Unable to load cart.");
        emitCartUpdate();
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  const handleQuantityChange = async (item, nextQty) => {
    if (!item.productId || nextQty < 1) return;
    try {
      const res = await updateCartItem({
        productId: item.productId,
        variantIndex: item.variantIndex,
        quantity: nextQty,
      });
      if (res?.success) {
        setItems((prev) =>
          prev.map((it) =>
            it.id === item.id ? { ...it, quantity: nextQty } : it
          )
        );
        emitCartUpdate();
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
        variantIndex: item.variantIndex,
      });
      if (res?.success) {
        setItems((prev) => prev.filter((it) => it.id !== item.id));
        emitCartUpdate();
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

              <Button
                className="mt-6 h-12 w-full bg-black text-white"
                onClick={() => router.push("/checkout")}
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
