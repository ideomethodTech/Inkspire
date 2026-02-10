"use client";

import { useState, useEffect } from "react";
import { Body2, Subheading2 } from "../typography";
import { Truck, Wallet, MessageSquare, RefreshCw } from "lucide-react";
import Skeleton from "@/components/ui/Skeleton";

const features = [
  {
    title: "Free Shipping",
    description: "Get your sunglasses in 4–7 business days.",
    icon: Truck,
  },
  {
    title: "Here to help",
    description: "Customer service is available Monday through Friday.",
    icon: MessageSquare,
  },
  {
    title: "Secure Payments",
    description: "Your transactions are protected with top-level security.",
    icon: Wallet,
  },
  {
    title: "10-Day Return Policy",
    description: "We think you'll love it. If you don't, let us know!",
    icon: RefreshCw,
  },
];

export default function ShopWithUs() {
  const [isLoading, setIsLoading] = useState(true);

  // simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-32 px-16 text-center bg-white">
      <Subheading2 className="mb-4 text-4xl font-medium">
        {isLoading ? <Skeleton variant="text" width="w-64" height="h-8" /> : "Why Shop with Us"}
      </Subheading2>

      <Body2 className="mb-16 text-gray-500">
        {isLoading ? (
          <Skeleton variant="text" width="w-96" height="h-4" lines={2} />
        ) : (
          "Enjoy exclusive benefits designed for a seamless shopping experience"
        )}
      </Body2>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center rounded-xl border border-gray-200 bg-[#F7F7F7] p-8"
                >
                  <Skeleton variant="circle" width="w-14" height="h-14" className="mb-5" />
                  <Skeleton variant="text" width="w-32" height="h-4" className="mb-3" />
                  <Skeleton variant="text" width="w-48" height="h-3" lines={2} />
                </div>
              ))
          : features.map(({ title, description, icon: Icon }, i) => (
              <div
                key={i}
                className="flex flex-col items-center rounded-xl border border-gray-200 bg-[#F7F7F7] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <Icon className="mb-5 h-7 w-7 text-[#E11B1B]" />
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide">{title}</h3>
                <p className="text-sm text-gray-500 max-w-[220px]">{description}</p>
              </div>
            ))}
      </div>
    </section>
  );
}
