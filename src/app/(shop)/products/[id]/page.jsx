"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageWrapper from "@/components/layout/PageWrapper";
import Breadcrumb from "@/components/common/Breadcrumb";
import {
  ProductImageGallery,
  ProductInfo,
  ProductRatings,
  RelatedProducts,
} from "@/components/product";

// Mock data - in production, fetch from API
const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "CAPTAIN AMERICA | POSTER",
    artist: "Marvel",
    category: "Marvel",
    price: 199,
    images: [
      "/products/4ad9203dd2a598811e58c6fc9a3fca19c5bccd53.jpg",
      "/products/509e4f2b10c9e62dfc885e829716feb3618ae498.jpg",
      "/products/17049f4fe615334de178b8d8cbe384e4c0f7d28d.jpg",
    ],
    description:
      "High-quality poster featuring Captain America from the Marvel Cinematic Universe. Perfect for decorating your space with vibrant colors and detailed artwork.",
  },
  {
    id: 2,
    title: "Lone Rider Defender 102",
    artist: "Ale P",
    category: "Posters",
    price: 8499,
    images: [
      "/products/509e4f2b10c9e62dfc885e829716feb3618ae498.jpg",
      "/products/4ad9203dd2a598811e58c6fc9a3fca19c5bccd53.jpg",
    ],
  },
  {
    id: 3,
    title: "Armor Protocol 204",
    artist: "Ale P",
    category: "Posters",
    price: 11999,
    images: [
      "/products/17049f4fe615334de178b8d8cbe384e4c0f7d28d.jpg",
      "/products/4ad9203dd2a598811e58c6fc9a3fca19c5bccd53.jpg",
    ],
  },
  {
    id: 4,
    title: "Spider Vigil 108",
    artist: "Ale P",
    category: "Posters",
    price: 4999,
    images: [
      "/products/4ad9203dd2a598811e58c6fc9a3fca19c5bccd53.jpg",
      "/products/509e4f2b10c9e62dfc885e829716feb3618ae498.jpg",
    ],
  },
  {
    id: 5,
    title: "Titan Gaze 301",
    artist: "Ale P",
    category: "Posters",
    price: 9499,
    images: [
      "/products/509e4f2b10c9e62dfc885e829716feb3618ae498.jpg",
      "/products/17049f4fe615334de178b8d8cbe384e4c0f7d28d.jpg",
    ],
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In production, fetch from API: /api/products/${params.id}
    const foundProduct = MOCK_PRODUCTS.find(
      (p) => p.id === Number(params.id)
    );
    setProduct(foundProduct || MOCK_PRODUCTS[0]);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center py-20">
          <p>Loading...</p>
        </div>
      </PageWrapper>
    );
  }

  if (!product) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center py-20">
          <p>Product not found</p>
        </div>
      </PageWrapper>
    );
  }

  // Get related products (exclude current product)
  const relatedProducts = MOCK_PRODUCTS.filter((p) => p.id !== product.id).slice(
    0,
    3
  );

  const handleAddToCart = (item) => {
    console.log("Add to cart:", item);
    // TODO: Integrate with cart context/service
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Posters", href: "/products" },
    ...(product.category ? [{ label: product.category, href: `/products?category=${product.category}` }] : []),
    { label: product.title },
  ];

  return (
    <PageWrapper>
      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Main Product Section */}
      <div className="mb-12 grid gap-8 lg:grid-cols-2">
        {/* Left: Image Gallery */}
        <div>
          <ProductImageGallery
            images={product.images || [product.image || "/products/4ad9203dd2a598811e58c6fc9a3fca19c5bccd53.jpg"]}
            title={product.title}
          />
        </div>

        {/* Right: Product Info */}
        <div>
          <ProductInfo product={product} onAddToCart={handleAddToCart} />
        </div>
      </div>

      {/* Ratings & Reviews */}
      <ProductRatings rating={4.5} />

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} />
    </PageWrapper>
  );
}
