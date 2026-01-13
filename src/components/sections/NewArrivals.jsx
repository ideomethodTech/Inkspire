"use client";
import Image from "next/image";
import { Headline } from "../typography";
import { MOCK_PRODUCTS } from "@/lib/constants/products";

export default function NewArrivals() {
 const NewArrivals = MOCK_PRODUCTS.slice(0, 3);
  return (
    <section className="py-32 bg-[#F7F7F7]">
      {/* Header */}
      <div className="flex items-center justify-between mb-12 px-8 ">
        <Headline className="text-2xl font-medium">New Arrivals</Headline>
        <button className="text-sm underline">Shop Now</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {NewArrivals.map((product) => (
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
         