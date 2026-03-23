"use client";

import Link from "next/link";
import { BodyXS, Caption } from "@/components/typography";

export default function RelatedProducts({ products, title = "YOU MAY ALSO LIKE" }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="border-t border-neutral-200 pt-8">
      <div className="mb-6 flex items-center justify-between">
        <Caption className="text-[14px] uppercase tracking-[0.16em] text-[#20262B]">
          {title}
        </Caption>
        <button
          type="button"
          className="text-lg text-[#20262B] hover:text-[#6D6D6D] transition-colors"
          aria-label="View more"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.slice(0, 3).map((product) => {
          const productId = product.id || product._id;
          const priceNumber =
            typeof product.price === "number" ? product.price : Number(product.price);
          const hasPrice = Number.isFinite(priceNumber);

          return (
          <Link
            key={productId}
            href={`/products/${productId}`}
            className="group flex flex-col overflow-hidden rounded-md bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08)] transition-transform hover:scale-[1.02]"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-200">
              <img
                src={product.images?.[0] || product.image || "/products/4ad9203dd2a598811e58c6fc9a3fca19c5bccd53.jpg"}
                alt={product.title || "Product"}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  // Handle favorite
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
                  "Product"}
              </Caption>
              <div className="mt-auto">
                <Caption className="text-[11px] font-semibold text-[#20262B]">
                  {hasPrice
                    ? `Rs ${priceNumber.toLocaleString("en-IN")}`
                    : "Price on request"}
                </Caption>
              </div>
            </div>
          </Link>
        )})}
      </div>
    </section>
  );
}
