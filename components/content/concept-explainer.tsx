import type { DraftConcept } from '@/lib/content/draft-name-day'

export function ConceptExplainer({
  concept,
  draft = false,
}: {
  concept: DraftConcept
  draft?: boolean
}) {
  return (
    <>
      {draft ? (
        <p className="rounded-2xl border border-dashed border-primary/30 bg-primary-soft/40 px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-primary/80">
          Borrador en revisión · contenido preliminar sujeto a aprobación
        </p>
      ) : null}

      <section className="space-y-4 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
        <div className="space-y-4 text-base leading-8 text-foreground/72">
          {concept.intro.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      {concept.frase ? (
        <section className="space-y-4 rounded-[2rem] p-6 text-center meaning sm:p-8">
          <h3>{concept.frase}</h3>
        </section>
      ) : null}

      <section className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
        <h2 className="font-display text-2xl font-semibold text-primary">{concept.numerosTitulo}</h2>
        <div className="mt-6 space-y-4">
          {concept.numeros.map((item) => (
            <details
              key={item.numero}
              className="group overflow-hidden rounded-[1.5rem] border border-border/70 bg-[linear-gradient(135deg,hsl(var(--secondary)/0.72),hsl(var(--card)))]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left">
                <span className="font-display text-lg font-semibold text-primary">
                  Número {item.numero}
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="border-t border-border/60 px-5 py-5">
                <p className="text-base leading-8 text-foreground/72">{item.texto}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-[2rem] border border-[hsl(var(--primary)/0.14)] bg-[linear-gradient(135deg,hsl(var(--secondary)/0.82),hsl(var(--background)))] p-6 shadow-panel sm:p-8">
        <h2 className="font-display text-2xl font-semibold text-primary">{concept.calculoTitulo}</h2>
        <div className="space-y-4 text-base leading-8 text-foreground/72">
          {concept.calculo.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>
    </>
  )
}
