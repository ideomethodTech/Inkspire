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
import { getProductById, getProducts } from "@/services";
import { useReviews } from "@/lib/hooks/useReviews";

export default function ProductDetailPage() {
  const params = useParams();
  const { reviews, loading: reviewsLoading, averageRating, totalReviews, addReview } = useReviews(params.id);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    let active = true;

    const loadProduct = async () => {
      setLoading(true);
      setError("");
      try {
        const fetchedProduct = await getProductById(params.id);
        if (!active) return;
        setProduct(fetchedProduct);

        const { products } = await getProducts();
        if (!active) return;
        const currentId = String(fetchedProduct?.id || fetchedProduct?._id);
        const related = products
          .filter((p) => String(p.id || p._id) !== currentId)
          .slice(0, 3);
        setRelatedProducts(related);
      } catch (err) {
        console.error("Failed to load product", err);
        if (!active) return;
        setError("Product not found.");
      } finally {
        if (!active) return;
        setLoading(false);
      }
    };

    loadProduct();

    return () => {
      active = false;
    };
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

  if (!product || error) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center py-20">
          <p>{error || "Product not found"}</p>
        </div>
      </PageWrapper>
    );
  }

  const handleAddToCart = (item) => {
    console.log("Add to cart:", item);
    // TODO: Integrate with cart context/service
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Posters", href: "/products" },
    ...(product.category ? [{ label: product.category, href: `/products?category=${product.category}` }] : []),
    { label: product.title || "Product" },
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
            images={
              product.images || [
                product.image || "/products/4ad9203dd2a598811e58c6fc9a3fca19c5bccd53.jpg",
              ]
            }
            title={product.title || "Product"}
          />
        </div>

        {/* Right: Product Info */}
        <div>
          <ProductInfo product={product} onAddToCart={handleAddToCart} />
        </div>
      </div>

      {/* Ratings & Reviews */}
      <ProductRatings 
        rating={averageRating} 
        reviews={reviews} 
        totalReviews={totalReviews}
        onAddReview={addReview}
        loading={reviewsLoading}
      />

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} />
    </PageWrapper>
  );
}
