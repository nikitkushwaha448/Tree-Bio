import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import LinkShortenerGenerator from '@/modules/dashboard/components/link-shortener-generator'

const LinkShortenerPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Link Shortener</h1>
        <p className="text-muted-foreground mt-2">Create shortened URLs and generate QR codes</p>
      </div>

      <LinkShortenerGenerator />
    </div>
  )
}

export default LinkShortenerPage
