import { NextRequest } from 'next/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ApiError } from '@/lib/api/errors'
import { isEmailUnverified } from '@/lib/auth/email-verification'

const verifyEmailWithToken = vi.fn()
vi.mock('@/lib/auth/session', () => ({
  verifyEmailWithToken: (token: string) => verifyEmailWithToken(token)
}))

const { POST } = await import('@/app/api/auth/verify-email/route')

function request(body: unknown) {
  return new NextRequest('http://localhost/api/auth/verify-email/', {
    method: 'POST',
    headers: { origin: 'http://localhost', 'content-type': 'application/json' },
    body: typeof body === 'string' ? body : JSON.stringify(body)
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

describe('isEmailUnverified', () => {
  it('solo marca como pendiente un false explícito', () => {
    expect(isEmailUnverified({ email_verified: false })).toBe(true)
    expect(isEmailUnverified({ email_verified: true })).toBe(false)
    expect(isEmailUnverified({})).toBe(false)
    expect(isEmailUnverified(null)).toBe(false)
  })
})

describe('POST /api/auth/verify-email', () => {
  beforeEach(() => verifyEmailWithToken.mockReset())

  it('pasa el token a la API y devuelve su respuesta', async () => {
    verifyEmailWithToken.mockResolvedValue({ message: 'ok', email_verified: true })
    const response = await POST(request({ token: 'abc' }))

    expect(verifyEmailWithToken).toHaveBeenCalledWith('abc')
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ message: 'ok', email_verified: true })
  })

  it('responde 400 sin token o con un cuerpo inválido', async () => {
    expect((await POST(request({}))).status).toBe(400)
    expect((await POST(request('no-json'))).status).toBe(400)
    expect(verifyEmailWithToken).not.toHaveBeenCalled()
  })

  it('propaga 401 con un mensaje para pedir otro enlace', async () => {
    verifyEmailWithToken.mockRejectedValueOnce(apiError(401))
    const response = await POST(request({ token: 'usado' }))

    expect(response.status).toBe(401)
    expect((await response.json()).message).toMatch(/no es válido/)
  })

  it('propaga 429 y convierte otros errores en 502', async () => {
    verifyEmailWithToken.mockRejectedValueOnce(apiError(429))
    expect((await POST(request({ token: 't' }))).status).toBe(429)

    verifyEmailWithToken.mockRejectedValueOnce(apiError(500))
    expect((await POST(request({ token: 't' }))).status).toBe(502)

    verifyEmailWithToken.mockRejectedValueOnce(new TypeError('fetch failed'))
    expect((await POST(request({ token: 't' }))).status).toBe(502)
  })
})
