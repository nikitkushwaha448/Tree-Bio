import { db } from '@/lib/db'
import { NextRequest } from 'next/server'

function generateShortCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const url = body?.url?.toString?.()

    if (!url) {
      return new Response(JSON.stringify({ error: 'Missing url' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    try {
      // validate URL
      // eslint-disable-next-line no-new
      new URL(url)
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid url' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    // try to generate a unique shortCode
    let shortCode: string | undefined
    for (let i = 0; i < 6; i++) {
      const candidate = generateShortCode()
      const exists = await db.shortLink.findUnique({ where: { shortCode: candidate } })
      if (!exists) {
        shortCode = candidate
        break
      }
    }

    if (!shortCode) {
      return new Response(JSON.stringify({ error: 'Unable to generate short code' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }

    const record = await db.shortLink.create({ data: { shortCode, url } })

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const shortUrl = `${baseUrl.replace(/\/$/, '')}/l/${record.shortCode}`

    return new Response(JSON.stringify({ shortCode: record.shortCode, shortUrl }), { status: 201, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    // Generic error
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
