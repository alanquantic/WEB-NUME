import { MembershipPlans } from '@/components/memberships/membership-plans'
import { getMembershipPlans } from '@/lib/api/memberships'

export default async function MembershipsPage() {
  const plans = await getMembershipPlans()

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl font-semibold">Membresías</h1>
        <p className="mt-4 text-base leading-8 text-[hsl(var(--foreground))/0.72]">
          El frontend inicia checkout con `POST /checkout/sessions` y al regresar fuerza
          actualización con `GET /auth/me`.
        </p>
      </div>
      <div className="mt-8">
        <MembershipPlans plans={plans.data} />
      </div>
    </div>
  )
}

