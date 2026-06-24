import { cookies } from 'next/headers'

import type { ProblemDetails } from '@/lib/api/contracts'
import { ApiError, parseProblemDetails } from '@/lib/api/errors'
import { ACCESS_COOKIE } from '@/lib/auth/cookies'
import { API_BASE_URL } from '@/lib/auth/session'

export async function serverApiFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const cookieStore = cookies()
  const accessToken = cookieStore.get(ACCESS_COOKIE)?.value

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(init?.headers ?? {})
    },
    cache: init?.cache ?? 'no-store'
  })

  if (!response.ok) {
    throw new ApiError(await parseProblemDetails(response))
  }

  return (await response.json()) as T
}

export function isProblemDetails(error: unknown): error is ProblemDetails {
  return error instanceof ApiError
}

