"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  HERO_FRAMES_BASE,
  HERO_FRAMES_BASE_2,
} from "@/lib/constants/hero";

export default function FloatingFrames() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block overflow-hidden">
      <motion.div
        className="flex flex-col h-[200%]"
        initial={{ y: "0%" }}
        animate={{ y: ["0%", "-70%", "-50%"] }}
        transition={{
          duration: 2.4,
          times: [0, 0.6, 1], // fast → slow
          ease: [
            [0.4, 0, 1, 1],   // fast sweep
            [0.22, 1, 0.36, 1], // slow settle (Figma-like)
            [0.34, 1.56, 0.64, 1],
          ],
        }}
      >
        {/* SLIDE 1 */}
        <Slide slideKey="frame-1" frames={HERO_FRAMES_BASE} />

        {/* SLIDE 2 (settles here) */}
        <Slide
          slideKey="frame-2"
          frames={HERO_FRAMES_BASE_2}
          bounce
        />
      </motion.div>
    </div>
  );
}

function Slide({ frames, slideKey }) {
  return (
    <div className="relative h-screen w-full">
      {frames.map((frame, index) => (
        <Image
          key={`${slideKey}-${frame.id ?? index}`}
          src={frame.src}
          alt={frame.alt}
          width={frame.width}
          height={frame.height}
          className={frame.className}
        />
      ))}
    </div>
  );
}
