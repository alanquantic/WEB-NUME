import { SuccessRefresh } from '@/components/memberships/success-refresh'

export default function MembershipSuccessPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold">Pago recibido</h1>
      <div className="mt-6">
        <SuccessRefresh />
      </div>
    </div>
  )
}

