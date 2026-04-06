"use client";

import { useWishlist } from "@/context";
import ProductCard from "@/components/product/ProductCard";
import { Subheading2, Body1 } from "@/components/typography";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlistItems, loading, clearWishlist } = useWishlist();

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#E11B1B] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Heart className="text-[#E11B1B]" size={28} fill="#E11B1B" />
          <Subheading2 className="text-[32px] font-semibold text-[#20262B] italic leading-tight">
            My Wishlist
          </Subheading2>
        </div>
        {wishlistItems.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-[14px] font-medium uppercase tracking-[0.08em] text-[#6D6D6D] transition-colors hover:text-[#E11B1B]"
          >
            Clear All
          </button>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4 rounded-lg bg-white py-20 shadow-sm">
          <Heart size={64} className="text-neutral-200" />
          <div className="text-center">
            <Body1 className="text-lg font-medium text-[#20262B]">Your wishlist is empty</Body1>
            <p className="text-[#6D6D6D]">Add items you love to your wishlist to review them later.</p>
          </div>
          <Link
            href="/posters"
            className="rounded-md bg-[#20262B] px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-black"
          >
            Explore Posters
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wishlistItems.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
