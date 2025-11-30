"use client"

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Zap, Share2, BarChart3 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function EmptyTreeState() {
  const router = useRouter()
  const features = [
    {
      icon: Plus,
      title: 'Add Links',
      description: 'Share all your important links in one place'
    },
    {
      icon: Share2,
      title: 'Share Easily',
      description: 'One link to share across all platforms'
    },
    {
      icon: BarChart3,
      title: 'Track Performance',
      description: 'See which links get the most clicks'
    }
  ]

  return (
    <Card className='p-12 border-2 border-dashed text-center space-y-6'>
      <div className='mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center'>
        <Zap size={40} className='text-white' />
      </div>
      
      <div className='space-y-2'>
        <h3 className='text-2xl font-bold'>Start Building Your Tree!</h3>
        <p className='text-muted-foreground max-w-md mx-auto'>
          Add your first link to get started. Your link tree will help you share all your content in one beautiful place.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-4'>
        {features.map((feature, index) => (
          <div key={index} className='text-center space-y-2'>
            <div className='mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center'>
              <feature.icon size={20} className='text-muted-foreground' />
            </div>
            <div>
              <p className='font-medium text-sm'>{feature.title}</p>
              <p className='text-xs text-muted-foreground'>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='pt-4 flex items-center justify-center gap-3'>
        <Button
          size='lg'
          className='bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-400'
          onClick={() => router.push('/admin/my-tree#add-link')}
        >
          Start Building Your Tree
        </Button>
        <Button variant='outline' onClick={() => router.push('/admin/my-tree')}>
          Go to Dashboard
        </Button>
      </div>
    </Card>
  )
}
