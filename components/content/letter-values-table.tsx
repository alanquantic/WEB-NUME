import { letterValue } from '@/resources/utils'

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

export function LetterValuesTable() {
  const entries = [...LETTERS, 'ñ'].map((letter) => ({
    letter: letter.toUpperCase(),
    value: letterValue(letter)
  }))

  return (
    <div>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-9">
        {entries.map((entry) => (
          <div
            key={entry.letter}
            className="flex flex-col items-center rounded-2xl border border-border/80 bg-card p-3 shadow-panel"
          >
            <span className="font-display text-xl font-semibold text-foreground">{entry.letter}</span>
            <span className="mt-1 text-sm font-semibold text-primary">{entry.value}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-foreground/60">
        Cada letra vibra con un número. Las letras K (11) y V (22) conservan su valor maestro. Suma
        los valores de tu nombre y redúcelos para obtener tus números personales.
      </p>
    </div>
  )
}
