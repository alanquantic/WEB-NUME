import type {
  ApiListResponse,
  CheckoutSessionResponse,
  CreateCheckoutInput,
  MembershipPlan
} from '@/lib/api/contracts'
import { clientApiFetch } from '@/lib/api/client'
import { serverApiFetch } from '@/lib/api/server'

export async function getMembershipPlans(): Promise<ApiListResponse<MembershipPlan>> {
  try {
    return await serverApiFetch<ApiListResponse<MembershipPlan>>('/membership-plans', {
      next: { tags: ['membership-plans'] }
    })
  } catch {
    // El endpoint de ecommerce aún no existe en la API: degradar sin romper la página.
    return { data: [], pagination: { page: 1, limit: 0, total: 0 } }
  }
}

export async function createCheckoutSession(payload: CreateCheckoutInput) {
  return clientApiFetch<CheckoutSessionResponse>('/checkout/sessions', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

