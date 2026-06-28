import type { Metadata } from 'next'

import { LetterValuesTable } from '@/components/content/letter-values-table'
import { ToolPage } from '@/components/content/tool-page'

export const metadata: Metadata = {
  title: 'Significado de Letras'
}

export default function Page() {
  return (
    <ToolPage
      wide
      title="Significado de Letras"
      description="El valor numérico de cada letra es la base para calcular los números de tu nombre."
    >
      <LetterValuesTable />
    </ToolPage>
  )
}
