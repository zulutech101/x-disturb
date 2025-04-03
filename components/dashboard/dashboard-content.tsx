"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import DashboardCharts from "./dashboard-charts";
import TopPerformingLocation from "./top-performing-location";

export function DashboardContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Analyze and optimize X-Disturb performance with real-time metrics and
          insightful statistics
        </p>
      </div>

      <div className="relative flex">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search metrics by location, time, or event"
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" className="bg-[#FF8736]/40 w-32">
          All
        </Button>
        <Button className="border-none bg-[#F0F0F0]">
          Time Frame: Last 7 days
        </Button>
        <Button className="border-none bg-[#F0F0F0]">Location: Global</Button>
        <Button className="border-none bg-[#F0F0F0]">Status: Active</Button>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Key Metrics</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Entries"
            value="12,456"
            change="+10%"
            changeType="positive"
          />
          <MetricCard
            title="Unique Users"
            value="3,210"
            change="-5%"
            changeType="negative"
          />
          <MetricCard
            title="Average Dwell Time"
            value="25 min"
            change="+15%"
            changeType="positive"
          />
          <MetricCard
            title="Entry Rate"
            value="75%"
            change="+8%"
            changeType="positive"
          />
        </div>
      </div>
      <DashboardCharts />
      <TopPerformingLocation />
    </div>
  );
}

function MetricCard({
  title,
  value,
  change,
  changeType,
}: {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p
          className={cn(
            "text-xs",
            changeType === "positive" && "text-green-500",
            changeType === "negative" && "text-red-500"
          )}
        >
          {change}
        </p>
      </CardContent>
    </Card>
  );
}
