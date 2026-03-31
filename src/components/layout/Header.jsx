"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Search, User, Heart, ShoppingBag, ChevronDown, Menu, X } from "lucide-react";
import { Subheading2 } from "../typography";
import AuthModal from "@/components/auth/AuthModal";
import SearchOverlay from "@/components/search/SearchOverlay";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import { getCart } from "@/api/cart";
import { useAuthContext } from "@/context";


export default function Header() {
  const [showAuth, setShowAuth] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); 
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, setUser } = useAuthContext();
  const [cartCount, setCartCount] = useState(0);

  const refreshCartCount = useCallback(async () => {
    const token =
      typeof window !== "undefined" ? window.localStorage.getItem("token") : null;
    if (!token) {
      setCartCount(0);
      return;
    }

    try {
      const res = await getCart();
      if (!res?.success) {
        setCartCount(0);
        return;
      }
      const items = res?.data?.items || res?.items || [];
      const count = Array.isArray(items)
        ? items.reduce((sum, item) => sum + (item.quantity || 1), 0)
        : 0;
      setCartCount(count);
    } catch (err) {
      console.warn("Failed to fetch cart count", err);
      setCartCount(0);
    }
  }, []);

  useEffect(() => {
    refreshCartCount();
    const handleCartUpdate = () => refreshCartCount();
    if (typeof window !== "undefined") {
      window.addEventListener("cart:updated", handleCartUpdate);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("cart:updated", handleCartUpdate);
      }
    };
  }, [refreshCartCount]);
  


return (
<>
<header className="w-full border-b border-gray-200 bg-white">
<div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
{/* Mobile Layout */}
<div className="md:hidden w-full flex items-center justify-between">
{/* Hamburger */}
<button
className="hover:opacity-70 transition-opacity"
onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
aria-label="Toggle menu"
>
{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
</button>

{/* Logo */}
<Link href="/" className="hover:opacity-80 transition-opacity">
  <Subheading2 className="text-xl font-semibold tracking-wide">
    INKSPIRE
  </Subheading2>
</Link>

{/* Icons */}
<div className="flex items-center gap-4">
<button
type="button"
onClick={() => setIsSearchOpen(true)}
aria-label="Search"
className="hover:opacity-70 transition-opacity outline-none"
>
<Search size={18} />
</button>
<Heart size={18} className="hover:opacity-70 transition-opacity" />
<Link
href="/cart"
aria-label="Cart"
className="relative hover:opacity-70 transition-opacity"
>
<ShoppingBag size={18} />
{cartCount > 0 && (
  <span className="absolute -top-2 -right-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-black px-1 text-[10px] text-white">
    {cartCount}
  </span>
)}
</Link>
</div>
</div>

{/* Desktop Layout */}
<div className="hidden md:flex w-full items-center justify-between">
{/* Left: Logo */}
<Link href="/" className="hover:opacity-80 transition-opacity">
  <Subheading2 className="text-xl font-semibold tracking-wide">
    INKSPIRE
  </Subheading2>
</Link>

{/* Desktop Navigation */}
<nav className="flex items-center gap-10 text-sm font-medium">
{/* Posters */}
<div className="relative">
<button
onClick={() => setOpenMenu(openMenu === "posters" ? null : "posters")}
className={`flex items-center text-[#2D2D2D] gap-1 hover:opacity-70 pb-1 ${
  openMenu === "posters" ? "border-b-2 border-black" : ""
}`}
>
<span>POSTERS</span>
<ChevronDown size={14} className={`transition-transform duration-200 ${openMenu === "posters" ? "rotate-180" : ""}`} />
</button>

{/* Mega dropdown */}
{openMenu === "posters" && (
<div
  className="
    absolute left-1/2 -translate-x-1/2 top-full mt-7
    w-[92vw] max-w-6xl
    bg-white shadow-xl border border-gray-200
    z-50
  "
>
  <div className="flex items-stretch">
    
    {/* LEFT SIDE – GRID */}
    <div className="flex-1 px-10 py-10">
      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-5
          gap-x-8
          gap-y-8
        "
      >
        {/* Column 1 */}
        <div>
          <p className="font-medium mb-4">All posters</p>
          <ul className="space-y-2 text-gray-500">
            <li>New Arrivals</li>
            <li>Best Selling</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <p className="font-medium mb-4">Motivation</p>
          <ul className="space-y-2 text-gray-500">
            <li>Quotes</li>
            <li>Success</li>
            <li>Gym</li>
            <li>Study</li>
            <li>Minimal</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <p className="font-medium mb-4">Devotion</p>
          <ul className="space-y-2 text-gray-500">
            <li>Lord Shiva</li>
            <li>Lord Krishna</li>
            <li>Buddha</li>
            <li>Ganesha</li>
            <li>Spiritual Art</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <p className="font-medium mb-4">Cars & Bikes</p>
          <ul className="space-y-2 text-gray-500">
            <li>Supercars</li>
            <li>Concept Cars</li>
            <li>Vintage Cars</li>
            <li>Sports Bikes</li>
            <li>Classic Bikes</li>
          </ul>
        </div>

        {/* Column 5 */}
        <div>
          <p className="font-medium mb-4">Pop Culture</p>
          <ul className="space-y-2 text-gray-500">
            <li>Marvel</li>
            <li>DC</li>
            <li>Anime</li>
            <li>TV Series</li>
            <li>Movies</li>
          </ul>
        </div>
      </div>
    </div>

    {/* RIGHT SIDE – SAME IMAGE AS COLLECTIONS */}
    <div className="w-[340px] relative">
      <Image
        src="/assets/collection.png"
        alt="Posters Collection"
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute bottom-4 left-4 text-white text-sm">
        SHOP
      </div>
    </div>

  </div>
</div>
)}
</div>

<div className="relative">
<button
onClick={() =>
  setOpenMenu(openMenu === "collections" ? null : "collections")
}
className={`
  flex items-center text-[#2D2D2D] gap-1 hover:opacity-70
  ${openMenu === "collections" ? "border-b-2 border-black" : ""}
  pb-1
`}
>
<span>COLLECTIONS</span>
<ChevronDown
  size={14}
  className={`transition-transform duration-200 ${
    openMenu === "collections" ? "rotate-180" : ""
  }`}
/>
</button>

{openMenu === "collections" && (
<div
  className="
    absolute left-1/2 -translate-x-1/2 top-full mt-7
    w-[92vw] max-w-6xl
    bg-white shadow-xl border border-gray-200
    z-50
  "
>
  <div className="flex items-stretch">
    
    {/* LEFT SIDE – GRID (padding only here) */}
    <div className="flex-1 px-10 py-10">
      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-5
          gap-x-8
          gap-y-8
        "
      >
        {/* Column 1 */}
        <div>
          <p className="font-medium mb-4">Quick Picks</p>
          <ul className="space-y-2 text-gray-500 mb-6">
            <li>New Arrivals</li>
            <li>Best Selling</li>
          </ul>

          <p className="font-medium mb-4">Split Posters</p>
          <ul className="space-y-2 text-gray-500">
            <li>Cars</li>
            <li>Motivation</li>
            <li>Spiritual</li>
            <li>Bikes</li>
            <li>Sports</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <p className="font-medium mb-4">Poster Sets</p>
          <ul className="space-y-2 text-gray-500">
            <li>2-Piece</li>
            <li>3-Piece</li>
            <li>5-Panel</li>
            <li>5-Piece</li>
            <li>7-Piece</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <p className="font-medium mb-4">Collage Kits</p>
          <ul className="space-y-2 text-gray-500">
            <li>Aesthetic</li>
            <li>50-Piece Kit</li>
            <li>30-Piece Set</li>
            <li>Ganesha</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <p className="font-medium mb-4">Themed Kits</p>
          <ul className="space-y-2 text-gray-500">
            <li>Travel</li>
            <li>Quotes</li>
            <li>Abstract</li>
            <li>Pastel</li>
          </ul>
        </div>

        {/* Column 5 */}
        <div>
          <p className="font-medium mb-4">Retro Prints</p>
          <ul className="space-y-2 text-gray-500">
            <li>Aesthetic</li>
            <li>Custom</li>
            <li>Mini Pocket</li>
            <li>Photobooth</li>
          </ul>
        </div>
      </div>
    </div>

    {/* RIGHT SIDE – IMAGE (no height, no padding) */}
    <div className="w-[340px] relative">
      <Image
        src="/assets/collection.png"
        alt="New Collection"
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute bottom-4 left-4 text-white text-sm">
        SHOP
      </div>
    </div>
  </div>
</div>
)}
</div>


{/* Stickers */}
<div className="relative">
<button
onClick={() =>
setOpenMenu(openMenu === "stickers" ? null : "stickers")
}
className={`flex items-center text-[#2D2D2D] gap-1 hover:opacity-70 pb-1 ${
openMenu === "stickers" ? "border-b-2 border-black" : ""
}`}
>
<span>STICKERS</span>
<ChevronDown
size={14}
className={`transition-transform duration-200 ${
openMenu === "stickers" ? "rotate-180" : ""
}`}
/>
</button>

{/* Mega dropdown */}
{openMenu === "stickers" && (
<div
className="
absolute left-1/2 -translate-x-1/2 top-full mt-7
w-[92vw] max-w-6xl
bg-white shadow-xl border border-gray-200
z-50
"
>
<div className="flex items-stretch">
{/* LEFT SIDE – GRID */}
<div className="flex-1 px-10 py-10">
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-8">
{/* Example Column */}
<div>
<p className="font-medium mb-4">All Stickers</p>
<ul className="space-y-2 text-gray-500">
<li>New Arrivals</li>
<li>Best Selling</li>
</ul>
</div>

<div>
<p className="font-medium mb-4">Self Expression</p>
<ul className="space-y-2 text-gray-500">
<li>Bold</li>
<li>Soft</li>
<li>Hustle</li>
<li>Funny</li>
<li>Calm</li>
</ul>
</div>

{/* Column 3 */}
        <div>
          <p className="font-medium mb-4">Devotion</p>
          <ul className="space-y-2 text-gray-500">
            <li>Lord Shiva</li>
            <li>Lord Krishna</li>
            <li>Buddha</li>
            <li>Ganesha</li>                             
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <p className="font-medium mb-4">Cars & Bikes</p>
          <ul className="space-y-2 text-gray-500">
            <li>Minimal</li>
            <li>Dark</li>
            <li>Retro</li>
            <li>Quotes</li>
            <li>Doodles</li>
          </ul>
        </div>
        {/* Column 5 */}
        <div>
          <p className="font-medium mb-4">Pop Culture</p>
          <ul className="space-y-2 text-gray-500">
            <li>Marvel</li>
            <li>DC</li>
            <li>Anime</li>
            <li>TV Series</li>
            <li>Movies</li>
          </ul>
        </div>

</div>
</div>

<div className="w-[340px] relative">
      <Image
        src="/assets/collection.png"
        alt="New Collection"
        fill
        className="object-cover"
      />
<div className="absolute inset-0 bg-black/30" />
<div className="absolute bottom-4 left-4 text-white text-sm">SHOP</div>
</div>
</div>
</div>
)}
</div>


</nav>

{/* Desktop Icons */}
<div className="flex items-center gap-5">
<button
type="button"
onClick={() => setIsSearchOpen(true)}
aria-label="Search"
className="hover:opacity-70 transition-opacity outline-none"
>
<Search size={18} />
</button>
<button
  type="button"
  onClick={() => {
    const token =
      typeof window !== "undefined" ? window.localStorage.getItem("token") : null;
    if (user || token) {
      window.location.href = "/user/profile";
    } else {
      setShowAuth(true);
    }
  }}
  aria-label="User account"
  className="hover:opacity-70 transition-opacity"
>
  <User size={18} />
</button><Heart size={18} />
<Link
href="/cart"
aria-label="Cart"
className="relative hover:opacity-70 transition-opacity"
>
<ShoppingBag size={18} />
{cartCount > 0 && (
  <span className="absolute -top-2 -right-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-black px-1 text-[10px] text-white">
    {cartCount}
  </span>
)}
</Link>
</div>
</div>
</div>
</header>

{/* Mobile Menu Overlay */}
{mobileMenuOpen && (
<MobileMenu onClose={() => setMobileMenuOpen(false)} />
)}

<SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
  {/* Auth Modal */}
  {showAuth && (
    <AuthModal
      onClose={() => setShowAuth(false)}
      onLoginSuccess={(loggedInUser) => {
        setUser(loggedInUser); // update state
        setShowAuth(false);    // close modal
        window.location.href = "/user/profile"; // redirect
      }}
    />
  )}
</>
);
}
