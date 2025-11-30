import React from 'react'
import SettingsTabs from '../../../modules/dashboard/components/settings-tabs'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck, Bell, UserCog } from 'lucide-react'

const quickStats = [
  {
    title: 'Account Status',
    value: 'Active',
    icon: UserCog,
    desc: 'Profile is live and visible',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    title: 'Privacy',
    value: 'Optimized',
    icon: ShieldCheck,
    desc: 'Public profile + search index',
    color: 'from-green-500 to-emerald-600'
  },
  {
    title: 'Notifications',
    value: 'Custom',
    icon: Bell,
    desc: 'Personalized delivery enabled',
    color: 'from-amber-500 to-orange-600'
  }
]

const SettingsPage = () => {
  return (
    <div className="space-y-10">
      {/* Hero / Heading */}
      <div className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-background via-background to-background/40 p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.25),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_55%,rgba(99,102,241,0.25),transparent_65%)]" />
        <div className="relative">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="mt-2 max-w-xl text-muted-foreground">Fine‑tune your TreeBio experience – profile, privacy, appearance, and security controls all in one place.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary" className="animate-in fade-in slide-in-from-left-1">Account</Badge>
            <Badge variant="secondary" className="animate-in fade-in slide-in-from-left-2">Privacy</Badge>
            <Badge variant="secondary" className="animate-in fade-in slide-in-from-left-3">Notifications</Badge>
            <Badge variant="secondary" className="animate-in fade-in slide-in-from-left-4">Appearance</Badge>
            <Badge variant="secondary" className="animate-in fade-in slide-in-from-left-5">Sharing</Badge>
            <Badge variant="secondary" className="animate-in fade-in slide-in-from-left-6">Danger Zone</Badge>
          </div>
        </div>
      </div>

      {/* Quick Status Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {quickStats.map((s) => {
          const Icon = s.icon
          return (
            <Card key={s.title} className="group relative overflow-hidden border backdrop-blur-sm transition-colors">
              <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <CardHeader className="relative flex flex-row items-start justify-between space-y-0">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-md bg-gradient-to-br ${s.color} text-white flex items-center justify-center shadow-sm`}> <Icon size={20} /> </div>
                  <div>
                    <CardTitle className="text-base font-semibold">{s.title}</CardTitle>
                    <CardDescription className="text-xs">{s.desc}</CardDescription>
                  </div>
                </div>
                <span className="rounded-full border px-2 py-1 text-xs font-medium text-muted-foreground bg-muted/50">{s.value}</span>
              </CardHeader>
              <CardContent className="relative pt-0 text-xs text-muted-foreground">
                <p className="leading-relaxed">Use the tabs below to update these preferences.</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Detailed Settings Tabs */}
      <SettingsTabs />
    </div>
  )
}

export default SettingsPage
