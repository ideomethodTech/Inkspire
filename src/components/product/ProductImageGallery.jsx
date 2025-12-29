"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductImageGallery({ images, title }) {
  const [selectedImage, setSelectedImage] = useState(images[0] || "");

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md bg-neutral-100">
        <Image
          src={selectedImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(img)}
              className={`relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                selectedImage === img
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
  );
}

