import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: { shortCode: string } }) {
  const { shortCode } = params
  if (!shortCode) return new Response('Not found', { status: 404 })

  const record = await db.shortLink.findUnique({ where: { shortCode } })
  if (!record) return new Response('Not found', { status: 404 })

  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || '0.0.0.0'
    const updated = await db.shortLink.update({ where: { shortCode }, data: { clicks: { increment: 1 } } })
    // Create hit event (best effort)
    await db.shortLinkHit.create({ data: { shortLinkId: updated.id, ipAddress: ip } })
  } catch (e) {
    // swallow errors
  }

  // Redirect to the original URL
  return NextResponse.redirect(record.url, 307)
}
