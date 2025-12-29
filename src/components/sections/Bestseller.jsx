"use client";


import { Headline, Body2 } from "../typography";
import BestsellerCarousel from "../bestseller/BestsellerCarousel";
import { BESTSELLER_IMAGES } from "@/lib/constants/bestseller";


export default function Bestseller() {
  return (
    <section className="bg-white py-16 md:py-24">
      {/* title & captions */}
      <div className="mb-2 flex justify-center relative z-20">
        <div className="relative isolate text-center md:px-8 py-6">
          <div className="absolute inset-0 scale-125 md:scale-150 rounded-full bg-[#F7DDDD] blur-3xl opacity-100" />

          <Headline className="relative z-10 text-3xl md:text-5xl font-medium">
            Our Bestseller
          </Headline>

          <Body2 className="relative z-10 mt-2 text-gray-600 max-w-sm md:max-w-md mx-auto">
            The designs our community can’t get enough of
          </Body2>

          <button className="mt-4 md:mt-6 text-[12px] text-[#E11B1B] underline">
            Shop Now
          </button>
        </div>
      </div>

      <BestsellerCarousel images={BESTSELLER_IMAGES} />
    </section>
  );
}