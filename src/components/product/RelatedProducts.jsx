"use client";

import Link from "next/link";
import Image from "next/image";
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
        {products.slice(0, 3).map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group flex flex-col overflow-hidden rounded-md bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08)] transition-transform hover:scale-[1.02]"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-200">
              <Image
                src={product.images?.[0] || product.image}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
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
                {product.title}
              </BodyXS>
              <Caption className="mb-3 text-[11px] uppercase tracking-[0.16em] text-[#6D6D6D]">
                {product.artist || "Artist"}
              </Caption>
              <div className="mt-auto">
                <Caption className="text-[11px] font-semibold text-[#20262B]">
                  Rs {product.price.toLocaleString("en-IN")}
                </Caption>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

