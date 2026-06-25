import Link from 'next/link'

type PageInProgressProps = {
  description?: string
  title: string
}

export function PageInProgress({
  title,
  description = 'Estamos preparando esta experiencia para ti. Muy pronto encontrarás aquí contenido y herramientas alineadas con Numerología Cotidiana.'
}: PageInProgressProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
      <div className="overflow-hidden rounded-[2.5rem] border border-border/80 bg-[linear-gradient(135deg,hsl(var(--secondary)/0.78),hsl(var(--background)/0.96))] shadow-panel">
        <div className="grid items-center gap-8 px-6 py-8 md:grid-cols-[1.05fr_0.95fr] md:px-10 md:py-12">
          <div className="space-y-5">
            <span className="inline-flex rounded-full bg-primary-soft px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Página en progreso
            </span>
            <h1 className="max-w-xl font-display text-4xl font-semibold leading-tight text-foreground md:text-5xl">
              {title}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-foreground/76 md:text-lg">
              {description}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/"
                className="rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:opacity-95"
              >
                Volver al inicio
              </Link>
              <Link
                href="/blog"
                className="rounded-full border border-border bg-card/80 px-6 py-3 text-sm font-semibold text-foreground/78 transition hover:bg-primary-soft hover:text-primary"
              >
                Ver contenido disponible
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.18),transparent_42%),linear-gradient(180deg,hsl(var(--card)/0.94),hsl(var(--secondary)/0.76))] p-4 shadow-[0_24px_60px_hsl(var(--primary)/0.08)]">
            <div className="absolute inset-x-10 top-6 h-24 rounded-full bg-[hsl(var(--fuchsia)/0.12)] blur-3xl" />
            <div className="relative overflow-hidden rounded-[1.6rem] bg-white/66 p-3 backdrop-blur">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/preview-bk.png"
                alt="Vista previa de página en progreso"
                className="h-full w-full rounded-[1.2rem] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
