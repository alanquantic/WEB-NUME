import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import {
  clearAccessCookie,
  clearRefreshCookie,
  createAccessCookie,
  createRefreshCookie,
  REFRESH_COOKIE
} from '@/lib/auth/cookies'
import { refreshWithToken } from '@/lib/auth/session'

export async function POST() {
  const cookieStore = cookies()
  const refreshToken = cookieStore.get(REFRESH_COOKIE)?.value

  if (!refreshToken) {
    const response = NextResponse.json({ message: 'Missing refresh token' }, { status: 401 })
    response.cookies.set(clearAccessCookie())
    response.cookies.set(clearRefreshCookie())
    return response
  }

  try {
    const session = await refreshWithToken({ refresh_token: refreshToken })
    const response = NextResponse.json({ ok: true })
    response.cookies.set(createAccessCookie(session.access_token))
    response.cookies.set(createRefreshCookie(session.refresh_token))
    return response
  } catch {
    const response = NextResponse.json({ message: 'Refresh failed' }, { status: 401 })
    response.cookies.set(clearAccessCookie())
    response.cookies.set(clearRefreshCookie())
    return response
  }
}

