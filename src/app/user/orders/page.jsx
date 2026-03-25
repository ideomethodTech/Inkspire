"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ShoppingBag, Truck, Package, Clock, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Body1, Body2, Caption, Label, Subheading2 } from "@/components/typography";
import Button from "@/components/ui/Buttons";
import { getOrders, getOrderDetails, cancelOrder } from "@/api/orders";
import { useOrderTracking } from "@/lib/hooks/useOrderTracking";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const mapApiOrders = (apiOrders = []) => {
    return apiOrders.map((o) => {
      const steps = ["Placed", "Shipped", "Out for Delivery", "Delivery"];
      const statusIndexMap = {
        PENDING: 0,
        SHIPPED: 1,
        OUT_FOR_DELIVERY: 2,
        DELIVERED: 3,
        CANCELLED: 0,
      };
      const statusValue = (o.status || "").toString().toUpperCase();
      const currentStep = statusIndexMap[statusValue] ?? 0;

      return {
        id: o._id || o.id,
        orderNumber: o.orderNumber || o.orderNo || o.number,
        eta: o.estimatedDelivery || "TBD",
        status: statusValue || o.status || "PENDING",
        statusColor:
          statusValue === "PENDING"
            ? "bg-yellow-500 text-white"
            : statusValue === "SHIPPED"
            ? "bg-blue-500 text-white"
            : statusValue === "OUT_FOR_DELIVERY"
            ? "bg-orange-500 text-white"
            : statusValue === "DELIVERED"
            ? "bg-green-500 text-white"
            : "bg-gray-500 text-white",
        steps,
        completedSteps: steps.map((_, i) => i).filter((i) => i < currentStep),
        currentStep,
        items: (o.items || o.products || []).map((it, idx) => ({
          id: idx,
          title: it?.product?.name || it?.product?.title || it?.name || "Product",
          size: it?.size || it?.variant?.size || "N/A",
          price: it?.price || it?.variant?.price || 0,
          image:
            it?.product?.images?.[0] ||
            it?.images?.[0] ||
            "/products/509e4f2b10c9e62dfc885e829716feb3618ae498.jpg",
        })),
      };
    });
  };

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const token =
        typeof window !== "undefined" ? window.localStorage.getItem("token") : null;
      if (!token) {
        setOrders([]);
        setError("Please sign in to view your orders.");
        return;
      }
      const data = await getOrders(page);
      const apiOrders = data?.data?.orders || (Array.isArray(data?.orders) ? data.orders : (Array.isArray(data) ? data : []));
      if (apiOrders.length === 0) {
        setOrders([]);
        return;
      }

      const detailedOrders = await Promise.all(
        apiOrders.map(async (order) => {
          const id = order._id || order.id;
          if (!id) return order;
          try {
            const detailsRes = await getOrderDetails(id);
            return detailsRes?.data || detailsRes || order;
          } catch (detailErr) {
            console.warn("Failed to load order details", detailErr);
            return order;
          }
        })
      );

      setOrders(mapApiOrders(detailedOrders));
    } catch (err) {
      console.log("Orders API failed — using fallback", err);
      setOrders([]);
      setError("Unable to load orders.");
    } finally {
      setLoading(false);
    }
  }, [page]);


  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="flex-1 space-y-6">
      <Subheading2 className="text-[24px] font-semibold uppercase tracking-[0.1em] text-[#20262B]">
        My Orders
      </Subheading2>

      {loading && <p className="text-gray-500 text-sm">Loading orders...</p>}

      <div className="space-y-6">
        {!loading && orders.length === 0 && (
          <p className="text-sm text-gray-500">{error || "No orders yet."}</p>
        )}
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onCancel={async () => {
              if (!order.id) return;
              try {
                const res = await cancelOrder(order.id);
                if (res?.success) {
                  fetchOrders();
                }
              } catch (cancelErr) {
                console.warn("Cancel order failed", cancelErr);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}


function OrderCard({ order, onCancel }) {
  const [showTracking, setShowTracking] = useState(false);
  const { tracking, loading: trackingLoading } = useOrderTracking(showTracking ? order.id : null);
  const total = order.items.reduce((sum, item) => sum + item.price, 0);

  const getStatusIcon = (status) => {
    switch (status?.toUpperCase()) {
      case "PENDING":
      case "PLACED":
      case "PROCESSING": return <Clock size={16} />;
      case "SHIPPED": return <Truck size={16} />;
      case "OUT_FOR_DELIVERY": return <Package size={16} />;
      case "DELIVERED": return <CheckCircle size={16} />;
      default: return <Package size={16} />;
    }
  };

  return (
    <section className="rounded-lg bg-white p-6 shadow-sm border border-neutral-100">
      {/* Order Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShoppingBag size={20} className="text-[#6D6D6D]" />
          <div>
            <Label className="text-[12px] uppercase tracking-[0.16em] text-[#6D6D6D]">
              Order ID
            </Label>
            <Body2 className="text-[14px] font-medium text-[#20262B]">{order.id}</Body2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Caption className="text-[12px] text-[#6D6D6D] uppercase tracking-[0.16em]">
            Estimated arrival: {order.eta}
          </Caption>
          <span className={`rounded-full px-3 py-1 text-[12px] font-semibold ${order.statusColor}`}>
            {order.status}
          </span>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="relative mb-6">
        <div className="flex items-center justify-between">
          {order.steps.map((step, idx) => {
            const isCompleted = order.completedSteps.includes(idx);
            const isCurrent = idx === order.currentStep;
            return (
              <div key={step} className="flex flex-1 flex-col items-center">
                <div className="relative flex w-full items-center">
                  <div
                    className={`relative z-10 h-3 w-3 rounded-full ${
                      isCompleted || isCurrent ? "bg-orange-500" : "bg-gray-300"
                    }`}
                  >
                    {isCurrent && (
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <div className="relative">
                          <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-red-500" />
                          <div className="rounded bg-red-500 px-2 py-1">
                            <Caption className="text-[10px] font-semibold text-white">
                              {order.status}
                            </Caption>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {idx < order.steps.length - 1 && (
                    <div
                      className={`absolute left-[12px] h-[2px] w-full ${
                        isCompleted ? "bg-orange-500" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
                <Caption className="mt-2 text-[11px] text-[#6D6D6D]">{step}</Caption>
              </div>
            );
          })}
        </div>
      </div>

      {/* Items */}
      <div className="mb-6 space-y-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <div className="relative h-24 w-20 overflow-hidden rounded-md bg-gray-100">
              <Image src={item.image} alt={item.title} fill className="object-cover" sizes="80px" />
            </div>
            <div className="flex-1">
              <Body1 className="text-[14px] font-semibold uppercase tracking-[0.08em] text-[#20262B]">
                {item.title}
              </Body1>
              <Caption className="text-[11px] text-[#6D6D6D]">Size: {item.size}</Caption>
            </div>
            <Body1 className="text-[14px] text-[#20262B]">Rs. {item.price.toFixed(2)}</Body1>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#20262B]" />
            <div>
              <Body1 className="text-[16px] font-semibold text-[#20262B]">
                Total: Rs. {total.toFixed(2)}
              </Body1>
              <Caption className="text-[11px] text-[#6D6D6D]">
                ({order.items.length} Items)
              </Caption>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {order.status === "PENDING" && (
              <Button
                className="bg-white text-black border border-neutral-100 hover:bg-gray-50 uppercase tracking-[0.08em] text-[11px]"
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
            <Button 
              onClick={() => setShowTracking(!showTracking)}
              className="bg-black text-white hover:bg-gray-800 uppercase tracking-[0.08em] text-[11px] flex items-center gap-2"
            >
              {showTracking ? "Hide Details" : "Details"}
              {showTracking ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Expanded Tracking Details */}
      {showTracking && (
        <div className="mt-6 border-t border-neutral-100 pt-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Label className="text-[12px] uppercase tracking-wider text-neutral-500 mb-4 block">Tracking Information</Label>
              {trackingLoading ? (
                <p className="text-sm text-neutral-400">Loading tracking info...</p>
              ) : tracking ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-neutral-50 rounded">
                    <span className="text-sm text-neutral-600">Tracking ID</span>
                    <span className="text-sm font-semibold">{tracking.trackingId || "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-neutral-50 rounded">
                    <span className="text-sm text-neutral-600">Carrier</span>
                    <span className="text-sm font-semibold">{tracking.carrier || "BlueDart"}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-neutral-50 rounded">
                    <span className="text-sm text-neutral-600">Last Updated</span>
                    <span className="text-sm font-semibold">{tracking.updatedAt ? new Date(tracking.updatedAt).toLocaleString() : "Recently"}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-neutral-400">Tracking information not yet available.</p>
              )}
            </div>

            <div>
              <Label className="text-[12px] uppercase tracking-wider text-neutral-500 mb-4 block">Order Timeline</Label>
              <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-neutral-200">
                {(tracking?.history || [
                  { status: "PLACED", message: "Order has been placed", date: order.createdAt || new Date() },
                  { status: "PROCESSING", message: "Order is being processed", date: order.updatedAt || new Date() }
                ]).map((event, idx) => (
                  <div key={idx} className="relative pl-8">
                    <div className={`absolute left-0 top-1 w-[22px] h-[22px] rounded-full flex items-center justify-center border-2 border-white z-10 ${
                      idx === 0 ? "bg-black text-white" : "bg-neutral-200 text-neutral-500"
                    }`}>
                      {getStatusIcon(event.status)}
                    </div>
                    <div>
                      <p className={`text-[13px] font-semibold ${idx === 0 ? "text-black" : "text-neutral-500"}`}>
                        {event.status?.replace(/_/g, " ")}
                      </p>
                      <p className="text-[12px] text-neutral-500">{event.message}</p>
                      <Caption className="text-[10px] text-neutral-400">
                        {event.date ? new Date(event.date).toLocaleString() : ""}
                      </Caption>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
