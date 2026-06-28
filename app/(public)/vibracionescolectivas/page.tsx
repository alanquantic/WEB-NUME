import type { Metadata } from 'next'

import { CollectiveVibrations } from '@/components/calculators/collective-vibrations'
import { ToolPage } from '@/components/content/tool-page'

export const metadata: Metadata = {
  title: 'Vibraciones Colectivas'
}

export default function Page() {
  return (
    <ToolPage
      toolKey="vibracionescolectivas"
      wide
      title="Vibraciones Colectivas"
      description="La energía universal que todos compartimos en una misma fecha: año, mes, semana y día universal."
    >
      <CollectiveVibrations />
    </ToolPage>
  )
}
