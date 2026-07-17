import Link from 'next/link'

import { MembershipTierBadge } from '@/components/memberships/membership-tier-badge'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import type { Subscription } from '@/lib/api/contracts'
import { getMySubscription } from '@/lib/api/subscriptions'
import { getServerSessionUser } from '@/lib/auth/session'

const STATUS_LABELS: Record<Subscription['status'], string> = {
  active: 'Activa',
  expired: 'Expirada',
  cancelled: 'Cancelada',
  pending: 'Pendiente'
}

function formatDate(value: string | null): string {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

export default async function SubscriptionPage() {
  const user = await getServerSessionUser()

  let subscription: Subscription | null = null
  try {
    subscription = await getMySubscription()
  } catch {
    subscription = null
  }

  const hasMembership =
    Boolean(subscription) || (user?.current_membership && user.current_membership !== 'none')

  return (
    <Card>
      <CardTitle>Suscripción</CardTitle>
      <CardDescription>El estado de tu membresía y su renovación.</CardDescription>
      <CardContent>
        {hasMembership ? (
          <div className="grid gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-border/70 bg-[hsl(var(--secondary)/0.35)] p-5">
              <div className="flex items-center gap-3">
                <MembershipTierBadge tier={user?.current_membership} />
                {subscription ? (
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      subscription.status === 'active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-zinc-200 text-zinc-700'
                    }`}
                  >
                    {STATUS_LABELS[subscription.status]}
                  </span>
                ) : null}
              </div>
              <p className="text-sm text-foreground/70">
                {user?.has_active_membership ? 'Membresía activa' : 'Membresía inactiva'}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-border/70 bg-background/60 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  Inicio
                </p>
                <p className="mt-1 text-base font-medium text-foreground/85">
                  {formatDate(subscription?.starts_at ?? null)}
                </p>
              </div>
              <div className="rounded-3xl border border-border/70 bg-background/60 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  Vence
                </p>
                <p className="mt-1 text-base font-medium text-foreground/85">
                  {formatDate(subscription?.ends_at ?? user?.membership_expires_at ?? null)}
                </p>
              </div>
            </div>

            <p className="text-sm text-foreground/65">
              Renovación automática: {subscription?.auto_renew ? 'Sí' : 'No'}. Para renovar o
              cambiar tu plan, visita la tienda.
            </p>
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-border/80 bg-[hsl(var(--secondary)/0.4)] px-6 py-12 text-center">
            <p className="font-display text-xl font-semibold text-primary">
              No tienes una suscripción activa
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-foreground/70">
              Con una membresía desbloqueas contenido exclusivo, reportes extendidos y
              herramientas premium.
            </p>
            <Link
              href="/membresias"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-gradient-brand px-7 text-sm font-semibold text-white shadow-glow transition hover:opacity-90"
            >
              Conocer los planes
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
