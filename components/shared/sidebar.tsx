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
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "../ui/sidebar";
import { cn } from "@/lib/utils";

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
  const { state } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="bg-[#E66641] text-white top-16 p-4 !h-[calc(100svh-var(--header-height))]"
    >
      <SidebarHeader />
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
                isActive && "bg-white text-[#F2542D] font-semibold hover:bg-white",
                state === "collapsed" && "justify-center px-2"
              )}
            >
              <item.icon size={18} />
              <span className={cn(state === "collapsed" ? "hidden" : "block")}>
                {item.label}
              </span>
            </Link>
            );
          })}
        </nav>
      </SidebarContent>
      <SidebarFooter>
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
