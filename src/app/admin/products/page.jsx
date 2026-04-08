"use client";

import { useEffect, useState } from "react";
import { Search, Filter, MoreVertical, Plus } from "lucide-react";
import api from "@/lib/api";
import Image from "next/image";

export default function PostersPage() {
  const [posters, setPosters] = useState([]);
  const [loading, setLoading] = useState(true);

 const handleDelete = async (id) => {
  try {
    await api.delete(`/api/admin/products/${id}`);

    // remove from UI instantly
    setPosters((prev) => prev.filter((p) => p._id !== id));

  } catch (err) {
    console.error("Delete failed:", err);
  }
}; 

  // 🔹 Fetch products from backend
  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const res = await api.get("/api/admin/products");

        console.log("PRODUCTS RESPONSE:", res.data);

        // adjust depending on backend response shape
        setPosters(res.data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosters();
  }, []);

  // 🔹 Status styling (we'll map backend → UI)
  const getStatusStyle = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-600";
      case "Low Stock":
        return "bg-orange-100 text-orange-600";
      case "Out of Stock":
        return "bg-red-100 text-red-600";
      default:
        return "";
    }
  };

 const formatPoster = (product) => {
  // 🔹 Calculate total stock from variants
  const totalStock = product.variants?.reduce(
    (sum, v) => sum + (v.stock || 0),
    0
  );

  // 🔹 Get sizes
  const sizes =
    product.variants?.map((v) => v.size).join(", ") || "N/A";

  // 🔹 Status logic
  let status = "In Stock";
  if (totalStock === 0) status = "Out of Stock";
  else if (totalStock < 5) status = "Low Stock";

  return {
    title: product.name,
    artist: product.type, // you don’t have artist → using type
    category: product.category,
    sizes,
    price: `$${product.price}`,
    status,
    image: product.images?.[0], // first image
  };
};

  // 🔹 Loading UI
  if (loading) {
    return <p className="p-6">Loading posters...</p>;
  }

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Posters Catalog</h1>
          <p className="text-sm text-gray-500">
            Manage and organize all posters in your store
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
          <Plus size={16} />
          Add Poster
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-3">
        <div className="flex items-center gap-2 flex-1 border rounded-lg px-3 py-2">
          <Search size={16} className="text-gray-400" />
          <input
            placeholder="Search posters, artists, or categories..."
            className="w-full outline-none text-sm"
          />
        </div>

        <button className="flex items-center gap-2 px-4 border rounded-lg text-sm">
          <Filter size={16} />
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr className="text-left">
              <th className="p-4">POSTER DETAILS</th>
              <th className="p-4">CATEGORY</th>
              <th className="p-4">SIZES</th>
              <th className="p-4">PRICE</th>
              <th className="p-4">STATUS</th>
              <th className="p-4"></th>
            </tr>
          </thead>

          <tbody>
            {posters.map((product, i) => {
              const poster = formatPoster(product);

              return (
                <tr key={product._id}>

                  {/* Poster Info */}
                  <td className="p-4 flex items-center gap-3">
                    {poster.image ? (
  <Image
    src={poster.image}
    alt={poster.title}
    className="w-12 h-12 object-cover rounded-md"
  />
) : (
  <div className="w-12 h-12 bg-gray-200 rounded-md" />
)}
                    <div>
                      <p className="font-medium">{poster.title}</p>
                      <p className="text-xs text-gray-400">
                        by {poster.artist}
                      </p>
                    </div>
                  </td>

                  <td className="p-4">{poster.category}</td>
                  <td className="p-4">{poster.sizes}</td>

                  <td className="p-4">
                    <span className="px-3 py-1 bg-gray-100 rounded-full">
                      {poster.price}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(
                        poster.status
                      )}`}
                    >
                      {poster.status}
                    </span>
                  </td>

                  <td className="p-4">
                  <button onClick={() => handleDelete(product._id)}>
  <MoreVertical size={18} />
</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex justify-between items-center p-4 text-sm text-gray-500">
          <p>Showing {posters.length} posters</p>

          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded">‹</button>
            <button className="px-3 py-1 border rounded">›</button>
          </div>
        </div>
      </div>
    </div>
  );
}