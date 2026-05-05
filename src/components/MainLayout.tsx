"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const isRootPage = pathname === "/";

  if (isLoginPage || isRootPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
