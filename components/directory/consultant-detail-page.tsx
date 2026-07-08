import Link from 'next/link'
import type { Route } from 'next'
import { notFound } from 'next/navigation'
import { Globe2 } from 'lucide-react'

import { FacebookIcon, InstagramIcon } from '@/components/ui/icons'
import { getConsultantById } from '@/lib/api/directory'
import { isProblemDetails } from '@/lib/api/server'

function initials(name: string | null): string {
  if (!name) return '·'
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('')
}

export async function ConsultantDetailPage({
  id,
  backHref
}: {
  id: string
  backHref: string
}) {
  let consultant

  try {
    consultant = await getConsultantById(id)
  } catch (error) {
    if (isProblemDetails(error) && error.status === 404) notFound()
    throw error
  }

  const place = [consultant.city, consultant.nationality].filter(Boolean).join(' · ')
  const socials = [
    consultant.contact.website
      ? { label: 'Sitio web', href: consultant.contact.website, icon: Globe2 }
      : null,
    consultant.socials.facebook
      ? { label: 'Facebook', href: consultant.socials.facebook, icon: FacebookIcon }
      : null,
    consultant.socials.instagram
      ? { label: 'Instagram', href: consultant.socials.instagram, icon: InstagramIcon }
      : null
  ].filter(Boolean) as Array<{
    label: string
    href: string
    icon: (props: { className?: string; width?: number; height?: number }) => JSX.Element
  }>

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 text-[#4f3a36]">
      <Link href={backHref as Route} className="text-sm font-semibold text-[#693061]">
        ← Volver al directorio
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-5 rounded-[2rem] border border-[#e7d1b9] bg-white p-6 shadow-[0_18px_40px_rgba(105,48,97,0.08)]">
        {consultant.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={consultant.photo}
            alt={consultant.name ?? 'Consultor'}
            className="h-24 w-24 rounded-3xl object-cover"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-[hsl(var(--secondary))] font-display text-2xl font-semibold text-[hsl(var(--primary))]">
            {initials(consultant.name)}
          </div>
        )}
        <div className="min-w-0">
          <h1 className="font-display text-3xl font-semibold text-[#693061]">
            {consultant.name ?? 'Consultor'}
          </h1>
          <p className="mt-1 font-medium text-[#7b5a63]">
            {consultant.consultant_category ?? 'Consultor'}
          </p>
          {place ? <p className="text-sm text-[#6d5b56]">{place}</p> : null}
          {consultant.tiers.length ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {consultant.tiers.map((tier) => (
                <span
                  key={tier.slug}
                  className="rounded-full bg-[#f7ecdd] px-2.5 py-1 text-xs font-medium text-[#693061]"
                >
                  {tier.label}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_260px]">
        <div className="grid gap-5">
          {consultant.specialization ? (
            <section className="rounded-[2rem] border border-[#e7d1b9] bg-white p-6 shadow-[0_18px_40px_rgba(105,48,97,0.08)]">
              <h2 className="font-display text-lg font-semibold text-[#693061]">Especialización</h2>
              <p className="mt-1 text-[#5f4a45]">{consultant.specialization}</p>
            </section>
          ) : null}
          {consultant.description ? (
            <section className="rounded-[2rem] border border-[#e7d1b9] bg-white p-6 shadow-[0_18px_40px_rgba(105,48,97,0.08)]">
              <h2 className="font-display text-lg font-semibold text-[#693061]">Sobre mí</h2>
              <p className="mt-1 whitespace-pre-line leading-7 text-[#5f4a45]">
                {consultant.description}
              </p>
            </section>
          ) : null}
        </div>

        <aside className="grid h-fit gap-4 rounded-[2rem] border border-[#e7d1b9] bg-white p-6 shadow-[0_18px_40px_rgba(105,48,97,0.08)]">
          <h2 className="font-display text-lg font-semibold text-[#693061]">Contacto</h2>
          <dl className="grid gap-3 text-sm text-[#4f3a36]">
            {consultant.languages ? (
              <div>
                <dt className="text-[#7b5a63]">Idiomas</dt>
                <dd className="font-medium text-[#4f3a36]">{consultant.languages}</dd>
              </div>
            ) : null}
            {consultant.contact.email ? (
              <div>
                <dt className="text-[#7b5a63]">Email</dt>
                <dd className="font-medium break-all text-[#4f3a36]">{consultant.contact.email}</dd>
              </div>
            ) : null}
            {consultant.contact.phone ? (
              <div>
                <dt className="text-[#7b5a63]">Teléfono</dt>
                <dd className="font-medium text-[#4f3a36]">{consultant.contact.phone}</dd>
              </div>
            ) : null}
          </dl>
          {socials.length ? (
            <div className="flex flex-wrap gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#f7ecdd] text-[#693061] transition hover:bg-[#eadbc8]"
                >
                  <social.icon className="h-5 w-5" width={18} height={18} />
                </a>
              ))}
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  )
}
