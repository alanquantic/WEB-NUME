import type {
  ApiListResponse,
  CheckoutSessionResponse,
  CreateCheckoutInput,
  MembershipPlan
} from '@/lib/api/contracts'
import { clientApiFetch } from '@/lib/api/client'
import { serverApiFetch } from '@/lib/api/server'

export async function getMembershipPlans() {
  return serverApiFetch<ApiListResponse<MembershipPlan>>('/membership-plans', {
    next: { tags: ['membership-plans'] }
  })
}

export async function createCheckoutSession(payload: CreateCheckoutInput) {
  return clientApiFetch<CheckoutSessionResponse>('/checkout/sessions', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

