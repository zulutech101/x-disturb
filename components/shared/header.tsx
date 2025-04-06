"use client";

import { Bell, ChevronDown, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { session } from "@/lib/sessionStorage";
import { useAuthChecker } from "@/hooks/useAuthChecker";
import { Skeleton } from "@/components/ui/skeleton";

export function Header() {
  const handleLogout = () => {
    signOut(auth);
    session.clear();
  };

  const { user, loading } = useAuthChecker();
  const username = user?.email?.split("@")[0] ?? "";
  const capitalizedInitials = username
    ? username
        .split(".")
        .map((word) => word[0]?.toUpperCase() ?? "")
        .join("")
    : "U";

  return (
    <header className="flex h-[--header-height] items-center justify-between border-b border-[#F0F0F0] px-4">
      <div className="flex items-center">
        <SidebarTrigger className="mr-2 cursor-pointer" />
      </div>
      <div className="flex items-center justify-end h-16 px-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/notification">
            <Bell className="w-5 h-5" />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <Button variant="ghost" className="flex items-center gap-2 w-48">
                {loading ? (
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="hidden md:block space-y-1">
                      <Skeleton className="h-3 w-24 rounded" />
                      <Skeleton className="h-2 w-16 rounded" />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-orange-500 text-white">
                        {capitalizedInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <div className="font-medium capitalize">{username}</div>
                      <div className="text-xs text-gray-500">Administrator</div>
                    </div>
                  </div>
                )}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="z-50 w-56 h-52 bg-red-800 dark:bg-gray-50 border-none shadow-md py-4"
            >
              <DropdownMenuItem className="cursor-pointer">
                <User className="w-4 h-4 mr-2" />
                My profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
