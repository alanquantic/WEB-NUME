import Link from 'next/link'

export default function MembershipCancelPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold">Checkout cancelado</h1>
      <p className="mt-4 text-[hsl(var(--foreground))/0.72]">
        Puedes revisar los planes otra vez o volver a tu perfil.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/membresias" className="rounded-full bg-[hsl(var(--primary))] px-5 py-3 text-sm font-semibold text-white">
          Volver a planes
        </Link>
        <Link href="/perfil" className="rounded-full border border-[hsl(var(--border))] bg-white px-5 py-3 text-sm font-semibold">
          Ir a perfil
        </Link>
      </div>
    </div>
  )
}

