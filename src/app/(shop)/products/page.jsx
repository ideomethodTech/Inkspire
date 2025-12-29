// Products Listing Page
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PageWrapper from "@/components/layout/PageWrapper";
import { Headline, BodyXS, Caption } from "@/components/typography";
import Button from "@/components/ui/Buttons";

const PRICE_MIN = 249;
const PRICE_MAX = 13499;

const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "Lone Rider Defender 100",
    artist: "Ale P",
    price: 6999,
    image:
      "/products/4ad9203dd2a598811e58c6fc9a3fca19c5bccd53.jpg",
  },
  {
    id: 2,
    title: "Lone Rider Defender 102",
    artist: "Ale P",
    price: 8499,
    image:
      "/products/509e4f2b10c9e62dfc885e829716feb3618ae498.jpg",
  },
  {
    id: 3,
    title: "Armor Protocol 204",
    artist: "Ale P",
    price: 11999,
    image:
      "/products/17049f4fe615334de178b8d8cbe384e4c0f7d28d.jpg",
  },
  {
    id: 4,
    title: "Spider Vigil 108",
    artist: "Ale P",
    price: 4999,
    image:
      "/products/4ad9203dd2a598811e58c6fc9a3fca19c5bccd53.jpg",
  },
  {
    id: 5,
    title: "Titan Gaze 301",
    artist: "Ale P",
    price: 9499,
    image:
      "/products/509e4f2b10c9e62dfc885e829716feb3618ae498.jpg",
  },
  {
    id: 6,
    title: "Inferno Forge 212",
    artist: "Ale P",
    price: 6499,
    image:
      "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 7,
    title: "Web City 410",
    artist: "Ale P",
    price: 5499,
    image:
      "/products/4ad9203dd2a598811e58c6fc9a3fca19c5bccd53.jpg",
  },
  {
    id: 8,
    title: "Trickster Glow 122",
    artist: "Ale P",
    price: 7499,
    image:
      "/products/509e4f2b10c9e62dfc885e829716feb3618ae498.jpg",
  },
  {
    id: 9,
    title: "Shield Sentinel 099",
    artist: "Ale P",
    price: 5999,
    image:
      "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 10,
    title: "Storm Herald 207",
    artist: "Ale P",
    price: 10499,
    image:
      "/products/4ad9203dd2a598811e58c6fc9a3fca19c5bccd53.jpg",
  },
  {
    id: 11,
    title: "Cosmic Tyrant 305",
    artist: "Ale P",
    price: 12999,
    image:
      "/products/509e4f2b10c9e62dfc885e829716feb3618ae498.jpg",
  },
  {
    id: 12,
    title: "Loki Variant 402",
    artist: "Ale P",
    price: 7999,
    image:
      "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-md bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08)] transition-transform hover:scale-[1.02]"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-200">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
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
              // Handle add to cart
            }}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </Link>
  );
}

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

      <section className="overflow-hidden rounded-md bg-black ">
        <div className="relative h-[220px] w-full sm:h-[260px] lg:h-[300px]">
          <div className="absolute inset-0 grid grid-cols-3 gap-[1px] bg-black/60">
            {/* <div className="bg-[url('/window.svg')] bg-cover bg-center" />
            <div className="bg-[url('/globe.svg')] bg-cover bg-center" />
            <div className="bg-[url('/file.svg')] bg-cover bg-center" /> */}
            <img
              src={"/products/bca506c86a8dad71a1b3a689782da771d840d837.jpg"}
              alt={"alt"}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <img
              src={"/products/1c6540e18f87aa8ce99ce8700032284d7b109514.jpg"}
              alt={"alt"}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <img
              src={"/products/26e6a3825387988c278987e107aaf10eaf998ac1.jpg"}
              alt={"alt"}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
          <div className="relative z-10 flex h-full flex-col items-center justify-center bg-gradient-to-b from-black/60 via-black/50 to-black/70 px-6 text-center text-white">
            <Headline className="mb-2 text-[24px] font-semibold tracking-[0.3em]">
              Heroes, Assemble
            </Headline>
            <Caption className="uppercase tracking-[0.2em] text-neutral-200">
              Curated character posters &amp; prints
            </Caption>
          </div>
          <div className="absolute bottom-0 left-1/2 z-30 -translate-x-1/2 translate-y-1/2">
            <button
              type="button"
              onClick={scrollToBottom} // or scrollToBottom
              aria-label="Scroll down"
              className="group flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black transition-transform ">
                <span className="text-white text-sm">↓</span>
              </span>
            </button>
          </div>
        </div>
      </section>

      <section className="mt-8 flex items-center justify-between gap-4 border-y border-neutral-200 my-3 py-3 text-[11px] uppercase tracking-[0.16em] text-[#6D6D6D]">
        <div className="flex items-center gap-2">
          <span>Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border-b border-dotted border-neutral-400 bg-transparent pb-[1px] text-[11px] uppercase tracking-[0.16em] text-[#20262B] outline-none"
          >
            <option value="relevance">Relevance</option>
            <option value="price_low">Price, low to high</option>
            <option value="price_high">Price, high to low</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="inline-flex items-center gap-2"
          >
            <span>Filter</span>
            <span className="text-[14px] leading-none">+</span>
          </button>
        </div>
      </section>

      <section className="mt-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {isFilterOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-4">
          <div className="flex max-h-[80vh] w-full max-w-3xl flex-col overflow-hidden bg-white">
            <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
              <Caption className="text-[12px] uppercase tracking-[0.16em] text-[#6D6D6D]">
                Filter
              </Caption>
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="text-lg leading-none"
                aria-label="Close filters"
              >
                ×
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="mb-10">
                <BodyXS className="mb-4 uppercase tracking-[0.16em] text-[#20262B]">
                  Price Range
                </BodyXS>
                <div className="flex items-center justify-between text-[12px] text-[#20262B]">
                  <span>
                    {PRICE_MIN.toLocaleString("en-IN")} Rs
                  </span>
                  <span>
                    {maxPrice.toLocaleString("en-IN")} Rs
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <span className="h-[1px] w-2 bg-black" />
                  <input
                    type="range"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="h-[2px] w-full cursor-pointer accent-black"
                  />
                  <span className="h-[1px] w-2 bg-black" />
                </div>
              </div>

              <div className="space-y-6 text-[12px] uppercase tracking-[0.16em] text-[#6D6D6D]">
                {[
                  "Colour",
                  "Size",
                  "Categories",
                  "Style",
                  "Fit",
                  "Material",
                  "Accessory Style",
                  "More Filters",
                ].map((label) => (
                  <button
                    key={label}
                    type="button"
                    className="flex w-full items-center justify-between border-b border-neutral-200 pb-3 text-left"
                  >
                    <span>{label}</span>
                    <span className="text-base">→</span>
                  </button>
                ))}
              </div>
            </div>

            <footer className="grid grid-cols-2 text-[12px] uppercase tracking-[0.16em]">
              <button
                type="button"
                onClick={() => setMaxPrice(PRICE_MAX)}
                className="bg-[#F7F7F7] px-6 py-4 text-[#6D6D6D]"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="bg-black px-6 py-4 text-white"
              >
                View [{products.length}]
              </button>
            </footer>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
