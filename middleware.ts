import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api-nume-production.up.railway.app/api/v1'
)
  .trim()
  .replace(/\/+$/, '')
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

// Subrutas de /perfil reservadas a admins (gestión de contenido y usuarios).
const ADMIN_ONLY_PREFIXES = [
  '/perfil/posts',
  '/perfil/pages',
  '/perfil/taxonomias',
  '/perfil/usuarios'
]

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // El panel se unificó bajo /perfil: cualquier /admin heredado redirige allí.
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    const url = request.nextUrl.clone()
    url.pathname = '/perfil'
    url.search = ''
    return NextResponse.redirect(url)
  }

  const isProfilePath = pathname.startsWith('/perfil')
  const isAdminOnlyPath = ADMIN_ONLY_PREFIXES.some((prefix) => pathname.startsWith(prefix))

  if (!isProfilePath) {
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

    // Propaga los tokens nuevos al MISMO request para que los Server Components
    // (y sus fetch al backend) usen el access token fresco en este render, en
    // lugar del expirado. Sin esto, la petición del borde de expiración
    // renderizaría con 401 y rompería la página.
    request.cookies.set(ACCESS_COOKIE, refreshed.access_token)
    request.cookies.set(REFRESH_COOKIE, refreshed.refresh_token)
    const nextResponse = NextResponse.next({
      request: { headers: request.headers }
    })
    setSessionCookies(nextResponse, refreshed)

    if (isAdminOnlyPath && me.role !== 'admin') {
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

  if (isAdminOnlyPath && me.role !== 'admin') {
    return redirectToHome(request)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/perfil/:path*']
}
