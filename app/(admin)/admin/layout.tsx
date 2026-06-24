import type { Route } from 'next'

import { DashboardShell } from '@/components/layout/dashboard-shell'

const adminItems: Array<{ href: Route; label: string }> = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/perfil/usuarios', label: 'Usuarios' },
  { href: '/admin/posts', label: 'Posts' },
  { href: '/admin/pages', label: 'Pages' },
  { href: '/admin/categorias', label: 'Categorias' },
  { href: '/admin/tags', label: 'Tags' }
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell
      title="Admin"
      description="CMS y panel operativo para contenidos, usuarios y taxonomias."
      items={adminItems}
    >
      {children}
    </DashboardShell>
  )
}
