"use client";

import { Bar, BarChart, Line, LineChart, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function DashboardCharts() {
  // Data for the line chart
  const timeData = [
    { day: "Mon", entries: 65 },
    { day: "Tue", entries: 40 },
    { day: "Wed", entries: 70 },
    { day: "Thu", entries: 55 },
    { day: "Fri", entries: 30 },
    { day: "Sat", entries: 80 },
    { day: "Sun", entries: 60 },
  ];

//   // Data for the bar chart
//   const locationData = [
//     { region: "Addis Ababa", entries: 75 },
//     { region: "Adama", entries: 80 },
//     { region: "Bishoftu", entries: 65 },
//     { region: "Bahir Dar", entries: 85 },
//   ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Entries Over Time Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">
            Entries Over Time
          </CardTitle>
          <div className="text-2xl font-bold">+12% vs last week</div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              entries: {
                label: "Entries",
                color: "#ff6b4a",
              },
            }}
            className="h-[200px]"
          >
            <LineChart
              data={timeData}
              margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
            >
              <Line
                type="natural"
                dataKey="entries"
                stroke="var(--color-entries)"
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
              <XAxis dataKey="day" axisLine={false} tickLine={false} dy={10} />
              <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            </LineChart>
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
          <ChartContainer
            config={{
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
            }}
            className="h-[200px]"
          >
            <BarChart
              data={[
                {
                  region: "Addis Ababa",
                  value: 75,
                  fill: "var(--color-addisAbaba)",
                },
                {
                  region: "Adama",
                  value: 80,
                  fill: "var(--color-adama)",
                },
                {
                  region: "Bishoftu",
                  value: 65,
                  fill: "var(--color-bishoftu)",
                },
                {
                  region: "Bahir Dar",
                  value: 85,
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
