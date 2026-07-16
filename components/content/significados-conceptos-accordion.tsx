import type { Route } from 'next'
import Link from 'next/link'

import { getConceptos } from '@/lib/significados/data'

export function SignificadosConceptosAccordion() {
  const conceptos = getConceptos()

  if (conceptos.length === 0) return null

  return (
    <div className="space-y-3">
      {conceptos.map((concepto) => (
        <details
          key={concepto.slug}
          className="group overflow-hidden rounded-2xl border border-border/80 bg-card shadow-panel"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 marker:hidden">
            <div className="min-w-0">
              <span className="font-display text-lg font-semibold text-primary">
                {concepto.nombre}
              </span>
              {concepto.subtitulo ? (
                <p className="mt-0.5 text-sm leading-6 text-foreground/70">{concepto.subtitulo}</p>
              ) : null}
            </div>
            <span className="shrink-0 text-2xl leading-none text-primary transition group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="border-t border-border/70 p-5">
            <div className="flex flex-wrap gap-2.5">
              {concepto.numeros.map((item) => (
                <Link
                  key={item.numero}
                  href={`/significadodelosnumeros/${concepto.slug}/${item.numero}` as Route}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-background font-display text-lg font-semibold text-primary transition hover:border-primary/40 hover:bg-primary-soft"
                >
                  {item.numero}
                </Link>
              ))}
            </div>
          </div>
        </details>
      ))}
    </div>
  )
}
