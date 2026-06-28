import type { Route } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'

export type HubLink = {
  href: string
  title: string
  description?: string
  external?: boolean
}

type ConceptHubProps = {
  title: string
  description: string
  links?: HubLink[]
  children?: ReactNode
}

function LinkCard({ link }: { link: HubLink }) {
  const className =
    'group flex h-full flex-col rounded-[1.8rem] border border-border/80 bg-card p-6 shadow-panel transition hover:-translate-y-1 hover:shadow-glow'

  const inner = (
    <>
      <h2 className="font-display text-xl font-semibold text-foreground group-hover:text-primary">
        {link.title}
      </h2>
      {link.description ? (
        <p className="mt-2 flex-1 text-sm leading-6 text-foreground/70">{link.description}</p>
      ) : (
        <div className="flex-1" />
      )}
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
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

export function ConceptHub({ title, description, links, children }: ConceptHubProps) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold text-balance">{title}</h1>
      <p className="mt-3 max-w-2xl text-base leading-8 text-foreground/72">{description}</p>

      {links && links.length > 0 ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <LinkCard key={link.href} link={link} />
          ))}
        </div>
      ) : null}

      {children ? <div className="mt-8">{children}</div> : null}
    </div>
  )
}
