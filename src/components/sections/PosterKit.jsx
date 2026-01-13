"use client";
import Image from "next/image";
import { Headline } from "../typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { MOCK_PRODUCTS } from "@/lib/constants/products";


export default function PosterKitSeries() {

    const posterKitSeries = MOCK_PRODUCTS.slice(0, 3);

  return (
    <section className="bg-[#F7F7F7] py-20 md:py-28 xl:py-32">
      {/* Header */}
      <div className="mb-8 md:mb-12 px-4 md:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Headline className="font-medium  font-medium">POSTERKIT SERIES</Headline>
      
<Link
  href="/products"
  className="flex items-center gap-2 text-sm self-start md:self-auto"
>
  <p className="italic tracking-tight text-[#E11B1B]">
    Shop Now
  </p>
  <span
    className="
      flex items-center justify-center
      w-6 h-6
      border border-gray-300 rounded bg-white
    "
  >
    <ArrowUpRight size={12} strokeWidth={1.5} />
  </span>
</Link>
      </div>
    
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posterKitSeries.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition"
              >
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
    