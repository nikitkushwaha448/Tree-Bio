'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Download, Copy, QrCode, ExternalLink, Link2, Check, Zap } from 'lucide-react'
import { toast } from 'sonner'

interface ShortenedLink {
  originalUrl: string
  shortCode: string
  shortUrl: string
  qrCode: string
  createdAt: Date
}

const LinkShortenerGenerator = () => {
  const [originalUrl, setOriginalUrl] = useState('')
  const [shortenedLinks, setShortenedLinks] = useState<ShortenedLink[]>([])
  const [loading, setLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const shortenLink = async () => {
    if (!originalUrl.trim()) {
      toast.error('Please enter a URL')
      return
    }

    try {
      new URL(originalUrl)
    } catch {
      toast.error('Please enter a valid URL')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/short-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: originalUrl }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        toast.error(body?.error || 'Failed to create short link')
        return
      }

      const data = await res.json()
      const shortCode = data.shortCode
      const shortUrl = data.shortUrl
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(shortUrl)}`

      const newLink: ShortenedLink = {
        originalUrl,
        shortCode,
        shortUrl,
        qrCode: qrCodeUrl,
        createdAt: new Date(),
      }

      setShortenedLinks([newLink, ...shortenedLinks])
      setOriginalUrl('')
      toast.success('Link shortened successfully!')
    } catch (error) {
      toast.error('Failed to shorten link')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopiedId(null), 2000)
  }

  const downloadQRCode = async (qrUrl: string, shortCode: string) => {
    try {
      const response = await fetch(qrUrl)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = `qrcode-${shortCode}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
      toast.success('QR Code downloaded!')
    } catch (error) {
      toast.error('Failed to download QR code')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      shortenLink()
    }
  }

  return (
    <div className="space-y-6">
      {/* Generator Card */}
      <Card className='border-2'>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <div className='h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center'>
              <Link2 size={20} className='text-white' />
            </div>
            <div>
              <CardTitle>Shorten Your Link</CardTitle>
              <CardDescription>Create a memorable short URL with QR code</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Original URL</Label>
            <Input
              id="url"
              placeholder="https://example.com/very/long/url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full"
            />
            <p className='text-xs text-muted-foreground'>Press Enter to shorten</p>
          </div>

          <Button
            onClick={shortenLink}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 gap-2"
            size="lg"
          >
            {loading ? (
              <>Shortening...</>
            ) : (
              <>
                <Zap size={18} />
                Shorten Link
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Shortened Links */}
      {shortenedLinks.length > 0 && (
        <div className="space-y-4">
          <div className='flex items-center justify-between'>
            <h2 className="text-2xl font-bold">Your Shortened Links</h2>
            <Badge variant="secondary">{shortenedLinks.length} {shortenedLinks.length === 1 ? 'Link' : 'Links'}</Badge>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {shortenedLinks.map((link) => (
              <Card key={link.shortCode} className="border-2 overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className='flex items-center gap-2 mb-1'>
                        <Badge variant="outline" className='font-mono text-xs'>
                          {link.shortCode}
                        </Badge>
                      </div>
                      <CardDescription className="text-xs truncate" title={link.originalUrl}>
                        {link.originalUrl}
                      </CardDescription>
                    </div>
                    <div className="w-16 h-16 flex-shrink-0">
                      <img
                        src={link.qrCode}
                        alt={`QR Code for ${link.shortCode}`}
                        className="w-full h-full border-2 border-gray-200 dark:border-gray-700 rounded-lg"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor={`shortUrl-${link.shortCode}`} className="text-xs font-medium">Short URL</Label>
                    <div className="flex gap-2">
                      <input
                        id={`shortUrl-${link.shortCode}`}
                        type="text"
                        value={link.shortUrl}
                        readOnly
                        aria-label={`Short URL for ${link.shortCode}`}
                        title={`Short URL for ${link.shortCode}`}
                        className="flex-1 px-3 py-2 text-sm border-2 rounded-lg bg-muted font-mono"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(link.shortUrl, link.shortCode)}
                        className="gap-1"
                      >
                        {copiedId === link.shortCode ? (
                          <Check size={16} className='text-green-600' />
                        ) : (
                          <Copy size={16} />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-2'>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => downloadQRCode(link.qrCode, link.shortCode)}
                      className="gap-2"
                    >
                      <Download size={16} />
                      QR Code
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(link.shortUrl, '_blank')}
                      className="gap-2"
                    >
                      <ExternalLink size={16} />
                      Test
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {shortenedLinks.length === 0 && (
        <Card className='border-2 border-dashed'>
          <CardContent className='flex flex-col items-center justify-center py-12 text-center space-y-4'>
            <div className='h-16 w-16 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-950 dark:to-cyan-950 flex items-center justify-center'>
              <Link2 size={32} className='text-blue-600 dark:text-blue-400' />
            </div>
            <div className='space-y-2'>
              <p className='font-medium text-muted-foreground'>No links shortened yet</p>
              <p className='text-sm text-muted-foreground max-w-md'>
                Enter a URL above and click "Shorten Link" to create your first short link
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default LinkShortenerGenerator
