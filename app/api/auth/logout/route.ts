import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { ACCESS_COOKIE, clearAccessCookie, clearRefreshCookie } from '@/lib/auth/cookies'
import { API_BASE_URL } from '@/lib/auth/session'

export async function POST() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get(ACCESS_COOKIE)?.value

  if (accessToken) {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).catch(() => null)
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(clearAccessCookie())
  response.cookies.set(clearRefreshCookie())
  return response
}

