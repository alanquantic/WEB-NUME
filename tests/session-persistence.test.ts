import { NextRequest } from 'next/server'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { middleware } from '@/middleware'
import { createAccessCookie, createRefreshCookie, tokenMaxAge } from '@/lib/auth/cookies'
import { useSessionStore } from '@/stores/session-store'
import type { SafeUser } from '@/lib/api/contracts'

const jwt = (seconds: number) => `header.${Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + seconds })).toString('base64url')}.signature`
const request = (path: string, access?: string, refresh?: string) => new NextRequest(`https://nume.test${path}`, {
  headers: { cookie: [access && `nume_at=${access}`, refresh && `nume_rt=${refresh}`].filter(Boolean).join('; ') }
})
const json = (body: unknown, status = 200) => Response.json(body, { status })

describe('persistent sessions', () => {
  const fetchMock = vi.fn<typeof fetch>()
  beforeEach(() => { fetchMock.mockReset(); vi.stubGlobal('fetch', fetchMock) })
  afterEach(() => vi.unstubAllGlobals())

  it('persists both credentials until their actual expiry and keeps them HttpOnly', () => {
    const access = createAccessCookie(jwt(900))
    const refresh = createRefreshCookie(jwt(604800))
    expect(access.maxAge).toBeGreaterThanOrEqual(899)
    expect(access.maxAge).toBeLessThanOrEqual(900)
    expect(refresh.maxAge).toBeGreaterThanOrEqual(604799)
    expect(refresh.maxAge).toBeLessThanOrEqual(604800)
    expect(access.httpOnly).toBe(true)
    expect(refresh.httpOnly).toBe(true)
    expect(tokenMaxAge(jwt(-10))).toBe(0)
    expect(tokenMaxAge('invalid')).toBe(0)
  })

  it('leaves anonymous home visitors alone', async () => {
    const response = await middleware(request('/'))
    expect(response.status).toBe(200)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('renews an expired public-page session and forwards new cookies to server rendering', async () => {
    const access = jwt(900)
    const refresh = jwt(604800)
    fetchMock.mockResolvedValueOnce(json({}, 401))
      .mockResolvedValueOnce(json({ access_token: access, refresh_token: refresh }))
      .mockResolvedValueOnce(json({ id: 'user', role: 'reader' }))
    const response = await middleware(request('/', jwt(-1), refresh))
    expect(response.cookies.get('nume_at')?.value).toBe(access)
    expect(response.cookies.get('nume_rt')?.maxAge).toBeGreaterThan(604790)
    expect(response.headers.get('x-middleware-request-cookie')).toContain(`nume_at=${access}`)
  })

  it('recovers after reopening with only a refresh cookie', async () => {
    fetchMock.mockResolvedValueOnce(json({ access_token: jwt(900), refresh_token: jwt(604800) }))
      .mockResolvedValueOnce(json({ id: 'user', role: 'reader' }))
    const response = await middleware(request('/perfil/', undefined, jwt(604800)))
    expect(response.status).toBe(200)
    expect(response.cookies.get('nume_at')?.maxAge).toBeGreaterThan(890)
  })

  it.each([429, 500, 503])('does not erase cookies on a temporary refresh failure (%i)', async (status) => {
    fetchMock.mockResolvedValueOnce(json({}, 401)).mockResolvedValueOnce(json({}, status))
    const response = await middleware(request('/perfil/', jwt(-1), jwt(604800)))
    expect(response.status).toBe(503)
    expect(response.headers.has('set-cookie')).toBe(false)
  })

  it('keeps credentials on a network failure', async () => {
    fetchMock.mockRejectedValueOnce(new TypeError('offline'))
    const response = await middleware(request('/perfil/', jwt(900), jwt(604800)))
    expect(response.status).toBe(503)
    expect(response.headers.has('set-cookie')).toBe(false)
  })

  it('clears a definitively revoked refresh token', async () => {
    fetchMock.mockResolvedValueOnce(json({}, 401)).mockResolvedValueOnce(json({}, 401))
    const response = await middleware(request('/perfil/', jwt(-1), jwt(604800)))
    expect(response.status).toBe(307)
    expect(response.cookies.get('nume_at')?.maxAge).toBe(0)
    expect(response.cookies.get('nume_rt')?.maxAge).toBe(0)
  })

  it('does not grant an authenticated reader access to administration', async () => {
    fetchMock.mockResolvedValueOnce(json({ id: 'user', role: 'reader' }))
    const response = await middleware(request('/perfil/pages/', jwt(900)))
    expect(response.headers.get('location')).toBe('https://nume.test/')
  })

  it('preserves the displayed user after an intermittent API failure', async () => {
    const user = { id: 'user', email: 'test@example.com' } as SafeUser
    useSessionStore.getState().setUser(user)
    fetchMock.mockResolvedValueOnce(json({}, 503))
    await useSessionStore.getState().loadSession()
    expect(useSessionStore.getState().user).toEqual(user)
    expect(useSessionStore.getState().isLoading).toBe(false)
  })
})
