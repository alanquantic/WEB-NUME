import { CountUp } from '@/components/ui/count-up'
import { getMeaning } from '@/lib/numerology/meanings'

type NumberResultProps = {
  value: number | string
  intro?: string
}

export function NumberResult({ value, intro }: NumberResultProps) {
  const meaning = typeof value === 'number' ? getMeaning(value) : null

  return (
    <div
      key={String(value)}
      className="animate-result-pop mt-6 rounded-[1.5rem] bg-[linear-gradient(135deg,hsl(var(--secondary)/0.82),hsl(var(--primary)/0.12))] p-6"
    >
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
        <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-brand font-display text-4xl font-semibold text-white shadow-glow">
          <CountUp value={value} />
        </span>
        <div>
          {intro ? <p className="text-sm text-foreground/70">{intro}</p> : null}
          {meaning ? (
            <>
              <p className="mt-1 font-display text-2xl font-semibold text-primary">{meaning.title}</p>
              {meaning.keywords.length > 0 ? (
                <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
                  {meaning.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              ) : null}
              <p className="mt-3 text-sm leading-7 text-foreground/80">{meaning.description}</p>
            </>
          ) : null}
        </div>
      </div>

      {meaning && (meaning.light || meaning.shadow) ? (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {meaning.light ? (
            <div className="rounded-2xl bg-card/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Tu luz</p>
              <p className="mt-1 text-sm leading-6 text-foreground/75">{meaning.light}</p>
            </div>
          ) : null}
          {meaning.shadow ? (
            <div className="rounded-2xl bg-card/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-fuchsia">Tu reto</p>
              <p className="mt-1 text-sm leading-6 text-foreground/75">{meaning.shadow}</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
