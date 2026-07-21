import { SelfProfileForm } from '@/components/profile/self-profile-form'
import { getUserById } from '@/lib/api/users.server'
import { getServerSessionUser } from '@/lib/auth/session'

export default async function ProfileDataPage() {
  const session = await getServerSessionUser()

  if (!session) {
    return (
      <div className="rounded-[2rem] bg-white p-6 shadow-panel">
        <p className="text-sm text-[hsl(var(--foreground))/0.72]">Inicia sesión para ver tus datos.</p>
      </div>
    )
  }

  // Trae el registro completo (metadata + ficha de consultor) del propio usuario.
  const { user } = await getUserById(session.id)
  const isConsultant = user.is_consultant === true

  return (
    <div className="grid gap-6">
      <div className="rounded-[2rem] bg-white p-6 shadow-panel">
        <h1 className="font-display text-3xl font-semibold">Datos personales</h1>
        <p className="mt-2 text-sm text-[hsl(var(--foreground))/0.72]">
          Edita tu información. {isConsultant ? 'Como consultor, también puedes actualizar tu ficha del directorio.' : ''}
        </p>
      </div>
      <SelfProfileForm user={user} />
    </div>
  )
}
