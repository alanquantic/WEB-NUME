import type { Metadata } from 'next'

import horoscopoData from '@/components/jsons/horoscopo-mensual-2026.json'
import { ToolPage } from '@/components/content/tool-page'
import {
  HoroscopoMensualExplorer,
  type HoroscopoContenido
} from '@/components/horoscopos/horoscopo-mensual-explorer'
import { getServerSessionUser } from '@/lib/auth/session'

export const metadata: Metadata = {
  title: 'Horóscopos'
}

type HoroscopoData = {
  anio: number
  numeros: string[]
  meses: string[]
  contenido: HoroscopoContenido
}

const data = horoscopoData as HoroscopoData

export default async function Page() {
  const user = await getServerSessionUser()
  const isMember = Boolean(user?.has_active_membership)

  return (
    <ToolPage
      toolKey="significadodelosnumeros"
      wide
      title={`Horóscopo de tu Año Personal ${data.anio}`}
      description="A diferencia del horóscopo tradicional, en numerología tu guía nace de tus propios números personales."
    >
      <div className="space-y-8">
        <section className="space-y-4 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
          <div className="space-y-4 text-base leading-8 text-foreground/72">
            <p>
              El <strong>Año Personal</strong> nos habla del proceso o lección de vida que
              tendremos que enfrentar o aprender de forma individual. Esta lección dura 365
              días: comienza el 1° de enero y termina el 31 de diciembre, y forma parte de un
              ciclo de 9 años que va marcando los grandes temas de tu evolución.
            </p>
            <p>
              Dentro de ese año, cada mes afina la lección con una energía propia. Aquí puedes
              consultar, mes a mes, el horóscopo numerológico que corresponde a tu año personal
              en {data.anio}: qué se activa, qué conviene impulsar y qué debes cuidar en cada
              período.
            </p>
          </div>
        </section>

        <HoroscopoMensualExplorer
          anio={data.anio}
          numeros={data.numeros}
          meses={data.meses}
          contenido={isMember ? data.contenido : null}
          isMember={isMember}
        />
      </div>
    </ToolPage>
  )
}
