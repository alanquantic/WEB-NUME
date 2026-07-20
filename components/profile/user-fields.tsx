'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CONSULTANT_TIERS } from '@/lib/api/contracts'
import { cn } from '@/lib/utils'

function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-semibold">{label}</label>
      {children}
    </div>
  )
}

// ── Datos de perfil (nombres y bio, viven en metadata.profile) ───────────────
export type ProfileFieldsValue = {
  first_name: string
  last_name: string
  nickname: string
  phone: string
  birth_date: string
  bio: string
}

export function ProfileFields({
  value,
  onChange
}: {
  value: ProfileFieldsValue
  onChange: (v: ProfileFieldsValue) => void
}) {
  const set = (patch: Partial<ProfileFieldsValue>) => onChange({ ...value, ...patch })
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Labeled label="Nombre">
          <Input value={value.first_name} onChange={(e) => set({ first_name: e.target.value })} />
        </Labeled>
        <Labeled label="Apellidos">
          <Input value={value.last_name} onChange={(e) => set({ last_name: e.target.value })} />
        </Labeled>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Labeled label="Teléfono">
          <Input
            type="tel"
            value={value.phone}
            onChange={(e) => set({ phone: e.target.value })}
            placeholder="Ej. 5512345678"
          />
        </Labeled>
        <Labeled label="Fecha de nacimiento">
          <Input
            type="date"
            value={value.birth_date}
            onChange={(e) => set({ birth_date: e.target.value })}
          />
        </Labeled>
      </div>
      <Labeled label="Nombre visible / apodo">
        <Input value={value.nickname} onChange={(e) => set({ nickname: e.target.value })} />
      </Labeled>
      <Labeled label="Biografía">
        <Textarea value={value.bio} onChange={(e) => set({ bio: e.target.value })} rows={4} />
      </Labeled>
    </div>
  )
}

// ── Ficha extendida de consultor (tabla consultant_profiles) ─────────────────
export type ConsultantFieldsValue = {
  description: string
  specialization: string
  public_email: string
  phone: string
  city: string
  photo: string
  languages: string
  website: string
  facebook: string
  instagram: string
  tiers: string[]
}

export function ConsultantFields({
  value,
  onChange
}: {
  value: ConsultantFieldsValue
  onChange: (v: ConsultantFieldsValue) => void
}) {
  const set = (patch: Partial<ConsultantFieldsValue>) => onChange({ ...value, ...patch })
  const toggleTier = (slug: string) =>
    set({ tiers: value.tiers.includes(slug) ? value.tiers.filter((t) => t !== slug) : [...value.tiers, slug] })

  return (
    <div className="grid gap-4">
      <Labeled label="Descripción">
        <Textarea value={value.description} onChange={(e) => set({ description: e.target.value })} rows={4} />
      </Labeled>
      <Labeled label="Especialización">
        <Textarea value={value.specialization} onChange={(e) => set({ specialization: e.target.value })} rows={2} />
      </Labeled>

      <div className="grid gap-4 md:grid-cols-2">
        <Labeled label="Email de contacto (público)">
          <Input value={value.public_email} onChange={(e) => set({ public_email: e.target.value })} />
        </Labeled>
        <Labeled label="Teléfono">
          <Input value={value.phone} onChange={(e) => set({ phone: e.target.value })} />
        </Labeled>
        <Labeled label="Ciudad">
          <Input value={value.city} onChange={(e) => set({ city: e.target.value })} />
        </Labeled>
        <Labeled label="Idiomas">
          <Input value={value.languages} onChange={(e) => set({ languages: e.target.value })} />
        </Labeled>
      </div>

      <Labeled label="Foto (URL)">
        <Input value={value.photo} onChange={(e) => set({ photo: e.target.value })} placeholder="https://…" />
      </Labeled>

      <div className="grid gap-4 md:grid-cols-3">
        <Labeled label="Sitio web">
          <Input value={value.website} onChange={(e) => set({ website: e.target.value })} />
        </Labeled>
        <Labeled label="Facebook">
          <Input value={value.facebook} onChange={(e) => set({ facebook: e.target.value })} />
        </Labeled>
        <Labeled label="Instagram">
          <Input value={value.instagram} onChange={(e) => set({ instagram: e.target.value })} />
        </Labeled>
      </div>

      <div className="grid gap-2">
        <span className="text-sm font-semibold">Tiers</span>
        <div className="flex flex-wrap gap-2">
          {CONSULTANT_TIERS.map((tier) => (
            <label
              key={tier.slug}
              className={cn(
                'cursor-pointer rounded-full border px-3 py-1.5 text-sm transition',
                value.tiers.includes(tier.slug)
                  ? 'border-transparent bg-[hsl(var(--primary))] text-white'
                  : 'border-[hsl(var(--border))] hover:border-[hsl(var(--primary))/0.4]'
              )}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={value.tiers.includes(tier.slug)}
                onChange={() => toggleTier(tier.slug)}
              />
              {tier.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Helpers para construir/leer los valores ──────────────────────────────────
export function readProfile(metadata: Record<string, unknown> | undefined): ProfileFieldsValue {
  const meta = metadata ?? {}
  const p = (meta.profile ?? {}) as Record<string, string>
  // Datos que la tienda dejó en metadata.customer al crear la cuenta por webhook;
  // se usan como respaldo para pre-llenar el formulario si el perfil aún está vacío.
  const c = (meta.customer ?? {}) as Record<string, string>
  return {
    first_name: p.first_name ?? c.first_name ?? '',
    last_name: p.last_name ?? c.last_name ?? '',
    nickname: p.nickname ?? '',
    phone: p.phone ?? c.phone ?? '',
    birth_date: p.birth_date ?? c.birth_date ?? '',
    bio: p.bio ?? ''
  }
}

export function emptyProfile(): ProfileFieldsValue {
  return { first_name: '', last_name: '', nickname: '', phone: '', birth_date: '', bio: '' }
}

export function emptyConsultant(): ConsultantFieldsValue {
  return {
    description: '', specialization: '', public_email: '', phone: '', city: '',
    photo: '', languages: '', website: '', facebook: '', instagram: '', tiers: []
  }
}

export function readConsultant(cp: {
  description: string | null; specialization: string | null; public_email: string | null
  phone: string | null; city: string | null; photo: string | null; languages: string | null
  website: string | null; facebook: string | null; instagram: string | null
  tiers: { slug: string }[]
} | null | undefined): ConsultantFieldsValue {
  if (!cp) return emptyConsultant()
  return {
    description: cp.description ?? '', specialization: cp.specialization ?? '',
    public_email: cp.public_email ?? '', phone: cp.phone ?? '', city: cp.city ?? '',
    photo: cp.photo ?? '', languages: cp.languages ?? '', website: cp.website ?? '',
    facebook: cp.facebook ?? '', instagram: cp.instagram ?? '',
    tiers: Array.isArray(cp.tiers) ? cp.tiers.map((t) => t.slug) : []
  }
}

// metadata mergeado preservando legacy/socials y actualizando profile.
export function mergeMetadata(
  metadata: Record<string, unknown> | undefined,
  profile: ProfileFieldsValue
): Record<string, unknown> {
  const existingProfile = ((metadata ?? {}).profile ?? {}) as Record<string, unknown>
  const nextProfile: Record<string, unknown> = { ...existingProfile }
  for (const [k, v] of Object.entries(profile)) {
    if (v.trim()) nextProfile[k] = v.trim()
    else delete nextProfile[k]
  }
  return { ...(metadata ?? {}), profile: nextProfile }
}

export function toConsultantInput(v: ConsultantFieldsValue) {
  const s = (x: string) => (x.trim() ? x.trim() : null)
  return {
    description: s(v.description), specialization: s(v.specialization), public_email: s(v.public_email),
    phone: s(v.phone), city: s(v.city), photo: s(v.photo), languages: s(v.languages),
    website: s(v.website), facebook: s(v.facebook), instagram: s(v.instagram), tiers: v.tiers
  }
}
