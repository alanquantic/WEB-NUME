import Link from 'next/link'

import { UserCreateForm } from '@/components/admin/user-create-form'

export default function ProfileUserCreatePage() {
  return (
    <div className="grid gap-6">
      <div className="rounded-[2rem] bg-white p-6 shadow-panel">
        <Link
          href="/perfil/usuarios"
          className="text-sm font-semibold text-[hsl(var(--primary))]"
        >
          ← Volver a usuarios
        </Link>
        <h1 className="mt-4 font-display text-3xl font-semibold">Nuevo usuario</h1>
        <p className="mt-2 text-sm text-[hsl(var(--foreground))/0.72]">
          La cuenta se crea con email y contraseña; el rol y los datos del perfil se aplican
          después.
        </p>
      </div>

      <div className="rounded-[2rem] bg-white p-6 shadow-panel">
        <UserCreateForm />
      </div>
    </div>
  )
}
