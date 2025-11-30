'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { ExternalLink, Copy, TrendingUp, Eye, Clock } from 'lucide-react'
import { toast } from 'sonner'

interface LinkData {
  id: string
  title: string
  url: string
  shortCode: string
  clicks: number
  createdAt: string
  lastClicked?: string
}

// Mock data for demonstration
const mockLinks: LinkData[] = [
  {
    id: '1',
    title: 'GitHub Profile',
    url: 'https://github.com/example',
    shortCode: 'ABC123',
    clicks: 342,
    createdAt: '2024-11-01',
    lastClicked: '2024-11-18',
  },
  {
    id: '2',
    title: 'Portfolio',
    url: 'https://portfolio.example.com',
    shortCode: 'DEF456',
    clicks: 189,
    createdAt: '2024-11-05',
    lastClicked: '2024-11-17',
  },
  {
    id: '3',
    title: 'Blog Post',
    url: 'https://blog.example.com/first-post',
    shortCode: 'GHI789',
    clicks: 567,
    createdAt: '2024-11-10',
    lastClicked: '2024-11-18',
  },
  {
    id: '4',
    title: 'Twitter',
    url: 'https://twitter.com/example',
    shortCode: 'JKL012',
    clicks: 234,
    createdAt: '2024-11-12',
    lastClicked: '2024-11-16',
  },
]

// Mock click data for the last 7 days
const mockClickData = [
  { date: 'Mon', clicks: 120 },
  { date: 'Tue', clicks: 150 },
  { date: 'Wed', clicks: 180 },
  { date: 'Thu', clicks: 240 },
  { date: 'Fri', clicks: 290 },
  { date: 'Sat', clicks: 200 },
  { date: 'Sun', clicks: 320 },
]

const COLORS = ['#41B313', '#369611', '#2E7A0D', '#26610A']

const LinksAnalytics = () => {
  const [links, setLinks] = useState<LinkData[]>(mockLinks)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredLinks = links.filter(
    (link) =>
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.shortCode.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0)
  const totalLinks = links.length
  const avgClicksPerLink = Math.round(totalClicks / totalLinks)

  const topLinks = [...links].sort((a, b) => b.clicks - a.clicks).slice(0, 4)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 shadow-sm hover:shadow-md transition-shadow group overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="pb-2 relative">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <ExternalLink size={16} className="text-white" />
              </div>
              Total Links
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold">{totalLinks}</div>
            <p className="text-xs text-muted-foreground mt-1">Active links</p>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-sm hover:shadow-md transition-shadow group overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="pb-2 relative">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <TrendingUp size={16} className="text-white" />
              </div>
              Total Clicks
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{totalClicks}</div>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-sm hover:shadow-md transition-shadow group overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="pb-2 relative">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                <Eye size={16} className="text-white" />
              </div>
              Avg Clicks
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold">{avgClicksPerLink}</div>
            <p className="text-xs text-muted-foreground mt-1">Per link</p>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-sm hover:shadow-md transition-shadow group overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="pb-2 relative">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <TrendingUp size={16} className="text-white" />
              </div>
              Top Link
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold">{topLinks[0]?.clicks || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Clicks</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart - Clicks Over Time */}
        <Card className="border-2 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                <TrendingUp size={20} className="text-white" />
              </div>
              <div>
                <CardTitle>Clicks Over Time</CardTitle>
                <CardDescription>Performance trend - Last 7 days</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockClickData}>
                <defs>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ fill: '#22c55e', r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Clicks"
                  fill="url(#colorClicks)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart - Top Links Distribution */}
        <Card className="border-2 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <TrendingUp size={20} className="text-white" />
              </div>
              <div>
                <CardTitle>Top Links Distribution</CardTitle>
                <CardDescription>Click share among your best performers</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topLinks}
                  dataKey="clicks"
                  nameKey="shortCode"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.shortCode}: ${entry.clicks}`}
                  labelLine={false}
                >
                  {topLinks.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Links Table */}
      <Card className="border-2 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <ExternalLink size={20} className="text-white" />
            </div>
            <div>
              <CardTitle>All Links</CardTitle>
              <CardDescription>Comprehensive overview of your link performance</CardDescription>
            </div>
          </div>
          <div className="mt-4">
            <Input
              placeholder="🔍 Search by title, URL, or short code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-muted/30"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold">Short Code</th>
                  <th className="text-left py-3 px-4 font-semibold">Title</th>
                  <th className="text-left py-3 px-4 font-semibold">URL</th>
                  <th className="text-center py-3 px-4 font-semibold">
                    <div className="flex items-center justify-center gap-1">
                      <Eye size={16} />
                      Clicks
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      Created
                    </div>
                  </th>
                  <th className="text-center py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLinks.map((link) => (
                  <tr key={link.id} className="border-b hover:bg-muted/50 dark:hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <span className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 px-2.5 py-1 rounded-md text-xs font-semibold">
                        {link.shortCode}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium">{link.title}</td>
                    <td className="py-3 px-4 text-muted-foreground truncate max-w-xs">{link.url}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <TrendingUp size={16} className="text-green-600" />
                        <span className="font-semibold">{link.clicks}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{link.createdAt}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(link.url)}
                          title="Copy URL"
                          className="hover:bg-green-50 dark:hover:bg-green-950"
                        >
                          <Copy size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          asChild
                          title="Open URL"
                          className="hover:bg-blue-50 dark:hover:bg-blue-950"
                        >
                          <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${link.title}`} title={`Open ${link.title}`}>
                            <ExternalLink size={16} />
                          </a>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredLinks.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No links found matching your search
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LinksAnalytics
