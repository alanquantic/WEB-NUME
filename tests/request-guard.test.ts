import { NextRequest } from 'next/server'
import { describe, expect, it } from 'vitest'

import { isSafePathSegment, rejectCrossSiteRequest } from '@/lib/auth/request-guard'

function req(method: string, headers: Record<string, string> = {}, body?: string) {
  return new NextRequest('http://localhost:3001/api/bff/users/1/', {
    method,
    headers: body ? { 'content-length': String(body.length), ...headers } : headers,
    body
  })
}

describe('rejectCrossSiteRequest', () => {
  it('deja pasar lecturas y peticiones del mismo origen con JSON', () => {
    expect(rejectCrossSiteRequest(req('GET', { origin: 'https://evil.com' }))).toBeNull()
    expect(
      rejectCrossSiteRequest(
        req('PATCH', { origin: 'http://localhost:3001', 'content-type': 'application/json' }, '{"a":1}')
      )
    ).toBeNull()
    // POST sin cuerpo (logout, refresh) desde el propio sitio.
    expect(rejectCrossSiteRequest(req('POST', { origin: 'http://localhost:3001' }))).toBeNull()
  })

  it('rechaza otros orígenes (403)', () => {
    expect(rejectCrossSiteRequest(req('POST', { origin: 'https://evil.com' }))?.status).toBe(403)
    expect(
      rejectCrossSiteRequest(req('DELETE', { referer: 'https://evil.com/pagina' }))?.status
    ).toBe(403)
    expect(rejectCrossSiteRequest(req('POST', {}))?.status).toBe(403)
  })

  it('acepta sin Origin solo si el navegador dice same-origin', () => {
    expect(rejectCrossSiteRequest(req('POST', { 'sec-fetch-site': 'same-origin' }))).toBeNull()
    expect(rejectCrossSiteRequest(req('POST', { 'sec-fetch-site': 'cross-site' }))?.status).toBe(403)
  })

  it('rechaza cuerpos que no son JSON (formularios de otro sitio) con 415', () => {
    const res = rejectCrossSiteRequest(
      req('POST', { origin: 'http://localhost:3001', 'content-type': 'text/plain' }, '{"email":"x"}')
    )
    expect(res?.status).toBe(415)
  })
})

describe('isSafePathSegment', () => {
  it('acepta segmentos normales y rechaza recorridos o separadores', () => {
    expect(isSafePathSegment('users')).toBe(true)
    expect(isSafePathSegment('6c00b0b9-8d1c-48a1-95a5-f6a181dce4b2')).toBe(true)
    expect(isSafePathSegment('numerología')).toBe(true)
    for (const bad of ['..', '.', '', 'a/b', 'a' + String.fromCharCode(92) + 'b', '%2e%2e', 'x?y', 'a b']) {
      expect(isSafePathSegment(bad)).toBe(false)
    }
  })
})
