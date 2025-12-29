"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HERO_CONTENT } from "@/lib/constants/hero";
import { HeadlineXL, Body2 } from "../typography";
import ArrowButton from "@/components/ui/ArrowButton";

export default function HeroContent() {
  const { headline, subtitle } = HERO_CONTENT;
  const reduced = useReducedMotion();

  return (
    <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4 md:px-0">
      {/* Line 1 */}
      <motion.div
        initial={{ y: reduced ? 0 : -12 }}
        animate={{ y: reduced ? 0 : [-12, 0, -4, 0] }}
        transition={{
          duration: 2.4, // match frame motion
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <HeadlineXL className="mb-2 mt-30 mr-40 md:mb-4 -translate-x-4 md:-translate-x-16 xl:-translate-x-36">
          {headline.line1}
        </HeadlineXL>
      </motion.div>

      {/* Line 2 */}
      <motion.div
        initial={{ y: reduced ? 0 : 12 }}
        animate={{ y: reduced ? 0 : [12, 0, -4, 0] }}
        transition={{
          duration: 2.4,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <HeadlineXL className="mb-4 md:mb-6 mr-44">
          {headline.line2}
        </HeadlineXL>
      </motion.div>

      {/* Subtitle */}
      <motion.div
        initial={{ y: reduced ? 0 : 8 }}
        animate={{ y: reduced ? 0 : [8, 0] }}
        transition={{
          duration: 2,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Body2 className="text-[#121212] mb-8 max-w-sm md:max-w-md">
          {subtitle}
        </Body2>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ y: reduced ? 0 : 6 }}
        animate={{ y: reduced ? 0 : [6, 0] }}
        transition={{
          duration: 2,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <ArrowButton href="/products" />
      </motion.div>
    </div>
  );
}
