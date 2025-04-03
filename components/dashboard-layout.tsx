"use client"

import type React from "react"

// import { useState } from "react"
import  Sidebar  from "@/components/sidebar"
import { Header } from "@/components/header"
import { SidebarProvider } from "@/components/ui/sidebar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto bg-background p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

