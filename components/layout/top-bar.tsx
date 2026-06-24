type CollectiveEnergy = {
  id: string
  label: string
}

const COLLECTIVE_ENERGY: readonly CollectiveEnergy[] = [
  { id: 'dia', label: 'Dia' },
  { id: 'semana', label: 'Sem' },
  { id: 'mes', label: 'Mes' }
]

function formatToday(): string {
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date())
}

export function TopBar() {
  return (
    <div className="bg-gradient-brand text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-3 text-center sm:flex-row sm:justify-between sm:gap-4 sm:px-6 sm:py-2 sm:text-left">
        <h2 className="text-2xl font-medium tracking-wide text-white/85 sm:text-3xl">
          Energia Colectiva
        </h2>

        <div
          data-calculator-slot="energia-colectiva"
          className="flex items-center gap-2 sm:gap-3"
        >
          {COLLECTIVE_ENERGY.map((energy) => (
            <div key={energy.id} className="flex flex-col items-center">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 font-display text-base font-semibold ring-1 ring-white/30">
                ?
              </span>
              <span className="mt-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-white/70">
                {energy.label}
              </span>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-medium text-white/85 sm:text-3xl">{formatToday()}</h2>
      </div>
    </div>
  )
}
