"use client";

import { useState } from "react";
import { Headline, Body1, Body2, BodyXS, Caption, Label } from "@/components/typography";
import Button from "@/components/ui/Buttons";
import { addToCart } from "@/api/cart";

export default function ProductInfo({ product, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState("A4");
  const [quantity, setQuantity] = useState(1);
  const [expandedSections, setExpandedSections] = useState({});
  const [cartMessage, setCartMessage] = useState("");
  const priceNumber =
    typeof product.price === "number" ? product.price : Number(product.price);
  const hasPrice = Number.isFinite(priceNumber);

  const sizes = ["A4", "A3", "13 x 19"];

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleAddToCart = async () => {
    setCartMessage("");
    const token =
      typeof window !== "undefined" ? window.localStorage.getItem("token") : null;
    if (!token) {
      setCartMessage("Please sign in to add items to cart.");
      return;
    }

    const productId = product.id || product._id;
    if (!productId) {
      setCartMessage("Unable to add this product.");
      return;
    }

    const variants = Array.isArray(product.variants) ? product.variants : [];
    let variantIndex = variants.findIndex((v) => v.size === selectedSize);
    if (variantIndex < 0) variantIndex = 0;

    try {
      const res = await addToCart({
        productId,
        variantIndex,
        quantity,
      });
      if (res?.success) {
        setCartMessage("Added to cart.");
        if (onAddToCart) {
          onAddToCart({
            ...product,
            size: selectedSize,
            quantity,
          });
        }
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("cart:updated"));
        }
      } else {
        setCartMessage(res?.message || "Unable to add to cart.");
      }
    } catch (err) {
      setCartMessage("Unable to add to cart.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <Headline className="text-[24px] md:text-[32px] uppercase tracking-[0.1em]">
        {product.title || product.name || "Untitled"}
      </Headline>

      {/* Price */}
      <div className="flex flex-col gap-1">
        <Body1 className="text-[24px] md:text-[28px] font-semibold text-[#20262B]">
          {hasPrice
            ? `Rs. ${priceNumber.toLocaleString("en-IN")}`
            : "Price unavailable"}
        </Body1>
        <Caption className="text-[11px] uppercase tracking-[0.16em] text-[#6D6D6D]">
          MRP inclusive of all taxes
        </Caption>
      </div>

      {/* Bulk Pricing */}
      <div className="flex items-center gap-2">
        <BodyXS className="text-[14px] text-[#20262B]">
          Buying more? Get them at better value
        </BodyXS>
        <button
          type="button"
          className="text-[14px] font-semibold underline underline-offset-4 text-[#202125] hover:text-[#202125]"
        >
          SEE BULK PRICING
        </button>
      </div>

      {/* Size Selection */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Label className="text-[12px] uppercase tracking-[0.16em] text-[#20262B]">
            SELECT SIZE
          </Label>
          <button
            type="button"
            className="text-[12px] font-semibold underline underline-offset-4 text-[#202125] hover:text-[#202125]"
          >
            SIZE GUIDE
          </button>
        </div>
        <div className="flex gap-3">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`px-6 py-2 border-2 uppercase text-[12px] font-medium tracking-[0.16em] transition-all ${selectedSize === size
                  ? "border-black bg-black text-white"
                  : "border-neutral-300 bg-white text-[#20262B] hover:border-black"
                }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity & Add to Cart */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 border-2 border-neutral-300">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 text-[#20262B] hover:bg-neutral-100"
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="min-w-[3ch] text-center text-[14px] font-medium text-[#20262B]">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 text-[#20262B] hover:bg-neutral-100"
          >
            +
          </button>
        </div>
        <Button
          onClick={handleAddToCart}
          className="flex-1 bg-[#202125] hover:bg-[#202125] text-white uppercase tracking-[0.16em]"
        >
          ADD
        </Button>
      </div>
      {cartMessage && (
        <Caption className="text-[11px] uppercase tracking-[0.16em] text-[#6D6D6D]">
          {cartMessage}
        </Caption>
      )}

      {/* Customization */}
      <button
        type="button"
        className="text-left text-[14px] font-semibold underline underline-offset-4 text-[#202125] hover:text-[#202125]"
      >
        Want a customize poster?
      </button>

      {/* Promotional Banner */}
      <div className="bg-[#E11B1B] px-4 py-3 text-white">
        <div className="flex items-center justify-between">
          <BodyXS className="text-[14px] font-semibold uppercase tracking-[0.16em]">
            10% OFF FIRST ORDER
          </BodyXS>
          <Caption className="text-[11px] uppercase tracking-[0.16em]">
            Time left 3d 12h 47m
          </Caption>
        </div>
      </div>

      {/* Collapsible Sections */}
      <div className="flex flex-col gap-2 border-t border-neutral-200 pt-4">
        {[
          { key: "description", label: "DESCRIPTION" },
          { key: "delivery", label: "DELIVERY, PAYMENT & RETURNS" },
          { key: "information", label: "INFORMATION" },
        ].map(({ key, label }) => (
          <div key={key} className="border-b border-neutral-200 pb-3">
            <button
              type="button"
              onClick={() => toggleSection(key)}
              className="flex w-full items-center justify-between"
            >
              <Label className="text-[12px] uppercase tracking-[0.16em] text-[#20262B]">
                {label}
              </Label>
              <span className="text-lg leading-none text-[#20262B]">
                {expandedSections[key] ? "−" : "+"}
              </span>
            </button>
            {expandedSections[key] && (
              <div className="mt-3 text-[14px] text-[#6D6D6D]">
                {key === "description" && (
                  <Body2>
                    {product.description ||
                      "High-quality poster featuring your favorite superhero character. Perfect for decorating your space with vibrant colors and detailed artwork."}
                  </Body2>
                )}
                {key === "delivery" && (
                  <div className="flex flex-col gap-2">
                    <Body2>Free shipping on orders above Rs. 500</Body2>
                    <Body2>Delivery within 5-7 business days</Body2>
                    <Body2>Easy returns within 7 days of delivery</Body2>
                  </div>
                )}
                {key === "information" && (
                  <div className="flex flex-col gap-2">
                    <Body2>Material: Premium paper</Body2>
                    <Body2>Print quality: High-resolution</Body2>
                    <Body2>Frame not included</Body2>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
