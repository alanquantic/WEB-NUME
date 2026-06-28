import type { Route } from 'next'
import Link from 'next/link'

import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbJsonLd } from '@/lib/seo'

export type Crumb = {
  name: string
  path?: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center gap-2 text-xs text-foreground/55">
        {items.map((item, index) => (
          <span key={`${item.name}-${index}`} className="flex items-center gap-2">
            {item.path ? (
              <Link href={item.path as Route} className="transition hover:text-primary">
                {item.name}
              </Link>
            ) : (
              <span className="text-foreground/75">{item.name}</span>
            )}
            {index < items.length - 1 ? <span aria-hidden>/</span> : null}
          </span>
        ))}
      </nav>
    </>
  )
}
