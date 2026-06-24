import type { ApiListResponse, Order } from '@/lib/api/contracts'
import { serverApiFetch } from '@/lib/api/server'

export async function getMyOrders(page = 1, limit = 10) {
  return serverApiFetch<ApiListResponse<Order>>(`/orders/me?page=${page}&limit=${limit}`, {
    next: { tags: ['orders:me'] }
  })
}

