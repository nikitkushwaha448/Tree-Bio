import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getAllLinkForUser } from '@/modules/links/actions'
import LinkForm from '@/modules/links/components/link-form'
import { getCurrentUsername } from '@/modules/profile/actions'
import { Eye, ExternalLink, Smartphone, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { MyTreeActions } from '@/modules/dashboard/components/my-tree-actions'
import { TreeTips } from '@/modules/dashboard/components/tree-tips'
import { EmptyTreeState } from '@/modules/dashboard/components/empty-tree-state'

const page = async() => {
  const profile = await getCurrentUsername();
  const links = await getAllLinkForUser()
  
  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-muted/20 animate-fade-in'>
      {/* Header Section */}
      <div className='sticky top-0 z-10 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 border-b border-border/50 shadow-sm'>
        <div className='container max-w-7xl mx-auto px-4 py-5'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
            <div className='space-y-1'>
              <h1 className='text-3xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'>My Tree</h1>
              <p className='text-muted-foreground'>Build and customize your link tree</p>
            </div>
            <MyTreeActions username={profile?.username || ''} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='container max-w-7xl mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
          {/* Editor Section */}
          <div className='lg:col-span-7 space-y-6'>
            {(!links?.data || links.data.length === 0) && (
              <EmptyTreeState />
            )}
            
            <Card className='p-6 border-2 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/50'>
              <div className='flex items-center gap-3 mb-6'>
                <div className='h-10 w-1 bg-gradient-to-b from-green-600 to-emerald-600 rounded-full'></div>
                <div>
                  <h2 className='text-xl font-bold'>Edit Your Tree</h2>
                  <p className='text-xs text-muted-foreground'>Manage your links and profile</p>
                </div>
              </div>
              <LinkForm
                username={profile?.username!}
                bio={profile?.bio!}
                // @ts-ignore
                link={links.data!}
                // @ts-ignore
                socialLinks={profile?.socialLinks!}
              />
            </Card>
          </div>

          {/* Preview Section */}
          <div className='lg:col-span-5 lg:sticky lg:top-24'>
            <Card className='p-6 border-2 bg-gradient-to-br from-card via-card to-muted/30 shadow-xl hover:shadow-2xl transition-all duration-500'>
              <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center gap-2'>
                  <div className='p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500'>
                    <Smartphone size={18} className='text-white' />
                  </div>
                  <h3 className='font-bold'>Live Preview</h3>
                </div>
                <Badge variant="secondary" className='gap-1.5 bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20'>
                  <div className='h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50'></div>
                  Live
                </Badge>
              </div>
              
              {/* Phone Mockup */}
              <div className='mx-auto max-w-sm transform hover:scale-105 transition-transform duration-500'>
                <div className='relative aspect-[9/19] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl hover:shadow-3xl border-8 border-gray-900 transition-shadow duration-500'>
                  {/* Phone Notch */}
                  <div className='absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-10'></div>
                  
                  {/* Screen Content */}
                  <div className='relative h-full w-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 rounded-[2.3rem] overflow-hidden shadow-inner'>
                    <div className='h-full overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700'>
                      {/* Preview Profile */}
                      <div className='flex flex-col items-center text-center space-y-3'>
                        <div className='h-20 w-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg'>
                          {profile?.username?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                          <h3 className='font-bold text-lg'>@{profile?.username || 'username'}</h3>
                          <p className='text-sm text-muted-foreground line-clamp-2 mt-1'>
                            {profile?.bio || 'Your bio will appear here'}
                          </p>
                        </div>
                      </div>

                      {/* Preview Links */}
                      <div className='space-y-2 mt-6'>
                        {links?.data && links.data.length > 0 ? (
                          links.data.slice(0, 5).map((link, index) => (
                            <div 
                              key={link.id}
                              className='w-full p-4 rounded-xl bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer'
                            >
                              <p className='font-medium text-sm line-clamp-1'>{link.title}</p>
                              {link.description && (
                                <p className='text-xs text-muted-foreground line-clamp-1 mt-1'>
                                  {link.description}
                                </p>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className='text-center py-8 space-y-3'>
                            <div className='h-12 w-12 rounded-full bg-muted mx-auto flex items-center justify-center'>
                              <ExternalLink size={20} className='text-muted-foreground' />
                            </div>
                            <p className='text-sm text-muted-foreground'>
                              Add links to see them here
                            </p>
                            <Link
                              href={'/admin/my-tree#add-link'}
                              className='inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-400'
                            >
                              Start Building Your Tree
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Preview Footer */}
                <div className='mt-6 text-center space-y-2'>
                  <p className='text-sm text-muted-foreground'>
                    This is how your tree will look to visitors
                  </p>
                  {profile?.username && (
                    <Link 
                      href={`/${profile.username}`}
                      target="_blank"
                      className='inline-flex items-center gap-1.5 text-sm text-primary hover:underline'
                    >
                      View full page
                      <ExternalLink size={14} />
                    </Link>
                  )}
                </div>
              </div>
            </Card>

            {/* Stats Card */}
            <Card className='mt-6 p-6 border-2 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-muted/20'>
              <div className='flex items-center gap-2 mb-4'>
                <TrendingUp className='h-5 w-5 text-green-600' />
                <h3 className='font-bold'>Quick Stats</h3>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 group'>
                  <p className='text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block'>
                    {links?.data?.length || 0}
                  </p>
                  <p className='text-xs text-muted-foreground font-medium mt-1'>Total Links</p>
                </div>
                <div className='p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group'>
                  <p className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block'>
                    {links?.data?.reduce((acc, link) => acc + link.clickCount, 0) || 0}
                  </p>
                  <p className='text-xs text-muted-foreground font-medium mt-1'>Total Clicks</p>
                </div>
              </div>
            </Card>

            {/* Tips Section */}
            <div className='mt-6'>
              <TreeTips />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page