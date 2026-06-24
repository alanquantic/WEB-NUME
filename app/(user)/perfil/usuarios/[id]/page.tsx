import Link from 'next/link'
import { notFound } from 'next/navigation'

import { UserEditForm } from '@/components/admin/user-edit-form'
import { Badge } from '@/components/ui/badge'
import { ApiError } from '@/lib/api/errors'
import { getUserById } from '@/lib/api/users'

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

      <div className="rounded-[2rem] bg-white p-6 shadow-panel">
        <h2 className="font-display text-2xl font-semibold">Editar datos</h2>
        <p className="mt-2 text-sm text-[hsl(var(--foreground))/0.72]">
          Actualiza el perfil del usuario.
        </p>
        <div className="mt-6">
          <UserEditForm user={user} />
        </div>
      </div>
    </div>
  )
}
