"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Brush, Share, Eye, ExternalLink, Bot } from 'lucide-react'
import Link from 'next/link'
import { ShareModal } from './share-modal'
import { CustomizeModal } from './customize-modal'

interface MyTreeActionsProps {
  username: string
}

export function MyTreeActions({ username }: MyTreeActionsProps) {
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [customizeModalOpen, setCustomizeModalOpen] = useState(false)

  return (
    <>
      <div className='flex flex-wrap items-center gap-3'>
          <Button
            asChild
            size="default"
            className="inline-flex gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <Link href="/admin/ai" aria-label="Open AI Assistant">
                <Bot size={16} />
              AI Assistant
            </Link>
          </Button>
        {username && (
          <Link 
            href={`/${username}`}
            target="_blank"
            className='inline-flex'
          >
            <Button
              variant="outline"
              size="default"
              className="gap-2"
            >
              <Eye size={16} />
              Preview
              <ExternalLink size={14} className='opacity-60' />
            </Button>
          </Link>
        )}
        <Button
          variant="outline"
          size="default"
          className="gap-2"
          onClick={() => setCustomizeModalOpen(true)}
        >
          <Brush size={16} />
          Customize
        </Button>
        <Button
          variant="default"
          size="default"
          className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          onClick={() => setShareModalOpen(true)}
          disabled={!username}
        >
          <Share size={16} />
          Share
        </Button>
      </div>

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        username={username}
      />

      <CustomizeModal
        isOpen={customizeModalOpen}
        onClose={() => setCustomizeModalOpen(false)}
      />
    </>
  )
}
