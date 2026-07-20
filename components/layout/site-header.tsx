import type { Route } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { ChevronDownIcon, MenuIcon, SearchIcon } from '@/components/ui/icons'
import { SocialLinks } from '@/components/ui/social-links'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { getToolIcon } from '@/components/ui/tool-icon'
import { ACCESS_COOKIE, clearAccessCookie, clearRefreshCookie } from '@/lib/auth/cookies'
import { API_BASE_URL, getServerSessionUser } from '@/lib/auth/session'
import { cn } from '@/lib/utils'

type NavItem = {
  label: string
  href?: string
  children?: readonly NavItem[]
}

type MenuContext = {
  isAuthenticated: boolean
}

const NAV_ITEMS: readonly NavItem[] = [
  {
    label: 'Numerología',
    href: '/numerologia',
    children: [
      { label: 'Mi Mapa Numerológico', href: '/mi-mapa' },
      { label: 'Explora por número', href: '/explora' },
      { label: 'Mi carta', href: '/mi-carta' },
      { label: 'Numerología de Pareja', href: '/numerologia-de-pareja' },
      {
        label: 'Vibraciones de Tiempo',
        href: '/vibraciondeltiempo',
        children: [
          { label: 'La Brújula Numerológica', href: '/labrujulanumerologica' },
          { label: 'Etapa Personal', href: '/etapapersonal' },
          { label: 'Año Personal', href: '/anopersonal' },
          { label: 'Mes Personal', href: '/mespersonal' },
          { label: 'Semana Personal', href: '/semanapersonal' },
          { label: 'Día Personal', href: '/diapersonal' },
          { label: 'Vibraciones Colectivas', href: '/vibracionescolectivas' }
        ]
      },
      {
        label: 'Calcula tu Pináculo',
        href: '/calculatupinaculo',
        children: [
          { label: 'Significado de los Números', href: '/significadodelosnumeros' }
        ]
      },
      {
        label: 'Numerología Nombre',
        href: '/numerologianombre',
        children: [
          { label: 'Número del Nombre', href: '/numerodelnombre' },
          { label: 'Número del Alma', href: '/numerodelalma' },
          {
            label: 'Número de Expresión del Alma',
            href: '/numerodeexpresiondelalma'
          },
          { label: 'Número de la Madurez', href: '/numerodelamadurez' },
          { label: 'Significado de Letras', href: '/significadodeletras' },
          { label: 'Nombre Activo', href: '/nombreactivo' },
          { label: 'Nombre Hereditario', href: '/nombrehereditario' }
        ]
      },
      {
        label: 'Miembros',
        href: '/perfil',
        children: [
          { label: 'Mi Perfil', href: '/perfil' },
          { label: 'Cerrar Sesión', href: '/logout' }
        ]
      }
    ]
  },
  { label: 'Tienda', href: 'https://tienda.numerologia-cotidiana.com/' },
  { label: 'Blog', href: '/blog' },
  {
    label: 'Horóscopos',
    href: '/horoscopos',
    children: [
      {
        label: 'Revisa tu horóscopo mensual 2026',
        href: '/horoscopos'
      }
    ]
  },
  {
    label: 'Directorio',
    href: '/directorio',
    children: [
      { label: 'Consultores', href: '/consultores' },
      { label: 'Instructores', href: '/instructores' },
      { label: 'Cursos', href: '/cursos' }
    ]
  }
]

function shouldRenderItem(item: NavItem, context: MenuContext) {
  if (item.label !== 'Miembros') return true
  return context.isAuthenticated
}

function renderDesktopLeaf(item: NavItem, level: number) {
  if (item.href === '/logout') {
    return (
      <form action={logoutAction}>
        <button
          type="submit"
          className="desktop-menu-item header-chip block w-full rounded-2xl px-4 py-3 text-left text-sm text-foreground/80 hover:bg-primary-soft hover:text-primary"
        >
          <span className="relative z-10">{item.label}</span>
        </button>
      </form>
    )
  }

  if (level === 0) {
    return (
      <Link
        href={(item.href ?? '#') as Route}
        className="header-link-float flex items-center gap-1 text-foreground/82 hover:text-primary"
      >
        <span className="relative z-10">{item.label}</span>
      </Link>
    )
  }

  const LeafIcon = item.href ? getToolIcon(item.href) : null
  return (
    <Link
      href={(item.href ?? '#') as Route}
      className="desktop-menu-item header-chip flex items-center gap-2.5 rounded-2xl px-4 py-3 text-sm text-foreground/80 hover:bg-primary-soft hover:text-primary"
    >
      {LeafIcon ? (
        <LeafIcon size={16} strokeWidth={1.75} className="shrink-0 text-primary/70" aria-hidden />
      ) : null}
      <span className="relative z-10">{item.label}</span>
    </Link>
  )
}

function renderDesktopBranch(item: NavItem, context: MenuContext, level: number) {
  const isTopLevel = level === 0
  const isLongNestedMenu = !isTopLevel && (item.children?.length ?? 0) > 5
  const wrapperClass = isTopLevel ? 'group relative' : 'group/nested relative'
  const triggerClass = isTopLevel
    ? 'header-link-float flex items-center gap-1 py-3 text-foreground/82 hover:text-primary'
    : 'desktop-menu-item header-chip flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm text-foreground/80 hover:bg-primary-soft hover:text-primary'
  const panelShellClass = isTopLevel
    ? 'invisible absolute left-0 top-full z-50 min-w-[19rem] pt-2 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100'
    : cn(
        'invisible absolute left-full top-0 z-50 min-w-[19rem] pl-2 opacity-0 transition duration-200 group-hover/nested:visible group-hover/nested:opacity-100',
        isLongNestedMenu && 'w-[26rem]'
      )
  const panelClass = cn(
    'desktop-menu-panel header-panel rounded-3xl border border-border/80 bg-card/95 p-3 shadow-2xl shadow-black/10 backdrop-blur',
    !isTopLevel && 'max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain'
  )

  return (
    <div key={`${level}-${item.label}`} className={wrapperClass}>
      <Link href={(item.href ?? '#') as Route} className={triggerClass}>
        <span className="relative z-10">{item.label}</span>
        <ChevronDownIcon
          width={14}
          height={14}
          className={isTopLevel ? 'transition duration-200 group-hover:translate-y-[1px]' : '-rotate-90 transition duration-200 group-hover/nested:translate-x-[1px]'}
        />
      </Link>

      <div className={panelShellClass}>
        <div className={panelClass}>
          <div className={cn(isLongNestedMenu ? 'grid grid-cols-2 gap-1' : 'space-y-1')}>
            {renderDesktopNav(item.children ?? [], context, level + 1)}
          </div>
        </div>
      </div>
    </div>
  )
}

function renderDesktopNav(items: readonly NavItem[], context: MenuContext, level = 0) {
  return items
    .filter((item) => shouldRenderItem(item, context))
    .map((item) => {
      if (item.children?.length) {
        return renderDesktopBranch(item, context, level)
      }

      return (
        <div key={`${level}-${item.label}`} className={level === 0 ? '' : 'relative'}>
          {renderDesktopLeaf(item, level)}
        </div>
      )
    })
}

function MobileMenuItem({
  item,
  context,
  level
}: {
  item: NavItem
  context: MenuContext
  level: number
}) {
  if (!shouldRenderItem(item, context)) return null

  if (item.href === '/logout') {
    return (
      <form action={logoutAction}>
        <button
          type="submit"
          className="header-chip block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-foreground/85 hover:bg-primary-soft hover:text-primary"
        >
          <span className="relative z-10">{item.label}</span>
        </button>
      </form>
    )
  }

  if (item.children?.length) {
    return (
      <details className="group header-panel rounded-3xl border border-border bg-background/70">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-foreground transition hover:text-primary">
          <span>{item.label}</span>
          <ChevronDownIcon
            width={16}
            height={16}
            className="transition duration-200 group-open:rotate-180"
          />
        </summary>
        <div className="space-y-2 px-3 pb-3">
          {item.href ? (
            <Link
              href={item.href as Route}
              className="header-chip block rounded-2xl px-4 py-2 text-sm text-foreground/65 hover:bg-primary-soft hover:text-primary"
            >
              <span className="relative z-10">Ver todo</span>
            </Link>
          ) : null}
          {item.children.map((child) => (
            <div key={`${level}-${item.label}-${child.label}`} className={level > 0 ? 'pl-3' : ''}>
              <MobileMenuItem item={child} context={context} level={level + 1} />
            </div>
          ))}
        </div>
      </details>
    )
  }

  return (
    <Link
      href={(item.href ?? '#') as Route}
      className="header-chip block rounded-2xl px-4 py-3 text-sm font-medium text-foreground/85 hover:bg-primary-soft hover:text-primary"
    >
      <span className="relative z-10">{item.label}</span>
    </Link>
  )
}

async function logoutAction() {
  'use server'

  const cookieStore = cookies()
  const accessToken = cookieStore.get(ACCESS_COOKIE)?.value

  if (accessToken) {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      cache: 'no-store'
    }).catch(() => null)
  }

  cookieStore.set(clearAccessCookie())
  cookieStore.set(clearRefreshCookie())

  redirect('/')
}

function Brand() {
  return (
    <Link
      href="/"
      className="header-link-float group flex items-center justify-center gap-2 font-display text-xl font-semibold"
    >
      <img src="/images/logo_favicon.png" alt="" className="h-9 w-9" />
      <span className="leading-tight">
        <span className="block text-gradient-brand">numerologia</span>
        <span className="block text-xs font-medium text-foreground/60">
          cotidiana
        </span>
      </span>
    </Link>
  )
}

export async function SiteHeader() {
  const user = await getServerSessionUser()
  const menuContext: MenuContext = {
    isAuthenticated: Boolean(user)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/70 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-card/60">
      <div className="mx-auto hidden max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-6 py-2 md:grid">
        <nav className="hidden items-center gap-5 text-sm font-medium md:flex">
          {renderDesktopNav(NAV_ITEMS, menuContext)}
        </nav>

        <Brand />

        <div className="flex items-center justify-end gap-4">
          <span className="hidden text-sm italic text-foreground/70 lg:inline">
            de Laura L. Rodríguez
          </span>
          <SocialLinks
            className="hidden items-center gap-1.5 xl:flex"
            itemClassName="header-chip flex h-9 w-9 items-center justify-center rounded-full border border-border text-primary hover:bg-primary-soft"
            iconSize={16}
          />
          <ThemeToggle className="header-chip flex h-9 w-9 items-center justify-center rounded-full border border-border text-primary hover:bg-primary-soft" />
          <Link
            href="/busqueda"
            aria-label="Buscar"
            className="header-chip flex h-9 w-9 items-center justify-center rounded-full border border-border text-primary hover:bg-primary-soft"
          >
            <SearchIcon width={18} height={18} className="relative z-10 transition duration-200 hover:scale-105" />
          </Link>
          {user?.role === 'admin' ? (
            <Link href="/perfil" className="header-link-float text-sm font-medium hover:text-primary">
              Admin
            </Link>
          ) : null}
          {user ? (
            <Link
              href="/perfil"
              className="header-chip inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-glow hover:opacity-95"
            >
              <span className="relative z-10">Mi perfil</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="header-chip inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-glow hover:opacity-95"
            >
              <span className="relative z-10">Inicia sesión</span>
            </Link>
          )}
        </div>
      </div>

      <details className="group md:hidden">
        <summary className="mx-auto grid max-w-7xl list-none grid-cols-[44px_1fr_44px] items-center gap-3 px-4 py-3">
          <span className="header-chip flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-primary">
            <MenuIcon width={22} height={22} />
          </span>
          <span className="flex justify-center">
            <Brand />
          </span>
          <span className="flex justify-end">
            <Link
              href="/busqueda"
              aria-label="Buscar"
              className="header-chip flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-primary"
            >
              <SearchIcon width={20} height={20} />
            </Link>
          </span>
        </summary>

        <div className="max-h-[calc(100dvh-68px)] overflow-y-auto overscroll-contain border-t border-border bg-card/95 px-4 pb-5 pt-3 shadow-lg backdrop-blur">
          <div className="space-y-3">
            {NAV_ITEMS.map((item) => (
              <MobileMenuItem
                key={`mobile-${item.label}`}
                item={item}
                context={menuContext}
                level={0}
              />
            ))}
            {user?.role === 'admin' ? (
              <Link
                href="/perfil"
                className="header-chip block rounded-2xl px-4 py-3 text-sm font-medium text-foreground/85 hover:bg-primary-soft hover:text-primary"
              >
                <span className="relative z-10">Admin</span>
              </Link>
            ) : null}
            {!user ? (
              <Link
                href="/login"
                className="header-chip bg-gradient-brand block rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow-glow"
              >
                <span className="relative z-10">Inicia sesión</span>
              </Link>
            ) : null}
            <div className="flex items-center gap-3 pt-2">
              <SocialLinks
                className="flex gap-3"
                itemClassName="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-primary"
              />
              <ThemeToggle className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-primary" />
            </div>
          </div>
        </div>
      </details>
    </header>
  )
}
