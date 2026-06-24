export default function TagDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold">Tag {params.id}</h1>
      <p className="mt-4 text-[hsl(var(--foreground))/0.72]">
        Aquí puedes conectar el listado filtrado usando `GET /posts?tag_id=...`.
      </p>
    </div>
  )
}

