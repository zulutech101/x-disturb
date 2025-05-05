"use client";

import { useState } from "react";
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
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// Define types
type Category =
  | "X-Disturb"
  | "Orthodox Tewahedo"
  | "Protestant"
  | "Mosque"
  | "Library";

type TimeRange = "thisWeek" | "thisMonth" | "lastMonth";

type RevenueData = Record<TimeRange, Record<Category, number>>;

const revenueData: RevenueData = {
  thisMonth: {
    "X-Disturb": 25000,
    "Orthodox Tewahedo": 6250,
    Protestant: 6250,
    Mosque: 6250,
    Library: 6250,
  },
  thisWeek: {
    "X-Disturb": 10000,
    "Orthodox Tewahedo": 2500,
    Protestant: 2500,
    Mosque: 2500,
    Library: 2500,
  },
  lastMonth: {
    "X-Disturb": 20000,
    "Orthodox Tewahedo": 5000,
    Protestant: 5000,
    Mosque: 5000,
    Library: 5000,
  },
};


const weeklyTrendData = [
  { name: "Mon", "X-Disturb": 1090, Protestant: 480, Mosque: 380, Library: 290 },
  { name: "Tue", "X-Disturb": 1190, Protestant: 530, Mosque: 400, Library: 310 },
  { name: "Wed", "X-Disturb": 1310, Protestant: 550, Mosque: 450, Library: 340 },
  { name: "Thu", "X-Disturb": 1230, Protestant: 490, Mosque: 420, Library: 320 },
  { name: "Fri", "X-Disturb": 1390, Protestant: 590, Mosque: 480, Library: 360 },
  { name: "Sat", "X-Disturb": 1480, Protestant: 610, Mosque: 510, Library: 380 },
  { name: "Sun", "X-Disturb": 1510, Protestant: 600, Mosque: 520, Library: 390 },
];

const monthlyTrendData = [
  { name: "Week 1", "X-Disturb": 7100, Protestant: 2800, Mosque: 2400, Library: 1900 },
  { name: "Week 2", "X-Disturb": 7800, Protestant: 3100, Mosque: 2600, Library: 2100 },
  { name: "Week 3", "X-Disturb": 7600, Protestant: 3300, Mosque: 2500, Library: 1800 },
  { name: "Week 4", "X-Disturb": 7000, Protestant: 3300, Mosque: 2300, Library: 1400 },
];

const COLORS = ["#FF6F68", "#0088FE", "#00C49F", "#FFBB28", "#6366f1"];

const RevenueCategoryCard = ({
  title,
  value,
  target,
  color,
}: {
  title: string;
  value: number;
  target: number;
  color: string;
}) => {
  const percent = Math.min(100, (value / target) * 100);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>This Period</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">${value.toLocaleString()}</div>
        <div className="text-sm text-muted-foreground mt-2">
          {percent.toFixed(0)}% of target revenue
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm">
            <span>Target</span>
            <span className="font-medium">${target.toLocaleString()}</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full mt-1">
            <div
              className="h-full rounded-full"
              style={{
                backgroundColor: color,
                width: `${percent}%`,
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function RevenueBreakdown() {
  const [timeRange, setTimeRange] = useState<TimeRange>("thisMonth");

  const pieData = Object.entries(revenueData[timeRange]).map(
    ([name, value]) => ({ name, value })
  );

  return (
    <div className="container mx-auto my-10 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="w-full flex items-center justify-between gap-2">
          <h2 className="mb-4 text-xl font-semibold">Revenue Metrics</h2>
          <Select value={timeRange} onValueChange={(v) => setTimeRange(v as TimeRange)}>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Total Revenue by Category</CardTitle>
            <CardDescription>
              {timeRange === "thisMonth"
                ? "This Month"
                : timeRange === "thisWeek"
                ? "This Week"
                : "Last Month"}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
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
                : "Last Month"}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={timeRange === "thisWeek" ? weeklyTrendData : monthlyTrendData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="X-Disturb" fill="#FF6F68" />
                <Bar dataKey="Protestant" fill="#3b82f6" />
                <Bar dataKey="Mosque" fill="#10b981" />
                <Bar dataKey="Library" fill="#facc15" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {([
          {
            key: "X-Disturb",
            target: 50000,
            color: "#FF6F68",
          },
          {
            key: "Orthodox Tewahedo",
            target:50000 ,
            color: "#6366f1",
          },
          {
            key: "Protestant",
            target:50000 ,
            color: "#3b82f6",
          },
          {
            key: "Mosque",
            target: 50000,
            color: "#10b981",
          },
          {
            key: "Library",
            target: 50000,
            color: "#facc15",
          },
        ] as { key: Category; target: number; color: string }[]).map(
          ({ key, target, color }) => (
            <RevenueCategoryCard
              key={key}
              title={key}
              value={revenueData[timeRange][key]}
              target={target}
              color={color}
            />
          )
        )}
      </div>
    </div>
  );
}
