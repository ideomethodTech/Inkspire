"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search as SearchIcon, SlidersHorizontal } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import { Headline, BodyXS, Caption } from "@/components/typography";

const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "LAND ROVER DEFENDER 130",
    price: 299,
    image: "/products/4ad9203dd2a598811e58c6fc9a3fca19c5bccd53.jpg",
  },
  {
    id: 2,
    title: "LAND ROVER DEFENDER 130",
    price: 299,
    image: "/products/509e4f2b10c9e62dfc885e829716feb3618ae498.jpg",
  },
  {
    id: 3,
    title: "LAND ROVER DEFENDER 130",
    price: 299,
    image: "/products/17049f4fe615334de178b8d8cbe384e4c0f7d28d.jpg",
  },
];

function SearchCard({ product }) {
  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="relative overflow-hidden rounded-md bg-neutral-100">
        <div className="aspect-4/5">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </div>
        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          aria-label="Favorite"
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-sm"
        >
          ♡
        </button>
      </div>
      <div className="pt-3">
        <BodyXS className="uppercase tracking-[0.12em] text-[#20262B]">
          {product.title}
        </BodyXS>
        <Caption className="mt-2 text-[12px] text-[#20262B]">
          Rs. {product.price.toFixed(2)}
        </Caption>
      </div>
    </Link>
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState("car");
  const [sortBy, setSortBy] = useState("default");

  const results = useMemo(() => {
    const filtered = MOCK_PRODUCTS.filter((p) =>
      `${p.title}`.toLowerCase().includes(query.trim().toLowerCase())
    );
    if (sortBy === "price_low") return [...filtered].sort((a, b) => a.price - b.price);
    if (sortBy === "price_high") return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [query, sortBy]);

  return (
    <PageWrapper>
      <div className="py-10">
        <div className="text-center">
          <Headline className="text-[44px] tracking-[0.18em] text-[#20262B]">
            Search Results
          </Headline>
          <div className="mx-auto mt-6 flex max-w-2xl items-center gap-3 rounded-md border border-neutral-300 bg-white px-4 py-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-[14px] outline-none"
              placeholder="Search"
            />
            <SearchIcon size={18} className="text-[#6D6D6D]" />
          </div>
          <Caption className="mt-4 text-[13px] text-[#E11B1B]">
            {results.length} results found for “{query}”
          </Caption>
        </div>

        <div className="mt-14 flex items-center justify-between border-y border-neutral-200 py-4">
          <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.16em] text-[#20262B]">
            <span className="text-[#6D6D6D]">Sort by :</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-[#6D6D6D] outline-none"
            >
              <option value="default">Default</option>
              <option value="price_low">Price, low to high</option>
              <option value="price_high">Price, high to low</option>
            </select>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-[#20262B]"
          >
            <span>Filter</span>
            <SlidersHorizontal size={18} />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-6 lg:grid-cols-3">
          {results.map((p) => (
            <SearchCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

