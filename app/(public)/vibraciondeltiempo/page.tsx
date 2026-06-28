import type { Metadata } from 'next'

import { ConceptHub } from '@/components/content/concept-hub'

export const metadata: Metadata = {
  title: 'Vibraciones de Tiempo'
}

export default function Page() {
  return (
    <ConceptHub
      title="Vibraciones de Tiempo"
      description="Las energías que cambian contigo: tu etapa, año, mes, semana y día personal, además de las vibraciones colectivas."
      links={[
        {
          href: '/labrujulanumerologica',
          title: 'La Brújula Numerológica',
          description: 'Todas tus vibraciones de un vistazo.'
        },
        { href: '/etapapersonal', title: 'Etapa personal', description: 'El gran ciclo de vida que atraviesas.' },
        { href: '/anopersonal', title: 'Año personal', description: 'El tema central de tu año.' },
        { href: '/mespersonal', title: 'Mes personal', description: 'La energía de tu mes actual.' },
        { href: '/semanapersonal', title: 'Semana personal', description: 'El enfoque de tu semana.' },
        { href: '/diapersonal', title: 'Día personal', description: 'La vibración de tu día de hoy.' },
        {
          href: '/vibracionescolectivas',
          title: 'Vibraciones colectivas',
          description: 'La energía que todos compartimos hoy.'
        }
      ]}
    />
  )
}
