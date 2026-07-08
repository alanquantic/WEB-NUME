import Link from 'next/link'
import type { Route } from 'next'
import { Globe2, Mail } from 'lucide-react'

import { FacebookIcon, InstagramIcon, WhatsappIcon } from '@/components/ui/icons'
import type { ConsultantDirectoryItem } from '@/lib/api/contracts'
import { getWhatsAppHref, normalizeExternalUrl } from '@/lib/contact'
import { getFlagEmoji } from '@/lib/countries'

const tierBadgeMap: Record<string, string> = {
  consultor_certificado: '/images/directory-consultor-certificado.png',
  instructor_certificado: '/images/directory-instructor-certificado.png',
  mentor: '/images/directory-mentor.png',
  master: '/images/directory-master.png'
}

function initials(name: string | null): string {
  if (!name) return '·'
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

function formatNextCourse(value: string) {
  const trimmed = value.trim()
  const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed)

  let date: Date | null = null

  if (dateOnlyMatch) {
    const [, year, month, day] = dateOnlyMatch
    date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))
  } else {
    const parsed = new Date(trimmed)
    if (!Number.isNaN(parsed.getTime())) date = parsed
  }

  if (!date) return trimmed

  const parts = new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).formatToParts(date)
  const day = parts.find((part) => part.type === 'day')?.value
  const month = parts.find((part) => part.type === 'month')?.value
  const year = parts.find((part) => part.type === 'year')?.value

  if (!day || !month || !year) return trimmed

  return `${day} de ${month} ${year}`
}

export function ConsultantCard({
  consultant,
  hrefBase = '/directorio'
}: {
  consultant: ConsultantDirectoryItem
  hrefBase?: string
}) {
  const c = consultant
  const profileHref = `${hrefBase}/${c.id}` as Route
  const flag = getFlagEmoji(c.nationality ?? undefined)
  const nextCourse = c.next_course ? formatNextCourse(c.next_course) : null
  const whatsappHref = getWhatsAppHref(c.contact.phone, c.nationality)
  const websiteHref = normalizeExternalUrl(c.contact.website)
  const badges = c.tiers
    .map((tier) => ({
      ...tier,
      image: tierBadgeMap[tier.slug]
    }))
    .filter((tier): tier is typeof tier & { image: string } => Boolean(tier.image))
  const socialLinks = [
    c.contact.email ? { label: 'Email', href: `mailto:${c.contact.email}`, icon: Mail } : null,
    whatsappHref ? { label: 'WhatsApp', href: whatsappHref, icon: WhatsappIcon } : null,
    c.socials.instagram ? { label: 'Instagram', href: c.socials.instagram, icon: InstagramIcon } : null,
    c.socials.facebook ? { label: 'Facebook', href: c.socials.facebook, icon: FacebookIcon } : null,
    websiteHref ? { label: 'Sitio', href: websiteHref, icon: Globe2 } : null
  ].filter(Boolean) as Array<{
    label: string
    href: string
    icon: (props: { className?: string; width?: number; height?: number }) => JSX.Element
  }>

  return (
    <div className="relative">
      <article className="group relative flex h-full flex-col rounded-[2.1rem] border border-[#f0ddbb] bg-[#fff2d2] p-6 shadow-[0_16px_40px_rgba(105,48,97,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(105,48,97,0.18)]">
        <Link
          href={profileHref}
          aria-label={`Ver perfil de ${c.name ?? 'Consultor'}`}
          className="absolute inset-0 z-0 rounded-[2.1rem]"
        />
        <div className="flex flex-1 flex-col gap-5">
          <div className="flex flex-col items-center text-center">
            {c.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={c.photo}
                alt={c.name ?? 'Consultor'}
                className="h-40 w-40 shrink-0 rounded-full border-[6px] border-white object-cover shadow-[0_18px_36px_rgba(105,48,97,0.16)]"
              />
            ) : (
              <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-full border-[6px] border-white bg-[hsl(var(--secondary))] font-display text-4xl font-semibold text-[hsl(var(--primary))] shadow-[0_18px_36px_rgba(105,48,97,0.16)]">
                {initials(c.name)}
              </div>
            )}
            <div className="mt-5 min-w-0">
              <div className="flex items-center justify-center gap-2">
                <h3 className="font-display text-[1.35rem] font-semibold leading-tight text-[#693061]">
                  {c.name ?? 'Consultor'}
                </h3>
                {flag ? (
                  <span className="text-2xl leading-none" aria-label={c.nationality ?? 'Bandera'}>
                    {flag}
                  </span>
                ) : null}
              </div>
              {c.specialization ? (
                <p className="mt-2 text-sm font-medium leading-5 text-[#7b5a63]">{c.specialization}</p>
              ) : null}
            </div>
          </div>

          {badges.length ? (
            <div className="flex min-h-[5.5rem] flex-wrap items-center justify-center gap-3">
              {badges.slice(0, 2).map((tier) => (
                <div key={tier.slug} className="flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={tier.image} alt={tier.label} className="h-16 w-auto object-contain" />
                </div>
              ))}
            </div>
          ) : null}

          <div className="relative z-10 mt-auto flex flex-wrap items-center justify-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d7c0a8] bg-white/75 text-[#693061]"
                aria-label={link.label}
                title={link.label}
              >
                <link.icon className="h-4 w-4" width={16} height={16} />
              </a>
            ))}
          </div>
        </div>
      </article>

      {nextCourse ? (
        <div className="pointer-events-none absolute inset-x-0 -bottom-20 z-10 flex justify-center">
          <div className="w-[calc(100%-3rem)] rounded-[1.35rem] bg-[#B38A25] px-5 py-4 text-center text-white shadow-[0_10px_24px_rgba(179,138,37,0.28)]">
            <p className="text-sm font-semibold uppercase tracking-[0.12em]">Próximo curso</p>
            <p className="mt-1 text-base font-medium leading-6">{nextCourse}</p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
