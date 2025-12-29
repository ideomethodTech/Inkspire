"use client";

import Image from "next/image";
import { Subheading2, Body2, BodyMD } from "../typography";

export default function YourMood() {
  return (
    <section
      className="
        w-full
        bg-[linear-gradient(161.54deg,#FFFFFF_52.95%,#FFF5F5_99.25%)]
        py-32
      "
    >
      <div className="mx-auto mb-12 w-[825px] h-px bg-[#E0E0E0]" />
      <div className="max-w-[1440px] mx-auto px-[60px]">
        {/* HEADER */}
        <div className="mb-24 max-w-[720px]">
          <Subheading2>
            Pick Your Mood —
          </Subheading2>

          <Subheading2 className="mt-4">
            Browse, Click, And Deck Your Walls !
          </Subheading2>
          <Body2 className="mt-6 text-[#121212]">
            Whatever Your Passion, We’ve Got A Poster For Every Corner.
          </Body2>
        </div>

        {/* ================= SECTION 01 ================= */}
        <div className="grid grid-cols-12  items-start mb-8">
          {/* Text */}
          <div className="col-span-4">
            <BodyMD className="mb-4">01</BodyMD>
            <Subheading2 className="mb-4">Pop Culture</Subheading2>
            <Body2 className="text-[#121212] max-w-[380px]">
              Celebrate your fandom — iconic shows, music, and movies turned
              into wall art.
            </Body2>
          </div>
          {/* Images + Shop Now */}
          <div className="col-span-8 flex items-end">
            {/* Shop Now — bottom left of images */}
            <button className="italic tracking-tight whitespace-nowrap text-[#E11B1B] text-[12px] underline self-end mr-2">
              Shop Now
            </button>
            <Image
              src="/poster/poster-c.jpg"
              alt="Pop culture posters"
              width={420}
              height={500}
              className="h-[300px] w-[420px] object-cover"
            />
            <Image
              src="/poster/poster-c.jpg"
              alt="Pop culture posters"
              width={420}
              height={520}
              className="h-[300px] w-[420px] object-cover"
            />
          </div>
        </div>
        {/* ================= SECTION 02 ================= */}
        <div className="grid grid-cols-12 gap-8 mb-8">
          {/* Images */}
          <div className="col-span-8 flex items-end gap-4">
            <Image
              src="/poster/poster-c.jpg"
              alt="Motivational posters"
              width={420}
              height={500}
              className="h-[300px] w-[420px] object-cover"
            />
            <Image
              src="/poster/poster-c.jpg"
              alt="Motivational posters"
              width={420}
              height={520}
              className="h-[300px] w-[420px] object-cover"
            />

            {/* Shop Now — bottom right only */}
            <button className="italic tracking-tight whitespace-nowrap text-[#E11B1B] text-[12px] underline self-end mb-1">
              Shop Now
            </button>
          </div>

          {/* Text (stays UP) */}
          <div className="col-span-4 flex flex-col text-right">
            <BodyMD className="mb-4">02</BodyMD>

            <Subheading2 className="mb-4 whitespace-nowrap">
              Motivational / Quotes
            </Subheading2>

            <Body2 className="max-w-[350px] ml-auto">
              Celebrate your fandom — iconic shows, music, and movies turned
              into wall art.
            </Body2>
          </div>
        </div>

        {/* ================= SECTION 03 ================= */}
        <div className="grid grid-cols-12 gap-8 items-start mb-32">
          {/* Text */}
          <div className="col-span-4">
            <BodyMD className="text-[20px] block mb-6">03</BodyMD>

            <Subheading2 className="mb-4">Sports & Cars</Subheading2>

            <Body2 className="text-gray-600 text-[14px] max-w-[280px]">
              Celebrate your fandom — iconic shows, music, and movies turned
              into wall art.
            </Body2>

          </div>

          {/* Images */}
          <div className="col-span-8 flex items-end">
            {/* Shop Now — bottom left of images */}
            <button className="italic tracking-tight whitespace-nowrap text-[#E11B1B] text-[12px] underline self-end mr-2">
              Shop Now
            </button>
            <Image
              src="/poster/poster-c.jpg"
              alt="Pop culture posters"
              width={420}
              height={500}
              className="h-[300px] w-[420px] object-cover"
            />
            <Image
              src="/poster/poster-c.jpg"
              alt="Pop culture posters"
              width={420}
              height={520}
              className="h-[300px] w-[420px] object-cover"
            />
          </div>
        </div>
        {/* ================= CTA ================= */}

      </div>
    </section>

  );

}
