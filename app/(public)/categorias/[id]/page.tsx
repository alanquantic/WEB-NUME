import { notFound, permanentRedirect } from 'next/navigation'

import { getCategories } from '@/lib/api/taxonomy'
import { categoryPath } from '@/lib/categorias/paths'

// Las categorías viven en /categoria/{slug} (misma URL que el WordPress
// original). Esta ruta por id se conserva solo para redirigir enlaces viejos.
export default async function CategoryByIdPage({ params }: { params: { id: string } }) {
  const id = Number(params.id)
  let slug: string | undefined
  try {
    slug = (await getCategories(1, 100)).data.find((category) => category.id === id)?.slug
  } catch {
    slug = undefined
  }
  if (!slug) notFound()
  permanentRedirect(categoryPath(slug))
}
