import Link from 'next/link'
import type { Route } from 'next'

import { ToolPage } from '@/components/content/tool-page'

type Props = {
  dia: number
  mes: string
  numero: number
}

const NUMERO_RESUMEN: Record<number, string> = {
  1: 'liderazgo, iniciativa y la energía de abrir camino.',
  2: 'colaboración, sensibilidad y la fuerza de los vínculos.',
  3: 'expresión creativa, alegría y comunicación.',
  4: 'orden, trabajo constante y bases sólidas.',
  5: 'libertad, cambio y aprendizaje a través de la experiencia.',
  6: 'responsabilidad, servicio y amor por la familia.',
  7: 'introspección, análisis y búsqueda espiritual.',
  8: 'poder material, autoridad y gestión de recursos.',
  9: 'servicio, compasión y cierres de ciclo.',
  11: 'intuición elevada, inspiración y misión espiritual (maestro).',
  22: 'construcción a gran escala y maestros constructores (maestro).'
}

export function BirthdateView({ dia, mes, numero }: Props) {
  const resumen = NUMERO_RESUMEN[numero] ?? ''
  const title = `Horóscopo numerológico para los nacidos el ${dia} de ${mes}`

  return (
    <ToolPage
      toolKey="significadodelosnumeros"
      title={title}
      description={`Qué dice la numerología sobre quienes nacen un ${dia} de ${mes}: su día de nacimiento vibra con el número ${numero}.`}
      breadcrumbs={[
        { name: 'Inicio', path: '/' },
        { name: 'Horóscopos', path: '/horoscopos' },
        { name: `Nacidos el ${dia} de ${mes}` }
      ]}
    >
      <section className="space-y-6 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Día de nacimiento · {dia} de {mes}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-foreground">
            Tu día de nacimiento vibra con el número {numero}
          </h2>
          {resumen ? (
            <p className="mt-3 text-base leading-8 text-foreground/78">
              El número {numero} se asocia con {resumen}
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href={`/numero-personal-${numero}` as Route}
            className="group rounded-[1.5rem] border border-border/60 bg-background p-5 transition hover:border-primary/40 hover:bg-primary-soft"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Lee en profundidad
            </p>
            <p className="mt-2 font-display text-xl font-semibold text-foreground group-hover:text-primary">
              Número Personal {numero}
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground/72">
              Características, fortalezas, amor y vocación de quienes vibran con el {numero}.
            </p>
          </Link>

          <Link
            href="/mi-camino-de-vida"
            className="group rounded-[1.5rem] border border-border/60 bg-background p-5 transition hover:border-primary/40 hover:bg-primary-soft"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Calcula tu camino completo
            </p>
            <p className="mt-2 font-display text-xl font-semibold text-foreground group-hover:text-primary">
              Camino de Vida
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground/72">
              Suma día, mes y año de nacimiento para conocer el número que te acompaña toda la vida.
            </p>
          </Link>
        </div>

        <div className="rounded-[1.5rem] border border-dashed border-primary/30 bg-[hsl(var(--secondary)/0.4)] p-5 sm:p-6">
          <p className="font-display text-lg font-semibold text-primary">¿Quieres más?</p>
          <p className="mt-2 text-base leading-7 text-foreground/78">
            Consulta tu <Link href="/horoscopos" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">horóscopo mensual del Año Personal</Link>{' '}
            o revisa el{' '}
            <Link href="/significado-los-numeros" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">significado completo de los números</Link>.
          </p>
        </div>
      </section>
    </ToolPage>
  )
}
