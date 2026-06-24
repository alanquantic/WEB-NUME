import type { PropsWithChildren } from 'react'
import type { Route } from 'next'
import Link from 'next/link'

import { cn } from '@/lib/utils'

type DashboardShellProps = PropsWithChildren<{
  title: string
  description: string
  items: Array<{ href: Route; label: string }>
}>

export function DashboardShell({
  title,
  description,
  items,
  children
}: DashboardShellProps) {
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[240px_1fr]">
      <aside className="space-y-3 rounded-[2rem] border border-[hsl(var(--border))] bg-white p-4 shadow-panel">
        <h2 className="font-display text-2xl font-semibold">{title}</h2>
        <p className="text-sm text-[hsl(var(--foreground))/0.68]">{description}</p>
        <nav className="mt-4 grid gap-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-2xl px-4 py-3 text-sm font-medium transition hover:bg-[hsl(var(--secondary))]'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div>{children}</div>
    </div>
  )
}
