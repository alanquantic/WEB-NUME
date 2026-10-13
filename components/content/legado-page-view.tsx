import type { Route } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { Bloque } from '@/components/content/personal-page-view'
import { ToolPage } from '@/components/content/tool-page'
import type { LegadoPagina } from '@/lib/legado/data'

export function LegadoPageView({
  pagina,
  hermanas,
  children
}: {
  pagina: LegadoPagina
  /** Páginas de la misma familia para navegar entre números/letras (vacío = sin navegación). */
  hermanas: LegadoPagina[]
  children?: ReactNode
}) {
  return (
    <ToolPage
      wide
      title={pagina.titulo}
      description={pagina.subtitulo || undefined}
      breadcrumbs={[{ name: 'Inicio', path: '/' }, { name: pagina.titulo }]}
    >
      <div className="space-y-8">
        {children}
        <section className="space-y-6">
          {pagina.bloques.map((bloque, index) => (
            <Bloque key={index} bloque={bloque} />
          ))}
        </section>

        {hermanas.length ? (
          <section className="space-y-4 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
            <h2 className="font-display text-xl font-semibold text-primary">Consulta otros</h2>
            <div className="flex flex-wrap gap-2.5">
              {hermanas.map((item) => {
                const activo = item.slug === pagina.slug
                return (
                  <Link
                    key={item.slug}
                    href={`/${item.slug}` as Route}
                    aria-current={activo ? 'page' : undefined}
                    className={
                      activo
                        ? 'flex h-11 min-w-11 items-center justify-center rounded-full bg-gradient-brand px-3 font-display text-lg font-semibold text-white shadow-glow'
                        : 'flex h-11 min-w-11 items-center justify-center rounded-full border border-border/80 bg-background px-3 font-display text-lg font-semibold text-primary transition hover:border-primary/40 hover:bg-primary-soft'
                    }
                  >
                    {item.clave}
                  </Link>
                )
              })}
            </div>
          </section>
        ) : null}
      </div>
    </ToolPage>
  )
}
