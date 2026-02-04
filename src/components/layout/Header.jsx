"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, User, Heart, ShoppingBag, ChevronDown } from "lucide-react";
import { Subheading2 } from "../typography";
import AuthModal from "@/components/auth/AuthModal";
import SearchOverlay from "@/components/search/SearchOverlay";

export default function Header() {
  const [showAuth, setShowAuth] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="w-full border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo */}
          <Subheading2 className="text-xl font-semibold tracking-wide">
            INKSPIRE
          </Subheading2>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
          
          <Link
            href="/posters"
            className="flex items-center text-[#2D2D2D] gap-1 hover:opacity-70"
          >
            <span>POSTERS</span>
            <ChevronDown size={14} />
          </Link>

            <Link
              href="#"
              className="flex items-center text-[#2D2D2D] gap-1 hover:opacity-70"
            >
              <span>COLLECTIONS</span>
              <ChevronDown size={14} />
            </Link>

            <Link
              href="#"
              className="flex items-center text-[#2D2D2D] gap-1 hover:opacity-70"
            >
              <span>STICKERS</span>
              <ChevronDown size={14} />
            </Link>

          </nav>


          {/* Icons */}
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="hover:opacity-70 transition-opacity outline-none"
            >
              <Search size={18} />
            </button>
            <Link
              href="/user/profile"
              aria-label="User account"
              className="hover:opacity-70 transition-opacity"
            >
              <User size={18} />
            </Link>
            <Heart size={18} />
            <Link
              href="/cart"
              aria-label="Cart"
              className="hover:opacity-70 transition-opacity"
            >
              <ShoppingBag size={18} />
            </Link>
          </div>
        </div>
      </header>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
