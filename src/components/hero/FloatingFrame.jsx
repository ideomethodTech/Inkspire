"use client";

import { motion } from "framer-motion";
import Image from "next/image";


export default function FloatingFrame({ images }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
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
        {images.map((src, index) => (
          <Slide key={index} src={src} />
        ))}
      </motion.div>
    </div>
  );
}

function Slide({ src }) {
  return (
    <div className="relative h-screen w-full">
      <Image
        src={src}
        alt=""
        width={400} // adjust as needed
        height={600} // adjust as needed
        className="object-cover"
      />
    </div>
  );
}
