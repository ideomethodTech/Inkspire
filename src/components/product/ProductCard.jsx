"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "@/components/ui/Buttons";
import { BodyXS, Caption } from "@/components/typography";
import { addToCart } from "@/api/cart";

export default function ProductCard({ product }) {
  const productId = product.id || product._id;
  const priceNumber =
    typeof product.price === "number" ? product.price : Number(product.price);
  const hasPrice = Number.isFinite(priceNumber);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!productId) return;

    const token =
      typeof window !== "undefined" ? window.localStorage.getItem("token") : null;
    if (!token) {
      alert("Please sign in to add items to cart.");
      return;
    }

    setAdding(true);
    setAdded(false);
    try {
      const variants = Array.isArray(product.variants) ? product.variants : [];
      const variantIndex = variants.length > 0 ? 0 : 0;
      const res = await addToCart({ productId, variantIndex, quantity: 1 });
      if (res?.success) {
        setAdded(true);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("cart:updated"));
        }
      }
    } catch (err) {
      console.error("Add to cart failed", err);
    } finally {
      setAdding(false);
    }
  };

  return (
    <Link
      href={`/products/${productId}`}
      className="group flex flex-col overflow-hidden rounded-md bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08)] transition-transform hover:scale-[1.02]"
    >
      <div className="relative aspect-3/4 overflow-hidden bg-neutral-200">
        <img
          src={product.image || (product.images && product.images[0]) || "/products/4ad9203dd2a598811e58c6fc9a3fca19c5bccd53.jpg"}
          alt={product.title || "Product"}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
          }}
          aria-label="Favorite"
          className="absolute right-3 top-3 h-7 w-7 rounded-full bg-white/90 text-[10px] font-semibold uppercase tracking-wide shadow-sm hover:bg-white transition-colors"
        >
          ♥
        </button>
      </div>

      <div className="flex flex-1 flex-col px-3 py-3">
        <BodyXS className="mb-1 line-clamp-2 uppercase tracking-[0.08em] text-[#20262B]">
          {product.title || product.name || "Untitled"}
        </BodyXS>

        <Caption className="mb-3 text-[11px] uppercase tracking-[0.16em] text-[#6D6D6D]">
          {product.artist ||
            product.brand ||
            product.creator ||
            product.category ||
            product.type ||
            ""}
        </Caption>

        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <Caption className="text-[11px] uppercase tracking-[0.16em] text-[#6D6D6D]">
              24&quot; x 36&quot; print
            </Caption>
            <Caption className="text-[11px] font-semibold text-[#20262B]">
              {hasPrice ? `Rs ${priceNumber.toLocaleString("en-IN")}` : "Price on request"}
            </Caption>
          </div>

          <Button
            size="sm"
            className="h-8 px-3 text-[10px]"
            onClick={handleAddToCart}
          >
            {adding ? "Adding..." : added ? "Added" : "Add to cart"}
          </Button>
        </div>
      </div>
    </Link>
  );
}
