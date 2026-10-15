import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiError } from '@/lib/api/errors'

const refreshWithToken = vi.hoisted(() => vi.fn())
vi.mock('@/lib/auth/session', () => ({ refreshWithToken }))
vi.mock('next/headers', () => ({ cookies: () => ({ get: () => ({ value: 'refresh-token' }) }) }))
const { POST } = await import('@/app/api/auth/refresh/route')

describe('refresh route failures', () => {
  beforeEach(() => { refreshWithToken.mockReset() })
  afterEach(() => vi.restoreAllMocks())

  it('preserves cookies when the backend cannot be reached', async () => {
    refreshWithToken.mockRejectedValue(new TypeError('offline'))
    const response = await POST()
    expect(response.status).toBe(503)
    expect(response.headers.has('set-cookie')).toBe(false)
  })

  it.each([401, 429, 503])('only removes cookies for an invalid refresh token (%i)', async (status) => {
    refreshWithToken.mockRejectedValue(new ApiError({ status } as never))
    const response = await POST()
    expect(response.status).toBe(status === 401 ? 401 : 503)
    expect(response.headers.has('set-cookie')).toBe(status === 401)
  })
})
