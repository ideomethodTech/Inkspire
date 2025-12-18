"use client";
import Image from "next/image";
import { Headline} from "../typography";
import { ArrowUpRight } from "lucide-react";



export default function PosterKitSeries() {
  return (
    <section className="py-32 bg-[#F7F7F7]">
      {/* Header */}
      <div className="flex items-center justify-between mb-12 px-8 ">
        <Headline className="text-2xl font-medium">POSTERKIT SERIES</Headline>
       
      
<button className="flex items-center gap-2 text-sm ">
   <p className="italic tracking-tight  text-[#E11B1B]">
    Shop Now
  </p>
  <span
    className="
      flex items-center justify-center
      w-6 h-6
      border border-gray-300 rounded bg-white
    "
  >
    <ArrowUpRight size={12} strokeWidth={1.5} />
  </span>
</button>
      </div>
      {/* Images */}
      <div className="flex justify-center gap-4">
         <Image
          src="/poster/poster-c.jpg"
          alt="poster 3"
          width={342}
          height={573}
          className="object-cover"
        />
        <Image
          src="/poster/poster-a.jpg"
          alt="poster 1"
          width={342}
          height={573}
          className="object-cover"
        />
        <Image
          src="/poster/poster-b.jpg"
          alt="poster 2"
          width={586}
          height={596}
          className="object-cover"
        />
      
      </div>
      <div
  className="
    w-full max-w-[1321px] h-[2px]
    bg-gradient-to-r
    from-[#E11B1B]
    via-[#E11B1B]/15
    to-transparent
    mt-12 mx-auto
  "
/>



    </section>
  );
}
