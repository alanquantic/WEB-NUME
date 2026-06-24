export default function AdminPostDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-panel">
      <h1 className="font-display text-3xl font-semibold">Post {params.id}</h1>
      <p className="mt-3 text-[hsl(var(--foreground))/0.72]">
        Punto de entrada para editar, comentar y revisar versiones.
      </p>
    </div>
  )
}

