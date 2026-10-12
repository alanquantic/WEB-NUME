import { SignificadoConceptoView } from '@/components/content/significado-concepto-view'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbJsonLd, webPageJsonLd } from '@/lib/seo'
import type { getSignificadoEntry } from '@/lib/significados/data'
import { significadoPath } from '@/lib/significados/routes'

type SignificadoEntry = NonNullable<ReturnType<typeof getSignificadoEntry>>

// Página de un significado (concepto × número) en su URL del sitio original.
export function SignificadoPage({ entry }: { entry: SignificadoEntry }) {
  const path = significadoPath(entry.concepto.slug, entry.numero.numero)
  const title = `${entry.concepto.nombre} · Número ${entry.numero.numero}`
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Inicio', path: '/' },
    { name: 'Significado de los números', path: '/significado-los-numeros' },
    { name: title, path }
  ])
  const webpage = webPageJsonLd({
    title,
    description: entry.concepto.subtitulo ?? title,
    path,
    speakableSelectors: ['h1', '[data-speakable]']
  })

  return (
    <>
      <JsonLd data={webpage} />
      <JsonLd data={breadcrumbs} />
      <SignificadoConceptoView concepto={entry.concepto} numero={entry.numero} />
    </>
  )
}
