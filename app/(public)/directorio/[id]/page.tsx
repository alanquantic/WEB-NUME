import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getConsultantById } from '@/lib/api/directory'
import { isProblemDetails } from '@/lib/api/server'

function initials(name: string | null): string {
  if (!name) return '·'
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('')
}

export default async function DirectoryDetailPage({ params }: { params: { id: string } }) {
  let c
  try {
    c = await getConsultantById(params.id)
  } catch (error) {
    if (isProblemDetails(error) && error.status === 404) notFound()
    throw error
  }

  const place = [c.city, c.nationality].filter(Boolean).join(' · ')
  const socials = [
    c.contact.website ? { label: 'Sitio web', href: c.contact.website } : null,
    c.socials.facebook ? { label: 'Facebook', href: c.socials.facebook } : null,
    c.socials.instagram ? { label: 'Instagram', href: c.socials.instagram } : null
  ].filter(Boolean) as Array<{ label: string; href: string }>

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Link href="/directorio" className="text-sm font-semibold text-[hsl(var(--primary))]">
        ← Volver al directorio
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-5 rounded-[2rem] border border-[hsl(var(--border))] bg-white p-6 shadow-panel">
        {c.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={c.photo} alt={c.name ?? 'Consultor'} className="h-24 w-24 rounded-3xl object-cover" />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-[hsl(var(--secondary))] font-display text-2xl font-semibold text-[hsl(var(--primary))]">
            {initials(c.name)}
          </div>
        )}
        <div className="min-w-0">
          <h1 className="font-display text-3xl font-semibold">{c.name ?? 'Consultor'}</h1>
          <p className="mt-1 text-[hsl(var(--primary))]">{c.consultant_category ?? 'Consultor'}</p>
          {place ? <p className="text-sm text-[hsl(var(--foreground))/0.6]">{place}</p> : null}
          {c.tiers.length ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {c.tiers.map((t) => (
                <span key={t.slug} className="rounded-full bg-[hsl(var(--secondary))] px-2.5 py-1 text-xs font-medium text-[hsl(var(--foreground))/0.7]">
                  {t.label}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_260px]">
        <div className="grid gap-5">
          {c.specialization ? (
            <section>
              <h2 className="font-display text-lg font-semibold">Especialización</h2>
              <p className="mt-1 text-[hsl(var(--foreground))/0.75]">{c.specialization}</p>
            </section>
          ) : null}
          {c.description ? (
            <section>
              <h2 className="font-display text-lg font-semibold">Sobre mí</h2>
              <p className="mt-1 whitespace-pre-line leading-7 text-[hsl(var(--foreground))/0.78]">{c.description}</p>
            </section>
          ) : null}
        </div>

        <aside className="grid h-fit gap-4 rounded-[2rem] border border-[hsl(var(--border))] bg-white p-6 shadow-panel">
          <h2 className="font-display text-lg font-semibold">Contacto</h2>
          <dl className="grid gap-3 text-sm">
            {c.languages ? (
              <div><dt className="text-[hsl(var(--foreground))/0.55]">Idiomas</dt><dd className="font-medium">{c.languages}</dd></div>
            ) : null}
            {c.contact.email ? (
              <div><dt className="text-[hsl(var(--foreground))/0.55]">Email</dt><dd className="font-medium break-all">{c.contact.email}</dd></div>
            ) : null}
            {c.contact.phone ? (
              <div><dt className="text-[hsl(var(--foreground))/0.55]">Teléfono</dt><dd className="font-medium">{c.contact.phone}</dd></div>
            ) : null}
          </dl>
          {socials.length ? (
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="rounded-full bg-[hsl(var(--secondary))] px-3 py-1.5 text-sm font-semibold text-[hsl(var(--primary))] hover:opacity-90">
                  {s.label}
                </a>
              ))}
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  )
}
