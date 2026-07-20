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

/** Longitud objetivo del teaser (adelanto gratis) en caracteres. */
const TEASER_MAX = 340

/** Longitud mínima deseable del teaser antes de recortar por caracteres. */
const TEASER_MIN = 180

/** Toma las primeras frases del primer párrafo como adelanto (~180-340 caracteres). */
function makeTeaser(parrafos?: string[]): string {
  const first = parrafos?.[0]?.trim()
  if (!first) return ''
  const sentences = first.match(/[^.!?]+[.!?]+(?:\s|$)/g) ?? [first]
  let out = ''
  for (const s of sentences) {
    if (out && out.length + s.length > TEASER_MAX) break
    out += s
    if (out.length >= 240) break
  }
  out = out.trim()
  // Si quedó muy corto (frase breve seguida de una muy larga), recorta por caracteres
  // en una frontera de palabra para no dejar un adelanto raquítico.
  if (out.length < TEASER_MIN && first.length > out.length) {
    let cut = first.slice(0, TEASER_MAX)
    const lastSpace = cut.lastIndexOf(' ')
    if (lastSpace > TEASER_MIN) cut = cut.slice(0, lastSpace)
    out = cut.trim()
  }
  // Tope duro: una única frase larguísima no debe convertirse en todo el adelanto.
  if (out.length > TEASER_MAX + 40) {
    let cut = out.slice(0, TEASER_MAX)
    const lastSpace = cut.lastIndexOf(' ')
    if (lastSpace > TEASER_MIN) cut = cut.slice(0, lastSpace)
    out = cut.trim()
  }
  if (out.length < first.length) out = `${out.replace(/[\s.,;:–—-]+$/, '')}…`
  return out
}

/**
 * Proyección para no-miembros: solo energía, mes personal y teaser.
 * El cuerpo completo, la Energía Activa y el Mes excelente NO se envían al cliente.
 */
function toPreview(contenido: HoroscopoContenido): HoroscopoContenido {
  const out: HoroscopoContenido = {}
  for (const [num, meses] of Object.entries(contenido)) {
    out[num] = {}
    for (const [mes, entry] of Object.entries(meses)) {
      out[num][mes] = {
        energia: entry.energia,
        mesPersonal: entry.mesPersonal,
        teaser: makeTeaser(entry.parrafos),
      }
    }
  }
  return out
}

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
          contenido={isMember ? data.contenido : toPreview(data.contenido)}
          isMember={isMember}
        />
      </div>
    </ToolPage>
  )
}
