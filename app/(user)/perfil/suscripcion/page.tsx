import Link from 'next/link'

import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'

export default function SubscriptionPage() {
  return (
    <Card>
      <CardTitle>Suscripción</CardTitle>
      <CardDescription>El estado de tu membresía y su renovación.</CardDescription>
      <CardContent>
        <div className="rounded-3xl border border-dashed border-border/80 bg-[hsl(var(--secondary)/0.4)] px-6 py-12 text-center">
          <p className="font-display text-xl font-semibold text-primary">
            No tienes una suscripción activa
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-foreground/70">
            Con una membresía desbloqueas contenido exclusivo, reportes extendidos y
            herramientas premium. Aquí verás el estado y la renovación de tu plan.
          </p>
          <Link
            href="/membresias"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-gradient-brand px-7 text-sm font-semibold text-white shadow-glow transition hover:opacity-90"
          >
            Conocer los planes
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
