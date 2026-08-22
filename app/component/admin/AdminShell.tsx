"use client";

import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSideBar";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f7f7]">

      <AdminNavbar
        onMenuClick={() => {
          setSidebarOpen(true);
        }}
      />

      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => {
          setSidebarOpen(false);
        }}
      />

      <main className="min-h-[calc(100vh-64px)] lg:ml-[260px]">
        {children}
      </main>

    </div>
  );
}