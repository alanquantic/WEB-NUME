import Link from 'next/link'

export default function CalculatorsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold">Calculadoras</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Link href="/calculadoras/camino-de-vida" className="rounded-3xl bg-white p-6 shadow-panel">
          Camino de vida
        </Link>
        <Link href="/calculadoras/expresion" className="rounded-3xl bg-white p-6 shadow-panel">
          Expresión
        </Link>
        <Link href="/calculadoras/compatibilidad" className="rounded-3xl bg-white p-6 shadow-panel">
          Compatibilidad
        </Link>
      </div>
    </div>
  )
}

