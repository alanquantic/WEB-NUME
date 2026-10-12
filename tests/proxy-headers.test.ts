import { afterEach, describe, expect, it } from 'vitest'

import { clientIpFrom, proxyHeaders } from '@/lib/auth/proxy-headers'

describe('clientIpFrom', () => {
  it('toma el primer valor de x-forwarded-for, luego x-real-ip, luego el fallback', () => {
    expect(clientIpFrom(new Headers({ 'x-forwarded-for': '1.2.3.4, 10.0.0.1' }))).toBe('1.2.3.4')
    expect(clientIpFrom(new Headers({ 'x-real-ip': '5.6.7.8' }))).toBe('5.6.7.8')
    expect(clientIpFrom(new Headers(), '9.9.9.9')).toBe('9.9.9.9')
    expect(clientIpFrom(new Headers())).toBeNull()
    expect(clientIpFrom(new Headers({ 'x-forwarded-for': 'a'.repeat(100) }))?.length).toBe(64)
  })
})

describe('proxyHeaders', () => {
  afterEach(() => {
    delete process.env.INTERNAL_PROXY_SECRET
  })

  it('no manda nada sin secreto o sin IP', () => {
    expect(proxyHeaders('1.2.3.4')).toEqual({})
    process.env.INTERNAL_PROXY_SECRET = 'secreto'
    expect(proxyHeaders(null)).toEqual({})
  })

  it('manda la IP con la clave cuando hay secreto', () => {
    process.env.INTERNAL_PROXY_SECRET = ' secreto '
    expect(proxyHeaders('1.2.3.4')).toEqual({
      'X-Nume-Client-IP': '1.2.3.4',
      'X-Nume-Proxy-Key': 'secreto'
    })
  })
})
