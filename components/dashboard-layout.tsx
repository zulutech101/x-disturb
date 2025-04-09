"use client";
import AppSidebar from "./shared/sidebar";
import { Header } from "./shared/header";
import { useAuthChecker } from "@/hooks/useAuthChecker";
import { SidebarProvider, SidebarInset } from "./ui/sidebar";
import MobileSidebar from "./shared/mobileSidebar";
import Image from "next/image";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useAuthChecker();

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-gray-950">
        {/* Equalizer-style loader */}
        <div className="flex items-end justify-center space-x-2 mb-6 h-8">
          <span
            className="w-2 bg-red-400 dark:bg-[#E66641] rounded-md animate-bar-bounce [animation-delay:-0.2s]"
            style={{ height: "40%" }}
          />
          <span
            className="w-2 bg-red-400 dark:bg-[#E66641] rounded-md animate-bar-bounce [animation-delay:-0.1s]"
            style={{ height: "70%" }}
          />
          <span
            className="w-2 bg-red-400 dark:bg-[#E66641] rounded-md animate-bar-bounce"
            style={{ height: "100%" }}
          />
          <span
            className="w-2 bg-red-400 dark:bg-[#E66641] rounded-md animate-bar-bounce [animation-delay:-0.1s]"
            style={{ height: "70%" }}
          />
          <span
            className="w-2 bg-red-400 dark:bg-[#E66641] rounded-md animate-bar-bounce [animation-delay:-0.2s]"
            style={{ height: "40%" }}
          />
        </div>

        {/* Logo */}
        <Image
          src="/logo.svg"
          alt="Logo"
          width={120}
          height={120}
          className="object-contain"
        />

        {/* Subtext */}
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          Loading admin panel...
        </p>
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
          <SidebarInset className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-hide">
            {children}
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
