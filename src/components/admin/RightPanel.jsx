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
  const [actionOrders, setActionOrders] = useState([]);

  useEffect(() => {
    // Fetch low stock products
    const fetchLowStock = async () => {
      try {
        const res = await api.get('/api/admin/products');
        const products = res.data?.data?.products || [];
        const low = products
          .map((p) => ({
            ...p,
            totalStock: p.variants?.reduce((sum, v) => sum + (v.stock || 0), 0) ?? 0,
          }))
          .filter((p) => p.totalStock < 5)
          .sort((a, b) => a.totalStock - b.totalStock)
          .slice(0, 3);
        setLowStockItems(low);
      } catch (err) {
        console.error('Failed to fetch low stock products:', err);
      }
    };

    // Fetch orders that need action
    const fetchActionOrders = async () => {
      try {
        const res = await api.get('/api/orders/admin/all', {
          params: { limit: 50 },
        });
        const orders = res.data?.data?.orders || [];

        // Pending shipment = status is pending or processing
        // Payment failed = paymentMethod.status is failed
        const needsAction = orders
          .filter((o) => {
            const status = o.status?.current?.toLowerCase();
            const payStatus = o.paymentMethod?.status?.toLowerCase();
            return status === 'pending' || status === 'processing' || payStatus === 'failed';
          })
          .slice(0, 3); // show max 3

        setActionOrders(needsAction);
      } catch (err) {
        console.error('Failed to fetch action orders:', err);
      }
    };

    fetchLowStock();
    fetchActionOrders();
  }, []);

  const getActionMeta = (order) => {
    const payStatus = order.paymentMethod?.status?.toLowerCase();
    const status = order.status?.current?.toLowerCase();

    if (payStatus === 'failed') {
      return {
        label: 'Payment Failed',
        icon: <AlertCircleIcon />,
        iconBg: 'bg-red-100 text-red-600',
        btnLabel: 'Retry',
      };
    }
    if (status === 'pending') {
      return {
        label: 'Awaiting Processing',
        icon: <TruckIcon />,
        iconBg: 'bg-orange-100 text-orange-600',
        btnLabel: 'Process',
      };
    }
    return {
      label: 'Needs Review',
      icon: <AlertCircleIcon />,
      iconBg: 'bg-yellow-100 text-yellow-600',
      btnLabel: 'Review',
    };
  };

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
                  <span className="text-sm font-bold text-red-600">{product.totalStock} left</span>
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
          <span className="text-[10px] font-bold uppercase bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
            Pending
          </span>
        </div>

        {actionOrders.length === 0 ? (
          <p className="text-xs text-gray-400 py-2">No actions needed 🎉</p>
        ) : (
          actionOrders.map((order, i) => {
            const meta = getActionMeta(order);
            return (
              <React.Fragment key={order._id}>
                {i > 0 && <div className="h-px bg-gray-200 my-1" />}
                <div className="flex items-center gap-2 py-2">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-md flex-shrink-0 ${meta.iconBg}`}>
                    {meta.icon}
                  </div>
                  <div className="flex-1 flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">
                      {order.orderNumber}
                    </span>
                    <span className="text-xs text-gray-400">{meta.label}</span>
                  </div>
                  <button className="px-3 py-1.5 text-xs font-bold bg-teal-500 text-white rounded hover:opacity-90 transition">
                    {meta.btnLabel}
                  </button>
                </div>
              </React.Fragment>
            );
          })
        )}

        <Link
          href="/admin/orders"
          className="block w-full mt-3 py-2 text-xs font-semibold text-center text-gray-500 bg-gray-50 border border-gray-200 rounded-sm hover:bg-teal-100 hover:text-teal-600 hover:border-teal-400 transition"
        >
          Go to Orders
        </Link>
x      </div>
    </div>
  );
}