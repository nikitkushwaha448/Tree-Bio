"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Copy, Check, Twitter, Facebook, Linkedin, Mail, QrCode } from 'lucide-react'
import { toast } from 'sonner'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  username: string
}

export function ShareModal({ isOpen, onClose, username }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const profileUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/${username}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl)
      setCopied(true)
      toast.success('Link copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Failed to copy link')
    }
  }

  const shareOn = (platform: string) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=Check out my TreeBio&url=${encodeURIComponent(profileUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`,
      email: `mailto:?subject=Check out my TreeBio&body=${encodeURIComponent(profileUrl)}`
    }
    
    if (platform in urls) {
      window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Tree</DialogTitle>
          <DialogDescription>
            Share your link tree with the world
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Copy Link */}
          <div className="flex items-center space-x-2">
            <Input
              value={profileUrl}
              readOnly
              className="flex-1"
            />
            <Button
              size="sm"
              className="gap-2"
              onClick={copyToClipboard}
            >
              {copied ? (
                <>
                  <Check size={16} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy
                </>
              )}
            </Button>
          </div>

          {/* Social Share Buttons */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Share on social media</p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => shareOn('twitter')}
              >
                <Twitter size={16} className="text-blue-400" />
                Twitter
              </Button>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => shareOn('facebook')}
              >
                <Facebook size={16} className="text-blue-600" />
                Facebook
              </Button>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => shareOn('linkedin')}
              >
                <Linkedin size={16} className="text-blue-700" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => shareOn('email')}
              >
                <Mail size={16} />
                Email
              </Button>
            </div>
          </div>

          {/* QR Code Button */}
          <Button
            variant="secondary"
            className="w-full gap-2"
            onClick={() => {
              window.open(`/admin/tools/qr-generator?url=${encodeURIComponent(profileUrl)}`, '_blank')
            }}
          >
            <QrCode size={16} />
            Generate QR Code
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
