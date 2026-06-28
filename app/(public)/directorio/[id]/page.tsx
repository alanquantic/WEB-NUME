import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ApiError } from '@/lib/api/errors'
import { getConsultantById } from '@/lib/api/directory'

export default async function DirectoryDetailPage({ params }: { params: { id: string } }) {
  try {
    const consultant = await getConsultantById(params.id)

    return (
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Link href="/directorio" className="text-sm font-semibold text-primary hover:underline">
          ← Volver al directorio
        </Link>

        <div className="mt-6 flex items-center gap-5">
          <div className="h-20 w-20 overflow-hidden rounded-full bg-secondary">
            {consultant.profile_picture_url ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={consultant.profile_picture_url}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>
          <div>
            <h1 className="font-display text-3xl font-semibold">
              {consultant.consultant_category ?? 'Consultor'}
            </h1>
            {consultant.nationality ? (
              <p className="text-foreground/60">{consultant.nationality}</p>
            ) : null}
          </div>
        </div>

        <p className="mt-6 text-base leading-8 text-foreground/80">
          {consultant.bio ?? 'Sin biografía disponible.'}
        </p>

        {consultant.next_course ? (
          <p className="mt-4 text-sm text-foreground/70">
            <span className="font-semibold">Próximo curso:</span> {consultant.next_course}
          </p>
        ) : null}
      </div>
    )
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound()
    }
    throw error
  }
}
