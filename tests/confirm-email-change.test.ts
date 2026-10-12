import { NextRequest } from 'next/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ApiError } from '@/lib/api/errors'

const confirmEmailChangeWithToken = vi.fn()
vi.mock('@/lib/auth/session', () => ({
  confirmEmailChangeWithToken: (token: string) => confirmEmailChangeWithToken(token)
}))

const { POST } = await import('@/app/api/auth/confirm-email-change/route')

function request(body: unknown) {
  return new NextRequest('http://localhost/api/auth/confirm-email-change/', {
    method: 'POST',
    headers: { origin: 'http://localhost', 'content-type': 'application/json' },
    body: JSON.stringify(body)
  })
}

function apiError(status: number) {
  return new ApiError({
    type: 'about:blank',
    title: 'Error',
    status,
    detail: 'detalle',
    instance: '',
    request_id: null,
    timestamp: new Date().toISOString()
  })
}

describe('POST /api/auth/confirm-email-change', () => {
  beforeEach(() => confirmEmailChangeWithToken.mockReset())

  it('confirma y borra las cookies de sesión de este navegador', async () => {
    confirmEmailChangeWithToken.mockResolvedValue({ message: 'ok', email: 'nuevo@example.com' })
    const response = await POST(request({ token: 'abc' }))

    expect(confirmEmailChangeWithToken).toHaveBeenCalledWith('abc')
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ message: 'ok', email: 'nuevo@example.com' })
    const cookies = response.headers.getSetCookie().join(';')
    expect(cookies).toMatch(/nume_at=;/)
    expect(cookies).toMatch(/nume_rt=;/)
  })

  it('traduce 401 y 409 a mensajes para el usuario', async () => {
    confirmEmailChangeWithToken.mockRejectedValueOnce(apiError(401))
    const r401 = await POST(request({ token: 'usado' }))
    expect(r401.status).toBe(401)
    expect((await r401.json()).message).toMatch(/no es válido/)

    confirmEmailChangeWithToken.mockRejectedValueOnce(apiError(409))
    const r409 = await POST(request({ token: 't' }))
    expect(r409.status).toBe(409)
    expect((await r409.json()).message).toMatch(/ya está en uso/)
  })

  it('responde 400 sin token y 403 desde otro origen', async () => {
    expect((await POST(request({}))).status).toBe(400)
    const cross = new NextRequest('http://localhost/api/auth/confirm-email-change/', {
      method: 'POST',
      headers: { origin: 'https://evil.com', 'content-type': 'application/json' },
      body: JSON.stringify({ token: 't' })
    })
    expect((await POST(cross)).status).toBe(403)
  })
})
