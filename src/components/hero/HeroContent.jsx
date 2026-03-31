"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

import { HeadlineXL, Body2 } from "../typography";
import ArrowButton from "@/components/ui/ArrowButton";

export default function HeroContent() {
  const reduced = useReducedMotion();

  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/content/hero`
        );

        const data = res.data;

        if (data?.data?.banners?.length > 0) {
          setBanner(data.data.banners[0]);
        }
      } catch (err) {
        console.error("Banner fetch failed:", err);
      }
    };

    fetchBanner();
  }, []);

  const fallback = {
  title: "Bring Your Mood To Your Walls",
  subtitle: "Design posters that speak your mood",
  link: "/products",
  linkText: "Shop Now",
};

const data = banner || fallback;

// split correctly
const words = data.title?.split(" ") || [];
const line1 = words.slice(0, 3).join(" ");
const line2 = words.slice(3).join(" ");

  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center px-6">

      {/* Line 1 */}
      <motion.div
        initial={{ y: reduced ? 0 : -8 }}
        animate={{ y: reduced ? 0 : [0, -6, 0] }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <HeadlineXL className="mb-2 md:mb-4 md:-translate-x-16 xl:-translate-x-36">
          {line1}
        </HeadlineXL>
      </motion.div>

      {/* Line 2 */}
      <motion.div
        initial={{ y: reduced ? 0 : -8 }}
        animate={{ y: reduced ? 0 : [0, -6, 0] }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <HeadlineXL className="mb-4 md:mb-6 md:-translate-x-5">
          {line2}
        </HeadlineXL>
      </motion.div>

      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <Body2 className="text-[#121212] mb-8 max-w-xs md:max-w-md">
          {data.subtitle}
        </Body2>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ y: 6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        <ArrowButton href={data.link || "/products"}>
          {data.linkText || "Shop Now"}
        </ArrowButton>
      </motion.div>
    </div>
  );
}