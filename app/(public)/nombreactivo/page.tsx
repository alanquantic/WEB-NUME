import type { Metadata } from 'next'

import { NameNumberCalculator } from '@/components/calculators/name-number-calculator'
import { GuiaBloquesList } from '@/components/content/guia-personal-view'
import { ToolPage } from '@/components/content/tool-page'
import { getNombreActivoGuia, getPersonalCategoria } from '@/lib/personales/data'

export const metadata: Metadata = {
  title: 'Nombre Activo'
}

export default function Page() {
  const guia = getNombreActivoGuia()
  const categoria = getPersonalCategoria('nombre-activo')

  return (
    <ToolPage
      toolKey="nombreactivo"
      wide
      title="Nombre Activo"
      description="Es la energía de tu primer nombre, el que usas a diario y con el que te identificas. Calcúlalo y descubre la señal que envía a los demás."
    >
      <div className="space-y-10">
        <NameNumberCalculator kind="active" />
        {categoria ? <GuiaBloquesList bloques={guia.bloques} categoria={categoria} /> : null}
      </div>
    </ToolPage>
  )
}
