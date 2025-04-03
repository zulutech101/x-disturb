"use client";

import type React from "react";

// import { useState } from "react"
import { Header } from "@/components/shared/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./shared/sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="--header-height:calc(theme(spacing.14))">
      <SidebarProvider className="flex flex-col">
        <Header />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
