"use client";

import { useMemo, useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import { Headline, BodyXS, Caption } from "@/components/typography";
import Button from "@/components/ui/Buttons";
import { MOCK_PRODUCTS } from "@/lib/constants/products";
import ProductCard from "@/components/product/ProductCard";

const PRICE_MIN = 249;
const PRICE_MAX = 13499;

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState("relevance");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);

  const products = useMemo(() => {
    const withinPrice = MOCK_PRODUCTS.filter(
      (p) => p.price >= PRICE_MIN && p.price <= maxPrice
    );

    if (sortBy === "price_low") {
      return [...withinPrice].sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price_high") {
      return [...withinPrice].sort((a, b) => b.price - a.price);
    }

    return withinPrice;
  }, [maxPrice, sortBy]);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <PageWrapper>
      {/* ================= HERO ================= */}
      <section className="overflow-hidden rounded-md bg-black">
        <div className="relative h-[220px] w-full sm:h-[260px] lg:h-[300px]">
          <div className="absolute inset-0 grid grid-cols-3 gap-[1px] bg-black/60">
            <img
              src="/products/bca506c86a8dad71a1b3a689782da771d840d837.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
            <img
              src="/products/1c6540e18f87aa8ce99ce8700032284d7b109514.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
            <img
              src="/products/26e6a3825387988c278987e107aaf10eaf998ac1.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative z-10 flex h-full flex-col items-center justify-center bg-gradient-to-b from-black/60 via-black/50 to-black/70 px-6 text-center text-white">
            <Headline className="mb-2 text-[24px] font-semibold tracking-[0.3em]">
              Heroes, Assemble
            </Headline>
            <Caption className="uppercase tracking-[0.2em] text-neutral-200">
              Curated character posters & prints
            </Caption>
          </div>

          <div className="absolute bottom-0 left-1/2 z-30 -translate-x-1/2 translate-y-1/2">
            <button
              onClick={scrollToBottom}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                ↓
              </span>
            </button>
          </div>
        </div>
      </section>

      <section className="my-4 flex items-center justify-between border-y border-neutral-200 py-3 text-[11px] uppercase tracking-[0.16em] text-[#6D6D6D]">
        <div className="flex items-center gap-2">
          <span>SORT BY |</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="cursor-pointer bg-transparent uppercase outline-none"
          >
            <option value="relevance">Default</option>
            <option value="price_low">Price Low</option>
            <option value="price_high">Price High</option>
          </select>
        </div>
        <button
          type="button"
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 transition-colors hover:text-black"
        >
          <span>FILTER</span>
          <span className="text-[14px] leading-none text-black">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
          </span>
        </button>
      </section>

      {/* ================= PRODUCTS GRID ================= */}
      <section className="mt-6">
        <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-6 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ================= FILTER MODAL ================= */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-4">
          {/* modal unchanged */}
        </div>
      )}
    </PageWrapper>
  );
}
