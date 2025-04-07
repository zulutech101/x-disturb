"use client";
import { Header } from "@/components/shared/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./shared/sidebar";
import { useAuthChecker } from "@/hooks/useAuthChecker";
import { LoaderCircle } from "lucide-react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useAuthChecker();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <LoaderCircle className="animate-spin text-[#E66641]" size={70} />
      </div>
    );
  }

  return (
    <SidebarProvider> {/* 👈 wrap entire layout including AppSidebar */}
      <div className="h-screen w-full flex">
        {/* Sidebar full height on the left */}
        <AppSidebar />

        {/* Main content: header + page */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <SidebarInset className="flex-1 overflow-y-auto p-8 scrollbar-hide">
            {children}
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
