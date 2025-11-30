import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import LinksAnalytics from '@/modules/dashboard/components/links-analytics'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, BarChart3, Activity } from 'lucide-react'

const ToolsAnalyticsPage = () => {
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-background via-background to-background/40 p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(34,197,94,0.25),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_60%,rgba(16,185,129,0.25),transparent_65%)]" />
        <div className="relative flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                <BarChart3 size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight">Link Analytics</h1>
                <p className="text-muted-foreground mt-1">Deep insights into your link performance and engagement</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary" className="animate-in fade-in slide-in-from-left-1">
                <TrendingUp size={14} className="mr-1" /> Performance
              </Badge>
              <Badge variant="secondary" className="animate-in fade-in slide-in-from-left-2">
                <Activity size={14} className="mr-1" /> Real-time
              </Badge>
              <Badge variant="secondary" className="animate-in fade-in slide-in-from-left-3">
                <BarChart3 size={14} className="mr-1" /> Insights
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Content */}
      <LinksAnalytics />
    </div>
  )
}

export default ToolsAnalyticsPage
