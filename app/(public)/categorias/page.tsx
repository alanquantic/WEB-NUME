import { getCategories } from '@/lib/api/taxonomy'

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold">Categorías</h1>
      <ul className="mt-8 grid gap-3">
        {categories.data.map((category) => (
          <li key={category.id} className="rounded-3xl bg-white p-4 shadow-panel">
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

