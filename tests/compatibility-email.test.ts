import { afterEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from '@/app/api/calculators/compatibility/email/route'
import { compatibilityEmail, parseCompatibilityEmail } from '@/lib/email/compatibility'
import { calculateCompatibility } from '@/lib/numerology/compatibility'

const input = { name: 'Prueba <script>alert(1)</script>', email: 'test@example.com', dateA: '1990-05-15', dateB: '1992-08-22', acceptTerms: true as const }
function request(body: unknown) {
  return new NextRequest('http://localhost:3001/api/calculators/compatibility/email/', {
    method: 'POST', headers: { 'Content-Type': 'application/json', origin: 'http://localhost:3001' }, body: JSON.stringify(body),
  })
}
afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); vi.restoreAllMocks() })

describe('correo de compatibilidad', () => {
  it('exige correo válido, consentimiento y fechas reales', () => {
    expect(parseCompatibilityEmail({ ...input, email: 'invalido' })).toBeNull()
    expect(parseCompatibilityEmail({ ...input, acceptTerms: false })).toBeNull()
    expect(parseCompatibilityEmail({ ...input, dateA: '1990-02-30' })).toBeNull()
    expect(parseCompatibilityEmail({ ...input, dateB: '2999-01-01' })).toBeNull()
    expect(parseCompatibilityEmail(input)).not.toBeNull()
  })
  it('incluye el mismo resultado de pantalla, todas las secciones y escapa el nombre', () => {
    const mail = compatibilityEmail(input)
    const result = calculateCompatibility(input.dateA, input.dateB)!
    expect(mail.html).not.toContain('<script>')
    expect(mail.html).toContain('&lt;script&gt;')
    for (const text of [result.label, result.energy, ...result.strengths, ...result.challenges, ...result.advice]) {
      expect(mail.text).toContain(text)
    }
  })
  it('rechaza datos inválidos antes de contactar al proveedor', async () => {
    const fetch = vi.fn(); vi.stubGlobal('fetch', fetch)
    expect((await POST(request({ ...input, acceptTerms: false }))).status).toBe(400)
    expect(fetch).not.toHaveBeenCalled()
  })
  it('no confirma envío si falta la configuración', async () => {
    vi.stubEnv('RESEND_API_KEY', '')
    expect((await POST(request(input))).status).toBe(503)
  })
  it('envía al destinatario indicado y reutiliza la clave en un reintento idéntico', async () => {
    vi.stubEnv('RESEND_API_KEY', 'test-key')
    const fetch = vi.fn().mockImplementation(async () => Response.json({ id: 'test-email-id' }))
    vi.stubGlobal('fetch', fetch)
    const response = await POST(request(input))
    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({ id: 'test-email-id' })
    const payload = JSON.parse(fetch.mock.calls[0][1].body)
    expect(payload.to).toEqual([input.email])
    expect(payload.text).toContain(calculateCompatibility(input.dateA, input.dateB)!.label)
    await POST(request(input))
    expect(fetch.mock.calls[0][1].headers['Idempotency-Key']).toBe(fetch.mock.calls[1][1].headers['Idempotency-Key'])
  })
  it('reporta el rechazo del proveedor sin exponer sus datos', async () => {
    vi.stubEnv('RESEND_API_KEY', 'test-key')
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json({ name: 'validation_error', message: 'private-provider-detail' }, { status: 422 })))
    const response = await POST(request(input))
    expect(response.status).toBe(502)
    expect(JSON.stringify(await response.json())).not.toContain('private-provider-detail')
  })
})
