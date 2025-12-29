"use client";
import Image from "next/image";
import { Headline } from "../typography";

export default function NewArrivals() {
  return (
    <section className="py-32 bg-[#F7F7F7]">
      {/* Header */}
      <div className="flex items-center justify-between mb-12 px-8 ">
        <Headline className="text-2xl font-medium">New Arrivals</Headline>
        <button className="text-sm underline">Shop Now</button>
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
      <div className="w-full max-w-[1321px] h-[2px] bg-gradient-to-r from-red-500 to-red-500/5 mt-12 mx-auto" />


    </section>
  );
}
