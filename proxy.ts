import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Public routes (username paths + auth pages)
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/([^/]+)' // Single segment like /username
])

// Create Clerk handler
const clerkHandler = clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

function shouldSkipClerk() {
  return process.env.NODE_ENV === 'development' && process.env.SKIP_CLERK_MIDDLEWARE === 'true'
}

export async function proxy(req: Request) {
  if (shouldSkipClerk()) {
    return NextResponse.next()
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore clerkHandler runtime signature
  return clerkHandler(req)
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)'
  ]
}
