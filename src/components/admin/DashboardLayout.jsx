import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./TopBar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 ml-16">
        {/* Topbar */}
        <Topbar />

        {/* Page content */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </div>
    </div>
  );
}