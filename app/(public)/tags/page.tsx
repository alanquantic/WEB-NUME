import { getTags } from '@/lib/api/taxonomy'

export default async function TagsPage() {
  const tags = await getTags()

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold">Tags</h1>
      <ul className="mt-8 grid gap-3">
        {tags.data.map((tag) => (
          <li key={tag.id} className="rounded-3xl bg-white p-4 shadow-panel">
            {tag.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

