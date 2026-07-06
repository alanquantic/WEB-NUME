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
        { href: '/numerodelnombre', title: 'Número del Nombre', description: 'Tu expresión y destino.' },
        { href: '/numerodelalma', title: 'Número del Alma', description: 'Lo que tu corazón anhela.' },
        {
          href: '/numerodeexpresiondelalma',
          title: 'Expresión del Alma',
          description: 'La imagen que proyectas.'
        },
        { href: '/numerodelamadurez', title: 'Número de la Madurez', description: 'Hacia dónde madura tu propósito.' },
        { href: '/nombreactivo', title: 'Nombre Activo', description: 'La energía de tu primer nombre.' },
        { href: '/nombrehereditario', title: 'Nombre Hereditario', description: 'La herencia de tus apellidos.' },
        { href: '/significadodeletras', title: 'Significado de Letras', description: 'El valor de cada letra.' }
      ]}
    />
  )
}
