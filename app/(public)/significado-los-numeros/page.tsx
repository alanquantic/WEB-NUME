import type { Metadata } from 'next'

import { SignificadosConceptosAccordion } from '@/components/content/significados-conceptos-accordion'
import { ToolPage } from '@/components/content/tool-page'

export const metadata: Metadata = {
  title: 'Significado de los Números'
}

export default function Page() {
  return (
    <ToolPage
      toolKey="significadodelosnumeros"
      wide
      title="Significado de los Números"
    >
      <section className="space-y-5">
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-semibold text-primary">
            Los números en cada posición del Pináculo
          </h2>
          <p className="max-w-3xl text-base leading-8 text-foreground/72">
            Un mismo número cambia de significado según la posición que ocupe en tu mapa
            numerológico. Explora cada concepto y descubre qué aporta cada número en él.
          </p>
        </div>
        <SignificadosConceptosAccordion />
      </section>
    </ToolPage>
  )
}
