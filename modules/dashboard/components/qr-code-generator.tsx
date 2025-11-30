'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Download, Copy, QrCode, Sparkles, Check } from 'lucide-react'
import { toast } from 'sonner'

const QRCodeGenerator = () => {
  const [url, setUrl] = useState('')
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [size, setSize] = useState(300)
  const [copied, setCopied] = useState(false)

  const generateQRCode = async () => {
    if (!url.trim()) {
      toast.error('Please enter a URL')
      return
    }

    setLoading(true)
    try {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`
      setQrCode(qrUrl)
      toast.success('QR Code generated successfully!')
    } catch (error) {
      toast.error('Failed to generate QR code')
    } finally {
      setLoading(false)
    }
  }

  const downloadQRCode = async () => {
    if (!qrCode) return

    try {
      const response = await fetch(qrCode)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = `qrcode-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
      toast.success('QR Code downloaded!')
    } catch (error) {
      toast.error('Failed to download QR code')
    }
  }

  const copyQRUrl = () => {
    if (qrCode) {
      navigator.clipboard.writeText(qrCode)
      setCopied(true)
      toast.success('QR Code URL copied!')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      generateQRCode()
    }
  }

  const sizes = [
    { label: 'Small', value: 200 },
    { label: 'Medium', value: 300 },
    { label: 'Large', value: 500 },
    { label: 'XL', value: 800 },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Generator Card */}
      <Card className='border-2'>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <div className='h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center'>
              <QrCode size={20} className='text-white' />
            </div>
            <div>
              <CardTitle>Generate QR Code</CardTitle>
              <CardDescription>Create a scannable QR code for any URL</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="url">Enter URL</Label>
            <Input
              id="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full"
            />
            <p className='text-xs text-muted-foreground'>Press Enter to generate</p>
          </div>

          <div className="space-y-2">
            <Label>QR Code Size</Label>
            <div className='grid grid-cols-4 gap-2'>
              {sizes.map((s) => (
                <Button
                  key={s.value}
                  variant={size === s.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSize(s.value)}
                  className={size === s.value ? 'bg-gradient-to-r from-purple-600 to-pink-600' : ''}
                >
                  {s.label}
                </Button>
              ))}
            </div>
            <p className='text-xs text-muted-foreground'>{size}x{size} pixels</p>
          </div>

          <Button
            onClick={generateQRCode}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 gap-2"
            size="lg"
          >
            {loading ? (
              <>Generating...</>
            ) : (
              <>
                <Sparkles size={18} />
                Generate QR Code
              </>
            )}
          </Button>

          {qrCode && (
            <div className="space-y-3 pt-2 border-t">
              <Label>Quick Actions</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={downloadQRCode}
                  variant="outline"
                  className="gap-2"
                >
                  <Download size={16} />
                  Download
                </Button>
                <Button
                  onClick={copyQRUrl}
                  variant="outline"
                  className="gap-2"
                >
                  {copied ? (
                    <>
                      <Check size={16} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy URL
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview Card */}
      <Card className='border-2 bg-gradient-to-br from-card to-muted/30'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>Preview</CardTitle>
              <CardDescription>Your generated QR code</CardDescription>
            </div>
            {qrCode && (
              <Badge variant="secondary" className='gap-1.5'>
                <div className='h-2 w-2 rounded-full bg-green-500 animate-pulse'></div>
                Ready
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center min-h-[400px]">
          {qrCode ? (
            <div className='space-y-4'>
              <div className='p-4 bg-white rounded-xl shadow-2xl border-4 border-gray-100'>
                <img
                  src={qrCode}
                  alt="Generated QR Code"
                  className={`w-full h-full ${size > 500 ? 'max-w-[400px] max-h-[400px]' : ''}`}
                />
              </div>
              <div className="text-center space-y-2">
                <p className='text-sm font-medium'>Scan to visit:</p>
                <p className="text-xs text-muted-foreground max-w-xs break-all px-4">
                  {url}
                </p>
              </div>
            </div>
          ) : (
            <div className='text-center space-y-4'>
              <div className='mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 flex items-center justify-center'>
                <QrCode size={40} className='text-purple-600 dark:text-purple-400' />
              </div>
              <div className='space-y-2'>
                <p className='font-medium text-muted-foreground'>No QR code yet</p>
                <p className='text-sm text-muted-foreground max-w-xs'>
                  Enter a URL and click generate to create your QR code
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default QRCodeGenerator
