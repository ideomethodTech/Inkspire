// components/layout/ConditionalHeader.jsx
"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function ConditionalHeader() {
  const pathname = usePathname();
  
  const hideHeaderRoutes = ["/admin", "/admin/dashboard"];
  // Or use startsWith to cover all admin routes:
  const shouldHide = pathname.startsWith("/admin");

  if (shouldHide) return null;
  return <Header />;
}