"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function TiltCard({ src, index }) {

  if (!src || typeof src !== "string") return null;

  return (
    <motion.div
      className="
        relative shrink-0
        h-[340px] md:h-[440px]
        w-[200px] md:w-[260px]
        overflow-hidden
        rounded-xl
      "
      style={{ transformStyle: "preserve-3d" }}
      whileHover={{
        rotateY: -8,
        rotateX: 6,
        scale: 1.08,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 18,
      }}
    >
      <Image
        src={src}
        alt={`Bestseller ${index + 1}`}
        fill
        sizes="(min-width: 768px) 260px, 200px"
        className="object-cover will-change-transform"
      />
    </motion.div>
  );
}
