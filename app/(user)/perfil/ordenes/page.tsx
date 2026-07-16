import Link from 'next/link'

import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'

export default function OrdersPage() {
  return (
    <Card>
      <CardTitle>Órdenes</CardTitle>
      <CardDescription>Historial de tus compras y pagos.</CardDescription>
      <CardContent>
        <div className="rounded-3xl border border-dashed border-border/80 bg-[hsl(var(--secondary)/0.4)] px-6 py-12 text-center">
          <p className="font-display text-xl font-semibold text-primary">
            Aún no tienes órdenes
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-foreground/70">
            Cuando realices una compra, aquí verás el historial con el estado y el detalle de
            cada orden.
          </p>
          <Link
            href="/membresias"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-gradient-brand px-7 text-sm font-semibold text-white shadow-glow transition hover:opacity-90"
          >
            Ver membresías
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
