"use client";

import useAdmin from "@/lib/hooks/useAdmin";


export default function AdminLayout({ children }) {
  const loading = useAdmin();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Checking permissions...</p>
      </div>
    );
  }

  return <>{children}</>;
}