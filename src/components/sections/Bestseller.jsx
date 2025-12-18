"use client";
import { Headline, Body2 } from "../typography";

const cards = Array.from({ length: 8 });

export default function Bestseller() {
  return (
    <section className="bg-white py-24">
 {/* title & captions */}
<div className="mb-12 flex justify-center relative z-20">
  <div className="relative isolate text-center px-8 py-6">
    {/* glow behind title + caption */}
    <div
      className="
        absolute
        inset-0
        scale-150
        rounded-full
        bg-[#F7DDDD]
        blur-3xl
        opacity-100
      "
    />

    <Headline className="relative z-10 text-5xl font-medium">
      Our BestSeller
    </Headline>
 


    <Body2 className="relative z-10  text-gray-600">
      The designs our community cant get enough of
    </Body2>
      <button className="mt-6 text-[12px] text-red-500 underline">
              Shop Now
            </button>
    
  </div>
</div>


    <section className="relative bg-black h-screen overflow-hidden py-24">
      {/* curve mask top */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[120vw] -translate-x-1/2 rounded-[100%] bg-white z-10" />
      

      {/* curve mask bottom */}
      <div className="pointer-events-none absolute -bottom-12 left-1/2 h-48 w-[120vw] -translate-x-1/2 rounded-[100%] bg-white z-10" />

      {/* track */}
      <div className="relative z-0">
        <div className="flex gap-4 pl-[30vw] animate-scroll hover:[animation-play-state:paused]">

          {[...cards, ...cards].map((_, i) => (
            <div
              key={i}
              className="h-[360px] w-[260px] shrink-0 rounded-xl bg-red-400 transition-transform duration-300 hover:scale-110"
            />
          ))}
        </div>
      </div>
    </section>
    </section>
  );
}
