"use client";

import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ChartAreaInteractive from "./_component/ChartAreaInteractive";

// 🧠 Fake daily data — category vs professional profile views
const chartData = [
  { date: "2025-10-01", categories: 320, professionals: 480 },
  { date: "2025-10-02", categories: 410, professionals: 540 },
  { date: "2025-10-03", categories: 380, professionals: 505 },
  { date: "2025-10-04", categories: 460, professionals: 615 },
  { date: "2025-10-05", categories: 520, professionals: 690 },
  { date: "2025-10-06", categories: 610, professionals: 745 },
  { date: "2025-10-07", categories: 580, professionals: 700 },
  { date: "2025-10-08", categories: 640, professionals: 760 },
  { date: "2025-10-09", categories: 590, professionals: 720 },
  { date: "2025-10-10", categories: 610, professionals: 755 },
  { date: "2025-10-11", categories: 720, professionals: 880 },
  { date: "2025-10-12", categories: 680, professionals: 840 },
  { date: "2025-10-13", categories: 705, professionals: 875 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563EB", // blue-600
  },
  mobile: {
    label: "Mobile",
    color: "#60A5FA", // blue-400
  },
} satisfies ChartConfig;

export default function Insights() {
  const [timeRange, setTimeRange] = React.useState("7d");

  // Filter mock data (in real usage, adjust based on range)
  const filteredData = chartData;

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white/90">
        Insights
      </h2>

      <div className="space-y-6">
       <ChartAreaInteractive/>
      </div>
    </div>
  );
}
