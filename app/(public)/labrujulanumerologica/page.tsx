import type { Metadata } from 'next'

import { PersonalCompass } from '@/components/calculators/personal-compass'
import { ToolPage } from '@/components/content/tool-page'

export const metadata: Metadata = {
  title: 'La Brújula Numerológica'
}

export default function Page() {
  return (
    <ToolPage
      toolKey="labrujulanumerologica"
      wide
      title="La Brújula Numerológica"
      description="Tus vibraciones de tiempo en un solo lugar: etapa, año, mes, semana y día personal a partir de tu fecha de nacimiento."
    >
      <PersonalCompass />
    </ToolPage>
  )
}
