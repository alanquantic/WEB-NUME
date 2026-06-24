import type { Subscription } from '@/lib/api/contracts'
import { serverApiFetch } from '@/lib/api/server'

export async function getMySubscription() {
  return serverApiFetch<Subscription>('/subscriptions/me', {
    next: { tags: ['subscription:me'] }
  })
}

