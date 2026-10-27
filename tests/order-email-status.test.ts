import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { describeEmailEvent, getOrderEmails } from '@/lib/orders/email'
import type { Order } from '@/lib/api/contracts'

const getServerSessionUser = vi.hoisted(() => vi.fn())
vi.mock('@/lib/auth/session', () => ({ getServerSessionUser }))
const { GET } = await import('@/app/api/admin/emails/[id]/route')
const id = '4ef9a417-02e9-4d39-ad75-9611e0fcc33c'
const fetchMock = vi.fn()
const request = () => GET(new Request(`http://localhost/api/admin/emails/${id}`), { params: { id } })

describe('admin email tracking route', () => {
  beforeEach(() => {
    getServerSessionUser.mockReset().mockResolvedValue({ role: 'admin' })
    fetchMock.mockReset()
    vi.stubGlobal('fetch', fetchMock)
    vi.stubEnv('RESEND_API_KEY', 'test-key')
  })
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs() })

  it.each([[null, 401], [{ role: 'user' }, 403]])('rejects unauthorized users before contacting Resend', async (user, status) => {
    getServerSessionUser.mockResolvedValue(user)
    expect((await request()).status).toBe(status)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('rejects malformed IDs and missing configuration', async () => {
    expect((await GET(new Request('http://localhost'), { params: { id: '../domains' } })).status).toBe(400)
    vi.stubEnv('RESEND_API_KEY', '')
    expect((await request()).status).toBe(503)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('returns tracking fields without exposing message bodies, private headers or the key', async () => {
    fetchMock.mockResolvedValue(Response.json({ id, last_event: 'clicked', subject: 'Tu reporte', to: ['test@example.com'], html: 'private body', headers: { secret: 'private' } }))
    const response = await request()
    const data = await response.json()
    expect(response.status).toBe(200)
    expect(data.lastEvent).toBe('clicked')
    expect(Object.keys(data).sort()).toEqual(['checkedAt', 'id', 'lastEvent', 'subject', 'to'])
    expect(response.headers.get('cache-control')).toContain('no-store')
    expect(fetchMock).toHaveBeenCalledWith(`https://api.resend.com/emails/${id}`, expect.objectContaining({ cache: 'no-store', headers: { Authorization: 'Bearer test-key' } }))
  })

  it.each([404, 429, 403, 500])('handles provider error %i without forwarding its body', async status => {
    fetchMock.mockResolvedValue(Response.json({ message: 'secret provider detail' }, { status }))
    const response = await request()
    expect(response.status).toBe([404, 429].includes(status) ? status : 502)
    expect(await response.text()).not.toContain('secret provider detail')
  })

  it('handles timeouts and malformed responses', async () => {
    fetchMock.mockRejectedValueOnce(new Error('timeout'))
    expect((await request()).status).toBe(503)
    fetchMock.mockResolvedValueOnce(Response.json({ id }))
    expect((await request()).status).toBe(502)
  })
})

describe('email evidence', () => {
  it('does not interpret delivery or opening as proof of a click', () => {
    expect(describeEmailEvent('delivered')).toMatchObject({ sent: 'Confirmado', delivered: 'Confirmada', clicked: 'No confirmado' })
    expect(describeEmailEvent('opened').clicked).toBe('No confirmado')
    expect(describeEmailEvent('clicked').clicked).toBe('Clic registrado')
    expect(describeEmailEvent('new_unknown_event').sent).toBe('No confirmado')
    expect(describeEmailEvent('scheduled').sent).toBe('No confirmado')
    expect(describeEmailEvent('failed').sent).toBe('No enviado')
    expect(describeEmailEvent('bounced').delivered).toBe('Rebotado')
  })

  it('deduplicates order and item email IDs and rejects API keys', () => {
    const order = {
      metadata: { resend_email_id: id },
      items: [{ name: 'Reporte', resend_email_id: id }, { name: 'Otro', metadata: { resend_email_id: 're_not-an-email-id' } }]
    } as unknown as Order
    expect(getOrderEmails(order)).toEqual([{ id, label: 'Correo del pedido' }])
  })
})
