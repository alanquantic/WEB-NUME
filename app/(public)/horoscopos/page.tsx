import type { Metadata } from 'next'

import { ConceptHub } from '@/components/content/concept-hub'

export const metadata: Metadata = {
  title: 'Horóscopos'
}

export default function Page() {
  return (
    <ConceptHub
      title="Horóscopos"
      description="A diferencia del horóscopo tradicional, en numerología tu guía nace de tus propios números personales."
      links={[
        {
          href: '/revisatuhoroscopomensual2026',
          title: 'Horóscopo mensual 2026',
          description: 'Tu guía numerológica mes a mes.'
        },
        { href: '/anopersonal', title: 'Tu año personal', description: 'El gran tema de tu 2026.' },
        { href: '/mespersonal', title: 'Tu mes personal', description: 'La energía de tu mes actual.' }
      ]}
    />
  )
}
