'use client'

import type { ComponentType, PropsWithChildren, SVGProps } from 'react'
import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

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

function isActive(pathname: string, href: string): boolean {
  if (pathname === href) return true
  // /perfil es el índice: no debe marcarse activo en todas las subrutas.
  return href !== '/perfil' && pathname.startsWith(`${href}/`)
}

type DashboardShellProps = PropsWithChildren<{
  items?: NavItem[]
  sections?: NavSection[]
}>

export function DashboardShell({
  items,
  sections,
  children
}: DashboardShellProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const resolvedSections: NavSection[] = sections ?? (items ? [{ items }] : [])

  return (
    <div
      className={cn(
        'mx-auto grid max-w-7xl grid-cols-[76px_minmax(0,1fr)] gap-3 px-3 py-10 sm:gap-8 sm:px-6',
        collapsed ? 'lg:grid-cols-[76px_minmax(0,1fr)]' : 'lg:grid-cols-[240px_minmax(0,1fr)]'
      )}
    >
      <aside
        className={cn(
          'h-fit w-[76px] space-y-4 rounded-[2rem] border border-[hsl(var(--border))] bg-white p-4 text-[hsl(263_35%_18%)] shadow-panel lg:sticky lg:top-6',
          !collapsed && 'lg:w-[240px]'
        )}
      >
        <div className={cn('hidden items-center lg:flex', collapsed ? 'justify-center' : 'justify-end')}>
          <button
            type="button"
            onClick={() => setCollapsed((current) => !current)}
            aria-label={collapsed ? 'Expandir panel' : 'Colapsar panel'}
            aria-expanded={!collapsed}
            title={collapsed ? 'Expandir panel' : 'Colapsar panel'}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[hsl(var(--border))] text-[hsl(263_35%_18%/0.72)] transition hover:bg-[hsl(270_100%_96%)] hover:text-[hsl(263_67%_35%)]"
          >
            {collapsed ? <SidebarIcon /> : <ChevronLeftIcon />}
          </button>
        </div>

        <div className="grid gap-5">
          {resolvedSections.map((section, index) => (
            <div key={section.title ?? `section-${index}`} className="grid gap-1.5">
              {section.title ? (
                <>
                  {!collapsed ? (
                    <span className="hidden px-3 text-xs font-semibold uppercase tracking-wide text-[hsl(263_35%_18%/0.72)] lg:block">
                      {section.title}
                    </span>
                  ) : null}
                  {index > 0 ? (
                    <span className={cn('mx-auto my-1 h-px w-8 bg-[hsl(var(--border))]', !collapsed && 'lg:hidden')} />
                  ) : null}
                </>
              ) : null}
              <nav className="grid gap-1.5">
                {section.items.map((item) => {
                  const Icon = item.icon ? iconMap[item.icon] : null
                  const active = isActive(pathname, item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      title={item.label}
                      aria-label={item.label}
                      className={cn(
                        'flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-medium transition',
                        !collapsed && 'lg:w-full lg:justify-start lg:gap-3 lg:px-3',
                        active
                          ? 'bg-[hsl(263_67%_35%)] text-white shadow-panel'
                          : 'text-[hsl(263_35%_18%)] hover:bg-[hsl(270_100%_96%)] hover:text-[hsl(263_35%_18%)]'
                      )}
                    >
                      {Icon ? (
                        <span className="shrink-0">
                          <Icon width={19} height={19} />
                        </span>
                      ) : null}
                      <span className={cn('sr-only', !collapsed && 'lg:not-sr-only lg:truncate')}>
                        {item.label}
                      </span>
                    </Link>
                  )
                })}
              </nav>
            </div>
          ))}
        </div>
      </aside>
      <div className="profile-content min-w-0 max-w-full">{children}</div>
    </div>
  )
}
