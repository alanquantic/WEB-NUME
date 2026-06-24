export default function CategoryDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold">Categoría {params.id}</h1>
      <p className="mt-4 text-[hsl(var(--foreground))/0.72]">
        Aquí puedes conectar el listado filtrado usando `GET /posts?category_id=...`.
      </p>
    </div>
  )
}

