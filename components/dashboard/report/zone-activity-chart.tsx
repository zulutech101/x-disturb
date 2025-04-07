"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// 🎨 Modern muted pastel color palette
const data = [
  { name: "Zone A", activity: 40, color: "#6EE7B7" },   // Mint Green
  { name: "Zone B", activity: 120, color: "#FCA5A5" },  // Soft Red
  { name: "Zone C", activity: 100, color: "#93C5FD" },  // Sky Blue
  { name: "Zone D", activity: 160, color: "#FCD34D" },  // Amber
  { name: "Zone E", activity: 70, color: "#C4B5FD" },   // Light Purple
];

export default function ZoneActivityChart() {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4 text-zinc-800 dark:text-zinc-100">
        Top Zones by Activity
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 30, bottom: 5 }}
        >
          <XAxis type="number" axisLine={false} tickLine={false} />
          <YAxis
            dataKey="name"
            type="category"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#71717A", fontSize: 14 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #E5E7EB",
              borderRadius: "0.5rem",
              boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
            }}
            labelStyle={{ fontWeight: "600", color: "#52525B" }}
            itemStyle={{ color: "#10B981" }}
          />
          <Bar dataKey="activity" barSize={18} radius={[10, 10, 10, 10]} >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
