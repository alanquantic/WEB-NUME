'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import type { MembershipPlan, PaymentProvider } from '@/lib/api/contracts'
import { absoluteUrl } from '@/lib/utils'

type MembershipPlansProps = {
  plans: MembershipPlan[]
}

export function MembershipPlans({ plans }: MembershipPlansProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function resolveCheckoutUrl(payload: Record<string, unknown>) {
    const candidate =
      (typeof payload.checkout_url === 'string' && payload.checkout_url) ||
      (typeof payload.url === 'string' && payload.url) ||
      (typeof payload.redirect_url === 'string' && payload.redirect_url) ||
      null

    return candidate
  }

  function handleCheckout(planId: string, provider: PaymentProvider = 'stripe') {
    setError(null)
    setSelectedPlan(planId)

    startTransition(async () => {
      const nextPath = searchParams.get('next') || '/perfil/suscripcion'
      const response = await fetch('/api/bff/checkout/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          plan_id: planId,
          provider,
          success_url: absoluteUrl(`/membresias/success?next=${encodeURIComponent(nextPath)}`),
          cancel_url: absoluteUrl(`/membresias/cancel?next=${encodeURIComponent(nextPath)}`)
        })
      })

      if (!response.ok) {
        setError('No se pudo iniciar el pago todavía.')
        return
      }

      const payload = (await response.json()) as Record<string, unknown>
      const checkoutUrl = resolveCheckoutUrl(payload)

      if (checkoutUrl) {
        window.location.assign(checkoutUrl)
        return
      }

      router.push('/membresias/success')
      router.refresh()
    })
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {plans.map((plan) => (
        <Card key={plan.id}>
          <CardTitle>{plan.name}</CardTitle>
          <CardDescription>{plan.description ?? 'Acceso premium a contenido y comunidad.'}</CardDescription>
          <CardContent className="grid gap-4">
            <div>
              <p className="font-display text-4xl font-semibold">
                {plan.price} {plan.currency}
              </p>
              <p className="text-sm text-[hsl(var(--foreground))/0.68]">
                Cada {plan.billing_interval_days} días
              </p>
            </div>
            <Button
              disabled={isPending && selectedPlan === plan.id}
              onClick={() => handleCheckout(plan.id)}
            >
              {isPending && selectedPlan === plan.id ? 'Preparando...' : 'Elegir plan'}
            </Button>
          </CardContent>
        </Card>
      ))}
      {error ? <p className="text-sm text-[hsl(var(--danger))]">{error}</p> : null}
    </div>
  )
}
