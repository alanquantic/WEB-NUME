'use client'

import type { ComponentType, PropsWithChildren, SVGProps } from 'react'
import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  BagIcon,
  ChevronLeftIcon,
  FileTextIcon,
  HomeIcon,
  LayersIcon,
  SidebarIcon,
  StarIcon,
  TagIcon,
  UserIcon,
  UsersIcon
} from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type NavIconName =
  | 'home'
  | 'user'
  | 'orders'
  | 'subscription'
  | 'posts'
  | 'pages'
  | 'taxonomy'
  | 'users'

export type NavItem = { href: Route; label: string; icon?: NavIconName }
export type NavSection = { title?: string; items: NavItem[] }

const iconMap: Record<NavIconName, ComponentType<SVGProps<SVGSVGElement>>> = {
  home: HomeIcon,
  user: UserIcon,
  orders: BagIcon,
  subscription: StarIcon,
  posts: FileTextIcon,
  pages: LayersIcon,
  taxonomy: TagIcon,
  users: UsersIcon
}

const STORAGE_KEY = 'nume-panel-collapsed'

function isActive(pathname: string, href: string): boolean {
  if (pathname === href) return true
  // /perfil es el índice: no debe marcarse activo en todas las subrutas.
  return href !== '/perfil' && pathname.startsWith(`${href}/`)
}

type DashboardShellProps = PropsWithChildren<{
  title: string
  description: string
  items?: NavItem[]
  sections?: NavSection[]
}>

export function DashboardShell({
  title,
  description,
  items,
  sections,
  children
}: DashboardShellProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  // Restaura la preferencia guardada tras el montaje (evita mismatch de hidratación).
  useEffect(() => {
    setCollapsed(window.localStorage.getItem(STORAGE_KEY) === '1')
  }, [])

  function toggle() {
    setCollapsed((prev) => {
      const next = !prev
      window.localStorage.setItem(STORAGE_KEY, next ? '1' : '0')
      return next
    })
  }

  const resolvedSections: NavSection[] = sections ?? (items ? [{ items }] : [])

  return (
    <div
      className={cn(
        'mx-auto grid max-w-7xl gap-8 px-6 py-10',
        collapsed ? 'lg:grid-cols-[76px_minmax(0,1fr)]' : 'lg:grid-cols-[240px_minmax(0,1fr)]'
      )}
    >
      <aside className="h-fit space-y-4 rounded-[2rem] border border-[hsl(var(--border))] bg-white p-4 shadow-panel lg:sticky lg:top-6">
        {/* Header del panel con botón para colapsar */}
        <div className={cn('flex items-center gap-2', collapsed ? 'justify-center' : 'justify-between')}>
          {!collapsed ? (
            <div className="min-w-0">
              <h2 className="font-display text-2xl font-semibold">{title}</h2>
              <p className="mt-1 text-sm text-[hsl(var(--foreground))/0.68]">{description}</p>
            </div>
          ) : null}
          <button
            type="button"
            onClick={toggle}
            aria-label={collapsed ? 'Expandir panel' : 'Colapsar panel'}
            aria-expanded={!collapsed}
            title={collapsed ? 'Expandir panel' : 'Colapsar panel'}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[hsl(var(--border))] text-[hsl(var(--foreground))/0.65] transition hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--primary))]"
          >
            {collapsed ? <SidebarIcon /> : <ChevronLeftIcon />}
          </button>
        </div>

        <div className="grid gap-5">
          {resolvedSections.map((section, index) => (
            <div key={section.title ?? `section-${index}`} className="grid gap-1.5">
              {section.title && !collapsed ? (
                <span className="px-3 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--foreground))/0.45]">
                  {section.title}
                </span>
              ) : null}
              {section.title && collapsed && index > 0 ? (
                <span className="mx-auto my-1 h-px w-8 bg-[hsl(var(--border))]" />
              ) : null}
              <nav className="grid gap-1.5">
                {section.items.map((item) => {
                  const Icon = item.icon ? iconMap[item.icon] : null
                  const active = isActive(pathname, item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        'flex items-center rounded-2xl text-sm font-medium transition',
                        collapsed ? 'h-11 w-11 justify-center' : 'gap-3 px-3 py-2.5',
                        active
                          ? 'bg-[hsl(var(--primary))] text-white shadow-panel'
                          : 'text-[hsl(var(--foreground))/0.8] hover:bg-[hsl(var(--secondary))]'
                      )}
                    >
                      {Icon ? (
                        <span className="shrink-0">
                          <Icon width={19} height={19} />
                        </span>
                      ) : null}
                      {!collapsed ? <span className="truncate">{item.label}</span> : null}
                    </Link>
                  )
                })}
              </nav>
            </div>
          ))}
        </div>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  )
}
