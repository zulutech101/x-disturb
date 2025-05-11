"use client";

import {
  useGetEntriesOverTimeQuery,
  useGetEntriesByLocationQuery,
} from "@/store/entries/entriesApi";

import { Area, Bar, BarChart, XAxis, AreaChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Skeleton } from "@/components/ui/skeleton"; // Optional, or use a <div> with animate-pulse

export default function DashboardCharts() {
  const { data: timeApiData, isLoading: timeLoading } =
    useGetEntriesOverTimeQuery();
  const { data: regionApiData, isLoading: regionLoading } =
    useGetEntriesByLocationQuery();

  const timeData =
    timeApiData?.trendData.map((item) => ({
      day: new Date(item.date).toLocaleDateString("en-US", {
        weekday: "short",
      }),
      entries: item.count,
    })) || [];

  const locationColorMap: Record<string, string> = {
    "Addis Ababa": "#0066cc",
    Adama: "#00a651",
    Bishoftu: "#e30613",
    "Bahir Dar": "#ffd700",
    "Unknown Region": "#999999",
  };

  const regionData =
    regionApiData?.regionData.map((item) => ({
      region: item.region,
      value: item.count,
      fill: locationColorMap[item.region] || "#cccccc",
    })) || [];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Entries Over Time */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">
            Entries Over Time
          </CardTitle>
          <div className="text-2xl font-bold">
            {timeApiData?.percentageChangeVsLastWeek ?? 0}% vs last week
          </div>
        </CardHeader>
        <CardContent>
          {timeLoading ? (
            <Skeleton className="h-[200px] w-full rounded-md" />
          ) : timeData.length === 0 ? (
            <div className="text-muted-foreground text-sm h-[200px] flex items-center justify-center">
              No data for this week.
            </div>
          ) : (
            <ChartContainer
              config={{ entries: { label: "Entries", color: "#ff6b4a" } }}
              className="h-[200px] w-full"
            >
              <AreaChart
                data={timeData}
                margin={{ top: 10, left: 12, right: 12 }}
              >
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
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
                  stroke="#FF8736"
                  strokeWidth={2}
                  dot={({ cx, cy }) => (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={4}
                      fill="#4ade80"
                      stroke="white"
                      strokeWidth={2}
                    />
                  )}
                  activeDot={{
                    r: 6,
                    fill: "#4ade80",
                    stroke: "white",
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      {/* Entries by Location */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">
            Entries by Location
          </CardTitle>
          <div className="text-2xl font-bold">By region</div>
        </CardHeader>
        <CardContent>
          {regionLoading ? (
            <Skeleton className="h-[200px] w-full rounded-md" />
          ) : regionData.length === 0 ? (
            <div className="text-muted-foreground text-sm h-[200px] flex items-center justify-center">
              No location data available.
            </div>
          ) : (
            <ChartContainer config={{}} className="h-[200px] w-full">
              <BarChart
                data={regionData}
                margin={{ top: 5, right: 10, left: 0, bottom: 30 }}
              >
                <XAxis
                  dataKey="region"
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                {regionData.map((entry, index) => (
                  <Bar
                    key={index}
                    dataKey="value"
                    data={[entry]}
                    radius={[4, 4, 0, 0]}
                    fill={entry.fill}
                    barSize={40}
                    xAxisId={index.toString()}
                  />
                ))}

                <ChartTooltip
                  content={<ChartTooltipContent />}
                  cursor={false}
                />
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
