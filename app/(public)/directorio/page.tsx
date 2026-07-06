import { ConsultantCard } from '@/components/directory/consultant-card'
import { getConsultants } from '@/lib/api/directory'

export default async function DirectoryPage() {
  const consultants = await getConsultants({ limit: 24 })

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold">Directorio de consultores</h1>
      <p className="mt-2 text-[hsl(var(--foreground))/0.7]">
        {consultants.pagination.total} consultores certificados.
      </p>

      {consultants.data.length === 0 ? (
        <p className="mt-8 text-sm text-[hsl(var(--foreground))/0.7]">
          No hay consultores para mostrar.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {consultants.data.map((consultant) => (
            <ConsultantCard key={consultant.id} consultant={consultant} />
          ))}
        </div>
      )}
    </div>
  )
}
