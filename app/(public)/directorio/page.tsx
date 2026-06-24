import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { getConsultants } from '@/lib/api/directory'

export default async function DirectoryPage() {
  const consultants = await getConsultants()

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold">Directorio</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {consultants.data.map((consultant) => (
          <Card key={consultant.id}>
            <CardTitle>{consultant.consultant_category ?? 'Consultor'}</CardTitle>
            <CardDescription>{consultant.nationality ?? 'Nacionalidad no definida'}</CardDescription>
            <CardContent>
              <p className="text-sm text-[hsl(var(--foreground))/0.68]">
                {consultant.bio ?? 'Biografía pendiente.'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

