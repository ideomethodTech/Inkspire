"use client";

import Image from "next/image";
import { Headline } from "../typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Skeleton from "../ui/Skeleton";
import { getProducts } from "@/services"; 

export default function PosterKitSeries() {
  const [posterKitSeries, setPosterKitSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { products } = await getProducts({ page: 1, limit: 3 });
        setPosterKitSeries(products);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="bg-[#F7F7F7] py-20 md:py-28 xl:py-32">
      {/* Header */}
      <div className="mb-8 md:mb-12 px-4 md:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Headline className="font-medium">POSTERKIT SERIES</Headline>
        <Link href="/products" className="flex items-center gap-2 text-sm self-start md:self-auto">
          <p className="italic tracking-tight text-[#E11B1B]">Shop Now</p>
          <span className="flex items-center justify-center w-6 h-6 border border-gray-300 rounded bg-white">
            <ArrowUpRight size={12} strokeWidth={1.5} />
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading
          ? Array(3).fill(0).map((_, i) => (
              <div key={i} className="border rounded-lg overflow-hidden">
                <Skeleton height="h-64" />
                <div className="p-4 space-y-2">
                  <Skeleton variant="text" width="w-3/4" />
                  <Skeleton variant="text" width="w-1/2" height="h-3" />
                  <Skeleton variant="text" width="w-1/3" />
                </div>
              </div>
            ))
          : posterKitSeries.map((product) => (
              <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={400}
                  height={500}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium">{product.title}</h3>
                  <p className="text-sm text-gray-500">{product.artist}</p>
                  <p className="font-semibold mt-2">₦{product.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
}