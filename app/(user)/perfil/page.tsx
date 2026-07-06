import { LogoutButton } from '@/components/auth/logout-button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { getServerSessionUser } from '@/lib/auth/session'

export default async function ProfilePage() {
  const user = await getServerSessionUser()

  return (
    <Card>
      <CardTitle>Resumen de cuenta</CardTitle>
      <CardDescription>`/auth/me` es la fuente de verdad del usuario autenticado.</CardDescription>
      <CardContent className="grid gap-2 text-sm">
        <p>Email: {user?.email}</p>
        <p>Rol: {user?.role}</p>
        <p>Membresía activa: {user?.has_active_membership ? 'Sí' : 'No'}</p>
        <p>Tier actual: {user?.current_membership}</p>
      </CardContent>
      <div className="mt-6 border-t border-[hsl(var(--border))] pt-5">
        <LogoutButton />
      </div>
    </Card>
  )
}
