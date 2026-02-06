"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Headline } from "../typography";
import { wallSpeakImages } from "@/lib/constants/about";

export default function WallsSpeak() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 overflow-hidden">
      <Headline className="text-2xl font-semibold mb-10">
        WALLS SPEAK —
      </Headline>

      {/* CAROUSEL */}
      <motion.div
        className="flex gap-6 cursor-grab"
        drag="x"
        dragConstraints={{ left: -400, right: 0 }}
        whileTap={{ cursor: "grabbing" }}
      >
        {wallSpeakImages.map((img) => (
          <motion.div
            key={img.id}
            className="
              relative
              flex-shrink-0
              w-[280px]
              h-[280px]
              md:w-[360px]
              md:h-[360px]
            "
          >
            <Image
              src={img.src}
              alt="Wall art"
              fill
              className="object-cover rounded-md"
              priority
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
