import type { Metadata } from 'next'

import { ConceptHub } from '@/components/content/concept-hub'
import { STORE_URL } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Cursos'
}

export default function Page() {
  return (
    <ConceptHub
      title="Cursos"
      description="Aprende numerología paso a paso o conviértete en Consultor Numerológico con nuestras especializaciones."
      links={[
        {
          href: STORE_URL,
          title: 'Ver cursos en la tienda',
          description: 'Explora los cursos y certificaciones disponibles.',
          external: true
        },
        {
          href: '/membresias',
          title: 'Membresías',
          description: 'Accede a contenido premium y comunidad.'
        }
      ]}
    />
  )
}
