import type { Metadata } from 'next'

import { MiCarta } from '@/components/account/mi-carta'
import { Breadcrumbs } from '@/components/content/breadcrumbs'

export const metadata: Metadata = {
  title: 'Mi carta numerológica'
}

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Breadcrumbs
        items={[
          { name: 'Inicio', path: '/' },
          { name: 'Numerología', path: '/numerologia' },
          { name: 'Mi carta' }
        ]}
      />
      <h1 className="mt-3 font-display text-4xl font-semibold">Mi carta numerológica</h1>
      <p className="mt-3 text-base leading-8 text-foreground/72">
        Aquí se guardan los resultados que vas calculando. Se quedan en este dispositivo, listos para
        cuando los necesites.
      </p>
      <div className="mt-8">
        <MiCarta />
      </div>
    </div>
  )
}
