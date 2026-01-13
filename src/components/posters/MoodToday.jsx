"use client";

import { useState } from "react";
import Image from "next/image";
import { Headline } from "../typography";

const moods = [
  { id: 1, title: "Nature Drive", image: "/asset/pic-1.webp" },
  { id: 2, title: "Escape & Breathe", image: "/asset/pic-2.webp" },
  { id: 3, title: "Sporty Drive", image: "/asset/pic-3.webp" },
  { id: 4, title: "Vintage Camera", image: "/asset/pic-4.webp" },
  { id: 5, title: "Into the Woods", image: "/asset/pic-5.webp" }, // 
];

export default function MoodToday() {
  const [activeIndex, setActiveIndex] = useState(2);

  const prev = () => {
    setActiveIndex((i) => (i === 0 ? moods.length - 1 : i - 1));
  };

  const next = () => {
    setActiveIndex((i) => (i === moods.length - 1 ? 0 : i + 1));
  };
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white">
      {/* Top Banner */}
      <div className="relative w-full h-[220px] md:h-[280px] ">
        <Image
          src="/poster/Rectangle 536.jpg"
          alt="Mood banner"
          fill
          priority
          className="object-cover"
        />

         {/* Caption overlay */}
  <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center">
    <Headline className="text-white items-center">
  Find posters your vibe loves
</Headline>
  </div>
  <div className="absolute bottom-0 left-1/2 z-30 -translate-x-1/2 translate-y-1/2">
            <button
              onClick={scrollToBottom}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                ↓
              </span>
            </button>
          </div>
        

        <div className="absolute inset-x-0 bottom-4 flex justify-center">
          <span className="w-3 h-3 rounded-full bg-black/70" />
        </div>
      </div>

      {/* 🔹 Caption */}
      <div className="text-center mt-16 mb-14 px-6">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-wide">
          WHAT&apos;S YOUR MOOD TODAY?
        </h2>

        <p className="mt-3 text-sm text-gray-500 max-w-xl mx-auto">
          Start with how you feel. We’ll find the posters that match your vibe.
        </p>
      </div>

      {/* 🔥 Center-focused Mood Carousel */}
      <div className="relative flex items-center justify-center h-[340px] overflow-hidden">
        {/* Left arrow */}
        <button
          onClick={prev}
          className="absolute left-6 z-20 text-3xl font-light"
        >
          ‹
        </button>

        <div className="relative flex items-center justify-center w-full">
          {moods.map((mood, index) => {
            const offset = index - activeIndex;

            if (Math.abs(offset) > 2) return null;

            return (
              <div
                key={mood.id}
                className="absolute transition-all duration-500 ease-out"
                style={{
                  transform: `
                    translateX(${offset * 220}px)
                    scale(${offset === 0 ? 1.15 : 0.9})
                  `,
                  opacity: offset === 0 ? 1 : 0.6,
                  zIndex: offset === 0 ? 20 : 10,
                }}
              >
                <div className="relative w-[190px] h-[270px] rounded-lg overflow-hidden group cursor-pointer shadow-lg">
                  <Image
                    src={mood.image}
                    alt={mood.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay text */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <span className="text-white text-xs tracking-widest uppercase text-center px-2">
                      {mood.title}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right arrow */}
        <button
          onClick={next}
          className="absolute right-6 z-20 text-3xl font-light"
        >
          ›
        </button>
      </div>
    </section>
  );
}
