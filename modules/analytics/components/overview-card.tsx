import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Eye, Link as LinkIcon, MousePointer, TrendingUp } from "lucide-react"
import { getAnalyticsSummary } from "../actions"

interface OverviewCardsProps {
  userId: string
}

export async function OverviewCards({ userId }: OverviewCardsProps) {
  const summary = await getAnalyticsSummary(userId)

  if (!summary) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="bg-zinc-50 dark:bg-zinc-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">--</div>
              {i === 0 && (
                <div className="mt-3">
                  <a
                    href="/admin/my-tree#add-link"
                    className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-400"
                  >
                    Start Building Your Tree
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const cards = [
    {
      title: "Profile Views",
      value: summary.profileVisits?.totalVisits || 0,
      description: `${summary.profileVisits?.visitsLast24Hours || 0} in last 24h`,
      icon: Eye,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
      link: "/admin/overview",
    },
    {
      title: "Total Links",
      value: summary.totalLinks,
      description: "Active links created",
      icon: LinkIcon,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10",
      link: "/admin/my-tree",
    },
    {
      title: "Total Clicks",
      value: summary.totalLinkClicks,
      description: "All-time link clicks",
      icon: MousePointer,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/10 to-red-500/10",
      link: "/admin/overview",
    },
    {
      title: "Top Link Performance",
      value: summary.topLink?.clickCount || 0,
      description: summary.topLink?.title || "No links yet",
      icon: TrendingUp,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/10 to-emerald-500/10",
      link: "/admin/my-tree",
    },
  ]

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <Link key={index} href={card.link}>
            <Card 
              className={`relative overflow-hidden bg-gradient-to-br ${card.bgGradient} dark:${card.bgGradient} border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{card.title}</CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br ${card.gradient} group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-br ${card.gradient} bg-clip-text text-transparent">{card.value.toLocaleString()}</div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 font-medium">{card.description}</p>
            </CardContent>
            {/* Decorative gradient line */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient}`}></div>
          </Card>
          </Link>
        )
      })}
    </div>
  )
}