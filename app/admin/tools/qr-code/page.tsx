import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import QRCodeGenerator from '@/modules/dashboard/components/qr-code-generator'

const QRCodePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">QR Code Generator</h1>
        <p className="text-muted-foreground mt-2">Generate QR codes for your links</p>
      </div>

      <QRCodeGenerator />
    </div>
  )
}

export default QRCodePage
