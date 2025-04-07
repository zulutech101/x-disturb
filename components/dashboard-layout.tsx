"use client"
import AppSidebar from "./shared/sidebar";
import { Header } from "./shared/header";
import { useAuthChecker } from "@/hooks/useAuthChecker";
import { LoaderCircle } from "lucide-react";
import { SidebarProvider, SidebarInset } from "./ui/sidebar";
import MobileSidebar from "./shared/mobileSidebar";

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
    <SidebarProvider>
      <div className="h-screen w-full flex relative">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <AppSidebar />
        </div>

        {/* Mobile Sidebar */}
        <MobileSidebar />

        {/* Main content */}
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
