"use client";

import { motion } from "framer-motion";
import TiltCard from "../bestseller/TiltCard";

export default function BestsellerCarousel({ images = [] }) {
  // 🔒 sanitize images (API-safe)
  const safeImages = Array.isArray(images)
    ? images.filter((img) => typeof img === "string" && img.trim() !== "")
    : [];

  // ⛔ render nothing if no valid images
  if (safeImages.length === 0) return null;

  return (
    <section className="relative bg-white py-24 overflow-hidden">
      {/* curve mask top */}
      <div className="pointer-events-none absolute -top-16 md:-top-24 left-1/2 h-32 md:h-48 w-[120vw] -translate-x-1/2 rounded-[100%] bg-white z-10" />

      {/* curve mask bottom */}
      <div className="pointer-events-none absolute -bottom-12 left-1/2 h-48 w-[120vw] -translate-x-1/2 rounded-[100%] bg-white z-10" />

      {/* track */}
      <div className="relative z-0 overflow-hidden -mt-24 md:-mt-32">
        <motion.div
          className="flex gap-4 pl-[10vw] md:pl-[25vw] w-max"
          style={{ perspective: 1200 }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...safeImages, ...safeImages].map((src, i) => (
            <TiltCard key={`${src}-${i}`} src={src} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
