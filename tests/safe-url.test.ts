import { describe, expect, it } from 'vitest'

import { stripSensitiveParams } from '@/lib/analytics/gtag'
import { normalizeExternalUrl } from '@/lib/contact'
import { safeHref, safeRedirectPath } from '@/lib/safe-url'

describe('safeRedirectPath', () => {
  it('acepta rutas internas', () => {
    expect(safeRedirectPath('/perfil/ordenes?x=1', '/perfil')).toBe('/perfil/ordenes?x=1')
  })

  it('rechaza destinos externos o raros', () => {
    for (const value of ['//evil.com', '/' + String.fromCharCode(92) + 'evil.com', 'https://evil.com', 'javascript:alert(1)', '', null, '/' + String.fromCharCode(9) + 'evil']) {
      expect(safeRedirectPath(value, '/perfil')).toBe('/perfil')
    }
  })
})

describe('safeHref', () => {
  it('permite http(s), mailto, tel y rutas internas', () => {
    expect(safeHref('https://tienda.example.com/x')).toBe('https://tienda.example.com/x')
    expect(safeHref('mailto:a@b.com')).toBe('mailto:a@b.com')
    expect(safeHref('/blog/')).toBe('/blog/')
  })

  it('descarta javascript:, data: y basura', () => {
    expect(safeHref('javascript:alert(1)')).toBeNull()
    expect(safeHref(' JavaScript:alert(1)')).toBeNull()
    expect(safeHref('data:text/html,<script>alert(1)</script>')).toBeNull()
    expect(safeHref('//evil.com')).toBeNull()
    expect(safeHref(null)).toBeNull()
  })
})

describe('normalizeExternalUrl', () => {
  it('completa dominios sin esquema y conserva http(s)', () => {
    expect(normalizeExternalUrl('www.facebook.com/ana')).toBe('https://www.facebook.com/ana')
    expect(normalizeExternalUrl('http://ana.mx')).toBe('http://ana.mx/')
  })

  it('descarta otros esquemas (XSS)', () => {
    expect(normalizeExternalUrl("javascript:fetch('/api/bff/users')")).toBeNull()
    expect(normalizeExternalUrl('data:text/html,x')).toBeNull()
    expect(normalizeExternalUrl('  ')).toBeNull()
  })
})

describe('stripSensitiveParams', () => {
  it('quita tokens y datos personales de la URL para Analytics', () => {
    expect(stripSensitiveParams('/verificar-correo/?token=abc')).toBe('/verificar-correo/')
    expect(stripSensitiveParams('https://x.com/mi-mapa/?nombre=Ana&nacimiento=1990-01-01&utm_source=fb')).toBe(
      'https://x.com/mi-mapa/?utm_source=fb'
    )
    expect(stripSensitiveParams('/blog/?page=2')).toBe('/blog/?page=2')
  })
})
