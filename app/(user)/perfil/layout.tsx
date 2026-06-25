import type { Route } from 'next'

import { DashboardShell } from '@/components/layout/dashboard-shell'
import { getServerSessionUser } from '@/lib/auth/session'

const profileItems: Array<{ href: Route; label: string }> = [
  { href: '/perfil', label: 'Resumen' },
  { href: '/perfil/datos', label: 'Datos personales' },
  { href: '/perfil/ordenes', label: 'Órdenes' },
  { href: '/perfil/suscripcion', label: 'Suscripción' }
]

const adminItem: { href: Route; label: string } = {
  href: '/perfil/usuarios',
  label: 'Gestión de usuarios'
}

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  const user = await getServerSessionUser()
  const items = user?.role === 'admin' ? [...profileItems, adminItem] : profileItems

  return (
    <DashboardShell
      title="Perfil"
      description="Área privada para sesión, membresía, historial y datos personales."
      items={items}
    >
      {children}
    </DashboardShell>
  )
}
