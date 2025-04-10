"use client";
import MetricCard from "@/components/dashboard/metric-card";
import ZoneActivityChart from "@/components/dashboard/report/zone-activity-chart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Area,
  XAxis,
  AreaChart,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  YAxis,
} from "recharts";

export default function Reports() {
  const timeData = [
    { month: "Jan", users: 120 },
    { month: "Feb", users: 180 },
    { month: "Mar", users: 140 },
    { month: "Apr", users: 220 },
    { month: "May", users: 190 },
    { month: "Jun", users: 260 },
    { month: "Jul", users: 230 },
    { month: "Aug", users: 310 },
    { month: "Sep", users: 280 },
    { month: "Oct", users: 350 },
    { month: "Nov", users: 330 },
    { month: "Dec", users: 400 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 5200 },
    { month: "Feb", revenue: 6300 },
    { month: "Mar", revenue: 4800 },
    { month: "Apr", revenue: 7000 },
    { month: "May", revenue: 6600 },
    { month: "Jun", revenue: 7500 },
    { month: "Jul", revenue: 7200 },
    { month: "Aug", revenue: 8300 },
    { month: "Sep", revenue: 7900 },
    { month: "Oct", revenue: 9100 },
    { month: "Nov", revenue: 8700 },
    { month: "Dec", revenue: 9600 },
  ];

  return (
    <div className="space-y-6 scrollbar-hide">
      <div>
        <h1 className="text-2xl font-medium tracking-tight">Report</h1>
        <p className="text-muted-foreground">
          Access detailed analytics for user growth, zone activity and payment
          transactions for informed decision making.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Overviews</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total User Growths"
            value="+240"
            change="+10%"
            changeType="positive"
          />
          <MetricCard
            title="Total Zone Activity"
            value="3,210"
            change="-5%"
            changeType="negative"
          />
          <MetricCard
            title="Total Payment Revenue"
            value="25 min"
            change="+15%"
            changeType="positive"
          />
        </div>
      </div>
      <div>
        <h2 className="mb-4 text-xl font-semibold">User Growth</h2>
        <Card className="">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              User Growth over time
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={timeData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF8736" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FF8736" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#FF8736"
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Zone Activity</h2>

        <ZoneActivityChart />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Payment Revenue Report</h2>
        <Card className="">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              Payment Revenue over time
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF8736" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FF8736" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#FF8736"
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={() => exportCSV(timeData, "user-growth-report.csv")}
          className="px-5 py-2 rounded-md text-white bg-[#e66641] hover:bg-[#d05535] transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          Export Data (CSV)
        </button>
        <button
          onClick={() => window.print()}
          className="px-5 py-2 rounded-md text-[#e66641] border border-[#e66641] hover:bg-[#e66641] hover:text-white transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          Download Report (Print View)
        </button>
      </div>
    </div>
  );
}
type CSVRow = Record<string, string | number>;

function exportCSV(data: CSVRow[], filename: string) {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]).join(",");
  const rows = data.map((row) => Object.values(row).join(",")).join("\n");
  const csv = `${headers}\n${rows}`;

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
