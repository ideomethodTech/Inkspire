'use client';
import React, { useEffect, useState } from 'react';
import { getProfile } from '@/api/profile';

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

export default function Topbar() {
  const [displayName, setDisplayName] = useState('Admin');

  useEffect(() => {
    const loadUser = async () => {
      const token =
        typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
      if (!token) return;

      try {
        const stored = window.localStorage.getItem('user');
        if (stored) {
          const parsed = JSON.parse(stored);
          setDisplayName(
            parsed?.displayName ||
              parsed?.name ||
              (parsed?.email ? parsed.email.split('@')[0] : 'Admin')
          );
        }
      } catch (err) {
        console.warn('Failed to parse stored user', err);
      }

      try {
        const res = await getProfile();
        const data = res?.data || res?.user || res;
        if (data) {
          setDisplayName(
            data?.displayName ||
              data?.name ||
              (data?.email ? data.email.split('@')[0] : 'Admin')
          );
        }
      } catch (err) {
        console.warn('Failed to load profile', err);
      }
    };

    loadUser();
  }, []);

  const initials = getInitials(displayName);

  return (
    <header className="sticky top-0 z-50 flex items-center gap-4 px-7 h-16 bg-white border-b border-gray-200">
      {/* Title */}
      <div className="flex-1">
        <h1 className="text-[19px] font-bold text-gray-800 leading-tight -tracking-[0.3px]">
          Dashboard
        </h1>
        <p className="text-xs text-gray-500 mt-[1px]">
          Welcome back to Poster Store Admin.
        </p>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-full px-4 py-1 text-gray-400 w-52">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search analytics..."
          className="bg-transparent w-full text-sm focus:outline-none placeholder:text-gray-400 text-gray-800"
        />
      </div>

      {/* Notification bell */}
      <button className="relative w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-gray-500 hover:bg-teal-100 hover:text-teal-500 transition">
        <BellIcon />
        <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-orange-500 rounded-full border-2 border-white" />
      </button>

      {/* User */}
      <div className="flex items-center gap-2">
        <div className="flex flex-col text-right">
          <span className="text-sm font-semibold text-gray-800 leading-snug">
            {displayName}
          </span>
          <span className="text-[11px] text-gray-500">Store Manager</span>
        </div>
        <div className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-xs tracking-[0.5px]">
          {initials}
        </div>
      </div>
    </header>
  );
}