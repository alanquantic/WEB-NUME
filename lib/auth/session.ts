import { cache } from 'react'
import { cookies } from 'next/headers'

import type { AuthSession, RefreshInput, SafeUser } from '@/lib/api/contracts'
import { ApiError, parseProblemDetails } from '@/lib/api/errors'
import { ACCESS_COOKIE } from '@/lib/auth/cookies'

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api-nume-production.up.railway.app/api/v1'

export async function fetchBackend<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {})
    },
    cache: 'no-store'
  })

  if (!response.ok) {
    throw new ApiError(await parseProblemDetails(response))
  }

  return (await response.json()) as T
}

export async function loginWithCredentials(email: string, password: string) {
  return fetchBackend<AuthSession>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
}

export async function refreshWithToken(payload: RefreshInput) {
  return fetchBackend<AuthSession>('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export const getServerSessionUser = cache(async (): Promise<SafeUser | null> => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get(ACCESS_COOKIE)?.value

  if (!accessToken) return null

  try {
    return await fetchBackend<SafeUser>('/auth/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) return null
    throw error
  }
})

