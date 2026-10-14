import type { Metadata } from 'next'
import { PersonalNumberCalculator } from '@/components/calculators/personal-number-calculator'

import { GuiaPersonalView } from '@/components/content/guia-personal-view'
import { LegadoPageView } from '@/components/content/legado-page-view'
import { getPostMetadata, PostDetail } from '@/components/content/post-detail'
import { SignificadoPage } from '@/components/content/significado-page'
import { PersonalPageView } from '@/components/content/personal-page-view'
import { BirthdateView } from '@/components/horoscopos/birthdate-view'
import { HoroscopoMesView } from '@/components/horoscopos/horoscopo-mes-view'
import { getServerSessionUser } from '@/lib/auth/session'
import {
  capitalizeMes,
  getBirthdateSlugs,
  parseBirthdateSlug,
  reduceBirthDay
} from '@/lib/horoscopos/birthdate'
import {
  getHoroscopoAnio,
  getHoroscopoMesEntry,
  getHoroscopoMesSlugs,
  parseHoroscopoMesSlug
} from '@/lib/horoscopos/data'
import {
  getLegadoBySlug,
  getLegadoDescripcion,
  getLegadoHermanas,
  getLegadoSlugs
} from '@/lib/legado/data'
import {
  GUIA_META,
  getGuiaBySlug,
  getGuiaSlugs,
  getPersonalCategoria,
  getPersonalEntryBySlug,
  getPersonalSlugs
} from '@/lib/personales/data'
import type { PersonalCategoriaKey } from '@/lib/personales/routes'
import { getSignificadoEntry, getSignificadoParams } from '@/lib/significados/data'
import { parseSignificadoSlug, significadoPath } from '@/lib/significados/routes'

// Categorías exclusivas para miembros: se envía solo un preview al cliente y
// el resto queda tras el muro de membresía (validación por servidor, patrón
// de /horoscopos — el contenido completo nunca llega a no-miembros).
const GATED_CATEGORIES = new Set<PersonalCategoriaKey>(['mes-personal', 'ano-personal'])
const PREVIEW_BLOCKS = 2

type PageProps = {
  params: {
    slug: string
  }
}

// Segmento de primer nivel con las URLs del WordPress original: páginas
// "personales", guías, horóscopos, páginas heredadas, significados y, si no
// es ninguna de esas, un post del blog (pedido a la API bajo demanda, ISR).
// Las rutas estáticas existentes tienen prioridad sobre este segmento.
export const revalidate = 3600

export function generateStaticParams() {
  return [
    ...getPersonalSlugs(),
    ...getGuiaSlugs(),
    ...getHoroscopoMesSlugs(),
    ...getBirthdateSlugs(),
    ...getLegadoSlugs(),
    ...getSignificadoParams().map(({ concepto, numero }) => significadoPath(concepto, numero).slice(1))
  ].map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const result = getPersonalEntryBySlug(params.slug)
  if (result) {
    return {
      title: result.entry.titulo,
      description: result.entry.subtitulo || result.categoria.descripcion
    }
  }

  const guia = getGuiaBySlug(params.slug)
  if (guia) {
    return {
      title: guia.titulo,
      description: GUIA_META[params.slug]?.descripcion
    }
  }

  const horoscopo = parseHoroscopoMesSlug(params.slug)
  if (horoscopo) {
    const anio = getHoroscopoAnio()
    return {
      title: `Año Personal ${horoscopo.numero} · ${horoscopo.mes} ${anio}`,
      description: `Horóscopo numerológico del mes de ${horoscopo.mes} ${anio} para quienes están en Año Personal ${horoscopo.numero}.`,
      alternates: {
        canonical: `/ano-${horoscopo.numero}-${horoscopo.mes.toLowerCase()}`
      }
    }
  }

  const birthdate = parseBirthdateSlug(params.slug)
  if (birthdate) {
    const numero = reduceBirthDay(birthdate.dia)
    return {
      title: `Horóscopo numerológico para los nacidos el ${birthdate.dia} de ${birthdate.mes}`,
      description: `Qué dice la numerología sobre quienes nacen un ${birthdate.dia} de ${birthdate.mes}: su día de nacimiento vibra con el número ${numero}.`,
      alternates: {
        canonical: `/horoscopo-numerologico-para-los-nacidos-el-${birthdate.dia}-de-${birthdate.mes}`
      }
    }
  }

  const legado = getLegadoBySlug(params.slug)
  if (legado) {
    return {
      title: legado.titulo,
      description: getLegadoDescripcion(legado)
    }
  }

  const significado = getSignificadoBySlug(params.slug)
  if (significado) {
    const path = significadoPath(significado.concepto.slug, significado.numero.numero)
    const title = `${significado.concepto.nombre} · Número ${significado.numero.numero}`
    const description = significado.concepto.subtitulo
    return {
      title,
      description,
      alternates: { canonical: path },
      openGraph: { title, description, url: path, type: 'article' }
    }
  }

  return (await getPostMetadata(params.slug)) ?? { title: 'Numerología Cotidiana' }
}

export default async function Page({ params }: PageProps) {
  const result = getPersonalEntryBySlug(params.slug)
  if (result) {
    let locked = false
    if (GATED_CATEGORIES.has(result.categoria.key)) {
      const user = await getServerSessionUser()
      locked = !user?.has_active_membership
    }
    const entry = locked
      ? { ...result.entry, bloques: result.entry.bloques.slice(0, PREVIEW_BLOCKS) }
      : result.entry
    return <PersonalPageView categoria={result.categoria} entry={entry} locked={locked} />
  }

  const guia = getGuiaBySlug(params.slug)
  const meta = GUIA_META[params.slug]
  if (guia && meta) {
    const categoria = getPersonalCategoria(meta.categoria)
    if (categoria) {
      return (
        <GuiaPersonalView
          guia={guia}
          categoria={categoria}
          descripcion={meta.descripcion}
          toolKey={meta.toolKey}
        />
      )
    }
  }

  const horoscopo = parseHoroscopoMesSlug(params.slug)
  if (horoscopo) {
    const user = await getServerSessionUser()
    const isMember = Boolean(user?.has_active_membership)
    const entrada = getHoroscopoMesEntry(horoscopo.numero, horoscopo.mes)
    return (
      <HoroscopoMesView
        numero={horoscopo.numero}
        mes={horoscopo.mes}
        anio={getHoroscopoAnio()}
        entrada={entrada}
        isMember={isMember}
      />
    )
  }

  const birthdate = parseBirthdateSlug(params.slug)
  if (birthdate) {
    return (
      <BirthdateView
        dia={birthdate.dia}
        mes={capitalizeMes(birthdate.mes)}
        numero={reduceBirthDay(birthdate.dia)}
      />
    )
  }

  const legado = getLegadoBySlug(params.slug)
  if (legado) {
    return (
      <LegadoPageView pagina={legado} hermanas={getLegadoHermanas(legado)}>
        {params.slug === 'numero-personal' ? <PersonalNumberCalculator /> : null}
      </LegadoPageView>
    )
  }

  const significado = getSignificadoBySlug(params.slug)
  if (significado) {
    return <SignificadoPage entry={significado} />
  }

  return <PostDetail slug={params.slug} />
}

function getSignificadoBySlug(slug: string) {
  const parsed = parseSignificadoSlug(slug)
  return parsed ? getSignificadoEntry(parsed.concepto, parsed.numero) : null
}
