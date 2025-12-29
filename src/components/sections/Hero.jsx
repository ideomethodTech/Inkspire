"use client";

import HeroFrames from "../hero/FloatingFrame";
import HeroContent from "../hero/HeroContent";

export default function Hero() {
  return (
    <section className="relative h-screen bg-gradient-to-b from-[#F7F7F7] via-[#F7F7F7] to-[#F7DDDD]/40 overflow-hidden">
      <HeroFrames />
      <HeroContent />
    </section>
  );
}
