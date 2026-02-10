"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Skeleton from "@/components/ui/Skeleton";

export default function Testimonials() {
  const [isLoading, setIsLoading] = useState(true);

  // simulate API call delay
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="
        w-full
        py-32
        bg-[linear-gradient(90deg,#FFF5F5_0%,#FFFFFF_50%,#FFF5F5_100%)]
        overflow-hidden
      "
    >
      {/* Header */}
      <div className="text-center mb-20">
        {isLoading ? (
          <>
            <Skeleton variant="text" width="w-96" height="h-10" className="mx-auto mb-4" />
            <Skeleton variant="text" width="w-80" height="h-6" className="mx-auto" />
          </>
        ) : (
          <>
            <h2 className="text-[40px] font-medium tracking-tight text-[#1E2A32]">
              JOIN THE HAPPY WALLS CLUB <span className="text-red-500">!</span>
            </h2>
            <p className="mt-4 text-[18px] text-[#2C3E50] max-w-[520px] mx-auto">
              Thousands of poster lovers are already styling their spaces with us.
            </p>
          </>
        )}
      </div>

      {/* Reviews row */}
      <div className="relative max-w-[1440px] mx-auto flex items-center justify-center">
        {/* LEFT IMAGES */}
        <div className="absolute left-[-220px] flex gap-6">
          {isLoading
            ? Array(2)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} variant="rectangle" width="w-[260px]" height="h-[320px]" className="rounded-2xl" />
                ))
            : (
              <>
                <Image
                  src="/image-daniel.jpg"
                  alt="Reviewer"
                  width={260}
                  height={320}
                  className="rounded-2xl object-cover"
                />
                <Image
                  src="/image-jonathan.jpg"
                  alt="Reviewer"
                  width={260}
                  height={320}
                  className="rounded-2xl object-cover"
                />
              </>
            )}
        </div>

        {/* REVIEW CARD */}
        <div className="relative z-20 w-[520px] rounded-2xl bg-white p-10 shadow-sm">
          {isLoading ? (
            <>
              <div className="absolute right-10 top-10">
                <Skeleton variant="circle" width="w-14" height="h-14" />
              </div>
              <Skeleton variant="text" width="w-32" height="h-4" className="mb-2" />
              <Skeleton variant="text" width="w-20" height="h-3" className="mb-4" />
              <Skeleton variant="text" width="w-full" height="h-24" className="mb-4" />
              <Skeleton variant="text" width="w-36" height="h-4" />
            </>
          ) : (
            <>
              <div className="absolute right-10 top-10">
                <Image
                  src="/assets/image-kira.jpg"
                  alt="Avatar"
                  width={56}
                  height={56}
                  className="rounded-full"
                />
              </div>

              <h4 className="font-medium text-[16px]">Irene Strong</h4>
              <p className="text-red-500 text-sm mb-6">Pune</p>

              <p className="text-[16px] leading-relaxed text-[#4A4A4A] mb-10">
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.”
              </p>

              <button className="text-sm underline">
                Read whole review
              </button>
            </>
          )}

          {/* Nav arrows */}
          {!isLoading && (
            <div className="absolute bottom-6 right-6 flex gap-2">
              <button className="h-10 w-10 rounded-full border flex items-center justify-center">
                <ChevronLeft size={18} />
              </button>
              <button className="h-10 w-10 rounded-full border flex items-center justify-center">
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* RIGHT IMAGES */}
        <div className="absolute right-[-220px] flex gap-6">
          {isLoading
            ? Array(2)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} variant="rectangle" width="w-[260px]" height="h-[320px]" className="rounded-2xl" />
                ))
            : (
              <>
                <Image
                  src="/assets/image-patrick.jpg"
                  alt="Reviewer"
                  width={260}
                  height={320}
                  className="rounded-2xl object-cover"
                />
                <Image
                  src="/assets/image-daniel.jpg"
                  alt="Reviewer"
                  width={260}
                  height={320}
                  className="rounded-2xl object-cover"
                />
              </>
            )}
        </div>

        {/* REVIEWS COUNT */}
        <div className="absolute right-[60px] top-[-80px] text-right z-30">
          {isLoading ? (
            <>
              <Skeleton variant="text" width="w-12" height="h-3" className="mb-2" />
              <Skeleton variant="text" width="w-16" height="h-10" />
            </>
          ) : (
            <>
              <p className="text-sm text-gray-500">reviews/</p>
              <div className="flex items-center gap-3">
                <span className="text-[48px] font-medium text-red-500">96</span>
                <button className="h-10 w-10 rounded-full border flex items-center justify-center">
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
