import { db } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link2, TrendingUp, MousePointer } from 'lucide-react'
import { ShortLinksClient } from '@/modules/links/components/short-links-client'
import Link from 'next/link'

export const revalidate = 0

export default async function ShortLinksPage() {
  const links = await db.shortLink.findMany({ orderBy: { createdAt: 'desc' } })

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0)

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section with Gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-500 p-8 shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">Short Links</h1>
            <p className="text-blue-100 text-lg">
              Manage all your shortened links and track click statistics
            </p>
          </div>
          <Link href="/admin/tools/shortener">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              <Link2 className="h-4 w-4 mr-2" />
              Create New Link
            </Button>
          </Link>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-5 md:grid-cols-3">
        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Total Links</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 group-hover:scale-110 transition-transform duration-300">
              <Link2 className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{links.length}</div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 font-medium">Active short links</p>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
        </Card>
        
        <Card className="relative overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Total Clicks</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 group-hover:scale-110 transition-transform duration-300">
              <MousePointer className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{totalClicks}</div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 font-medium">All-time clicks</p>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        </Card>
        
        <Card className="relative overflow-hidden bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-200 dark:border-orange-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Avg Clicks/Link</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {links.length > 0 ? (totalClicks / links.length).toFixed(1) : 0}
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 font-medium">Performance metric</p>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
        </Card>
      </div>

      {/* Interactive Client Component */}
      <ShortLinksClient links={links} />
    </div>
  )
}
