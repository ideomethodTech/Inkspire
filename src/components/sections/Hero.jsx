"use client";

import HeroFrames from "../hero/HeroFrames"; // import HeroFrames, not FloatingFrame
import HeroContent from "../hero/HeroContent";

export default function Hero({ featured }) {
  if (!featured || featured.length === 0) return null; // nothing to show yet

  const mainProduct = featured[0]; // first featured product for HeroContent

  return (
    <section className="relative h-screen bg-gradient-to-b from-[#F7F7F7] via-[#F7F7F7] to-[#F7DDDD]/40 overflow-hidden">
      <HeroFrames products={featured} />
      <HeroContent product={mainProduct} />
    </section>
  );
}
