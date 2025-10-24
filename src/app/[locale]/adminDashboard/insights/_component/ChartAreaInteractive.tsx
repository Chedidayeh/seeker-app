"use client";

import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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

// 🎨 Blue color configuration (works in light/dark mode)
const chartConfig = {
  categories: {
    label: "Category Views",
    color: "hsl(210, 100%, 50%)", // darker, vivid blue
  },
  professionals: {
    label: "Professional Profile Views",
    color: "hsl(195, 100%, 75%)", // lighter tealish blue
  },
} satisfies ChartConfig;

export default function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("7d");

  // Filter mock data (in real usage, adjust based on range)
  const filteredData = chartData;

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Daily Views — Categories vs Professionals</CardTitle>
          <CardDescription>
            Tracking daily user engagement on Seeker
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 7 days" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              {/* Gradient for Categories (Blue 1) */}
              <linearGradient id="fillCategories" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(211, 100%, 60%)"
                  stopOpacity={0.7}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(211, 100%, 60%)"
                  stopOpacity={0.1}
                />
              </linearGradient>

              {/* Gradient for Professionals (Blue 2) */}
              <linearGradient
                id="fillProfessionals"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="hsl(217, 91%, 70%)"
                  stopOpacity={0.7}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(217, 91%, 70%)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey="categories"
              type="natural"
              fill="url(#fillCategories)"
              stroke="hsl(211, 100%, 60%)"
              strokeWidth={2}
              stackId="a"
            />
            <Area
              dataKey="professionals"
              type="natural"
              fill="url(#fillProfessionals)"
              stroke="hsl(217, 91%, 70%)"
              strokeWidth={2}
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
