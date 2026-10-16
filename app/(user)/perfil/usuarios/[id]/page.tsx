import Link from 'next/link'
import { notFound } from 'next/navigation'

import { UserEditForm } from '@/components/admin/user-edit-form'
import { MembershipTierBadge } from '@/components/memberships/membership-tier-badge'
import { Badge } from '@/components/ui/badge'
import { ApiError } from '@/lib/api/errors'
import { getServerSessionUser } from '@/lib/auth/session'
import { getUserById } from '@/lib/api/users.server'

export default async function ProfileUserDetailPage({
  params
}: {
  params: { id: string }
}) {
  let user

  try {
    const response = await getUserById(params.id)
    user = response.user
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound()
    }

    throw error
  }

  // El middleware ya exige rol admin para /perfil/usuarios; esto es defensa
  // en profundidad para que el UI oculte el reset de contraseña si por alguna
  // razón se llegó sin rol admin, y para distinguir "self vs otro usuario".
  const sessionUser = await getServerSessionUser()
  const canChangePassword =
    sessionUser?.role === 'admin' && sessionUser.id !== user.id

  return (
    <div className="grid gap-6">
      <div className="rounded-[2rem] bg-white p-6 shadow-panel">
        <Link
          href="/perfil/usuarios"
          className="text-sm font-semibold text-[hsl(var(--primary))]"
        >
          ← Volver a usuarios
        </Link>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl font-semibold">{user.email}</h1>
          <Badge>{user.role}</Badge>
          <MembershipTierBadge tier={user.current_membership} />
          {user.has_active_membership ? (
            <Badge className="bg-[hsl(var(--primary))/0.15] text-[hsl(var(--primary))]">
              Membresía activa
            </Badge>
          ) : null}
        </div>
        <p className="mt-2 text-sm text-[hsl(var(--foreground))/0.6]">
          ID: {user.id} · Registrado: {new Date(user.created_at).toLocaleDateString()}
        </p>
      </div>

      <UserEditForm user={user} canChangePassword={canChangePassword} />
    </div>
  )
}
