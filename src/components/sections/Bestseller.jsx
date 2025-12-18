"use client";
import { Headline, Body2 } from "../typography";

const cards = Array.from({ length: 8 });

export default function Bestseller() {
  return (
     <section className="bg-white py-16 md:py-24">

 {/* title & captions */}
<div className="mb-10 md:mb-12 flex justify-center relative z-20">
  <div className="relative isolate text-center  md:px-8 py-6">

    {/* glow behind title + caption */}
    <div
      className="
        absolute inset-0
              scale-125 md:scale-150
              rounded-full
              bg-[#F7DDDD]
              blur-3xl
              opacity-100
            "
    />

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


     {/* carousel section */}
      <section className="relative bg-black py-16 md:py-24 overflow-hidden">
      {/* curve mask top */}
       <div className="pointer-events-none absolute -top-16 md:-top-24 left-1/2 h-32 md:h-48 w-[120vw] -translate-x-1/2 rounded-[100%] bg-white z-10" />
      

      {/* curve mask bottom */}
      <div className="pointer-events-none absolute -bottom-12 left-1/2 h-48 w-[120vw] -translate-x-1/2 rounded-[100%] bg-white z-10" />

      {/* track */}
      <div className="relative z-0">
        <div
            className="
              flex gap-4
              pl-[10vw] md:pl-[25vw]
              animate-scroll
              hover:[animation-play-state:paused]
            "
          >
          {[...cards, ...cards].map((_, i) => (
            <div
              key={i}
             className="
                  shrink-0
                  h-[280px] md:h-[360px]
                  w-[200px] md:w-[260px]
                  rounded-xl
                  bg-red-400
                  transition-transform duration-300
                  hover:scale-110
                "
            />
          ))}
        </div>
      </div>
    </section>
    </section>
  );
}
