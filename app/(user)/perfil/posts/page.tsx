import { ContentListView, type ContentListSearchParams } from '@/components/admin/content-list-view'
import type { PostStatus } from '@/lib/api/contracts'
import { getAdminContentList } from '@/lib/api/content.server'

const statusValues: PostStatus[] = ['draft', 'published', 'scheduled', 'archived']

function parseStatus(value: string | undefined): PostStatus | undefined {
  return statusValues.find((status) => status === value)
}

export default async function AdminPostsPage({
  searchParams
}: {
  searchParams: ContentListSearchParams
}) {
  const page = Number(searchParams.page) > 0 ? Number(searchParams.page) : 1

  const result = await getAdminContentList('posts', {
    page,
    limit: 10,
    search: searchParams.search,
    status: parseStatus(searchParams.status)
  })

  return <ContentListView kind="posts" result={result} searchParams={searchParams} />
}
