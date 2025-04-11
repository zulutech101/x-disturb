"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { startOfMonth, startOfWeek, subMonths } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample data - replace with your actual data source
const revenueData = {
  thisMonth: [
    { name: "X-Disturb", value: 29500 },
    { name: "Church", value: 12500 },
    { name: "Mosque", value: 9800 },
    { name: "Library", value: 7200 },
  ],
  thisWeek: [
    { name: "X-Disturb", value: 5400 },
    { name: "Church", value: 3200 },
    { name: "Mosque", value: 2400 },
    { name: "Library", value: 1800 },
  ],
};

const weeklyTrendData = [
  { name: "Mon", xDisturb: 1090, church: 420, mosque: 380, library: 290 },
  { name: "Tue", xDisturb: 1190, church: 480, mosque: 400, library: 310 },
  { name: "Wed", xDisturb: 1310, church: 520, mosque: 450, library: 340 },
  { name: "Thu", xDisturb: 1230, church: 490, mosque: 420, library: 320 },
  { name: "Fri", xDisturb: 1390, church: 550, mosque: 480, library: 360 },
  { name: "Sat", xDisturb: 1480, church: 590, mosque: 510, library: 380 },
  { name: "Sun", xDisturb: 1510, church: 600, mosque: 520, library: 390 },
];

const monthlyTrendData = [
  { name: "Week 1", xDisturb: 7100, church: 2800, mosque: 2400, library: 1900 },
  { name: "Week 2", xDisturb: 7800, church: 3100, mosque: 2600, library: 2100 },
  { name: "Week 3", xDisturb: 7600, church: 3300, mosque: 2500, library: 1800 },
  { name: "Week 4", xDisturb: 7000, church: 3300, mosque: 2300, library: 1400 },
];

const COLORS = ["#FF6F68", "#0088FE", "#00C49F", "#FFBB28"];

export default function RevenueBreakdown() {
  const [timeRange, setTimeRange] = useState("thisMonth");
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  console.log(dateRange);

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    if (value === "thisMonth") {
      setDateRange({
        from: startOfMonth(new Date()),
        to: new Date(),
      });
    } else if (value === "thisWeek") {
      setDateRange({
        from: startOfWeek(new Date()),
        to: new Date(),
      });
    } else if (value === "lastMonth") {
      const lastMonth = subMonths(new Date(), 1);
      setDateRange({
        from: startOfMonth(lastMonth),
        to: new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0),
      });
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="thisWeek">This Week</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Revenue Metrics Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Revenue Metrics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Total Revenue by Category</CardTitle>
              <CardDescription>
                {timeRange === "thisMonth"
                  ? "This Month"
                  : timeRange === "thisWeek"
                  ? "This Week"
                  : "Selected Period"}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={
                      timeRange === "thisWeek"
                        ? revenueData.thisWeek
                        : revenueData.thisMonth
                    }
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {revenueData.thisMonth.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}`, "Revenue"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>
                {timeRange === "thisMonth"
                  ? "This Month"
                  : timeRange === "thisWeek"
                  ? "This Week"
                  : "Selected Period"}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={
                    timeRange === "thisWeek"
                      ? weeklyTrendData
                      : monthlyTrendData
                  }
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                  <Legend />
                  <Bar dataKey="xDisturb" fill="#FF6F68" />
                  <Bar dataKey="church" fill="#0088FE" />
                  <Bar dataKey="mosque" fill="#00C49F" />
                  <Bar dataKey="library" fill="#FFBB28" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Church Revenue</CardTitle>
            <CardDescription>
              {timeRange === "thisMonth"
                ? "This Month"
                : timeRange === "thisWeek"
                ? "This Week"
                : "Selected Period"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              $
              {timeRange === "thisWeek"
                ? revenueData.thisWeek[0].value.toLocaleString()
                : revenueData.thisMonth[0].value.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {timeRange === "thisWeek"
                ? "32% of weekly revenue"
                : "42% of monthly revenue"}
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span>Target</span>
                <span className="font-medium">$15,000</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full mt-1">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      (timeRange === "thisWeek"
                        ? revenueData.thisWeek[0].value / 4000
                        : revenueData.thisMonth[0].value / 15000) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mosque Revenue</CardTitle>
            <CardDescription>
              {timeRange === "thisMonth"
                ? "This Month"
                : timeRange === "thisWeek"
                ? "This Week"
                : "Selected Period"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              $
              {timeRange === "thisWeek"
                ? revenueData.thisWeek[1].value.toLocaleString()
                : revenueData.thisMonth[1].value.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {timeRange === "thisWeek"
                ? "24% of weekly revenue"
                : "33% of monthly revenue"}
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span>Target</span>
                <span className="font-medium">$12,000</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full mt-1">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      (timeRange === "thisWeek"
                        ? revenueData.thisWeek[1].value / 3000
                        : revenueData.thisMonth[1].value / 12000) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Library Revenue</CardTitle>
            <CardDescription>
              {timeRange === "thisMonth"
                ? "This Month"
                : timeRange === "thisWeek"
                ? "This Week"
                : "Selected Period"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              $
              {timeRange === "thisWeek"
                ? revenueData.thisWeek[2].value.toLocaleString()
                : revenueData.thisMonth[2].value.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {timeRange === "thisWeek"
                ? "18% of weekly revenue"
                : "25% of monthly revenue"}
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span>Target</span>
                <span className="font-medium">$10,000</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full mt-1">
                <div
                  className="h-full bg-yellow-500 rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      (timeRange === "thisWeek"
                        ? revenueData.thisWeek[2].value / 2500
                        : revenueData.thisMonth[2].value / 10000) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
