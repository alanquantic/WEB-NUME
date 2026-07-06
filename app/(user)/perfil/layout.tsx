import { DashboardShell, type NavSection } from '@/components/layout/dashboard-shell'
import { getServerSessionUser } from '@/lib/auth/session'

const accountSection: NavSection = {
  title: 'Mi cuenta',
  items: [
    { href: '/perfil', label: 'Resumen', icon: 'home' },
    { href: '/perfil/datos', label: 'Datos personales', icon: 'user' },
    { href: '/perfil/ordenes', label: 'Órdenes', icon: 'orders' },
    { href: '/perfil/suscripcion', label: 'Suscripción', icon: 'subscription' }
  ]
}

// Solo visible para admins: gestión de contenido, taxonomías y usuarios.
const adminSection: NavSection = {
  title: 'Administración',
  items: [
    { href: '/perfil/posts', label: 'Posts', icon: 'posts' },
    { href: '/perfil/pages', label: 'Páginas', icon: 'pages' },
    { href: '/perfil/taxonomias', label: 'Taxonomías', icon: 'taxonomy' },
    { href: '/perfil/usuarios', label: 'Usuarios', icon: 'users' }
  ]
}

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  const user = await getServerSessionUser()
  const isAdmin = user?.role === 'admin'

  const sections: NavSection[] = isAdmin
    ? [accountSection, adminSection]
    : [accountSection]

  return (
    <DashboardShell
      title="Panel"
      description={
        isAdmin
          ? 'Tu cuenta y la administración del sitio en un solo lugar.'
          : 'Área privada para sesión, membresía, historial y datos personales.'
      }
      sections={sections}
    >
      {children}
    </DashboardShell>
  )
}
