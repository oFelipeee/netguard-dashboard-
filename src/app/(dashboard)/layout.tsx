"use client";

import { Sidebar } from "../../components/layout/Sidebar";
import { TopBar } from "../../components/layout/TopBar";
import { Footer } from "../../components/layout/Footer";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-navy-950 text-slate-100 flex">
        <Sidebar />
        <div className="flex-1 ml-64 flex flex-col min-h-screen">
          <TopBar />
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
          <Footer />
        </div>
      </div>
      
      <Toaster 
        position="top-right" 
        theme="dark"
        richColors
      />
    </SessionProvider>
  );
}