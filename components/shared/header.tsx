"use client"

import { Bell } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-4">
      <div className="flex items-center">
        <SidebarTrigger className="mr-2" />
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback className="bg-orange-500 text-white">BB</AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <div className="text-sm font-medium">B. Biruk</div>
            <div className="text-xs text-muted-foreground">Administrator</div>
          </div>
        </div>
      </div>
    </header>
  )
}

