"use client";

import { Search, Filter, MoreHorizontal, Download, Plus } from "lucide-react";

export default function OrdersPage() {
  const orders = Array(5).fill({
    id: "#8830",
    name: "Alex Rivera",
    email: "alexr@example.com",
    product: "Solar System Map",
    size: "A2 · Glossy Print",
    amount: "$145.00",
    payment: "Paid",
    shipping: "SHIPPED",
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

      {/* Search + Filter */}
      <div className="flex gap-3">
        <div className="flex items-center gap-2 flex-1 border rounded-lg px-3 py-2">
          <Search size={16} className="text-gray-400" />
          <input
            placeholder="Search by Order ID, customer name, email..."
            className="w-full outline-none text-sm"
          />
        </div>

        <button className="flex items-center gap-2 px-4 border rounded-lg text-sm">
          <Filter size={16} />
          Filter
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap text-sm">
        {["Date: Last 30 Days", "Payment: All", "Shipping: All"].map(
          (item, i) => (
            <span
              key={i}
              className="px-3 py-1 border rounded-full text-red-500 border-red-300"
            >
              {item} ✕
            </span>
          )
        )}
        <button className="text-red-500">Clear Filters</button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
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
            {orders.map((order, i) => (
              <tr key={i} className="border-t">
                <td className="p-4 font-medium">{order.id}</td>

                <td className="p-4">
                  <p className="font-medium">{order.name}</p>
                  <p className="text-gray-400 text-xs">{order.email}</p>
                </td>

                <td className="p-4">
                  <p className="font-medium">{order.product}</p>
                  <p className="text-xs text-gray-400">{order.size}</p>
                </td>

                <td className="p-4">{order.amount}</td>

                <td className="p-4">
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                    {order.payment}
                  </span>
                </td>

                <td className="p-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                    {order.shipping}
                  </span>
                </td>

                <td className="p-4">
                  <MoreHorizontal size={18} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex justify-between items-center p-4 text-sm text-gray-500">
          <p>Showing 1 to 5 of 1,284 results</p>

          <div className="flex gap-2 items-center">
            <button className="px-3 py-1 border rounded">1</button>
            <button className="px-3 py-1 border rounded">2</button>
            <button className="px-3 py-1 border rounded">3</button>
            <span>...</span>
            <button className="px-3 py-1 border rounded">257</button>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "Total Revenue", value: "3,237", change: "+12.5%" },
          { title: "Pending Shipments", value: "42", change: "42 active" },
          { title: "Avg. Order Value", value: "$45.80", change: "+2.1%" },
          { title: "Gross Revenue", value: "$58,740", change: "+2.1%" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border">
            <p className="text-sm text-gray-500">{stat.title}</p>
            <h2 className="text-xl font-semibold">{stat.value}</h2>
            <p className="text-green-500 text-sm">{stat.change}</p>
          </div>
        ))}
      </div>
    </div>
  );
}