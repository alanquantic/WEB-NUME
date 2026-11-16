import type { Metadata } from 'next'

import { MembershipPlans } from '@/components/memberships/membership-plans'
import { getMembershipPlans } from '@/lib/api/memberships'

export const metadata: Metadata = {
  title: 'Membresías',
  description:
    'Conoce las membresías de Numerología Cotidiana y accede al contenido exclusivo para miembros.'
}

export default async function MembershipsPage() {
  const plans = await getMembershipPlans()

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl font-semibold">Membresías</h1>
        <p className="mt-4 text-base leading-8 text-[hsl(var(--foreground))/0.72]">
          Elige tu plan y accede al contenido exclusivo para miembros de Numerología
          Cotidiana.
        </p>
      </div>
      <div className="mt-8">
        <MembershipPlans plans={plans.data} />
      </div>
    </div>
  )
}

