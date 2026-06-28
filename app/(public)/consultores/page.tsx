import type { Metadata } from 'next'

import { ConceptHub } from '@/components/content/concept-hub'

export const metadata: Metadata = {
  title: 'Consultores'
}

export default function Page() {
  return (
    <ConceptHub
      title="Consultores"
      description="Encuentra consultores certificados de Numerología Cotidiana para una lectura personalizada."
      links={[
        {
          href: '/directorio',
          title: 'Ver el directorio',
          description: 'Explora a los consultores disponibles y sus perfiles.'
        }
      ]}
    />
  )
}
