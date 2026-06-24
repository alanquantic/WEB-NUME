import { getConsultantById } from '@/lib/api/directory'

export default async function DirectoryDetailPage({ params }: { params: { id: string } }) {
  const consultant = await getConsultantById(params.id)

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold">
        {consultant.consultant_category ?? 'Consultor'}
      </h1>
      <p className="mt-4 text-base leading-8 text-[hsl(var(--foreground))/0.75]">
        {consultant.bio ?? 'Sin biografía disponible.'}
      </p>
    </div>
  )
}

