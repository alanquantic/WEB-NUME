import type { Route } from 'next'
import Link from 'next/link'

import { ToolPage } from '@/components/content/tool-page'
import type { GuiaBloque, GuiaPersonal, PersonalCategoria } from '@/lib/personales/data'
import { sanitizeArticleHtml } from '@/lib/sanitize'

// Misma tipografía de prosa que personal-page-view.
const PROSE_CLASSES =
  'text-base leading-8 text-foreground/80 [&_a]:text-primary [&_a]:underline [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6'

function Prosa({ html }: { html: string }) {
  const safeHtml = sanitizeArticleHtml(html)
  if (!safeHtml) return null
  return <div className={PROSE_CLASSES} dangerouslySetInnerHTML={{ __html: safeHtml }} />
}

// Enlaza "Mes Personal 7" → /mes-personal-7 cuando el título del ítem termina
// en un número con página propia.
function numeroDeTitulo(titulo: string): number | null {
  const match = titulo.trim().match(/(\d+)$/)
  return match ? Number(match[1]) : null
}

function Bloque({
  bloque,
  categoria
}: {
  bloque: GuiaBloque
  categoria: PersonalCategoria
}) {
  switch (bloque.tipo) {
    case 'titulo':
      return <h2 className="font-display text-2xl font-semibold text-primary">{bloque.texto}</h2>
    case 'html':
      return (
        <section className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
          <Prosa html={bloque.html} />
        </section>
      )
    case 'acordeon':
      return (
        <section className="space-y-3">
          {bloque.items.map((item, index) => {
            const numero = numeroDeTitulo(item.titulo)
            const destino = numero !== null
              ? categoria.numeros.find((n) => n.numero === numero)
              : null
            return (
              <details
                key={index}
                className="group rounded-2xl border border-border/70 bg-card p-5 shadow-panel"
              >
                <summary className="cursor-pointer list-none font-display text-lg font-semibold text-primary marker:hidden">
                  <span className="inline-flex items-center gap-2">
                    <span className="text-xl leading-none transition group-open:rotate-45">+</span>
                    {item.titulo}
                  </span>
                </summary>
                <div className="mt-4 space-y-4">
                  <Prosa html={item.html} />
                  {destino ? (
                    <Link
                      href={`/${destino.slug}` as Route}
                      className="inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      Ver más del {item.titulo}
                    </Link>
                  ) : null}
                </div>
              </details>
            )
          })}
        </section>
      )
    default:
      return null
  }
}

export function GuiaPersonalView({
  guia,
  categoria,
  descripcion,
  toolKey
}: {
  guia: GuiaPersonal
  categoria: PersonalCategoria
  descripcion: string
  toolKey: string
}) {
  return (
    <ToolPage toolKey={toolKey} wide title={guia.titulo} description={descripcion}>
      <div className="space-y-8">
        <section className="space-y-6">
          {guia.bloques.map((bloque, index) => (
            <Bloque key={index} bloque={bloque} categoria={categoria} />
          ))}
        </section>

        {/* Acceso directo a la página de cada número de la categoría */}
        <section className="space-y-4 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
          <h2 className="font-display text-xl font-semibold text-primary">
            Explora cada {categoria.nombre}
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {categoria.numeros.map((item) => (
              <Link
                key={item.numero}
                href={`/${item.slug}` as Route}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-background font-display text-lg font-semibold text-primary transition hover:border-primary/40 hover:bg-primary-soft"
              >
                {item.numero}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </ToolPage>
  )
}
