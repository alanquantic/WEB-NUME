import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'

export const ACCESS_COOKIE = process.env.AUTH_ACCESS_COOKIE ?? 'nume_at'
export const REFRESH_COOKIE = process.env.AUTH_REFRESH_COOKIE ?? 'nume_rt'

const baseCookie: Partial<ResponseCookie> = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/'
}

export function createAccessCookie(value: string): ResponseCookie {
  return {
    name: ACCESS_COOKIE,
    value,
    ...baseCookie
  } as ResponseCookie
}

export function createRefreshCookie(value: string): ResponseCookie {
  return {
    name: REFRESH_COOKIE,
    value,
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

