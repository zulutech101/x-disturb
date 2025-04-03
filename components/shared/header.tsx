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

export function Header() {
  return (
    <header className="flex h-[--header-height] items-center justify-between border-b px-4">
      <div className="flex items-center">
        <SidebarTrigger className="mr-2" />
      </div>
      <div className="flex items-center justify-end h-16 px-4">
        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-2 w-48">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-orange-500 text-white">
                      BB
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <div className="font-medium">B. Biruk</div>
                    <div className="text-xs text-gray-500">Administrator</div>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-white dark:bg-gray-50 border-none shadow-md py-4"
            >
              <DropdownMenuItem className="cursor-pointer">
                <User className="w-4 h-4 mr-2" />
                My profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
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
