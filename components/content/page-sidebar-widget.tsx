import Link from 'next/link'
import type { Route } from 'next'

export type SidebarWidgetItem = {
  href: string
  label: string
}

export type SidebarWidgetGroup = {
  id: string
  title: string
  items: SidebarWidgetItem[]
}

type PageSidebarWidgetProps = {
  groups: SidebarWidgetGroup[]
  note?: string
}

export function PageSidebarWidget({ groups, note }: PageSidebarWidgetProps) {
  return (
    <aside className="space-y-4">
      {groups.map((group) => (
        <section
          key={group.id}
          className="overflow-hidden rounded-[1.8rem] border border-border bg-card/92 shadow-panel"
        >
          <div className="bg-gradient-brand px-5 py-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              {group.title}
            </h2>
          </div>
          <div className="space-y-2 p-4">
            {group.items.map((item) => (
              item.href.startsWith('#') ? (
                <a
                  key={`${group.id}-${item.href}-${item.label}`}
                  href={item.href}
                  className="block rounded-2xl border border-border/80 bg-background/80 px-4 py-3 text-sm font-medium text-foreground/82 transition hover:border-primary/20 hover:bg-primary-soft hover:text-primary"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={`${group.id}-${item.href}-${item.label}`}
                  href={item.href as Route}
                  className="block rounded-2xl border border-border/80 bg-background/80 px-4 py-3 text-sm font-medium text-foreground/82 transition hover:border-primary/20 hover:bg-primary-soft hover:text-primary"
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>
        </section>
      ))}

      {note ? (
        <section className="rounded-[1.8rem] border border-border/80 bg-[linear-gradient(180deg,hsl(var(--secondary)/0.88),hsl(var(--background)/0.94))] p-5 shadow-panel">
          <p className="text-sm leading-7 text-foreground/72">{note}</p>
        </section>
      ) : null}
    </aside>
  )
}
