"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HERO_CONTENT } from "@/lib/constants/hero";
import { HeadlineXL, Body2 } from "../typography";
import ArrowButton from "@/components/ui/ArrowButton";

export default function HeroContent() {
  const { headline, subtitle } = HERO_CONTENT;
  const reduced = useReducedMotion();



  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center px-6">
      
      {/* Line 1 */}
      <motion.div
        initial={{ y: reduced ? 0 : -8 }}
        animate={{ y: reduced ? 0 : [0, -6, 0] }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <HeadlineXL className="mb-2 md:mb-4 md:-translate-x-16 xl:-translate-x-36">
          {headline.line1}
        </HeadlineXL>
      </motion.div>

      {/* Line 2 */}
      <motion.div
        initial={{ y: reduced ? 0 : 8 }}
        animate={{ y: reduced ? 0 : [0, 6, 0] }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <HeadlineXL className="mb-4 md:mb-6 md:-translate-x-20">
          {headline.line2}
        </HeadlineXL>
      </motion.div>

      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <Body2 className="text-[#121212] mb-8 max-w-xs md:max-w-md">
          {subtitle}
        </Body2>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ y: 6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        <ArrowButton href="/products" />
      </motion.div>
    </div>
  );
}
