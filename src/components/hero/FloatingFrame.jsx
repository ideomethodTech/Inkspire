"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Skeleton from "@/components/ui/Skeleton";


import {
  HERO_FRAMES_BASE,
  HERO_FRAMES_BASE_2,
} from "@/lib/constants/hero";

export default function FloatingFrames() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // simulate API delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block overflow-hidden">
      <motion.div
        className="flex flex-col h-[200%]"
        initial={{ y: "0%" }}
        animate={{ y: ["0%", "-70%", "-50%"] }}
        transition={{
          duration: 2.4,
          times: [0, 0.6, 1],
          ease: [
            [0.4, 0, 1, 1],
            [0.22, 1, 0.36, 1],
            [0.34, 1.56, 0.64, 1],
          ],
        }}
      >
        <Slide
          slideKey="frame-1"
          frames={HERO_FRAMES_BASE}
          loading={loading}
        />

        <Slide
          slideKey="frame-2"
          frames={HERO_FRAMES_BASE_2}
          loading={loading}
        />
      </motion.div>
    </div>
  );
}

function Slide({ frames, slideKey, loading }) {
  return (
    <div className="relative h-screen w-full">
      {frames.map((frame, index) =>
        loading ? (
          <Skeleton
            key={`${slideKey}-${frame.id ?? index}`}
            variant="rectangle"
            width={`w-[${frame.width}px]`}
            height={`h-[${frame.height}px]`}
            className={frame.className}
          />
        ) : (
          <Image
            key={`${slideKey}-${frame.id ?? index}`}
            src={frame.src}
            alt={frame.alt}
            width={frame.width}
            height={frame.height}
            className={frame.className}
          />
        )
      )}
    </div>
  );
}
