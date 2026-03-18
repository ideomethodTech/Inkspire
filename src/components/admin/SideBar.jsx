'use client';
import React from 'react';
import { Grid2X2Plus, ShoppingCart, Box, Users, BarChart2, Settings } from 'lucide-react';

const LogoIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
    <rect x="3" y="3" width="8" height="8" rx="2" />
    <rect x="13" y="3" width="8" height="8" rx="2" opacity="0.6" />
    <rect x="3" y="13" width="8" height="8" rx="2" opacity="0.6" />
    <rect x="13" y="13" width="8" height="8" rx="2" opacity="0.3" />
  </svg>
);

const navItems = [
  { icon: <Grid2X2Plus size={18} />, active: true },
  { icon: <ShoppingCart size={18} />, active: false },
  { icon: <Box size={18} />, active: false },
  { icon: <Users size={18} />, active: false },
  { icon: <BarChart2 size={18} />, active: false },
];

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 bottom-0 z-50 w-16 flex flex-col items-center py-4 bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="w-9 h-9 mb-5 bg-teal-500 rounded-lg flex items-center justify-center">
        <LogoIcon />
      </div>

      {/* Nav */}
      <nav className="flex flex-col items-center gap-1">
        {navItems.map((item, i) => (
          <button
            key={i}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition ${
              item.active
                ? 'bg-teal-500 text-white'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'
            }`}
          >
            {item.icon}
          </button>
        ))}
      </nav>

      <div className="flex-1" />

      {/* Settings */}
      <button className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition">
        <Settings size={18} />
      </button>
    </aside>
  );
}