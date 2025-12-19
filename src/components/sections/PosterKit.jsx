"use client";
import Image from "next/image";
import { Headline} from "../typography";
import { ArrowUpRight } from "lucide-react";



export default function PosterKitSeries() {
  return (
     <section className="bg-[#F7F7F7] py-20 md:py-28 xl:py-32">
      {/* Header */}
        <div className="mb-8 md:mb-12 px-4 md:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Headline className="font-medium  font-medium">POSTERKIT SERIES</Headline>           
 <button className="flex items-center gap-2 text-sm self-start md:self-auto">
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
      <div
        className="
          flex flex-col gap-6
          md:flex-row md:justify-center md:gap-4
          px-4 md:px-0
        "
      >
         
        <Image
          src="/poster/poster-c.jpg"
          alt="poster 3"
          width={342}
          height={573}
          className="object-cover w-full md:w-[260px] xl:w-[342px]"
        />
        <Image
          src="/poster/poster-a.jpg"
          alt="poster 1"
          width={342}
          height={573}
          className="object-cover w-full md:w-[260px] xl:w-[342px]"
        />

        <Image
          src="/poster/poster-b.jpg"
          alt="poster 2"
          width={586}
          height={596}
          className="object-cover w-full md:w-[420px] xl:w-[586px]"
        />      
      </div>
      <div
 className="
          w-full max-w-[1321px] h-[2px]
          bg-gradient-to-r
          from-[#E11B1B]
          via-[#E11B1B]/15
          to-transparent
          mt-8 md:mt-12
          mx-auto
        "
/>
    </section>
  );
}
