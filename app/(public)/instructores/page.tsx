import type { Metadata } from 'next'

import { ConceptHub } from '@/components/content/concept-hub'

export const metadata: Metadata = {
  title: 'Instructores'
}

export default function Page() {
  return (
    <ConceptHub
      title="Instructores"
      description="Conoce a los instructores de la Escuela de Numerología de Laura L. Rodríguez."
      links={[
        {
          href: '/directorio',
          title: 'Ver el directorio',
          description: 'Explora a los instructores y consultores certificados.'
        }
      ]}
    />
  )
}
