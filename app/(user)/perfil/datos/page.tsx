import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { getServerSessionUser } from '@/lib/auth/session'

export default async function ProfileDataPage() {
  const user = await getServerSessionUser()

  return (
    <Card>
      <CardTitle>Datos personales</CardTitle>
      <CardDescription>Base para editar el perfil con `PATCH /users/:id` según permisos.</CardDescription>
      <CardContent className="grid gap-2 text-sm">
        <p>Nacionalidad: {user?.nationality ?? 'No definida'}</p>
        <p>Próximo curso: {user?.next_course ?? 'No definido'}</p>
      </CardContent>
    </Card>
  )
}

