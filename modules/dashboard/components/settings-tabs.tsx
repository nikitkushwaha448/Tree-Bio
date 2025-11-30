'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { User, Lock, Bell, Palette, Share2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

const SettingsTabs = () => {
  const [isLoading, setIsLoading] = useState(false)

  // Profile State
  const [profile, setProfile] = useState({
    firstName: 'Nikit',
    lastName: 'kushwaha',
    email: 'nikit@example.com',
    bio: 'Building amazing digital products',
    username: 'nikitk',
  })

  // Privacy State
  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showAnalytics: true,
    allowMessages: true,
    indexInSearch: true,
  })

  // Notification State
  const [notifications, setNotifications] = useState({
    emailOnNewClick: true,
    emailOnNewLink: true,
    emailOnAnalytics: false,
    pushNotifications: true,
    marketingEmails: false,
  })

  // Theme State
  const [theme, setTheme] = useState('system')

  // Sharing State
  const [sharing, setSharingState] = useState({
    profileUrl: 'https://treebio.com/nikitk',
    customDomain: '',
    socialLinks: {
      twitter: 'https://twitter.com/example',
      github: 'https://github.com/example',
      linkedin: 'https://linkedin.com/in/example',
    },
  })

  const handleProfileChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value })
  }

  const handlePrivacyChange = (field: string, value: boolean) => {
    setPrivacy({ ...privacy, [field]: value })
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications({ ...notifications, [field]: value })
  }

  const handleSocialLinkChange = (platform: string, value: string) => {
    setSharingState({
      ...sharing,
      socialLinks: {
        ...sharing.socialLinks,
        [platform]: value,
      },
    })
  }

  const saveSettings = async (section: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success(`${section} settings saved successfully!`)
    } catch (error) {
      toast.error('Failed to save settings')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordChange = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Password changed successfully!')
    } catch (error) {
      toast.error('Failed to change password')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure? This action cannot be undone.')) {
      setIsLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        toast.success('Account deleted successfully')
      } catch (error) {
        toast.error('Failed to delete account')
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 mb-6 h-auto p-1 bg-muted/50">
        <TabsTrigger value="profile" className="gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all">
          <User size={18} />
          <span className="hidden sm:inline">Profile</span>
        </TabsTrigger>
        <TabsTrigger value="privacy" className="gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white transition-all">
          <Lock size={18} />
          <span className="hidden sm:inline">Privacy</span>
        </TabsTrigger>
        <TabsTrigger value="security" className="gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-violet-600 data-[state=active]:text-white transition-all">
          <Lock size={18} />
          <span className="hidden sm:inline">Security</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white transition-all">
          <Bell size={18} />
          <span className="hidden sm:inline">Notifications</span>
        </TabsTrigger>
        <TabsTrigger value="appearance" className="gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-pink-500 data-[state=active]:to-rose-600 data-[state=active]:text-white transition-all">
          <Palette size={18} />
          <span className="hidden sm:inline">Appearance</span>
        </TabsTrigger>
        <TabsTrigger value="sharing" className="gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all">
          <Share2 size={18} />
          <span className="hidden sm:inline">Sharing</span>
        </TabsTrigger>
        <TabsTrigger value="danger" className="gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-red-500 data-[state=active]:to-red-700 data-[state=active]:text-white transition-all">
          <Trash2 size={18} />
          <span className="hidden sm:inline">Danger</span>
        </TabsTrigger>
      </TabsList>

      {/* Profile Tab */}
      <TabsContent value="profile" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Card className='border-2 shadow-sm'>
          <CardHeader>
            <div className='flex items-center gap-3'>
              <div className='h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30'>
                <User size={22} className='text-white' />
              </div>
              <div>
                <CardTitle className="text-xl">Profile Settings</CardTitle>
                <CardDescription>Update your personal information and bio</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profile.firstName}
                  onChange={(e) => handleProfileChange('firstName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profile.lastName}
                  onChange={(e) => handleProfileChange('lastName', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={profile.email} disabled className='bg-muted' />
              <p className="text-xs text-muted-foreground">Email cannot be changed</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={profile.username} disabled className='bg-muted' />
              <p className="text-xs text-muted-foreground">Username is unique and cannot be changed</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself"
                value={profile.bio}
                onChange={(e) => handleProfileChange('bio', e.target.value)}
                maxLength={500}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">{profile.bio.length}/500 characters</p>
            </div>

            <Button
              onClick={() => saveSettings('Profile')}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              size="lg"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Privacy Tab */}
      <TabsContent value="privacy" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Card className="border-2 shadow-sm">
          <CardHeader>
            <div className='flex items-center gap-3'>
              <div className='h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30'>
                <Lock size={22} className='text-white' />
              </div>
              <div>
                <CardTitle className="text-xl">Privacy Settings</CardTitle>
                <CardDescription>Control who can see your profile and data</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-base">Profile Visibility</h3>
              
              <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                <div>
                  <Label className="font-medium">Public Profile</Label>
                  <p className="text-sm text-muted-foreground">Make your profile visible to everyone</p>
                </div>
                <Switch
                  checked={privacy.profilePublic}
                  onCheckedChange={(checked) => handlePrivacyChange('profilePublic', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                <div>
                  <Label className="font-medium">Show Analytics</Label>
                  <p className="text-sm text-muted-foreground">Display click counts publicly on your links</p>
                </div>
                <Switch
                  checked={privacy.showAnalytics}
                  onCheckedChange={(checked) => handlePrivacyChange('showAnalytics', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                <div>
                  <Label className="font-medium">Allow Messages</Label>
                  <p className="text-sm text-muted-foreground">Let visitors contact you through your profile</p>
                </div>
                <Switch
                  checked={privacy.allowMessages}
                  onCheckedChange={(checked) => handlePrivacyChange('allowMessages', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                <div>
                  <Label className="font-medium">Search Engine Indexing</Label>
                  <p className="text-sm text-muted-foreground">Allow search engines to index your profile</p>
                </div>
                <Switch
                  checked={privacy.indexInSearch}
                  onCheckedChange={(checked) => handlePrivacyChange('indexInSearch', checked)}
                />
              </div>
            </div>

            <Button
              onClick={() => saveSettings('Privacy')}
              disabled={isLoading}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              size="lg"
            >
              {isLoading ? 'Saving...' : 'Save Privacy Settings'}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Security Tab */}
      <TabsContent value="security" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Card className="border-2 shadow-sm">
          <CardHeader>
            <div className='flex items-center gap-3'>
              <div className='h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/30'>
                <Lock size={22} className='text-white' />
              </div>
              <div>
                <CardTitle className="text-xl">Security Settings</CardTitle>
                <CardDescription>Manage your password and account security</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 border-b pb-6">
              <h3 className="font-semibold text-base">Change Password</h3>
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" placeholder="Enter current password" className="bg-muted/30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" placeholder="Enter new password" className="bg-muted/30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirm new password" className="bg-muted/30" />
              </div>
              <Button
                onClick={handlePasswordChange}
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
                size="lg"
              >
                {isLoading ? 'Updating...' : 'Update Password'}
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-base">Two-Factor Authentication</h3>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account by requiring a code in addition to your password
              </p>
              <Button variant="outline" className="border-purple-200 hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-950">Enable 2FA</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Notifications Tab */}
      <TabsContent value="notifications" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Card className="border-2 shadow-sm">
          <CardHeader>
            <div className='flex items-center gap-3'>
              <div className='h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30'>
                <Bell size={22} className='text-white' />
              </div>
              <div>
                <CardTitle className="text-xl">Notification Preferences</CardTitle>
                <CardDescription>Choose how and when you want to be notified</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-base">Email Notifications</h3>
              
              <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                <div>
                  <Label className="font-medium">New Link Clicks</Label>
                  <p className="text-sm text-muted-foreground">Get notified when someone clicks your links</p>
                </div>
                <Switch
                  checked={notifications.emailOnNewClick}
                  onCheckedChange={(checked) =>
                    handleNotificationChange('emailOnNewClick', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                <div>
                  <Label className="font-medium">New Links Created</Label>
                  <p className="text-sm text-muted-foreground">Confirmation when you create new links</p>
                </div>
                <Switch
                  checked={notifications.emailOnNewLink}
                  onCheckedChange={(checked) =>
                    handleNotificationChange('emailOnNewLink', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                <div>
                  <Label className="font-medium">Analytics Updates</Label>
                  <p className="text-sm text-muted-foreground">Weekly analytics summary</p>
                </div>
                <Switch
                  checked={notifications.emailOnAnalytics}
                  onCheckedChange={(checked) =>
                    handleNotificationChange('emailOnAnalytics', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                <div>
                  <Label className="font-medium">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">Tips, updates, and special offers</p>
                </div>
                <Switch
                  checked={notifications.marketingEmails}
                  onCheckedChange={(checked) =>
                    handleNotificationChange('marketingEmails', checked)
                  }
                />
              </div>
            </div>

            <Button
              onClick={() => saveSettings('Notification')}
              disabled={isLoading}
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
              size="lg"
            >
              {isLoading ? 'Saving...' : 'Save Preferences'}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Appearance Tab */}
      <TabsContent value="appearance" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Card className="border-2 shadow-sm">
          <CardHeader>
            <div className='flex items-center gap-3'>
              <div className='h-12 w-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/30'>
                <Palette size={22} className='text-white' />
              </div>
              <div>
                <CardTitle className="text-xl">Appearance Settings</CardTitle>
                <CardDescription>Customize how TreeBio looks for you</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 p-4 rounded-lg border bg-muted/30">
              <h3 className="font-semibold text-base">Theme Preference</h3>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-full md:w-64 bg-background">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">☀️ Light Mode</SelectItem>
                  <SelectItem value="dark">🌙 Dark Mode</SelectItem>
                  <SelectItem value="system">💻 System Default</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Choose your preferred color scheme. System default will sync with your OS settings.
              </p>
            </div>

            <Button
              onClick={() => saveSettings('Appearance')}
              disabled={isLoading}
              className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
              size="lg"
            >
              {isLoading ? 'Saving...' : 'Save Preferences'}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Sharing Tab */}
      <TabsContent value="sharing" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Card className="border-2 shadow-sm">
          <CardHeader>
            <div className='flex items-center gap-3'>
              <div className='h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30'>
                <Share2 size={22} className='text-white' />
              </div>
              <div>
                <CardTitle className="text-xl">Sharing & Social</CardTitle>
                <CardDescription>Manage your profile sharing and social links</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 p-4 rounded-lg border bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30">
              <h3 className="font-semibold text-base">Profile URL</h3>
              <div className="flex gap-2">
                <Input value={sharing.profileUrl} readOnly className="bg-background" />
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(sharing.profileUrl)
                    toast.success('Profile URL copied to clipboard!')
                  }}
                  className="shrink-0"
                >
                  Copy
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Share this link to direct people to your TreeBio profile</p>
            </div>

            <div className="space-y-4 border-t pt-4">
              <h3 className="font-semibold text-base">Social Links</h3>
              
              <div className="space-y-2">
                <Label htmlFor="twitter">🐦 Twitter / X</Label>
                <Input
                  id="twitter"
                  placeholder="https://twitter.com/username"
                  value={sharing.socialLinks.twitter}
                  onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                  className="bg-muted/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="github">💻 GitHub</Label>
                <Input
                  id="github"
                  placeholder="https://github.com/username"
                  value={sharing.socialLinks.github}
                  onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                  className="bg-muted/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">💼 LinkedIn</Label>
                <Input
                  id="linkedin"
                  placeholder="https://linkedin.com/in/username"
                  value={sharing.socialLinks.linkedin}
                  onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                  className="bg-muted/30"
                />
              </div>
            </div>

            <Button
              onClick={() => saveSettings('Sharing')}
              disabled={isLoading}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
              size="lg"
            >
              {isLoading ? 'Saving...' : 'Save Links'}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Danger Zone Tab */}
      <TabsContent value="danger" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Card className="border-2 border-red-200 dark:border-red-900 shadow-sm shadow-red-500/20">
          <CardHeader>
            <div className='flex items-center gap-3'>
              <div className='h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-500/30'>
                <Trash2 size={22} className='text-white' />
              </div>
              <div>
                <CardTitle className="text-xl text-red-600 dark:text-red-400">Danger Zone</CardTitle>
                <CardDescription>Irreversible and destructive actions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 p-4 rounded-lg border-2 border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20">
              <h3 className="font-semibold text-base text-red-600 dark:text-red-400">⚠️ Delete All Data</h3>
              <p className="text-sm text-muted-foreground">
                This will permanently delete all your links, analytics data, and settings. This action <strong>cannot be undone</strong> and your data cannot be recovered.
              </p>
              <Button 
                variant="destructive"
                onClick={() => {
                  if (window.confirm('⚠️ Are you absolutely sure?\n\nThis will delete ALL your data including:\n• All short links\n• Analytics history\n• Profile settings\n\nThis action CANNOT be undone!')) {
                    toast.success('All data deletion initiated')
                  }
                }}
              >
                Delete All Data
              </Button>
            </div>

            <div className="space-y-4 p-4 rounded-lg border-2 border-red-300 dark:border-red-700 bg-red-100/50 dark:bg-red-900/20">
              <h3 className="font-semibold text-base text-red-700 dark:text-red-300">🚨 Delete Account</h3>
              <p className="text-sm text-muted-foreground">
                Permanently delete your TreeBio account and all associated data. Your username will be released and may be claimed by someone else.
              </p>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700"
              >
                {isLoading ? 'Deleting...' : 'Delete Account Forever'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default SettingsTabs
