"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";

interface Notification {
  id: string;
  name: string;
  plan: string;
  location: string;
  date: string;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    name: "Biruk Tadese",
    plan: "Subscribed for 6 months",
    location: "Abrihot Library",
    date: "20.03.2025",
  },
  {
    id: "2",
    name: "Liya Mekonnen",
    plan: "Subscribed for 1 year",
    location: "National Library",
    date: "22.03.2025",
  },
  {
    id: "3",
    name: "Samson Getachew",
    plan: "Trial activated",
    location: "City Library",
    date: "23.03.2025",
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="w-full mx-auto py-6 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Recent system notifications and user activities
          </p>
        </div>
        <Button
          variant="outline"
          className="text-destructive hover:text-destructive border-destructive hover:bg-destructive/5"
          onClick={handleClearAll}
          disabled={notifications.length === 0}
        >
          Clear all notifications
        </Button>
      </div>

      <div className="rounded-xl border overflow-hidden shadow-sm bg-background">
        <Table>
          <TableHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold text-foreground pl-6">User</TableHead>
              <TableHead className="font-semibold text-foreground">Subject</TableHead>
              <TableHead className="font-semibold text-foreground">Zone</TableHead>
              <TableHead className="font-semibold text-foreground">Date</TableHead>
              <TableHead className="font-semibold text-foreground text-right pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <TableRow 
                  key={notif.id} 
                  className="group hover:bg-muted/50 transition border-border"
                >
                  <TableCell className="font-medium pl-6">
                    <div className="flex items-center">
                      <div className="bg-primary/10 text-primary rounded-full bg-[#E66641] text-white h-8 w-8 flex items-center justify-center mr-3">
                        {notif.name.charAt(0)}
                      </div>
                      {notif.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      notif.plan.includes("Trial") 
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
                        : "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                    }`}>
                      {notif.plan}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{notif.location}</TableCell>
                  <TableCell className="text-muted-foreground">{notif.date}</TableCell>
                  <TableCell className="text-right pr-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      className=" text-red-500 hover:text-destructive"
                      onClick={() => handleDelete(notif.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12">
                  <div className="flex flex-col items-center justify-center">
                    <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-lg mb-1">No notifications</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      When new notifications arrive, they will appear here.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}