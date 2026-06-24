'use client'

type ClientApiInit = RequestInit & {
  skipRefresh?: boolean
}

let refreshPromise: Promise<void> | null = null

async function runRefresh() {
  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    credentials: 'include'
  })

  if (!response.ok) {
    throw new Error('refresh_failed')
  }
}

export async function clientApiFetch<T>(
  path: string,
  init: ClientApiInit = {}
): Promise<T> {
  const response = await fetch(`/api/bff${path}`, {
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
    throw new Error(`Request failed with status ${response.status}`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}

