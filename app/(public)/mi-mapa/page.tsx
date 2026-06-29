import type { Metadata } from 'next'

import { MapaNumerologico } from '@/components/calculators/mapa-numerologico'
import { ToolPage } from '@/components/content/tool-page'

export const metadata: Metadata = {
  title: 'Mi Mapa Numerológico',
  description:
    'Calcula tu mapa numerológico completo: camino de vida, números del nombre, madurez y tus vibraciones del año, en una sola vista. Gratis.'
}

export default function Page() {
  return (
    <ToolPage
      wide
      title="Mi Mapa Numerológico"
      description="Tu nombre y tu fecha de nacimiento revelan tu mapa completo. Calcúlalo, explóralo número por número y guárdalo en Mi carta."
    >
      <MapaNumerologico />
    </ToolPage>
  )
}
