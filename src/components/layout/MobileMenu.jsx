"use client";

import { useState } from "react";
import { ChevronRight, X } from "lucide-react";

export default function MobileMenu({ onClose }) {
  const [activeTab, setActiveTab] = useState("Posters");

  const tabs = ["Posters", "Collections", "Stickers"];

  const menuContent = {
    Posters: [
      { label: "New Arrivals", hasSubmenu: false },
      { label: "Best Selling", hasSubmenu: false },
      { label: "Split Posters", hasSubmenu: true },
      { label: "Split by Pieces", hasSubmenu: true },
      { label: "Collage Kits", hasSubmenu: true },
      { label: "Themed Kits", hasSubmenu: true },
      { label: "Retro Prints", hasSubmenu: true },
    ],
    Collections: [
      { label: "New Arrivals", hasSubmenu: false },
      { label: "Best Selling", hasSubmenu: false },
      { label: "Split Posters", hasSubmenu: true },
      { label: "Split by Pieces", hasSubmenu: true },
      { label: "Collage Kits", hasSubmenu: true },
      { label: "Themed Kits", hasSubmenu: true },
      { label: "Retro Prints", hasSubmenu: true },
    ],
    Stickers: [
      { label: "New Arrivals", hasSubmenu: false },
      { label: "Best Selling", hasSubmenu: false },
      { label: "Split Posters", hasSubmenu: true },
      { label: "Split by Pieces", hasSubmenu: true },
      { label: "Collage Kits", hasSubmenu: true },
      { label: "Themed Kits", hasSubmenu: true },
      { label: "Retro Prints", hasSubmenu: true },
    ],
  };

  return (
    <div className="md:hidden fixed inset-0 z-50 bg-white overflow-y-auto">
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button onClick={onClose} aria-label="Close menu">
          <X size={24} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "text-black border-b-2 border-black"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Menu Content */}
      <div className="px-6 py-6">
        <ul className="space-y-6">
          {menuContent[activeTab].map((item, index) => (
            <li key={index}>
              <button className="flex items-center justify-between w-full text-left text-gray-700 hover:text-black transition-colors">
                <span className="text-[15px]">{item.label}</span>
                {item.hasSubmenu && <ChevronRight size={18} className="text-gray-400" />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}