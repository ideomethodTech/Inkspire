"use client";

import Link from "next/link";
import { Caption } from "@/components/typography";

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#6D6D6D]">
      {items.map((item, index) => (
        <div key={item.href || item.label} className="flex items-center gap-2">
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-[#20262B] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#20262B]">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <span className="text-[#6D6D6D]">/</span>
          )}
        </div>
      ))}
    </nav>
  );
}

