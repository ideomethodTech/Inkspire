"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search as SearchIcon, SlidersHorizontal } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import { Headline, BodyXS, Caption } from "@/components/typography";
import { searchProducts } from "@/services";

const FALLBACK_IMAGE =
  "/products/4ad9203dd2a598811e58c6fc9a3fca19c5bccd53.jpg";

function SearchCard({ product }) {
  const image = product.image || product.images?.[0] || FALLBACK_IMAGE;
  return (
    <Link href={`/products/${product.id || product._id}`} className="group">
      <div className="relative overflow-hidden rounded-md bg-neutral-100">
        <div className="aspect-4/5">
          <img
            src={image}
            alt={product.title || product.name || "Product"}
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
          {product.title || product.name || "Product"}
        </BodyXS>
        <Caption className="mt-2 text-[12px] text-[#20262B]">
          Rs. {Number(product.price || 0).toFixed(2)}
        </Caption>
      </div>
    </Link>
  );
}

export default function SearchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState("default");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const term = query.trim();
    if (term.length === 0) {
      setResults([]);
      setError("");
      return;
    }

    let active = true;
    const loadResults = async () => {
      try {
        setLoading(true);
        const { products } = await searchProducts(term);
        if (!active) return;
        setResults(products || []);
        setError("");
      } catch (err) {
        if (!active) return;
        setError("Unable to load search results.");
        setResults([]);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadResults();

    return () => {
      active = false;
    };
  }, [query]);

  const sortedResults = useMemo(() => {
    const list = [...results];
    if (sortBy === "price_low") return list.sort((a, b) => a.price - b.price);
    if (sortBy === "price_high") return list.sort((a, b) => b.price - a.price);
    return list;
  }, [results, sortBy]);

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      const term = query.trim();
      if (term.length > 0) {
        router.push(`/search?q=${encodeURIComponent(term)}`);
      }
    }
  };

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
              onKeyDown={handleSearchSubmit}
              className="w-full bg-transparent text-[14px] outline-none"
              placeholder="Search"
            />
            <SearchIcon size={18} className="text-[#6D6D6D]" />
          </div>
          <Caption className="mt-4 text-[13px] text-[#E11B1B]">
            {loading
              ? "Searching..."
              : `${sortedResults.length} results found for “${query}”`}
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
          {!loading && error && (
            <Caption className="text-[12px] text-[#6D6D6D]">{error}</Caption>
          )}
          {!loading && !error && sortedResults.length === 0 && (
            <Caption className="text-[12px] text-[#6D6D6D]">
              No results found.
            </Caption>
          )}
          {sortedResults.map((p) => (
            <SearchCard key={p.id || p._id} product={p} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
