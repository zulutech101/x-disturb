"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download } from "lucide-react";

interface Subscription {
  id: string;
  name: string;
  plan: string;
  location: string;
  date: string;
}

const subscriptions: Subscription[] = [
  {
    id: "1",
    name: "Biruk Tadese",
    plan: "Subscribed for 6 months",
    location: "Abrihot Library",
    date: "20.03.2025",
  },
  {
    id: "2",
    name: "Biruk Tadese",
    plan: "Subscribed for 6 months",
    location: "Abrihot Library",
    date: "20.03.2025",
  },
  {
    id: "2",
    name: "Biruk Tadese",
    plan: "Subscribed for 6 months",
    location: "Abrihot Library",
    date: "20.03.2025",
  },
];

export default function Notifications() {
  return (
    <div className="w-full mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium tracking-tight">Notifications</h1>
        <Button variant="link" className="text-blue-400 hover:text-blue-500">
          Clear notification history
        </Button>
      </div>

      <div className="rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 border-none border-b border-gray-300">
              <TableHead className="font-medium">User Name</TableHead>
              <TableHead className="font-medium">Subject</TableHead>
              <TableHead className="font-medium">Zone</TableHead>
              <TableHead className="font-medium">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((subscription, index) => (
              <TableRow key={index} className="border-none">
                <TableCell>{subscription.name}</TableCell>
                <TableCell>{subscription.plan}</TableCell>
                <TableCell>{subscription.location}</TableCell>
                <TableCell>{subscription.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Download className="h-4 w-4" />
          <span className="sr-only">Download</span>
        </Button>
      </div>
    </div>
  );
}
