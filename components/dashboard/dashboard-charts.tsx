"use client";

import { Area, Bar, BarChart, XAxis, AreaChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function DashboardCharts() {
  const timeData = [
    { day: "Mon", entries: 65 },
    { day: "Tue", entries: 40 },
    { day: "Wed", entries: 70 },
    { day: "Thu", entries: 55 },
    { day: "Fri", entries: 30 },
    { day: "Sat", entries: 80 },
    { day: "Sun", entries: 60 },
  ];

  const locationData = {
    addisAbaba: {
      label: "Addis Ababa",
      color: "#0066cc",
    },
    adama: {
      label: "Adama",
      color: "#00a651",
    },
    bishoftu: {
      label: "Bishoftu",
      color: "#e30613",
    },
    bahirDar: {
      label: "Bahir Dar",
      color: "#ffd700",
    },
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Entries Over Time Card */}
      <Card className="">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">
            Entries Over Time
          </CardTitle>
          <div className="text-2xl font-bold">+12% vs last week</div>
        </CardHeader>
        <CardContent className="">
          <ChartContainer
            config={{
              entries: {
                label: "Entries",
                color: "#ff6b4a",
              },
            }}
            className="h-[200px] w-full"
          >
            <AreaChart
              accessibilityLayer
              data={timeData}
              margin={{
                top: 10,
                left: 12,
                right: 12,
              }}
            >
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <defs>
                <linearGradient id="fillGraph" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF8736" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FF8736" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                dataKey="entries"
                type="natural"
                fill="url(#fillGraph)"
                fillOpacity={0.4}
                stroke="#FF8736"
                strokeWidth={2}
                dot={(props) => {
                  const { cx, cy } = props;
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={4}
                      fill="#4ade80"
                      stroke="white"
                      strokeWidth={2}
                    />
                  );
                }}
                activeDot={{
                  r: 6,
                  fill: "#4ade80",
                  stroke: "white",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Entries by Location Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">
            Entries by Location
          </CardTitle>
          <div className="text-2xl font-bold">By region</div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={locationData} className="h-[200px] w-full">
            <BarChart
              data={[
                {
                  region: "Addis Ababa",
                  value: 100,
                  fill: "var(--color-addisAbaba)",
                },
                {
                  region: "Adama",
                  value: 100,
                  fill: "var(--color-adama)",
                },
                {
                  region: "Bishoftu",
                  value: 100,
                  fill: "var(--color-bishoftu)",
                },
                {
                  region: "Bahir Dar",
                  value: 100,
                  fill: "var(--color-bahirDar)",
                },
              ]}
              margin={{ top: 5, right: 10, left: 0, bottom: 30 }}
            >
              <XAxis
                dataKey="region"
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="currentColor" />
              <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
