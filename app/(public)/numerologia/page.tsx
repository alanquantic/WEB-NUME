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
          href: '/calculadoras/camino-de-vida',
          title: 'Camino de vida',
          description: 'Tu número raíz desde tu fecha de nacimiento.'
        },
        {
          href: '/numerodelnombre',
          title: 'Números del nombre',
          description: 'Expresión, alma y personalidad.'
        },
        {
          href: '/calculatupinaculo',
          title: 'Pináculo',
          description: 'Los números clave de tu mapa completo.'
        },
        {
          href: '/labrujulanumerologica',
          title: 'Brújula numerológica',
          description: 'Tus vibraciones de tiempo de un vistazo.'
        },
        {
          href: '/significadodelosnumeros',
          title: 'Significado de los números',
          description: 'La esencia del 1 al 9 y los maestros.'
        },
        {
          href: '/calculadoras/compatibilidad',
          title: 'Compatibilidad',
          description: 'La afinidad entre dos personas.'
        }
      ]}
    />
  )
}
