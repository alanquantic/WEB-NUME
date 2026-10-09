import type { Metadata } from 'next'

import { ConceptHub } from '@/components/content/concept-hub'

export const metadata: Metadata = {
  title: 'Numerología del Nombre'
}

export default function Page() {
  return (
    <ConceptHub
      title="Numerología del Nombre"
      description="Tu nombre guarda varias claves. Calcula cada una y entiende cómo se combinan en tu identidad."
      links={[
        { href: '/significado-de-tu-nombre', title: 'Número del Nombre', description: 'Tu expresión y destino.' },
        { href: '/significado-numero-del-alma', title: 'Número del Alma', description: 'Lo que tu corazón anhela.' },
        {
          href: '/significado-numero-de-expresion',
          title: 'Expresión del Alma',
          description: 'La imagen que proyectas.'
        },
        { href: '/significado-numero-la-madurez', title: 'Número de la Madurez', description: 'Hacia dónde madura tu propósito.' },
        { href: '/nombreactivo', title: 'Nombre Activo', description: 'La energía de tu primer nombre.' },
        { href: '/nombrehereditario', title: 'Nombre Hereditario', description: 'La herencia de tus apellidos.' },
        { href: '/significado-significado-de-letras', title: 'Significado de Letras', description: 'El valor de cada letra.' }
      ]}
    />
  )
}
