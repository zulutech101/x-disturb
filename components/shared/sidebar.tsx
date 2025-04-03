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
  SidebarMenu,
  SidebarMenuItem,
} from "../ui/sidebar";
import { cn } from "@/lib/utils";

// Define static route data
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

  return (
    // <Sidebar className="bg-[#F2542D] text-white top-[--header-height] p-4 !h-[calc(100svh-var(--header-height))]">
    <Sidebar className="bg-[#F2542D] text-white top-16 p-4 !h-[calc(100svh-var(--header-height))]">
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        {sidebarRoutes.map((item) => (
          <SidebarMenu key={item.label}>
            <SidebarMenuItem>
              <Link
                key={item.label}
                href={item.path}
                onClick={() => setActive(item.label)}
                className={cn(
                  "flex items-center gap-3 w-full px-4 py-2 rounded-md hover:bg-[#d84327] transition-all",
                  active === item.label &&
                    "bg-white hover:bg-white text-[#F2542D] font-semibold"
                )}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <Link
          href="/help-center"
          className="flex items-center gap-2 text-sm hover:underline"
        >
          <HelpCircle size={16} />
          Help Center
        </Link>
      </SidebarFooter>
    </Sidebar>
    // <aside className="h-screen w-64 bg-[#F2542D] text-white flex flex-col justify-between">
    //   <div className="p-4">
    //     <div className="text-lg font-bold mb-8">X-Disturb</div>
    //     <nav className="space-y-2">
    // {sidebarRoutes.map((item) => (
    //   <Link
    //     key={item.label}
    //     href={item.path}
    //     onClick={() => setActive(item.label)}
    //     className={cn(
    //       "flex items-center gap-3 w-full px-4 py-2 rounded-md hover:bg-[#d84327] transition-all",
    //       active === item.label && "bg-white hover:bg-white text-[#F2542D] font-semibold"
    //     )}
    //   >
    //     <item.icon size={18} />
    //     <span>{item.label}</span>
    //   </Link>
    // ))}
    //     </nav>
    //   </div>
    //   <div className="p-4">
    //     <Link
    //       href="/help-center"
    //       className="flex items-center gap-2 text-sm hover:underline"
    //     >
    //       <HelpCircle size={16} />
    //       Help Center
    //     </Link>
    //   </div>
    // </aside>
  );
}
