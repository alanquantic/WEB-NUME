import type { Route } from 'next'
import Link from 'next/link'

export type ExploreLink = {
  href: string
  title: string
  description?: string
  external?: boolean
}

type KeepExploringProps = {
  title?: string
  links: ExploreLink[]
}

function Card({ link }: { link: ExploreLink }) {
  const className =
    'group flex h-full flex-col rounded-[1.5rem] border border-border/80 bg-card p-5 shadow-panel transition hover:-translate-y-1 hover:shadow-glow'
  const inner = (
    <>
      <h3 className="font-display text-base font-semibold text-foreground group-hover:text-primary">
        {link.title}
      </h3>
      {link.description ? (
        <p className="mt-1 flex-1 text-sm leading-6 text-foreground/70">{link.description}</p>
      ) : (
        <div className="flex-1" />
      )}
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
        {link.external ? 'Visitar →' : 'Abrir →'}
      </span>
    </>
  )

  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    )
  }
  return (
    <Link href={link.href as Route} className={className}>
      {inner}
    </Link>
  )
}

export function KeepExploring({ title = 'Sigue explorando', links }: KeepExploringProps) {
  if (links.length === 0) return null
  return (
    <section className="mt-12 border-t border-border/70 pt-8">
      <h2 className="font-display text-2xl font-semibold text-primary">{title}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Card key={`${link.href}-${link.title}`} link={link} />
        ))}
      </div>
    </section>
  )
}
