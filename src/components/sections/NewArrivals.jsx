"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Headline } from "../typography";
import Skeleton from "@/components/ui/Skeleton";
import { getProducts } from "@/services"; // API service

export default function NewArrivals() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch first 3 products from backend
        const { products } = await getProducts({ page: 1, limit: 3 });
        setNewArrivals(products);
      } catch (err) {
        console.error("Failed to load new arrivals", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-32 bg-[#F7F7F7]">
      {/* Header */}
      <div className="flex items-center justify-between mb-12 px-8 ">
        <Headline className="text-2xl font-medium">
          {isLoading ? <Skeleton variant="text" width="w-48" height="h-6" /> : "New Arrivals"}
        </Headline>
        {isLoading ? (
          <Skeleton variant="text" width="w-24" height="h-4" />
        ) : (
          <button className="text-sm underline">Shop Now</button>
        )}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading
          ? Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="border rounded-lg overflow-hidden p-4">
                  <Skeleton variant="rectangle" width="w-full" height="h-64" />
                  <div className="mt-4">
                    <Skeleton variant="text" width="w-32" height="h-4" className="mb-2" />
                    <Skeleton variant="text" width="w-24" height="h-3" className="mb-2" />
                    <Skeleton variant="text" width="w-20" height="h-4" />
                  </div>
                </div>
              ))
          : newArrivals.map((product) => (
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