import { NextRequest, NextResponse } from 'next/server'

import { createAccessCookie, createRefreshCookie } from '@/lib/auth/cookies'
import { loginWithCredentials } from '@/lib/auth/session'

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { email: string; password: string }
  const session = await loginWithCredentials(body.email, body.password)

  const response = NextResponse.json({ user: session.user })
  response.cookies.set(createAccessCookie(session.access_token))
  response.cookies.set(createRefreshCookie(session.refresh_token))

  return response
}

