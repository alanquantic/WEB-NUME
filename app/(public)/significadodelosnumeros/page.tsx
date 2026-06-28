import type { Metadata } from 'next'

import { NumberMeaningsGrid } from '@/components/content/number-meanings-grid'
import { ToolPage } from '@/components/content/tool-page'

export const metadata: Metadata = {
  title: 'Significado de los Números'
}

export default function Page() {
  return (
    <ToolPage
      wide
      title="Significado de los Números"
      description="Cada número del 1 al 9, más los maestros 11, 22 y 33, tiene una vibración propia. Esta es su esencia."
    >
      <NumberMeaningsGrid />
    </ToolPage>
  )
}
