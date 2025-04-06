"use client";
import { Header } from "@/components/shared/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./shared/sidebar";
import { useAuthChecker } from "@/hooks/useAuthChecker";
import { LoaderCircle } from "lucide-react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  // if not authenticated the useAuthChecker will redirect him to the login page
  const { loading } = useAuthChecker();

  if (loading) {
    return (
      <div className="h-[100vh] w-full flex items-center justify-center">
        <LoaderCircle className="animate-spin text-[#E66641]" size={70} />
      </div>
    );
  }

  return (
    <div className="--header-height:calc(theme(spacing.14))">
      <SidebarProvider className="flex flex-col !max-h-[calc(100svh-var(--header-height))] ">
        <Header />
        <div className="flex flex-1  overflow-y-scroll scrollbar-hide">
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
