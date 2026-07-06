import { TaxonomyManager } from '@/components/admin/taxonomy-manager'
import { getCategories, getTags } from '@/lib/api/taxonomy'

export default async function TaxonomiesPage() {
  const [categories, tags] = await Promise.all([getCategories(1, 100), getTags(1, 100)])

  return (
    <div className="grid gap-6">
      <div className="rounded-[2rem] bg-white p-6 shadow-panel">
        <h1 className="font-display text-3xl font-semibold">Taxonomías</h1>
        <p className="mt-2 text-sm text-[hsl(var(--foreground))/0.72]">
          Categorías y tags para clasificar los posts.
        </p>
      </div>
      <TaxonomyManager categories={categories.data} tags={tags.data} />
    </div>
  )
}
