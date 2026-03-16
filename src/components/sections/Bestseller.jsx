"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { Headline, Body2 } from "../typography";
import BestsellerCarousel from "../bestseller/BestsellerCarousel";
import { BESTSELLER_IMAGES } from "@/lib/constants/bestseller";

import Link from "next/link";
import Skeleton from "@/components/ui/Skeleton";

export default function Bestseller() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/content/trending`
        );

        const products = res?.data?.data?.products || [];

        //Extract ALL images from products
        const apiImages = products.flatMap((p) => p.images || []);

        // Only switch to API if backend has MORE THAN 1 image
        if (apiImages.length > 1) {
          setImages(apiImages);
        } else {
          setImages(BESTSELLER_IMAGES);
        }
      } catch (err) {
        console.error("Trending fetch failed:", err);
        setImages(BESTSELLER_IMAGES);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <section className="bg-white py-16 md:py-24">
      {/* title */}
      <div className="mb-2 flex justify-center relative z-20">
        <div className="relative isolate text-center md:px-8 py-6">
          <div className="absolute inset-0 scale-125 md:scale-150 rounded-full bg-[#F7DDDD] blur-3xl opacity-100 pointer-events-none" />

          <Headline className="relative z-10 text-3xl md:text-5xl font-medium">
            Our Bestseller
          </Headline>

          <Body2 className="relative z-10 mt-2 text-gray-600 max-w-sm md:max-w-md mx-auto">
            The designs our community can’t get enough of
          </Body2>

          <Link
            href="/products"
            className="mt-4 md:mt-6 text-[12px] text-[#E11B1B] underline"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="flex gap-4 px-6 overflow-hidden">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangle"
                width="w-[220px]"
                height="h-[300px]"
                className="flex-shrink-0"
              />
            ))}
        </div>
      ) : (
        <BestsellerCarousel images={images} />
      )}
    </section>
  );
}