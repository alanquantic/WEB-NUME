import { NextRequest, NextResponse } from 'next/server'

import seoRedirects from '@/lib/seo/redirects.generated.json'
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  createAccessCookie,
  createRefreshCookie,
  clearAccessCookie,
  clearRefreshCookie,
  tokenMaxAge
} from '@/lib/auth/cookies'

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api-nume-production.up.railway.app/api/v1'
)
  .trim()
  .replace(/\/+$/, '')

// URLs del WordPress original (generado desde docs/seo/mapa-urls.csv con
// `npm run seo:redirects`): source sin barra final -> destino, y URLs que ya
// no existen (410). En module scope para lookup O(1) por request.
const REDIRECT_MAP: Record<string, string> = seoRedirects.redirects as Record<string, string>
const GONE = new Set<string>(seoRedirects.gone)
const GONE_HTML =
  '<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Contenido eliminado</title></head>' +
  '<body><h1>Este contenido ya no existe</h1><p><a href="/">Ir a Numerología Cotidiana</a></p></body></html>'

type MeResponse = {
  id: string
  role: 'admin' | 'subscriber' | 'reader'
}

type AuthSessionResponse = {
  access_token: string
  refresh_token: string
}

function redirectToLogin(request: NextRequest) {
  const url = new URL(request.url)
  url.pathname = '/login/'
  url.searchParams.set('next', request.nextUrl.pathname)
  return NextResponse.redirect(url)
}

function redirectToHome(request: NextRequest) {
  const url = new URL(request.url)
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
  response.cookies.set(createAccessCookie(payload.access_token))
  response.cookies.set(createRefreshCookie(payload.refresh_token))
}

function clearSessionCookies(response: NextResponse) {
  response.cookies.set(clearAccessCookie())
  response.cookies.set(clearRefreshCookie())
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

  // ── URLs del sitio original ────────────────────────────────────────────
  // Se resuelven antes que la lógica de auth porque son rutas públicas.
  const key = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname

  if (GONE.has(key)) {
    return new NextResponse(GONE_HTML, {
      status: 410,
      headers: { 'content-type': 'text/html; charset=utf-8' }
    })
  }

  let destination: string | undefined = REDIRECT_MAP[key]
  // Los posts viven en la raíz (/{slug}/), como en el WordPress original.
  if (!destination && key.startsWith('/blog/')) {
    const rest = key.slice('/blog/'.length)
    if (rest && !rest.includes('/')) destination = `/${rest}/`
  }
  if (destination) {
    const target = new URL(destination, request.url)
    if (target.origin === request.nextUrl.origin) target.search = request.nextUrl.search
    return NextResponse.redirect(target, 301)
  }

  // El panel se unificó bajo /perfil: cualquier /admin heredado redirige allí.
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    const url = new URL(request.url)
    url.pathname = '/perfil/'
    url.search = ''
    return NextResponse.redirect(url)
  }

  const isProfilePath = pathname.startsWith('/perfil')
  const isAdminOnlyPath = ADMIN_ONLY_PREFIXES.some((prefix) => pathname.startsWith(prefix))

  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value
  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value
  const unauthorized = (clear = false) => {
    const response = isProfilePath ? redirectToLogin(request) : NextResponse.next()
    if (clear) clearSessionCookies(response)
    return response
  }
  const unavailable = () => isProfilePath
    ? NextResponse.json({ message: 'No se pudo validar la sesión. Inténtalo de nuevo.' }, { status: 503 })
    : NextResponse.next()

  if (!accessToken && !refreshToken) return unauthorized()
  // Public pages also renew expired sessions before rendering their header.
  if (!isProfilePath && accessToken && tokenMaxAge(accessToken) > 60) return NextResponse.next()

  try {
    let meResponse = accessToken ? await fetchMe(accessToken) : null
    if (meResponse && !meResponse.ok && meResponse.status !== 401) return unavailable()
    let refreshed: AuthSessionResponse | null = null

    if (!meResponse || meResponse.status === 401) {
      if (!refreshToken) return unauthorized()
      const refreshResponse = await refreshTokens(refreshToken)
      if (!refreshResponse.ok) {
        return refreshResponse.status === 401 ? unauthorized(true) : unavailable()
      }
      refreshed = (await refreshResponse.json()) as AuthSessionResponse
      meResponse = await fetchMe(refreshed.access_token)
    }

    if (!meResponse.ok) return meResponse.status === 401 ? unauthorized(true) : unavailable()
    const me = (await meResponse.json()) as MeResponse
    if (refreshed) {
      request.cookies.set(ACCESS_COOKIE, refreshed.access_token)
      request.cookies.set(REFRESH_COOKIE, refreshed.refresh_token)
    }
    const response = isAdminOnlyPath && me.role !== 'admin'
      ? redirectToHome(request)
      : NextResponse.next({ request: { headers: request.headers } })
    if (refreshed) setSessionCookies(response, refreshed)
    return response
  } catch {
    // Network failures and 5xx/429 responses must not erase a valid refresh token.
    return unavailable()
  }
}

export const config = {
  // Corre en todas las rutas excepto assets y endpoints internos: necesitamos
  // interceptar las URLs heredadas del WordPress y normalizar la barra final,
  // además de proteger /admin y /perfil.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|map|txt|xml|json|woff2?|ttf|eot)).*)'
  ]
}
