"use client"

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Lightbulb, Sparkles, TrendingUp, Users, X, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function TreeTips() {
  const router = useRouter()
  const [dismissedTips, setDismissedTips] = useState<number[]>([])
  const [completedTips, setCompletedTips] = useState<number[]>([])

  const tips = [
    {
      icon: Sparkles,
      title: 'Make it personal',
      description: 'Add a profile photo and bio to help visitors connect with you',
      color: 'text-purple-600',
      action: 'Edit Profile',
      actionLink: '/admin/edit-profile'
    },
    {
      icon: TrendingUp,
      title: 'Keep it updated',
      description: 'Regularly add new links and remove outdated ones',
      color: 'text-blue-600',
      action: 'Add Link',
      actionLink: '/admin/my-tree'
    },
    {
      icon: Users,
      title: 'Drive traffic',
      description: 'Share your tree link on all your social media profiles',
      color: 'text-green-600',
      action: 'Share',
      actionLink: '/admin/my-tree'
    },
    {
      icon: Lightbulb,
      title: 'Use descriptions',
      description: 'Add short descriptions to help visitors understand each link',
      color: 'text-orange-600',
      action: 'View Tips',
      actionLink: '/admin/my-tree'
    }
  ]

  const handleDismiss = (index: number) => {
    setDismissedTips([...dismissedTips, index])
  }

  const handleAction = (index: number, link: string) => {
    setCompletedTips([...completedTips, index])
    router.push(link)
  }

  const visibleTips = tips.filter((_, index) => !dismissedTips.includes(index))

  if (visibleTips.length === 0) {
    return null
  }

  return (
    <Card className='p-6 border-2 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-2'>
          <Lightbulb size={20} className='text-amber-600' />
          <h3 className='font-semibold'>Pro Tips</h3>
        </div>
        <span className='text-xs text-muted-foreground'>
          {visibleTips.length} tip{visibleTips.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        {tips.map((tip, index) => (
          !dismissedTips.includes(index) && (
            <div key={index} className='relative group'>
              <div className='flex gap-3 p-3 rounded-lg bg-background/60 backdrop-blur border border-transparent hover:border-amber-200 dark:hover:border-amber-900 transition-all'>
                <tip.icon size={20} className={`${tip.color} flex-shrink-0 mt-0.5`} />
                <div className='space-y-2 flex-1'>
                  <div className='flex items-start justify-between gap-2'>
                    <p className='font-medium text-sm'>{tip.title}</p>
                    <button
                      onClick={() => handleDismiss(index)}
                      className='opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground'
                      aria-label='Dismiss tip'
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <p className='text-xs text-muted-foreground leading-relaxed'>
                    {tip.description}
                  </p>
                  <Button
                    size="sm"
                    variant={completedTips.includes(index) ? "outline" : "default"}
                    className={`w-full text-xs h-7 ${
                      completedTips.includes(index)
                        ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-950 dark:text-green-300 dark:border-green-900'
                        : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700'
                    }`}
                    onClick={() => handleAction(index, tip.actionLink)}
                  >
                    {completedTips.includes(index) ? (
                      <>
                        <CheckCircle2 size={14} className='mr-1' />
                        Done
                      </>
                    ) : (
                      tip.action
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    </Card>
  )
}
