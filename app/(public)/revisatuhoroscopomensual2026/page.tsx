import type { Metadata } from 'next'

import { ConceptHub } from '@/components/content/concept-hub'

export const metadata: Metadata = {
  title: 'Revisa tu horóscopo mensual 2026'
}

export default function Page() {
  return (
    <ConceptHub
      title="Revisa tu horóscopo mensual 2026"
      description="Tu horóscopo numerológico mensual parte de tu mes personal. Calcúlalo y descubre la energía que te acompaña este mes y todo el año."
      links={[
        {
          href: '/mespersonal',
          title: 'Calcula tu mes personal',
          description: 'La base de tu horóscopo numerológico mensual.'
        },
        {
          href: '/anopersonal',
          title: 'Tu año personal 2026',
          description: 'El marco que da sentido a cada mes.'
        }
      ]}
    />
  )
}
