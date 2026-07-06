import Link from 'next/link'

import type { ConsultantDirectoryItem } from '@/lib/api/contracts'

function initials(name: string | null): string {
  if (!name) return '·'
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

export function ConsultantCard({ consultant }: { consultant: ConsultantDirectoryItem }) {
  const c = consultant
  const place = [c.city, c.nationality].filter(Boolean).join(' · ')

  return (
    <Link
      href={`/directorio/${c.id}`}
      className="group grid gap-4 rounded-[2rem] border border-[hsl(var(--border))] bg-white p-6 shadow-panel transition hover:-translate-y-1 hover:shadow-glow"
    >
      <div className="flex items-center gap-4">
        {c.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={c.photo}
            alt={c.name ?? 'Consultor'}
            className="h-16 w-16 shrink-0 rounded-2xl object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[hsl(var(--secondary))] font-display text-lg font-semibold text-[hsl(var(--primary))]">
            {initials(c.name)}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="truncate font-display text-lg font-semibold">{c.name ?? 'Consultor'}</h3>
          <p className="text-sm text-[hsl(var(--primary))]">{c.consultant_category ?? 'Consultor'}</p>
          {place ? <p className="text-xs text-[hsl(var(--foreground))/0.55]">{place}</p> : null}
        </div>
      </div>

      {c.tiers.length ? (
        <div className="flex flex-wrap gap-1.5">
          {c.tiers.slice(0, 4).map((t) => (
            <span
              key={t.slug}
              className="rounded-full bg-[hsl(var(--secondary))] px-2.5 py-1 text-xs font-medium text-[hsl(var(--foreground))/0.7]"
            >
              {t.label}
            </span>
          ))}
        </div>
      ) : null}

      {c.description ? (
        <p className="line-clamp-3 text-sm leading-6 text-[hsl(var(--foreground))/0.7]">
          {c.description}
        </p>
      ) : null}

      <span className="text-sm font-semibold text-[hsl(var(--primary))] transition group-hover:underline">
        Ver perfil →
      </span>
    </Link>
  )
}
