import type { Route } from 'next'
import Link from 'next/link'

import { ToolPage } from '@/components/content/tool-page'
import type { SignificadoBloque, SignificadoConcepto, SignificadoNumero } from '@/lib/significados/data'

function Bloque({ bloque }: { bloque: SignificadoBloque }) {
  return (
    <div className="space-y-3">
      {bloque.titulo ? (
        <h3 className="font-display text-xl font-semibold text-primary">{bloque.titulo}</h3>
      ) : null}
      {bloque.tipo === 'lista' ? (
        <ul className="grid gap-2.5">
          {bloque.contenido.map((item, index) => (
            <li
              key={index}
              className="flex gap-3 text-base leading-8 text-foreground/78"
            >
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-brand" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="space-y-4 text-base leading-8 text-foreground/78">
          {bloque.contenido.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      )}
    </div>
  )
}

export function SignificadoConceptoView({
  concepto,
  numero,
}: {
  concepto: SignificadoConcepto
  numero: SignificadoNumero
}) {
  const otrosNumeros = concepto.numeros

  return (
    <ToolPage
      toolKey="significadodelosnumeros"
      wide
      title={`${concepto.nombre} · Número ${numero.numero}`}
      description={concepto.subtitulo ?? ''}
    >
      <div className="space-y-8">
        {/* Hero */}
        <section className="overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-panel">
          <div className="grid gap-0 md:grid-cols-2">
            <div className="flex min-h-[220px] items-center justify-center bg-[linear-gradient(135deg,hsl(var(--secondary)/0.86),hsl(var(--primary-soft)))] p-8 sm:min-h-[280px]">
              <span className="font-display text-7xl font-semibold leading-none text-primary sm:text-8xl md:text-9xl">
                {numero.numero}
              </span>
            </div>
            <div className="flex min-h-[220px] flex-col justify-center space-y-4 bg-[linear-gradient(135deg,hsl(var(--card)),hsl(var(--background)))] p-8 sm:min-h-[280px]">
              {concepto.etiqueta ? (
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  {concepto.etiqueta}
                </p>
              ) : null}
              <h1 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
                {concepto.nombre}
              </h1>
              {numero.titulo ? (
                <p className="text-base leading-8 text-foreground/72">{numero.titulo}</p>
              ) : null}
            </div>
          </div>
        </section>

        {/* Explicación breve del concepto */}
        <section className="space-y-4 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-primary">
            ¿Qué es {concepto.nombre}?
          </h2>
          {concepto.pregunta ? (
            <p className="text-base font-semibold italic leading-8 text-foreground">
              {concepto.pregunta}
            </p>
          ) : null}
          <div className="space-y-4 text-base leading-8 text-foreground/78">
            {concepto.explicacion.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {concepto.calculo && concepto.calculo.length > 0 ? (
            <details className="group mt-2 rounded-2xl border border-border/70 bg-background/60 p-5">
              <summary className="cursor-pointer list-none font-semibold text-primary marker:hidden">
                <span className="inline-flex items-center gap-2">
                  <span className="text-lg leading-none transition group-open:rotate-45">+</span>
                  Cómo se calcula
                </span>
              </summary>
              <div className="mt-4 space-y-3 text-base leading-8 text-foreground/78">
                {concepto.calculo.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </details>
          ) : null}
        </section>

        {/* Significado del número dentro del concepto */}
        <section className="space-y-6 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-primary">
            {concepto.nombre} con el número {numero.numero}
          </h2>
          {numero.bloques.map((bloque, index) => (
            <Bloque key={index} bloque={bloque} />
          ))}
        </section>

        {/* Afirmación de cierre */}
        {numero.afirmacion ? (
          <section className="space-y-4 rounded-[2rem] p-6 text-center meaning sm:p-8">
            <h3>“{numero.afirmacion}”</h3>
          </section>
        ) : null}

        {/* Navegación entre números del mismo concepto */}
        {otrosNumeros.length > 1 ? (
          <section className="space-y-4 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
            <h2 className="font-display text-xl font-semibold text-primary">
              Otros números en {concepto.nombre}
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {otrosNumeros.map((item) => {
                const activo = item.numero === numero.numero
                return (
                  <Link
                    key={item.numero}
                    href={`/significadodelosnumeros/${concepto.slug}/${item.numero}` as Route}
                    aria-current={activo ? 'page' : undefined}
                    className={
                      activo
                        ? 'flex h-11 w-11 items-center justify-center rounded-full bg-gradient-brand font-display text-lg font-semibold text-white shadow-glow'
                        : 'flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-background font-display text-lg font-semibold text-primary transition hover:border-primary/40 hover:bg-primary-soft'
                    }
                  >
                    {item.numero}
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
