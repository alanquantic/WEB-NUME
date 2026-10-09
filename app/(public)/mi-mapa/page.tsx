import type { Metadata } from 'next'
import type { Route } from 'next'
import Link from 'next/link'

import { ToolPage } from '@/components/content/tool-page'
import { ToolIconTile } from '@/components/ui/tool-icon'

export const metadata: Metadata = {
  title: 'Centro numerológico',
  description:
    'Todas las calculadoras y herramientas de numerología en un solo lugar: camino de vida, números del nombre, ciclos personales, pináculo y más.'
}

type Calculator = {
  href: string
  title: string
  description: string
}

const CALCULATORS: Calculator[] = [
  {
    href: '/mi-camino-de-vida',
    title: 'Camino de vida',
    description: 'Tu número raíz a partir de tu fecha de nacimiento.'
  },
  {
    href: '/calculadoras/expresion',
    title: 'Expresión',
    description: 'Tus números del nombre: expresión, alma y personalidad.'
  },
  {
    href: '/compatibilidad-numerologica',
    title: 'Compatibilidad',
    description: 'La afinidad numerológica entre dos personas.'
  },
  {
    href: '/calculadoras/ano-personal-horoscopo',
    title: 'Año personal y horóscopo',
    description: 'Tu vibración del año y su horóscopo personal.'
  },
  {
    href: '/significado-de-tu-nombre',
    title: 'Número del nombre',
    description: 'La vibración de tu nombre completo.'
  },
  {
    href: '/significado-numero-del-alma',
    title: 'Número del alma',
    description: 'Lo que tu alma desea; el motor detrás de tus decisiones.'
  },
  {
    href: '/significado-numero-de-expresion',
    title: 'Número de la personalidad',
    description: 'Cómo te perciben los demás según tu nombre.'
  },
  {
    href: '/nombreactivo',
    title: 'Nombre activo',
    description: 'La vibración del nombre con el que te identificas hoy.'
  },
  {
    href: '/nombrehereditario',
    title: 'Nombre hereditario',
    description: 'La herencia vibratoria de tus apellidos.'
  },
  {
    href: '/significado-numero-la-madurez',
    title: 'Madurez',
    description: 'La suma de tu camino de vida y expresión: tu segunda mitad.'
  },
  {
    href: '/pinaculo',
    title: 'Pináculo',
    description: 'Los ciclos y retos que marcan las etapas de tu vida.'
  },
  {
    href: '/ano-personal',
    title: 'Año personal',
    description: 'La energía que rige tu año en curso.'
  },
  {
    href: '/mespersonal',
    title: 'Mes personal',
    description: 'La vibración del mes según tu año personal.'
  },
  {
    href: '/semana-personal-ok',
    title: 'Semana personal',
    description: 'El tono energético de tu semana.'
  },
  {
    href: '/dia-personal',
    title: 'Día personal',
    description: 'La energía numerológica de tu día.'
  },
  {
    href: '/etapa-personal',
    title: 'Etapa personal',
    description: 'El ciclo mayor que estás transitando.'
  },
  {
    href: '/vibraciondeltiempo',
    title: 'Vibración del tiempo',
    description: 'El número que rige el año universal.'
  },
  {
    href: '/vibraciones-colectivas',
    title: 'Vibraciones colectivas',
    description: 'Las energías que compartimos como colectivo.'
  },
  {
    href: '/la-brujula-numerologica',
    title: 'La brújula numerológica',
    description: 'Una guía para orientarte con tus números principales.'
  },
  {
    href: '/numerologia-de-pareja',
    title: 'Numerología de pareja',
    description: 'La lectura numerológica de una relación.'
  }
]

export default function Page() {
  return (
    <ToolPage
      wide
      title="Centro numerológico"
      description="Todas las calculadoras y herramientas de numerología en un solo lugar. Elige una para explorar tus números."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CALCULATORS.map((calculator) => (
          <Link
            key={calculator.href}
            href={calculator.href as Route}
            className="group flex flex-col rounded-[1.8rem] border border-border/80 bg-card p-6 shadow-panel transition hover:-translate-y-1 hover:shadow-glow"
          >
            <ToolIconTile href={calculator.href} />
            <h2 className="mt-4 font-display text-xl font-semibold text-foreground group-hover:text-primary">
              {calculator.title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-6 text-foreground/70">
              {calculator.description}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Ir a la calculadora →
            </span>
          </Link>
        ))}
      </div>
    </ToolPage>
  )
}
