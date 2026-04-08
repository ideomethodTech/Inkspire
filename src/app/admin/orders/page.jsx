"use client";

import { useEffect, useState } from "react";
import { Search, Filter, MoreHorizontal, Download, Plus } from "lucide-react";
import api from "@/lib/api";

const paymentStyle = (status) => {
  switch (status?.toLowerCase()) {
    case "paid": return "bg-green-100 text-green-600";
    case "pending": return "bg-yellow-100 text-yellow-600";
    case "failed": return "bg-red-100 text-red-600";
    default: return "bg-gray-100 text-gray-500";
  }
};

const shippingStyle = (status) => {
  switch (status?.toLowerCase()) {
    case "delivered": return "bg-green-100 text-green-600";
    case "shipped": return "bg-blue-100 text-blue-600";
    case "processing": return "bg-purple-100 text-purple-600";
    case "pending": return "bg-yellow-100 text-yellow-600";
    case "cancelled": return "bg-red-100 text-red-600";
    default: return "bg-gray-100 text-gray-500";
  }
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await api.get("/api/orders/admin/all", {
          params: { page, limit: 10 },
        });
        const data = res.data?.data;
        setOrders(data?.orders || []);
        setTotal(data?.total || 0);
        setTotalPages(data?.pages || 1);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page]);

  const filtered = orders.filter((o) => {
    const q = search.toLowerCase();
    return (
      o.orderNumber?.toLowerCase().includes(q) ||
      o.user?.name?.toLowerCase().includes(q) ||
      o.user?.email?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Orders Management</h1>
          <p className="text-sm text-gray-500">
            Manage and track your poster sales worldwide
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm">
            <Download size={16} />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm">
            <Plus size={16} />
            Create New Order
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-3">
        <div className="flex items-center gap-2 flex-1 border rounded-lg px-3 py-2">
          <Search size={16} className="text-gray-400" />
          <input
            placeholder="Search by Order ID, customer name, email..."
            className="w-full outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 border rounded-lg text-sm">
          <Filter size={16} />
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        {loading ? (
          <p className="p-6 text-sm text-gray-400">Loading orders...</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr className="text-left">
                <th className="p-4">ORDER ID</th>
                <th className="p-4">CUSTOMER</th>
                <th className="p-4">POSTER DETAILS</th>
                <th className="p-4">AMOUNT</th>
                <th className="p-4">PAYMENT</th>
                <th className="p-4">SHIPPING</th>
                <th className="p-4"></th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((order) => {
                const firstItem = order.items?.[0];
                const productName = firstItem?.name || firstItem?.productName || "—";
                const productMeta = firstItem?.size
                  ? `${firstItem.size}${firstItem.finish ? " · " + firstItem.finish : ""}`
                  : `${order.items?.length || 1} item(s)`;

                return (
                  <tr key={order._id} className="border-t hover:bg-gray-50 transition">
                    <td className="p-4 font-medium">{order.orderNumber}</td>

                    <td className="p-4">
                      <p className="font-medium">{order.user?.name || "—"}</p>
                      <p className="text-gray-400 text-xs">{order.user?.email}</p>
                    </td>

                    <td className="p-4">
                      <p className="font-medium">{productName}</p>
                      <p className="text-xs text-gray-400">{productMeta}</p>
                    </td>

                    <td className="p-4 font-medium">
                      ${order.totals?.total?.toFixed(2) || "0.00"}
                    </td>

                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${paymentStyle(order.paymentMethod?.status)}`}>
                        {order.paymentMethod?.status || "—"}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${shippingStyle(order.status?.current)}`}>
                        {order.status?.current?.toUpperCase() || "—"}
                      </span>
                    </td>

                    <td className="p-4">
                      <button className="text-gray-400 hover:text-gray-700 transition">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-gray-400 text-sm">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center p-4 text-sm text-gray-500 border-t">
          <p>
            Showing {filtered.length} of {total} orders
          </p>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 border rounded ${page === i + 1 ? "bg-black text-white" : ""}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "Total Orders", value: total, change: "All time" },
          { title: "Pending Shipments", value: orders.filter(o => o.status?.current === "pending").length, change: "Needs action" },
          { title: "Avg. Order Value", value: orders.length ? `$${(orders.reduce((s, o) => s + (o.totals?.total || 0), 0) / orders.length).toFixed(2)}` : "$0.00", change: "This page" },
          { title: "Gross Revenue", value: `$${orders.reduce((s, o) => s + (o.totals?.total || 0), 0).toFixed(2)}`, change: "This page" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border">
            <p className="text-sm text-gray-500">{stat.title}</p>
            <h2 className="text-xl font-semibold">{stat.value}</h2>
            <p className="text-gray-400 text-sm">{stat.change}</p>
          </div>
        ))}
      </div>
    </div>
  );
}