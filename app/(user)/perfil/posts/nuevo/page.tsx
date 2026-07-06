import { PuckContentEditor } from '@/components/admin/puck-content-editor'
import { getCategories, getTags } from '@/lib/api/taxonomy'

export default async function NewPostPage() {
  const [categories, tags] = await Promise.all([getCategories(1, 100), getTags(1, 100)])

  return <PuckContentEditor kind="posts" categories={categories.data} tags={tags.data} />
}
