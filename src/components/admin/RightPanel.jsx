'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import Image from 'next/image';

const ImageIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const TruckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const AlertCircleIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export default function RightPanel() {
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const res = await api.get('/api/admin/products');
        const products = res.data?.data?.products || [];

        const low = products
          .map((p) => {
            const totalStock = p.variants?.reduce((sum, v) => sum + (v.stock || 0), 0) ?? 0;
            return { ...p, totalStock };
          })
          .filter((p) => p.totalStock < 5)
          .sort((a, b) => a.totalStock - b.totalStock)
          .slice(0, 3);

        setLowStockItems(low);
      } catch (err) {
        console.error('Failed to fetch low stock products:', err);
      }
    };

    fetchLowStock();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* Inventory Alerts */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase text-gray-500">Inventory Alerts</span>
          <span className="text-[10px] font-bold uppercase bg-red-100 text-red-600 px-2 py-1 rounded-full">
            Low Stock
          </span>
        </div>

        {lowStockItems.length === 0 ? (
          <p className="text-xs text-gray-400 py-2">No low stock items 🎉</p>
        ) : (
          lowStockItems.map((product, i) => (
            <React.Fragment key={product._id || product.id || i}>
              {i > 0 && <div className="h-px bg-gray-200 my-1" />}
              <div className="flex items-center gap-2 py-2">
                <div className="w-9 h-9 flex items-center justify-center bg-gray-100 border border-gray-200 rounded-md text-gray-400 flex-shrink-0 overflow-hidden">
                  {product.images?.[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon />
                  )}
                </div>

                <div className="flex-1 flex flex-col">
                  <span className="text-sm font-semibold text-gray-900 truncate max-w-[110px]">
                    {product.name}
                  </span>
                  <span className="text-xs text-gray-400 mt-0.5">
                    {product.variants?.[0]?.sku || product.sku || 'No SKU'}
                  </span>
                </div>

                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-sm font-bold text-red-600">
                    {product.totalStock} left
                  </span>
                  <span className="text-xs font-semibold text-teal-600 cursor-pointer hover:underline">
                    Restock
                  </span>
                </div>
              </div>
            </React.Fragment>
          ))
        )}

        <Link
          href="/admin/products"
          className="block w-full mt-3 py-2 text-xs font-semibold text-center text-gray-500 bg-gray-50 border border-gray-200 rounded-sm hover:bg-teal-100 hover:text-teal-600 hover:border-teal-400 transition"
        >
          View All Inventory
        </Link>
      </div>

      {/* Needs Action */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase text-gray-500">Needs Action</span>
          <span className="text-[10px] font-bold uppercase bg-orange-100 text-orange-600 px-2 py-1 rounded-full">Pending</span>
        </div>

        <div className="flex items-center gap-2 py-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-md bg-orange-100 text-orange-600 flex-shrink-0">
            <TruckIcon />
          </div>
          <div className="flex-1 flex flex-col">
            <span className="text-sm font-semibold text-gray-900">Order #8821</span>
            <span className="text-xs text-gray-400">Delayed Shipment</span>
          </div>
          <button className="px-3 py-1.5 text-xs font-bold bg-teal-500 text-white rounded hover:opacity-90 transition">
            Resolve
          </button>
        </div>

        <div className="h-px bg-gray-200 my-1" />

        <div className="flex items-center gap-2 py-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-md bg-red-100 text-red-600 flex-shrink-0">
            <AlertCircleIcon />
          </div>
          <div className="flex-1 flex flex-col">
            <span className="text-sm font-semibold text-gray-900">Order #8825</span>
            <span className="text-xs text-gray-400">Payment Failed</span>
          </div>
          <button className="px-3 py-1.5 text-xs font-bold bg-teal-500 text-white rounded hover:opacity-90 transition">
            Retry
          </button>
        </div>

        <button className="w-full mt-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-200 rounded-sm hover:bg-teal-100 hover:text-teal-600 hover:border-teal-400 transition">
          Go to Orders
        </button>
      </div>
    </div>
  );
}