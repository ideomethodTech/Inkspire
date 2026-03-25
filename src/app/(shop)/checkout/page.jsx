"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PageWrapper from "@/components/layout/PageWrapper";
import { Headline, Body2, Caption, Label } from "@/components/typography";
import Button from "@/components/ui/Buttons";
import { createOrder } from "@/api/orders";
import { getCart } from "@/api/cart";
import { getProductById } from "@/services";
import { useAddress } from "@/lib/hooks/useAddress";

const FALLBACK_IMAGE =
  "/products/4ad9203dd2a598811e58c6fc9a3fca19c5bccd53.jpg";

const REQUIRED_ADDRESS_FIELDS = [
  "name",
  "phone",
  "street",
  "city",
  "state",
  "zipCode",
];

const mapAddressToForm = (address) => ({
  name: String(address?.name || address?.fullName || "").trim(),
  phone: String(address?.phone || address?.phoneNumber || "").trim(),
  addressLine: String(
    address?.addressLine ||
      address?.street ||
      address?.addressLine1 ||
      address?.line1 ||
      address?.address ||
      ""
  ).trim(),
  city: String(address?.city || "").trim(),
  state: String(address?.state || address?.province || "").trim(),
  zip: String(
    address?.zip ||
      address?.zipCode ||
      address?.postalCode ||
      address?.pincode ||
      ""
  ).trim(),
  country: String(address?.country || "India").trim(),
});

const normalizeAddressForOrder = (address) => ({
  name: String(address?.name || address?.fullName || "").trim(),
  phone: String(address?.phone || address?.phoneNumber || "").trim(),
  street: String(
    address?.street ||
      address?.addressLine ||
      address?.addressLine1 ||
      address?.line1 ||
      address?.address ||
      ""
  ).trim(),
  city: String(address?.city || "").trim(),
  state: String(address?.state || address?.province || "").trim(),
  zipCode: String(
    address?.zipCode ||
      address?.zip ||
      address?.postalCode ||
      address?.pincode ||
      ""
  ).trim(),
  country: String(address?.country || "India").trim(),
});

const hasAnyAddressInput = (address) => {
  const normalized = normalizeAddressForOrder(address);
  return REQUIRED_ADDRESS_FIELDS.some(
    (field) => String(normalized?.[field] ?? "").length > 0
  );
};

const isAddressComplete = (address) => {
  const normalized = normalizeAddressForOrder(address);
  return REQUIRED_ADDRESS_FIELDS.every(
    (field) => String(normalized?.[field] ?? "").length > 0
  );
};

export default function CheckoutPage() {
  const router = useRouter();
  const { addresses, loading: addressesLoading } = useAddress();
  const [items, setItems] = useState([]);
  const [cartError, setCartError] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
  });

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );
  const gst = useMemo(() => subtotal * 0.18, [subtotal]);
  const deliveryFee = subtotal >= 500 ? 0 : 50;
  const total = subtotal + gst + deliveryFee;

  useEffect(() => {
    let active = true;

    const normalizeCartItems = (rawItems = []) =>
      rawItems.map((item, index) => {
        const product = item.product || item;
        const productId = item.productId || product.id || product._id || item.id;
        const variantIndex =
          typeof item.variantIndex === "number" ? item.variantIndex : 0;
        const variant = product?.variants?.[variantIndex];
        const price = item.price ?? variant?.price ?? product?.price ?? 0;
        const size = item.size || variant?.size || "N/A";
        const image = product?.images?.[0] || item.image || FALLBACK_IMAGE;
        const title = product?.name || product?.title || item.title || "Product";
        const quantity = item.quantity ?? 1;

        return {
          id: `${productId || "item"}-${variantIndex}-${index}`,
          productId,
          variantIndex,
          title,
          price,
          size,
          quantity,
          image,
        };
      });

    const enrichCartItems = async (rawItems = []) => {
      const normalized = normalizeCartItems(rawItems);
      const cache = new Map();

      const enriched = await Promise.all(
        normalized.map(async (item) => {
          if (!item.productId) return item;
          const needsProduct =
            item.price === 0 ||
            item.title === "Product" ||
            item.image === FALLBACK_IMAGE;
          if (!needsProduct) return item;

          if (!cache.has(item.productId)) {
            cache.set(item.productId, getProductById(item.productId));
          }

          try {
            const product = await cache.get(item.productId);
            const variants = Array.isArray(product?.variants)
              ? product.variants
              : [];
            const variant = variants[item.variantIndex] || variants[0];
            return {
              ...item,
              title: product?.title || product?.name || item.title,
              image: product?.images?.[0] || item.image || FALLBACK_IMAGE,
              price: item.price || variant?.price || product?.price || item.price,
              size: item.size || variant?.size || item.size,
            };
          } catch (err) {
            console.warn("Failed to enrich checkout item", err);
            return item;
          }
        })
      );

      return enriched;
    };

    const loadCart = async () => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        setCartError("Please sign in to view checkout.");
        return;
      }

      try {
        const res = await getCart();
        const apiItems = res?.data?.items || res?.items || [];
        if (res?.success && apiItems.length > 0) {
          const hydrated = await enrichCartItems(apiItems);
          if (active) {
            setItems(hydrated);
            setCartError("");
          }
        } else if (active) {
          setItems([]);
          setCartError("Your cart is empty.");
        }
      } catch (err) {
        console.warn("Failed to load cart for checkout", err);
        if (active) {
          setCartError("Unable to load cart.");
        }
      }
    };

    loadCart();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (addressesLoading) return;
    if (!addresses?.length) return;
    if (!hasAnyAddressInput(shippingAddress)) {
      const address = addresses[0];
      setShippingAddress(mapAddressToForm(address));
    }
  }, [addressesLoading, addresses, shippingAddress]);

  const handleChange = (key, value) => {
    setShippingAddress((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelectAddress = (address) => {
    setShippingAddress(mapAddressToForm(address));
  };

  const getErrorMessage = (err) => {
    if (!err) return "Order failed. Please try again.";
    if (typeof err === "string") return err;
    if (err?.response?.data?.message) return err.response.data.message;
    if (err?.message) return err.message;
    return "Order failed. Please try again.";
  };

  const handlePlaceOrder = async () => {
    setMessage("");
    if (!isAddressComplete(shippingAddress)) {
      setMessage("Please complete your shipping address.");
      return;
    }
    setLoading(true);
    const normalizedAddress = normalizeAddressForOrder(shippingAddress);
    const orderPayload = {
      shippingAddress: normalizedAddress,
      paymentMethod: "cod",
      notes,
    };
    try {
      const res = await createOrder(orderPayload);
      if (!res?.success) {
        throw new Error(res?.message || "Order creation failed");
      }
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("cart:updated"));
      }
      setMessage("Order placed successfully.");
      router.push("/user/orders");
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      console.warn("Order API failed", err);
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="py-10">
        <Headline className="text-[44px] tracking-[0.16em] text-[#20262B]">
          Checkout
        </Headline>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_420px]">
          <div className="space-y-8">
            {/* Saved Addresses */}
            {addresses.length > 0 && (
              <section className="rounded-lg border border-neutral-200 bg-white p-6">
                <Label className="text-[12px] uppercase tracking-[0.16em] text-[#6D6D6D]">
                  Select Saved Address
                </Label>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {addresses.map((addr) => (
                    <button
                      key={addr._id || addr.id}
                      onClick={() => handleSelectAddress(addr)}
                      className={`flex flex-col items-start rounded-lg border p-4 text-left transition-all ${
                        shippingAddress.addressLine === addr.addressLine
                          ? "border-black bg-neutral-50"
                          : "border-neutral-200 hover:border-neutral-300"
                      }`}
                    >
                      <span className="font-semibold text-sm">{addr.name}</span>
                      <span className="text-xs text-neutral-500 mt-1">{addr.addressLine}</span>
                      <span className="text-xs text-neutral-500">{addr.city}, {addr.state} {addr.zip}</span>
                      <span className="text-xs text-neutral-500 mt-1">{addr.phone}</span>
                    </button>
                  ))}
                </div>
              </section>
            )}

            <section className="rounded-lg border border-neutral-200 bg-white p-6">
              <Label className="text-[12px] uppercase tracking-[0.16em] text-[#6D6D6D]">
                Shipping Address
              </Label>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <input
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
                  placeholder="Full name"
                  value={shippingAddress.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
                <input
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
                  placeholder="Phone"
                  value={shippingAddress.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
                <input
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm sm:col-span-2"
                  placeholder="Address Line"
                  value={shippingAddress.addressLine}
                  onChange={(e) => handleChange("addressLine", e.target.value)}
                />
                <input
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
                  placeholder="City"
                  value={shippingAddress.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                />
                <input
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
                  placeholder="State"
                  value={shippingAddress.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                />
                <input
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
                  placeholder="ZIP code"
                  value={shippingAddress.zip}
                  onChange={(e) => handleChange("zip", e.target.value)}
                />
                <input
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
                  placeholder="Country"
                  value={shippingAddress.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                />
              </div>
            </section>

            <section className="rounded-lg border border-neutral-200 bg-white p-6">
              <Label className="text-[12px] uppercase tracking-[0.16em] text-[#6D6D6D]">
                Notes (optional)
              </Label>
              <textarea
                className="mt-3 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
                rows={3}
                placeholder="Leave at gate"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </section>

            {message && (
              <p className="text-sm text-[#20262B]">{message}</p>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-lg border border-neutral-200 bg-white p-6">
              <Label className="text-[12px] uppercase tracking-[0.16em] text-[#6D6D6D]">
                Order Summary
              </Label>
              <div className="mt-4 space-y-4">
                {items.length === 0 && (
                  <Caption className="text-[11px] text-[#6D6D6D]">
                    {cartError || "Your cart is empty."}
                  </Caption>
                )}
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative h-20 w-16 overflow-hidden rounded-md bg-neutral-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1">
                      <Body2 className="text-[13px] uppercase tracking-[0.12em] text-[#20262B]">
                        {item.title}
                      </Body2>
                      <Caption className="text-[11px] text-[#6D6D6D]">
                        Size: {item.size} · Qty: {item.quantity}
                      </Caption>
                    </div>
                    <Body2 className="text-[13px] text-[#20262B]">
                      Rs. {item.price}
                    </Body2>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2 text-[13px] text-[#20262B]">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>Rs.{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>GST (18%)</span>
                  <span>Rs.{gst.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Delivery</span>
                  <span>{deliveryFee === 0 ? "Free" : `Rs.${deliveryFee}`}</span>
                </div>
                <div className="flex items-center justify-between border-t border-neutral-200 pt-3 text-[15px] font-semibold">
                  <span>Total</span>
                  <span>Rs.{total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                className="mt-6 h-12 w-full bg-black text-white"
                disabled={loading || items.length === 0}
                onClick={handlePlaceOrder}
              >
                {loading ? "Placing order..." : "Place order"}
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </PageWrapper>
  );
}
