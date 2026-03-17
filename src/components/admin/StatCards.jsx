
'use client';
import React from 'react';

const RevenueIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
);

const OrderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const AlertIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const TrendUp = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

export default function StatCards() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-5">
      {/* Total Revenue */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Total Revenue</span>
          <div className="w-8 h-8 flex items-center justify-center rounded-md bg-teal-100 text-teal-500">
            <RevenueIcon />
          </div>
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-2">$12,450.00</div>
        <div className="flex items-center gap-1 text-teal-500 text-xs">
          <TrendUp />
          <span>+12.5% vs. last month</span>
        </div>
      </div>

      {/* Orders Today */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Orders Today</span>
          <div className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-100 text-blue-500">
            <OrderIcon />
          </div>
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-2">42</div>
        <div className="flex items-center gap-1 text-teal-500 text-xs">
          <TrendUp />
          <span>+5.2% Real-time status</span>
        </div>
      </div>

      {/* Critical Alerts */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold tracking-wider text-orange-500 uppercase">Critical Alerts</span>
          <div className="w-8 h-8 flex items-center justify-center rounded-md bg-orange-100 text-orange-500">
            <AlertIcon />
          </div>
        </div>
        <div className="text-2xl font-bold text-orange-500 mb-2">3</div>
        <div className="text-orange-500 text-xs">Action required immediately</div>
      </div>
    </div>
  );
}