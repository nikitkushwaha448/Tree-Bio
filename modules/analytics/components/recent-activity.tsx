import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Clock, Globe } from "lucide-react"
import { getRecentProfileVisitors } from "../actions"

interface RecentActivityProps {
  userId: string
}

export async function RecentActivity({ userId }: RecentActivityProps) {
  const recentVisitors = await getRecentProfileVisitors(userId, 10)

  if (!recentVisitors || recentVisitors.length === 0) {
    return (
      <Card className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
        <CardHeader>
          <CardTitle className="text-zinc-900 dark:text-zinc-100">Recent Activity</CardTitle>
          <CardDescription className="text-zinc-600 dark:text-zinc-400">Latest profile visitors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">No recent activity</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 border-zinc-200 dark:border-zinc-700 shadow-md h-full">
      <CardHeader className="border-b border-zinc-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800/50">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
            <Clock className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Recent Activity</CardTitle>
            <CardDescription className="text-xs text-zinc-600 dark:text-zinc-400">Latest profile visitors</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
          {recentVisitors.map((visitor, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 hover:shadow-sm transition-all duration-200 animate-fade-in"
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                  <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{visitor.visitorIp}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-zinc-500 dark:text-zinc-400 text-xs">
                <span>{new Date(visitor.visitedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                <span className="text-zinc-400">•</span>
                <span>{new Date(visitor.visitedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}