'use client';

import { useState } from "react";
import { Home, MapPin, Clock, Users, FileText, Receipt, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { label: "Dashboard", icon: Home },
  { label: "Silent Zones", icon: MapPin },
  { label: "Real Time Activity", icon: Clock },
  { label: "Users Management", icon: Users },
  { label: "Transactions", icon: Receipt },
  { label: "Reports", icon: FileText },
];

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  return (
    <aside className="h-screen w-64 bg-[#F2542D] text-white flex flex-col justify-between">
      <div className="p-4">
        <div className="text-lg font-bold mb-8">X-Disturb</div>
        <nav className="space-y-2">
          {sidebarLinks.map((item) => (
            <button
              key={item.label}
              onClick={() => setActive(item.label)}
              className={cn(
                "flex items-center gap-3 w-full px-4 py-2 rounded-md hover:bg-[#d84327] transition-all",
                active === item.label && "bg-white text-[#F2542D] font-semibold"
              )}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="p-4">
        <button className="flex items-center gap-2 text-sm hover:underline">
          <HelpCircle size={16} />
          Help Center
        </button>
      </div>
    </aside>
  );
}
