"use client";

import Link from "next/link";
import { Search, User, Heart, ShoppingBag, ChevronDown } from "lucide-react";
import { Subheading2 } from "../typography";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Subheading2 className="text-xl font-semibold tracking-wide">
          INKSPIRE
        </Subheading2>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
          
          <Link
            href="#"
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
          <Search size={18} />
          <User size={18} />
          <Heart size={18} />
          <ShoppingBag size={18} />
        </div>
      </div>
    </header>
  );
}
