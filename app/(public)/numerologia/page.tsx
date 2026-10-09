import type { Metadata } from 'next'

import { ConceptHub } from '@/components/content/concept-hub'

export const metadata: Metadata = {
  title: 'Numerología'
}

export default function Page() {
  return (
    <ConceptHub
      title="Numerología"
      description="Explora tu mapa numerológico: calculadoras, vibraciones de tiempo y los significados de cada número, todo en un solo lugar."
      links={[
        {
          href: '/explora',
          title: 'Explora por número',
          description: 'Elige un número y descúbrelo a fondo.'
        },
        {
          href: '/mi-camino-de-vida',
          title: 'Camino de vida',
          description: 'Tu número raíz desde tu fecha de nacimiento.'
        },
        {
          href: '/significado-de-tu-nombre',
          title: 'Números del nombre',
          description: 'Expresión, alma y personalidad.'
        },
        {
          href: '/pinaculo',
          title: 'Pináculo',
          description: 'Los números clave de tu mapa completo.'
        },
        {
          href: '/la-brujula-numerologica',
          title: 'Brújula numerológica',
          description: 'Tus vibraciones de tiempo de un vistazo.'
        },
        {
          href: '/significado-los-numeros',
          title: 'Significado de los números',
          description: 'La esencia del 1 al 9 y los maestros.'
        },
        {
          href: '/compatibilidad-numerologica',
          title: 'Compatibilidad',
          description: 'La afinidad entre dos personas.'
        }
      ]}
    />
  )
}
