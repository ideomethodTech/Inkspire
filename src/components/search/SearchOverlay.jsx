"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { X, Search as SearchIcon, Heart } from "lucide-react";
import { BodyXS, Caption, Label } from "@/components/typography";

const POPULAR_SEARCHES = ["MARVEL", "NEW ARRIVALS", "MARVEL"];

const TRENDING_PRODUCTS = [
    {
        id: 1,
        title: "LAND ROVER DEFENDER 130",
        price: 299,
        originalPrice: null,
        image: "/products/4ad9203dd2a598811e58c6fc9a3fca19c5bccd53.jpg",
        discount: "SAVE 11%",
    },
    {
        id: 2,
        title: "LAND ROVER DEFENDER 130",
        price: 299,
        originalPrice: 199,
        image: "/products/509e4f2b10c9e62dfc885e829716feb3618ae498.jpg",
        discount: null,
    },
    {
        id: 3,
        title: "LAND ROVER DEFENDER 130",
        price: 299,
        originalPrice: 199,
        image: "/products/17049f4fe615334de178b8d8cbe384e4c0f7d28d.jpg",
        discount: null,
    },
];

export default function SearchOverlay({ isOpen, onClose }) {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = "hidden";
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300); // Animation duration
            document.body.style.overflow = "unset";
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleSearch = (e) => {
        if (e.key === "Enter" || e.type === "click") {
            e.preventDefault();
            if (query.trim()) {
                router.push(`/search?q=${encodeURIComponent(query)}`);
                onClose();
            }
        }
    };

    if (!isVisible && !isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-50 bg-black/60 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
                    }`}
                onClick={onClose}
            />

            {/* Overlay Panel */}
            <div
                className={`fixed inset-y-0 right-0 z-50 w-[70%] max-w-md bg-white shadow-2xl transition-transform duration-300 md:w-full ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex h-full flex-col">
                    {/* Header & Input */}
                    <div className="flex items-center gap-4 border-b border-neutral-200 px-6 py-4">
                        <div className="flex flex-1 items-center gap-2">
                            <SearchIcon size={20} className="text-[#6D6D6D]" />
                            <input
                                type="text"
                                placeholder="Search for anything"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleSearch}
                                className="w-full text-base outline-none placeholder:text-[#6D6D6D]"
                                autoFocus
                            />
                        </div>
                        <button type="button" onClick={onClose} aria-label="Close search">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-hide">
                        {/* Popular Searches */}
                        <div className="mb-10">
                            <Label className="mb-4 text-[12px] uppercase tracking-[0.16em] text-[#6D6D6D]">
                                POPULAR SEARCHES
                            </Label>
                            <div className="flex flex-wrap gap-3">
                                {POPULAR_SEARCHES.map((term, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setQuery(term);
                                            router.push(`/search?q=${encodeURIComponent(term)}`);
                                            onClose();
                                        }}
                                        className="rounded-full border border-neutral-300 px-5 py-2 text-[12px] font-medium uppercase tracking-wide text-[#20262B] transition-colors hover:border-[#20262B]"
                                    >
                                        {term}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Trending / Products */}
                        <div>
                            <Label className="mb-6 text-[12px] uppercase tracking-[0.16em] text-[#6D6D6D]">
                                PRODUCTS
                            </Label>
                            <div className="flex flex-col gap-6">
                                {TRENDING_PRODUCTS.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/products/${product.id}`}
                                        onClick={onClose}
                                        className="group"
                                    >
                                        <div className="flex gap-4">
                                            {/* Image */}
                                            <div className="relative aspect-[3/4] w-24 flex-shrink-0 overflow-hidden bg-neutral-100">
                                                {product.discount && (
                                                    <div className="absolute left-0 top-0 z-10 bg-[#E11B1B] px-2 py-1 text-[10px] font-bold text-white uppercase sm:text-[11px]">
                                                        {product.discount}
                                                    </div>
                                                )}
                                                <Image
                                                    src={product.image}
                                                    alt={product.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <button className="absolute right-1 top-1 text-white">
                                                    <Heart size={16} />
                                                </button>
                                            </div>

                                            {/* Info */}
                                            <div className="flex flex-col justify-center">
                                                <BodyXS className="mb-1 uppercase tracking-[0.08em] text-[#20262B]">
                                                    {product.title}
                                                </BodyXS>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span className="text-[14px] text-[#20262B]">
                                                        Rs. {product.price.toFixed(2)}
                                                    </span>
                                                    {product.originalPrice && (
                                                        <span className="text-[14px] text-[#E11B1B]">
                                                            Rs. {product.originalPrice.toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <button
                                className="w-full mt-6 bg-black text-white text-xs uppercase py-4 tracking-widest font-semibold"
                                onClick={handleSearch}
                            >
                                View All Results
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
