import type { Route } from 'next'
import Link from 'next/link'

import { Briefcase, Fingerprint, Heart, Quote, ShieldAlert, Sparkles } from 'lucide-react'

import { ToolPage } from '@/components/content/tool-page'
import type {
  PersonalBloque,
  PersonalCategoria,
  PersonalNumero
} from '@/lib/personales/data'
import { sanitizeArticleHtml } from '@/lib/sanitize'

// Tipografía compartida para los bloques de prosa (mismo patrón que
// components/content/article-content.tsx).
const PROSE_CLASSES =
  'text-base leading-8 text-foreground/80 [&_a]:text-primary [&_a]:underline [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:italic'

const DESCRIPCION_ICONOS: Record<string, typeof Heart> = {
  love: Heart,
  weaknesses: ShieldAlert,
  vocation: Briefcase,
  characteristics: Fingerprint
}

function Prosa({ html }: { html: string }) {
  const safeHtml = sanitizeArticleHtml(html)
  if (!safeHtml) return null
  return <div className={PROSE_CLASSES} dangerouslySetInnerHTML={{ __html: safeHtml }} />
}

function Bloque({ bloque }: { bloque: PersonalBloque }) {
  switch (bloque.tipo) {
    case 'titulo':
      return (
        <h2 className="font-display text-2xl font-semibold text-primary">{bloque.texto}</h2>
      )
    case 'html':
      return <Prosa html={bloque.html} />
    case 'laura':
      return (
        <aside className="rounded-[2rem] border border-primary/20 bg-[linear-gradient(135deg,hsl(var(--secondary)/0.8),hsl(var(--primary-soft)))] p-6 shadow-panel sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white shadow-glow">
              <Sparkles size={20} aria-hidden />
            </span>
            <div className="space-y-2">
              {bloque.pre ? (
                <p className="text-sm font-semibold italic text-primary/80">{bloque.pre}</p>
              ) : null}
              {bloque.titulo ? (
                <h3 className="font-display text-xl font-semibold text-primary">
                  {bloque.titulo}
                </h3>
              ) : null}
              <Prosa html={bloque.html} />
            </div>
          </div>
        </aside>
      )
    case 'frases':
      return (
        <section className="space-y-4 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
          <h3 className="font-display text-xl font-semibold text-primary">{bloque.titulo}</h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {bloque.frases.map((frase, index) => (
              <li
                key={index}
                className="flex items-start gap-3 rounded-2xl bg-secondary/50 px-4 py-3 text-base leading-7 text-foreground/80"
              >
                <Quote size={16} className="mt-1.5 shrink-0 text-primary" aria-hidden />
                <span>{frase}</span>
              </li>
            ))}
          </ul>
        </section>
      )
    case 'imagen':
      return (
        <figure className="flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bloque.src}
            alt={bloque.alt}
            loading="lazy"
            className="max-w-full rounded-2xl shadow-panel sm:max-w-[340px]"
          />
        </figure>
      )
    case 'galeria':
      // Las galerías heredadas de estas páginas corresponden a espacios publicitarios.
      return null
    case 'descripcion': {
      const Icono = DESCRIPCION_ICONOS[bloque.icono] ?? Sparkles
      return (
        <section className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Icono size={20} aria-hidden />
            </span>
            <h3 className="font-display text-xl font-semibold text-primary">{bloque.titulo}</h3>
          </div>
          <div className="mt-4">
            <Prosa html={bloque.html} />
          </div>
        </section>
      )
    }
    case 'carrusel':
      return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {bloque.items.map((item, index) => (
            <figure key={index} className="space-y-2 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.caption ?? ''}
                loading="lazy"
                className="aspect-square w-full rounded-2xl object-cover shadow-panel"
              />
              {item.caption ? (
                <figcaption className="text-sm font-medium text-foreground/70">
                  {item.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      )
    case 'separador':
      return <hr className="border-border/70" />
    default:
      return null
  }
}

export function PersonalPageView({
  categoria,
  entry
}: {
  categoria: PersonalCategoria
  entry: PersonalNumero
}) {
  return (
    <ToolPage
      toolKey={`personales-${categoria.key}`}
      wide
      title={entry.titulo}
      description={categoria.descripcion}
    >
      <div className="space-y-8">
        {/* Hero */}
        <section className="overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-panel">
          <div className="grid gap-0 md:grid-cols-2">
            <div className="flex min-h-[200px] items-center justify-center bg-[linear-gradient(135deg,hsl(var(--secondary)/0.86),hsl(var(--primary-soft)))] p-8 sm:min-h-[260px]">
              <span className="font-display text-7xl font-semibold leading-none text-primary sm:text-8xl md:text-9xl">
                {entry.numero}
              </span>
            </div>
            <div className="flex min-h-[200px] flex-col justify-center space-y-4 bg-[linear-gradient(135deg,hsl(var(--card)),hsl(var(--background)))] p-8 sm:min-h-[260px]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                {categoria.etiqueta}
              </p>
              <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
                {categoria.nombre} {entry.numero}
              </h2>
              {entry.subtitulo ? (
                <p className="text-base leading-8 text-foreground/72">{entry.subtitulo}</p>
              ) : null}
            </div>
          </div>
        </section>

        {/* Contenido */}
        <section className="space-y-6">
          {entry.bloques.map((bloque, index) => (
            <Bloque key={index} bloque={bloque} />
          ))}
        </section>

        {/* Navegación entre números de la misma categoría */}
        {categoria.numeros.length > 1 ? (
          <section className="space-y-4 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
            <h2 className="font-display text-xl font-semibold text-primary">
              Otros números en {categoria.nombre}
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {categoria.numeros.map((item) => {
                const activo = item.numero === entry.numero
                return (
                  <Link
                    key={item.numero}
                    href={`/${item.slug}` as Route}
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
