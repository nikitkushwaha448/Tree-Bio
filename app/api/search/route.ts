import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ results: [] })
    }

    const userId = await db.user.findUnique({
      where: { clerkId: user.id },
      select: { id: true }
    })

    if (!userId) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const searchTerm = query.toLowerCase()

    // Search in multiple tables
    const [users, links, shortLinks] = await Promise.all([
      // Search users by username or bio
      db.user.findMany({
        where: {
          id: userId.id,
          OR: [
            { username: { contains: searchTerm, mode: 'insensitive' } },
            { bio: { contains: searchTerm, mode: 'insensitive' } },
          ]
        },
        select: {
          id: true,
          username: true,
          bio: true,
        },
        take: 5
      }),

      // Search links by title, description, or URL
      db.link.findMany({
        where: {
          userId: userId.id,
          OR: [
            { title: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
            { url: { contains: searchTerm, mode: 'insensitive' } },
          ]
        },
        select: {
          id: true,
          title: true,
          description: true,
          url: true,
          clickCount: true,
        },
        take: 10
      }),

      // Search short links by short code or destination URL
      db.shortLink.findMany({
        where: {
          OR: [
            { shortCode: { contains: searchTerm, mode: 'insensitive' } },
            { url: { contains: searchTerm, mode: 'insensitive' } },
          ]
        },
        select: {
          id: true,
          shortCode: true,
          url: true,
          clicks: true,
        },
        take: 10
      })
    ])

    // Format results with type tags
    const results = [
      ...users.map(user => ({
        id: user.id,
        type: 'user' as const,
        title: user.username || 'Unknown User',
        description: user.bio || 'No bio',
        url: `/${user.username}`
      })),
      ...links.map(link => ({
        id: link.id,
        type: 'link' as const,
        title: link.title,
        description: link.description || link.url,
        url: link.url,
        clicks: link.clickCount
      })),
      ...shortLinks.map(shortLink => ({
        id: shortLink.id,
        type: 'shortlink' as const,
        title: shortLink.shortCode,
        description: shortLink.url,
        url: `/l/${shortLink.shortCode}`,
        clicks: shortLink.clicks
      }))
    ]

    return NextResponse.json({ results })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Failed to search' },
      { status: 500 }
    )
  }
}
