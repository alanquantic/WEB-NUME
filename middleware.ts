import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api-nume-production.up.railway.app/api/v1'
const ACCESS_COOKIE = process.env.AUTH_ACCESS_COOKIE ?? 'nume_at'
const REFRESH_COOKIE = process.env.AUTH_REFRESH_COOKIE ?? 'nume_rt'

type MeResponse = {
  id: string
  role: 'admin' | 'subscriber' | 'reader'
}

type AuthSessionResponse = {
  access_token: string
  refresh_token: string
}

function redirectToLogin(request: NextRequest) {
  const url = request.nextUrl.clone()
  url.pathname = '/login'
  url.searchParams.set('next', request.nextUrl.pathname)
  return NextResponse.redirect(url)
}

function redirectToHome(request: NextRequest) {
  const url = request.nextUrl.clone()
  url.pathname = '/'
  return NextResponse.redirect(url)
}

async function fetchMe(accessToken: string) {
  return fetch(`${API_BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    cache: 'no-store'
  })
}

async function refreshTokens(refreshToken: string) {
  return fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
    cache: 'no-store'
  })
}

function setSessionCookies(response: NextResponse, payload: AuthSessionResponse) {
  response.cookies.set({
    name: ACCESS_COOKIE,
    value: payload.access_token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  })
  response.cookies.set({
    name: REFRESH_COOKIE,
    value: payload.refresh_token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  })
}

function clearSessionCookies(response: NextResponse) {
  response.cookies.set({
    name: ACCESS_COOKIE,
    value: '',
    maxAge: 0,
    path: '/'
  })
  response.cookies.set({
    name: REFRESH_COOKIE,
    value: '',
    maxAge: 0,
    path: '/'
  })
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const isAdminPath = pathname.startsWith('/admin')
  const isProfilePath = pathname.startsWith('/perfil')
  const isProfileUsersPath = pathname.startsWith('/perfil/usuarios')

  if (!isAdminPath && !isProfilePath) {
    return NextResponse.next()
  }

  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value
  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value

  if (!accessToken && !refreshToken) {
    return redirectToLogin(request)
  }

  let meResponse: Response | null = null

  if (accessToken) {
    meResponse = await fetchMe(accessToken)
  }

  if (!meResponse || meResponse.status === 401) {
    if (!refreshToken) {
      return redirectToLogin(request)
    }

    const refreshResponse = await refreshTokens(refreshToken)
    if (!refreshResponse.ok) {
      const redirect = redirectToLogin(request)
      clearSessionCookies(redirect)
      return redirect
    }

    const refreshed = (await refreshResponse.json()) as AuthSessionResponse
    meResponse = await fetchMe(refreshed.access_token)

    if (!meResponse.ok) {
      const redirect = redirectToLogin(request)
      clearSessionCookies(redirect)
      return redirect
    }

    const me = (await meResponse.json()) as MeResponse
    const nextResponse = NextResponse.next()
    setSessionCookies(nextResponse, refreshed)

    if (isAdminPath && me.role !== 'admin') {
      return redirectToHome(request)
    }

    if (isProfileUsersPath && me.role !== 'admin') {
      return redirectToHome(request)
    }

    return nextResponse
  }

  if (!meResponse.ok) {
    const redirect = redirectToLogin(request)
    clearSessionCookies(redirect)
    return redirect
  }

  const me = (await meResponse.json()) as MeResponse

  if (isAdminPath && me.role !== 'admin') {
    return redirectToHome(request)
  }

  if (isProfileUsersPath && me.role !== 'admin') {
    return redirectToHome(request)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/perfil/:path*']
}
