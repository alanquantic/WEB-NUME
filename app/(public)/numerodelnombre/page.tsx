import type { Metadata } from 'next'

import { NameNumberCalculator } from '@/components/calculators/name-number-calculator'
import { GuiaBloquesList } from '@/components/content/guia-personal-view'
import { ToolPage } from '@/components/content/tool-page'
import { getNumeroDelNombreGuia, getPersonalCategoria } from '@/lib/personales/data'

export const metadata: Metadata = {
  title: 'Número del Nombre'
}

export default function Page() {
  const guia = getNumeroDelNombreGuia()
  const categoria = getPersonalCategoria('numero-del-nombre')

  return (
    <ToolPage
      toolKey="numerodelnombre"
      wide
      title="Número del Nombre"
      description="También llamado número de expresión o destino. Resume tus talentos y la manera en que te muestras al mundo."
    >
      <div className="space-y-10">
        <NameNumberCalculator kind="expression" />
        {categoria ? <GuiaBloquesList bloques={guia.bloques} categoria={categoria} /> : null}
      </div>
    </ToolPage>
  )
}
