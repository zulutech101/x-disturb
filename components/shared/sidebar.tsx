"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  MapPin,
  Clock,
  Users,
  FileText,
  Receipt,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "../ui/sidebar";
import { cn } from "@/lib/utils";
import Image from "next/image";

const sidebarRoutes = [
  { label: "Dashboard", icon: Home, path: "/dashboard" },
  { label: "Silent Zones", icon: MapPin, path: "/dashboard/silent-zones" },
  {
    label: "Real Time Activity",
    icon: Clock,
    path: "/dashboard/real-time-activity",
  },
  {
    label: "Users Management",
    icon: Users,
    path: "/dashboard/users-management",
  },
  { label: "Transactions", icon: Receipt, path: "/dashboard/transactions" },
  { label: "Reports", icon: FileText, path: "/dashboard/reports" },
];

export default function AppSidebar() {
  const [active, setActive] = useState("Dashboard");
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      collapsible="icon"
      className="h-screen p-4 bg-[#E66641] text-white"
    >
      {/* Sidebar Header */}
      <SidebarHeader className="relative mb-4 px-2">
        {isCollapsed ? (
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow cursor-pointer hover:scale-110 transition-transform">
            <h1 className="text-lg font-black bg-gradient-to-r from-[#E66641] to-[#F2A58E] bg-clip-text text-transparent select-none">
              X
            </h1>
          </div>
        ) : (
          <Link
          href="/dashboard"
          className="flex flex-col items-center justify-center gap-1 bg-white p-2 rounded"
        >
          <Image
            src="/logo.svg"
            alt="x-disturb logo"
            width={100}
            height={32}
            className="h-8 w-auto"
          />
          <span className="text-sm font-medium w-full flex justify-start pl-2" style={{ color: "#E66641" }}>
            Admin Portal
          </span>
        </Link>
        
        )}

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-7 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-[#E66641] bg-white text-[#E66641] shadow-md transition-all hover:scale-110"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </SidebarHeader>

      {/* Nav items */}
      <SidebarContent>
        <nav className="flex flex-col gap-1">
          {sidebarRoutes.map((item) => {
            const isActive = active === item.label;
            return (
              <Link
                key={item.label}
                href={item.path}
                onClick={() => setActive(item.label)}
                className={cn(
                  "flex items-center w-full gap-3 px-4 py-2 rounded-md transition-all hover:bg-[#d84327]",
                  isActive &&
                    "bg-white text-[#F2542D] font-semibold hover:bg-white",
                  state === "collapsed" && "justify-center px-2"
                )}
              >
                <item.icon size={18} />
                <span
                  className={cn(state === "collapsed" ? "hidden" : "block")}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="mt-auto pt-4">
        <Link
          href="/help-center"
          className={cn(
            "flex items-center gap-2 text-sm hover:underline",
            state === "collapsed" && "justify-center"
          )}
        >
          <HelpCircle size={16} />
          {state !== "collapsed" && <span>Help Center</span>}
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
