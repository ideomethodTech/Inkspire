"use client";

import Link from "next/link";
import Button from "@/components/ui/Buttons";
import { BodyXS, Caption } from "@/components/typography";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-md bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08)] transition-transform hover:scale-[1.02]"
    >
      <div className="relative aspect-3/4 overflow-hidden bg-neutral-200">
        <img
          src={product.image}
          alt={product.title}
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
          {product.title}
        </BodyXS>

        <Caption className="mb-3 text-[11px] uppercase tracking-[0.16em] text-[#6D6D6D]">
          {product.artist}
        </Caption>

        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <Caption className="text-[11px] uppercase tracking-[0.16em] text-[#6D6D6D]">
              24&quot; x 36&quot; print
            </Caption>
            <Caption className="text-[11px] font-semibold text-[#20262B]">
              Rs {product.price.toLocaleString("en-IN")}
            </Caption>
          </div>

          <Button
            size="sm"
            className="h-8 px-3 text-[10px]"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </Link>
  );
}
