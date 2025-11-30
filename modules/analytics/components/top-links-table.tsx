import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { ExternalLink, MousePointer, TrendingUp } from "lucide-react"
import { getTopLinks } from "../actions"

interface TopLinksTableProps {
  userId: string
}

export async function TopLinksTable({ userId }: TopLinksTableProps) {
  const topLinks = await getTopLinks(userId, 5)

  if (!topLinks || topLinks.length === 0) {
    return (
      <Card className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
        <CardHeader>
          <CardTitle className="text-zinc-900 dark:text-zinc-100">Top Performing Links</CardTitle>
          <CardDescription className="text-zinc-600 dark:text-zinc-400">Your most clicked links</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 space-y-3">
            <div className="text-zinc-500 dark:text-zinc-400">No links created yet</div>
            <a
              href="/admin/my-tree#add-link"
              className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-400"
            >
              Start Building Your Tree
            </a>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 border-zinc-200 dark:border-zinc-700 shadow-md">
      <CardHeader className="border-b border-zinc-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800/50">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Top Performing Links</CardTitle>
            <CardDescription className="text-zinc-600 dark:text-zinc-400">Your most clicked links</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-3">
          {topLinks.map((link, index) => {
            const gradients = [
              'from-yellow-400 to-orange-500',
              'from-blue-400 to-cyan-500', 
              'from-purple-400 to-pink-500',
              'from-green-400 to-emerald-500',
              'from-red-400 to-rose-500'
            ];
            return (
              <div
                key={link.id}
                className="group flex items-center justify-between p-4 rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-center space-x-4 flex-1 min-w-0">
                  <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br ${gradients[index]} rounded-full flex items-center justify-center shadow-lg`}>
                    <span className="text-sm font-bold text-white">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{link.title}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">{link.url}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 flex-shrink-0">
                  <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200 dark:border-purple-800">
                    <MousePointer className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">{link.clickCount.toLocaleString()}</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-zinc-400 dark:text-zinc-500 group-hover:text-purple-500 transition-colors" />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}