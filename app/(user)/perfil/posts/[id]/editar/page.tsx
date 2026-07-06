import { notFound } from 'next/navigation'

import { PuckContentEditor } from '@/components/admin/puck-content-editor'
import { getAdminContentDetail } from '@/lib/api/content.server'
import { isProblemDetails } from '@/lib/api/server'
import { getCategories, getTags } from '@/lib/api/taxonomy'

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const [categories, tags] = await Promise.all([getCategories(1, 100), getTags(1, 100)])

  let detail
  try {
    detail = await getAdminContentDetail('posts', params.id)
  } catch (error) {
    if (isProblemDetails(error) && error.status === 404) notFound()
    throw error
  }

  return (
    <PuckContentEditor kind="posts" categories={categories.data} tags={tags.data} initial={detail} />
  )
}
