import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'

export const ACCESS_COOKIE = process.env.AUTH_ACCESS_COOKIE ?? 'nume_at'
export const REFRESH_COOKIE = process.env.AUTH_REFRESH_COOKIE ?? 'nume_rt'

const baseCookie: Partial<ResponseCookie> = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/'
}

/** Cookie lifetime follows the JWT; persisting it must not extend the session. */
export function tokenMaxAge(token: string, fallback = 0): number {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const { exp } = JSON.parse(atob(payload)) as { exp?: unknown }
    if (typeof exp === 'number' && Number.isFinite(exp)) {
      return Math.max(0, Math.floor(exp - Date.now() / 1000))
    }
  } catch { /* Invalid tokens are still rejected by the API. */ }
  return fallback
}

export function createAccessCookie(value: string): ResponseCookie {
  return {
    name: ACCESS_COOKIE,
    value,
    maxAge: tokenMaxAge(value, 15 * 60),
    ...baseCookie
  } as ResponseCookie
}

export function createRefreshCookie(value: string): ResponseCookie {
  return {
    name: REFRESH_COOKIE,
    value,
    maxAge: tokenMaxAge(value, 7 * 24 * 60 * 60),
    ...baseCookie
  } as ResponseCookie
}

export function clearAccessCookie(): ResponseCookie {
  return {
    name: ACCESS_COOKIE,
    value: '',
    maxAge: 0,
    ...baseCookie
  } as ResponseCookie
}

export function clearRefreshCookie(): ResponseCookie {
  return {
    name: REFRESH_COOKIE,
    value: '',
    maxAge: 0,
    ...baseCookie
  } as ResponseCookie
}

