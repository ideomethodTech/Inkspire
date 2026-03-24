"use client";

import { useState } from "react";
import { Headline } from "../typography";
import Link from "next/link";
import { useNewsletter } from "@/lib/hooks/useNewsletter";

export default function Footer() {
  const { subscribe, loading, error, success } = useNewsletter();
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) return alert("Please agree to subscribe.");
    try {
      await subscribe(email);
      setEmail("");
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <footer className="bg-[#1f2226] text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-5 gap-12">

        {/* Newsletter */}
        <div className="md:col-span-2">
          <Headline className=" mb-4">STAY INSPIRED</Headline>
          <p className="text-sm text-gray-300 mb-6">
            Join our wall art club & get 20% off your first order.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="border-b border-gray-500 pb-2 mb-6">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email*"
                className="w-full bg-transparent outline-none text-sm placeholder-gray-400"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="newsletter-check"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <label htmlFor="newsletter-check" className="text-sm text-gray-300 cursor-pointer">
                  Subscribe to our newsletter
                </label>
              </div>

              <button 
                type="submit"
                disabled={loading || !email}
                className="bg-white text-black px-6 py-2 rounded-md text-sm font-semibold disabled:bg-gray-400"
              >
                {loading ? "..." : "Submit"}
              </button>
            </div>
            {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
            {success && <p className="mt-2 text-xs text-green-400">Successfully subscribed!</p>}
          </form>

          <p className="text-xs text-gray-400 mt-8">
            By subscribing, you agree to our Privacy Policy and Terms of Service.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-white uppercase tracking-wider">SHOP</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
            <li><Link href="/posters" className="hover:text-white transition-colors">Posters</Link></li>
            <li><Link href="/products?category=Abstract" className="hover:text-white transition-colors">Abstract</Link></li>
            <li><Link href="/products?category=Nature" className="hover:text-white transition-colors">Nature</Link></li>
            <li><Link href="/products?category=Minimalist" className="hover:text-white transition-colors">Minimalist</Link></li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-white uppercase tracking-wider">INFORMATION</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="hover:text-white transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/user/orders" className="hover:text-white transition-colors">
                Track Order
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-white uppercase tracking-wider">FOLLOW US</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pinterest</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 py-10 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Brand */}
        <div className="flex items-center gap-2">
          <h2 className="text-4xl font-medium text-white tracking-tighter">
            inkspire
          </h2>
          <span className="w-2 h-2 bg-red-500 rounded-full" />
        </div>

        {/* Right: Copyright */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <span className="text-xs text-gray-400">
            © {new Date().getFullYear()} INKSPIRES (INDIA). All rights reserved
          </span>
          <div className="flex gap-4 text-[10px] text-gray-500 uppercase tracking-widest">
            <span>PayPal</span>
            <span>VISA</span>
            <span>MasterCard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
