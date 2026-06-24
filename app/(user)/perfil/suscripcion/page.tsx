import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { getMySubscription } from '@/lib/api/subscriptions'
import { getServerSessionUser } from '@/lib/auth/session'

export default async function SubscriptionPage() {
  const [user, subscription] = await Promise.all([
    getServerSessionUser(),
    getMySubscription()
  ])

  return (
    <Card>
      <CardTitle>Suscripción actual</CardTitle>
      <CardDescription>
        El estado visible de membresía sale primero de `GET /auth/me` y puede enriquecerse con
        `GET /subscriptions/me`.
      </CardDescription>
      <CardContent className="grid gap-2 text-sm">
        <p>Tier: {user?.current_membership}</p>
        <p>Activa: {user?.has_active_membership ? 'Sí' : 'No'}</p>
        <p>Estado backend: {subscription.status}</p>
        <p>Renovación automática: {subscription.auto_renew ? 'Sí' : 'No'}</p>
      </CardContent>
    </Card>
  )
}

