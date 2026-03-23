
"use client";

import { useEffect, useState } from "react";

export default function ProductImageGallery({ images, title }) {
  const fallbackImage =
    "/products/4ad9203dd2a598811e58c6fc9a3fca19c5bccd53.jpg";
  const imageList = Array.isArray(images)
    ? images.filter(Boolean)
    : [];
  const normalizedImages = imageList.length > 0 ? imageList : [fallbackImage];

  const [selectedImage, setSelectedImage] = useState(normalizedImages[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setSelectedImage(normalizedImages[0]);
    setActiveIndex(0);
  }, [normalizedImages.join("|")]);

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
          {normalizedImages.map((img, index) => (
            <div
              key={index}
              className="relative aspect-3/4 min-w-full shrink-0 snap-center bg-neutral-100"
            >
              <img
                src={img}
                alt={`${title} - View ${index + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        {/* Mobile Dots */}
        {normalizedImages.length > 1 && (
          <div className="absolute bottom-4 left-4 flex gap-2">
            {normalizedImages.map((_, index) => (
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
          <img
            src={selectedImage}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
        </div>

        {normalizedImages.length > 1 && (
          <div className="flex gap-3">
            {normalizedImages.map((img, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${selectedImage === img
                    ? "border-black"
                    : "border-transparent hover:border-neutral-300"
                  }`}
              >
                <img
                  src={img}
                  alt={`${title} thumbnail ${index + 1}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
