'use client'

import { apiRoute } from '@/lib/api/route-url'

type ClientApiInit = RequestInit & {
  skipRefresh?: boolean
}

let refreshPromise: Promise<void> | null = null

export class ClientApiError extends Error {
  constructor(public readonly status: number) {
    super(`Request failed with status ${status}`)
  }
}

async function runRefresh() {
  const response = await fetch(apiRoute('/api/auth/refresh'), {
    method: 'POST',
    credentials: 'include'
  })

  if (!response.ok) {
    throw new ClientApiError(response.status)
  }
}

export async function clientApiFetch<T>(
  path: string,
  init: ClientApiInit = {}
): Promise<T> {
  const response = await fetch(apiRoute(`/api/bff${path}`), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers ?? {})
    },
    credentials: 'include'
  })

  if (response.status === 401 && !init.skipRefresh) {
    if (!refreshPromise) {
      refreshPromise = runRefresh().finally(() => {
        refreshPromise = null
      })
    }

    await refreshPromise
    return clientApiFetch<T>(path, { ...init, skipRefresh: true })
  }

  if (!response.ok) {
    throw new ClientApiError(response.status)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}

