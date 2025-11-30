"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { onBoardUser } from '@/modules/auth/actions'
import ClaimLinkForm from '@/modules/home/components/claim-link-form'
import { getCurrentUsername } from '@/modules/profile/actions'
import Link from 'next/link'
import { ArrowRight, Link2, QrCode, BarChart3, Shield, Zap, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const HomePage = () => {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    async function loadData() {
      const userData = await onBoardUser()
      const profileData = await getCurrentUsername()
      setUser(userData)
      setProfile(profileData)
      console.log(profileData)
    }
    loadData()
  }, [])
  return (
    <div className='min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-zinc-950 dark:to-zinc-900'>
      {/* Hero Section */}
      <main className='text-center space-y-12 py-20 md:py-32 px-4'>
        <div className="space-y-8 max-w-5xl mx-auto">
          <Badge variant="secondary" className="text-sm px-4 py-1.5">
            🎉 Join 70M+ creators worldwide
          </Badge>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-600 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-400 bg-clip-text text-transparent">
            Everything you are.
            <br />
            <span className="bg-gradient-to-r from-[#41B313] to-[#34A00F] bg-clip-text">In one simple link.</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            One link to help you share everything you create, curate and sell from your social media profiles.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center pt-4'>
            {user?.success && profile?.username ? (
              <Link href="/admin/my-tree">
                <Button size="lg" className="px-8 py-6 text-lg font-semibold bg-[#41B313] hover:bg-[#369611] shadow-lg hover:shadow-xl transition-all group">
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <>
                <Button 
                  size="lg" 
                  className="px-8 py-6 text-lg font-semibold bg-[#41B313] hover:bg-[#369611] shadow-lg hover:shadow-xl transition-all"
                  onClick={() => {
                    const claimSection = document.querySelector('section.pb-12');
                    claimSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                >
                  Get Started Free
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-6 text-lg font-semibold"
                  onClick={() => {
                    const featuresSection = document.querySelector('section.py-20');
                    featuresSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  Learn More
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Claim Link Section */}
        <section className='pb-12 md:pb-20'>
          <div className='max-w-xl mx-auto'>
            <ClaimLinkForm />
          </div>
        </section>

        {/* Features Grid */}
        <section className='py-20 px-4 overflow-hidden'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl md:text-5xl font-bold mb-4'>Powerful Features</h2>
              <p className='text-xl text-gray-600 dark:text-gray-400'>Everything you need to manage your online presence</p>
            </div>
            
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
              <Card className="border-2 hover:border-[#41B313] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer animate-fade-in" onClick={() => window.location.href = '/admin/short-links'} style={{ animationDelay: '0ms' }}>
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#41B313]/10 flex items-center justify-center transition-transform hover:scale-110">
                    <Link2 className="w-6 h-6 text-[#41B313]" />
                  </div>
                  <h3 className='text-xl font-bold'>Link Shortener</h3>
                  <p className='text-gray-600 dark:text-gray-400'>Create short, memorable links with QR codes for easy sharing</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-[#41B313] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer animate-fade-in" onClick={() => window.location.href = '/admin/tools'} style={{ animationDelay: '100ms' }}>
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#41B313]/10 flex items-center justify-center transition-transform hover:scale-110">
                    <QrCode className="w-6 h-6 text-[#41B313]" />
                  </div>
                  <h3 className='text-xl font-bold'>QR Code Generator</h3>
                  <p className='text-gray-600 dark:text-gray-400'>Generate custom QR codes for all your links instantly</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-[#41B313] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer animate-fade-in" onClick={() => window.location.href = '/admin/overview'} style={{ animationDelay: '200ms' }}>
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#41B313]/10 flex items-center justify-center transition-transform hover:scale-110">
                    <BarChart3 className="w-6 h-6 text-[#41B313]" />
                  </div>
                  <h3 className='text-xl font-bold'>Analytics Dashboard</h3>
                  <p className='text-gray-600 dark:text-gray-400'>Track clicks, views, and engagement with detailed analytics</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-[#41B313] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer animate-fade-in" onClick={() => window.location.href = '/admin/my-tree'} style={{ animationDelay: '300ms' }}>
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#41B313]/10 flex items-center justify-center transition-transform hover:scale-110">
                    <Zap className="w-6 h-6 text-[#41B313]" />
                  </div>
                  <h3 className='text-xl font-bold'>Lightning Fast</h3>
                  <p className='text-gray-600 dark:text-gray-400'>Optimized performance for instant page loads</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-[#41B313] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer animate-fade-in" onClick={() => window.location.href = '/admin/settings'} style={{ animationDelay: '400ms' }}>
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#41B313]/10 flex items-center justify-center transition-transform hover:scale-110">
                    <Shield className="w-6 h-6 text-[#41B313]" />
                  </div>
                  <h3 className='text-xl font-bold'>Secure & Private</h3>
                  <p className='text-gray-600 dark:text-gray-400'>Enterprise-grade security to protect your data</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-[#41B313] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer animate-fade-in" onClick={() => window.location.href = '/admin/my-tree'} style={{ animationDelay: '500ms' }}>
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#41B313]/10 flex items-center justify-center transition-transform hover:scale-110">
                    <Users className="w-6 h-6 text-[#41B313]" />
                  </div>
                  <h3 className='text-xl font-bold'>70M+ Users</h3>
                  <p className='text-gray-600 dark:text-gray-400'>Join millions of creators and businesses worldwide</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-20 px-4'>
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-[#41B313] to-[#34A00F] border-0 text-white">
            <CardContent className="p-12 text-center space-y-6">
              <h2 className='text-4xl md:text-5xl font-bold'>Ready to get started?</h2>
              <p className='text-xl opacity-90'>Create your TreeBio link in seconds. No credit card required.</p>
              <Button 
                size="lg" 
                variant="secondary" 
                className="px-8 py-6 text-lg font-semibold"
                onClick={() => {
                  const claimSection = document.querySelector('section.pb-12');
                  claimSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
              >
                Claim Your Link Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}

export default HomePage