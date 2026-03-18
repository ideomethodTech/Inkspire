"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  const shouldHide = pathname.startsWith("/admin");

  if (shouldHide) return null;
  return <Footer />;
}