import Image from "next/image";
import { MOCK_PRODUCTS } from "@/lib/constants/products";

export default function Featured() {
  // Pick only the first 3 products
  const featuredProducts = MOCK_PRODUCTS.slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-2xl font-semibold mb-8">Featured Collection</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredProducts.map((product) => (
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
