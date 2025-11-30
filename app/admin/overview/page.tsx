import { db } from '@/lib/db';
import { AnalyticsWrapper } from '@/modules/analytics/components/analytics-wrapper';
import { OverviewCards } from '@/modules/analytics/components/overview-card';
import { RecentActivity } from '@/modules/analytics/components/recent-activity';
import { TopLinksTable } from '@/modules/analytics/components/top-links-table';
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, Share2 } from 'lucide-react'

const OverviewPage = async() => {
  const user = await currentUser();

  const id = await db.user.findUnique({
    where: { clerkId: user?.id },
    select: { id: true }
  });

  const userId = id?.id;

  return (
      <div className="space-y-8 animate-fade-in">
        {/* Header Section with Gradient */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 p-8 shadow-xl">
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">Analytics Overview</h1>
              <p className="text-purple-100 text-lg">
                Track your profile visits, link performance, and engagement metrics in real-time
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/admin/my-tree#add-link">
                <Button className="bg-white text-purple-600 hover:bg-purple-50 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Link
                </Button>
              </Link>
              <Link href="/admin/my-tree">
                <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm font-semibold shadow-lg">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Profile
                </Button>
              </Link>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
        </div>

        {/* Stats Cards */}
        <OverviewCards userId={userId!} />

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Chart - Takes 2 columns */}
          <div className="lg:col-span-2">
            <AnalyticsWrapper userId={userId!} />
          </div>

          {/* Recent Activity - Takes 1 column */}
          <div>
            <RecentActivity userId={userId!} />
          </div>
        </div>

        {/* Top Links - Full Width */}
        <TopLinksTable userId={userId!} />
      </div>
  )
}

export default OverviewPage