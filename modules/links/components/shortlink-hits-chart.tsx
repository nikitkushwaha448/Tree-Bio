"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface Props {
  data: Array<{ date: string; hits: number }>;
  shortCode: string;
}

export function ShortLinkHitsChart({ data, shortCode }: Props) {
  const hasData = data.some(d => d.hits > 0);
  return (
    <Card className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
      <CardHeader>
        <CardTitle className="text-zinc-900 dark:text-zinc-100">Daily Hits: /{shortCode}</CardTitle>
        <CardDescription className="text-zinc-600 dark:text-zinc-400">Last {data.length} days activity</CardDescription>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <div className="h-[280px] flex items-center justify-center text-sm text-muted-foreground">No hits recorded yet</div>
        ) : (
          <ChartContainer
            config={{
              hits: { label: "Hits", color: "hsl(var(--chart-2))" }
            }}
            className="h-[280px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="fillHits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-chart-2)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-chart-2)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                  }}
                  className="text-zinc-600 dark:text-zinc-400"
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} className="text-zinc-600 dark:text-zinc-400" />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Area
                  dataKey="hits"
                  type="monotone"
                  fill="url(#fillHits)"
                  fillOpacity={0.4}
                  stroke="var(--color-chart-2)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
