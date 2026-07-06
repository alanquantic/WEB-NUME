import { notFound } from 'next/navigation'

import { PuckContentEditor } from '@/components/admin/puck-content-editor'
import { getAdminContentDetail } from '@/lib/api/content.server'
import { isProblemDetails } from '@/lib/api/server'

export default async function EditPagePage({ params }: { params: { id: string } }) {
  let detail
  try {
    detail = await getAdminContentDetail('pages', params.id)
  } catch (error) {
    if (isProblemDetails(error) && error.status === 404) notFound()
    throw error
  }

  return <PuckContentEditor kind="pages" categories={[]} tags={[]} initial={detail} />
}
