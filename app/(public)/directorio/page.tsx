import type { Metadata } from 'next'
import type { Route } from 'next'
import Link from 'next/link'

import { EmptyState } from '@/components/ui/empty-state'
import type { ConsultantDirectoryItem } from '@/lib/api/contracts'
import { getConsultants } from '@/lib/api/directory'

export const metadata: Metadata = {
  title: 'Directorio'
}

async function loadConsultants(): Promise<ConsultantDirectoryItem[]> {
  try {
    return (await getConsultants()).data
  } catch {
    return []
  }
}

export default async function DirectoryPage() {
  const consultants = await loadConsultants()

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold">Directorio</h1>
      <p className="mt-3 max-w-2xl text-base leading-8 text-foreground/72">
        Encuentra consultores e instructores de Numerología Cotidiana.
      </p>

      {consultants.length > 0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {consultants.map((consultant) => (
            <Link
              key={consultant.id}
              href={`/directorio/${consultant.id}` as Route}
              className="group flex flex-col rounded-[1.8rem] border border-border/80 bg-card p-6 shadow-panel transition hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 overflow-hidden rounded-full bg-secondary">
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
                  <p className="font-display text-lg font-semibold text-foreground group-hover:text-primary">
                    {consultant.consultant_category ?? 'Consultor'}
                  </p>
                  {consultant.nationality ? (
                    <p className="text-sm text-foreground/60">{consultant.nationality}</p>
                  ) : null}
                </div>
              </div>
              {consultant.bio ? (
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-foreground/70">
                  {consultant.bio}
                </p>
              ) : null}
              <span className="mt-4 inline-flex text-sm font-semibold text-primary">
                Ver perfil →
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <EmptyState
            title="Directorio en construcción"
            description="Pronto encontrarás aquí a consultores e instructores certificados."
          />
        </div>
      )}
    </div>
  )
}
