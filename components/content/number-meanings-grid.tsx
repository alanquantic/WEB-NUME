import { NUMBER_MEANINGS } from '@/lib/numerology/meanings'

const ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33]

export function NumberMeaningsGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {ORDER.map((number) => {
        const meaning = NUMBER_MEANINGS[number]
        if (!meaning) return null
        return (
          <article
            key={number}
            className="flex flex-col rounded-[1.6rem] border border-border/80 bg-card p-6 shadow-panel"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-brand font-display text-2xl font-semibold text-white shadow-glow">
                {number}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-primary">{meaning.title}</h3>
                <div className="mt-1 flex flex-wrap gap-2">
                  {meaning.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-semibold text-primary"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-foreground/78">{meaning.description}</p>

            <div className="mt-4 grid gap-2 text-sm leading-6">
              <p className="text-foreground/75">
                <span className="font-semibold text-primary">Tu luz: </span>
                {meaning.light}
              </p>
              <p className="text-foreground/75">
                <span className="font-semibold text-fuchsia">Tu reto: </span>
                {meaning.shadow}
              </p>
            </div>
          </article>
        )
      })}
    </div>
  )
}
