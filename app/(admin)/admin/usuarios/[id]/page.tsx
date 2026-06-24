import { redirect } from 'next/navigation'

export default function AdminUserDetailRedirectPage({
  params
}: {
  params: { id: string }
}) {
  redirect(`/perfil/usuarios/${params.id}`)
}
