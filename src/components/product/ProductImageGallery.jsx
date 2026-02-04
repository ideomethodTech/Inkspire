
"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductImageGallery({ images, title }) {
  // Ensure images is an array
  const imageList = Array.isArray(images) && images.length > 0 ? images : [""];

  const [selectedImage, setSelectedImage] = useState(imageList[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.offsetWidth;
    const index = Math.round(scrollLeft / width);
    setActiveIndex(index);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Mobile: Swipeable Carousel */}
      <div className="relative block md:hidden">
        <div
          onScroll={handleScroll}
          className="flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {imageList.map((img, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] min-w-full flex-shrink-0 snap-center bg-neutral-100"
            >
              <Image
                src={img}
                alt={`${title} - View ${index + 1}`}
                fill
                sizes="100vw"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Mobile Dots */}
        {imageList.length > 1 && (
          <div className="absolute bottom-4 left-4 flex gap-2">
            {imageList.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 w-1.5 rounded-full shadow-sm transition-all ${index === activeIndex ? "scale-125 bg-white" : "bg-white/60"
                  }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop: Main Image + Thumbnails */}
      <div className="hidden flex-col gap-4 md:flex">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md bg-neutral-100">
          <Image
            src={selectedImage}
            alt={title}
            fill
            sizes="50vw"
            className="object-cover"
            priority
          />
        </div>

        {imageList.length > 1 && (
          <div className="flex gap-3">
            {imageList.map((img, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${selectedImage === img
                    ? "border-black"
                    : "border-transparent hover:border-neutral-300"
                  }`}
              >
                <Image
                  src={img}
                  alt={`${title} thumbnail ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

