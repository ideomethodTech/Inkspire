"use client";

import Image from "next/image";
import { Subheading2, Body2, BodyMD, Subheading1,Body1, BodyXS } from "../typography";
import Link from "next/link";
import { CircleArrowOutUpRight } from "lucide-react";

export default function YourMood() {
  return (
    <section
      className="
        w-full
        bg-[linear-gradient(161.54deg,#FFFFFF_52.95%,#FFF5F5_99.25%)]
        py-16 md:py-24 lg:py-32
      "
    >
      <div className="mx-auto mb-8 md:mb-12 w-[90%] md:w-[825px] h-px bg-[#E0E0E0]" />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[60px]">
        {/* HEADER */}
        <div className="mb-12 md:mb-16 lg:mb-24 max-w-[720px]">
          <Subheading2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Pick Your Mood —
          </Subheading2>

          <Subheading2 className="mt-2 md:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Browse, Click, And Deck Your Walls !
          </Subheading2>
          <Body2 className="mt-4 md:mt-6 text-[#121212] text-sm sm:text-base">
            Whatever Your Passion, we have Got A Poster For Every Corner.
          </Body2>
        </div>

        {/* ================= SECTION 01 ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start mb-6 md:mb-8">
          {/* Text */}
          <div className="lg:col-span-4">
            <BodyMD className="mb-3 md:mb-4 text-base md:text-lg">01</BodyMD>
            <Subheading2 className="mb-3 md:mb-4 text-xl sm:text-2xl md:text-3xl">Pop Culture</Subheading2>
            <Body2 className="text-[#121212] max-w-[380px] text-sm sm:text-base">
              Celebrate your fandom — iconic shows, music, and movies turned
              into wall art.
            </Body2>
          </div>
          {/* Images + Shop Now */}
          <div className="lg:col-span-8 flex flex-col lg:flex-row lg:items-end gap-4">
            <Link href="/products" className="italic tracking-tight whitespace-nowrap text-[#E11B1B] text-[12px] underline lg:self-end lg:mr-2 order-2 lg:order-1">
              Shop Now
            </Link>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 w-full order-1 lg:order-2">
              <Image
                src="/poster/poster-c.jpg"
                alt="Pop culture posters"
                width={420}
                height={500}
                className="h-[200px] sm:h-[250px] md:h-[300px] w-full sm:w-[50%] lg:w-[420px] object-cover"
              />
              <Image
                src="/poster/poster-c.jpg"
                alt="Pop culture posters"
                width={420}
                height={520}
                className="h-[200px] sm:h-[250px] md:h-[300px] w-full sm:w-[50%] lg:w-[420px] object-cover"
              />
            </div>
          </div>
        </div>
       
        {/* ================= SECTION 02 ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Text (stays UP) */}
          <div className="lg:col-span-4 flex flex-col lg:text-right order-1">
            <BodyMD className="mb-3 md:mb-4 text-base md:text-lg">02</BodyMD>

            <Subheading2 className="mb-3 md:mb-4 whitespace-nowrap text-xl sm:text-2xl md:text-3xl">
              Motivational / Quotes
            </Subheading2>

            <Body2 className="max-w-[350px] lg:ml-auto text-sm sm:text-base">
              Celebrate your fandom — iconic shows, music, and movies turned
              into wall art.
            </Body2>
          </div>
          
          {/* Images */}
          <div className="lg:col-span-8 flex flex-col lg:flex-row lg:items-end gap-4 order-2">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full order-1">
              <Image
                src="/poster/poster-c.jpg"
                alt="Motivational posters"
                width={420}
                height={500}
                className="h-[200px] sm:h-[250px] md:h-[300px] w-full sm:w-[50%] lg:w-[420px] object-cover"
              />
              <Image
                src="/poster/poster-c.jpg"
                alt="Motivational posters"
                width={420}
                height={520}
                className="h-[200px] sm:h-[250px] md:h-[300px] w-full sm:w-[50%] lg:w-[420px] object-cover"
              />
            </div>

            <Link href="/products" className="italic tracking-tight whitespace-nowrap text-[#E11B1B] text-[12px] underline lg:self-end lg:mb-1 order-2">
              Shop Now
            </Link>
          </div>
        </div>

        {/* ================= SECTION 03 ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start mb-6 md:mb-8">
          {/* Text */}
          <div className="lg:col-span-4">
            <BodyMD className="text-base md:text-[20px] block mb-4 md:mb-6">03</BodyMD>

            <Subheading2 className="mb-3 md:mb-4 text-xl sm:text-2xl md:text-3xl">Sports & Cars</Subheading2>

            <Body2 className="text-gray-600 text-sm md:text-[14px] max-w-[280px]">
              Celebrate your fandom — iconic shows, music, and movies turned
              into wall art.
            </Body2>

          </div>

          {/* Images */}
          <div className="lg:col-span-8 flex flex-col lg:flex-row lg:items-end gap-4">
            <Link href="/products" className="italic tracking-tight whitespace-nowrap text-[#E11B1B] text-[12px] underline lg:self-end lg:mr-2 order-2 lg:order-1">
              Shop Now
            </Link>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 w-full order-1 lg:order-2">
              <Image
                src="/poster/poster-c.jpg"
                alt="Pop culture posters"
                width={420}
                height={500}
                className="h-[200px] sm:h-[250px] md:h-[300px] w-full sm:w-[50%] lg:w-[420px] object-cover"
              />
              <Image
                src="/poster/poster-c.jpg"
                alt="Pop culture posters"
                width={420}
                height={520}
                className="h-[200px] sm:h-[250px] md:h-[300px] w-full sm:w-[50%] lg:w-[420px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* ================= CTA ================= */}
        <div className="relative w-full h-[180px] sm:h-[220px] md:h-[280px] overflow-hidden rounded-xl">
          <Image
            src="/poster/Rectangle 536.jpg"
            alt="Mood banner"
            fill
            priority
            className="object-cover"
          />

          {/* Caption overlay */}
          <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center px-4">
            <Body1 className="text-white flex flex-col sm:flex-row items-center gap-2 sm:gap-3 font-bold text-center text-base sm:text-lg md:text-xl">
              View All Categories
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-600">
                <CircleArrowOutUpRight className="w-4 h-4 text-white" />
              </span>
            </Body1>

            <BodyXS className="text-white text-center text-xs sm:text-sm">
              From Minimal to Maximal, we have got your wall covered
            </BodyXS>
          </div>
        </div>

      </div>
    </section>

  );

}