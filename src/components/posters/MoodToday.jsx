"use client";

import { useState } from "react";
import Image from "next/image";
import { Headline } from "../typography";

const moods = [
  { id: 1, title: "Nature Drive", image: "/asset/pic-1.webp" },
  { id: 2, title: "Escape & Breathe", image: "/asset/pic-2.webp" },
  { id: 3, title: "Sporty Drive", image: "/asset/pic-3.webp" },
  { id: 4, title: "Vintage Camera", image: "/asset/pic-4.webp" },
  { id: 5, title: "Into the Woods", image: "/asset/pic-5.webp" },
   { id: 1, title: "Nature Drive", image: "/asset/pic-1.webp" },
   { id: 3, title: "Sporty Drive", image: "/asset/pic-3.webp" },

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
      {/* 🔹 Top Banner */}
      <div className="relative w-full h-[220px] md:h-[280px]">
        <Image
          src="/poster/Rectangle 536.jpg"
          alt="Mood banner"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <Headline className="text-white">
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

      {/* 🔥 Depth Carousel */}
      <div className="relative flex items-center justify-center h-[360px] overflow-hidden">
        {/* Left arrow */}
        <button
          onClick={prev}
          className="absolute left-6 z-40 text-4xl font-light"
        >
          ‹
        </button>

        <div className="relative flex items-center justify-center w-full">
          {moods.map((mood, index) => {
            const offset = index - activeIndex;

            if (Math.abs(offset) > 3) return null;

            const scale =
              offset === 0 ? 1.25 : Math.abs(offset) === 1 ? 1.05 : 0.85;

            const opacity =
              offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.85 : 0.6;

            const zIndex =
              offset === 0 ? 30 : Math.abs(offset) === 1 ? 20 : 10;

            return (
              <div
                key={`${mood.id}-${index}`}

                className="absolute transition-all duration-500 ease-out"
                style={{
                  transform: `
                    translateX(${offset * 260}px)
                    scale(${scale})
                  `,
                  opacity,
                  zIndex,
                }}
              >
                <div
                  className={`relative rounded-lg overflow-hidden shadow-lg transition-all duration-500 cursor-pointer
                    ${
                      offset === 0
                        ? "w-[220px] h-[320px]"
                        : Math.abs(offset) === 1
                        ? "w-[200px] h-[290px]"
                        : "w-[180px] h-[260px]"
                    }
                  `}
                >
                  <Image
                    src={mood.image}
                    alt={mood.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition">
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
          className="absolute right-6 z-40 text-4xl font-light"
        >
          ›
        </button>
      </div>
    </section>
  );
}
