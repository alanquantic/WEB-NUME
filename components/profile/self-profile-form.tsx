'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import {
  ConsultantFields,
  ProfileFields,
  mergeMetadata,
  readConsultant,
  readProfile,
  toConsultantInput,
  type ConsultantFieldsValue,
  type ProfileFieldsValue
} from '@/components/profile/user-fields'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { SafeUser, UpdateUserInput } from '@/lib/api/contracts'
import { updateUser } from '@/lib/api/users.client'

type FormState = {
  email: string
  nationality: string
  next_course: string
  profile_picture_url: string
  profile: ProfileFieldsValue
  consultant: ConsultantFieldsValue
}

function buildInitial(user: SafeUser): FormState {
  return {
    email: user.email,
    nationality: user.nationality ?? '',
    next_course: user.next_course ?? '',
    profile_picture_url: user.profile_picture_url ?? '',
    profile: readProfile(user.metadata),
    consultant: readConsultant(user.consultant_profile)
  }
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-4 rounded-[2rem] border border-[hsl(var(--border))] bg-white p-6 shadow-panel">
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      {children}
    </div>
  )
}

export function SelfProfileForm({ user }: { user: SafeUser }) {
  const router = useRouter()
  const [form, setForm] = useState<FormState>(() => buildInitial(user))
  const [feedback, setFeedback] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFeedback(null)
    setError(null)

    // El usuario NO puede cambiar rol, membresía ni su condición de consultor.
    const payload: UpdateUserInput = {
      email: form.email.trim(),
      nationality: form.nationality.trim() ? form.nationality.trim() : null,
      next_course: form.next_course.trim() ? form.next_course.trim() : null,
      profile_picture_url: form.profile_picture_url.trim() ? form.profile_picture_url.trim() : null,
      metadata: mergeMetadata(user.metadata, form.profile)
    }
    if (user.is_consultant) {
      payload.consultant_profile = toConsultantInput(form.consultant)
    }

    startTransition(async () => {
      try {
        const response = await updateUser(user.id, payload)
        setForm(buildInitial(response.user))
        setFeedback('Datos actualizados correctamente.')
        router.refresh()
      } catch {
        setError('No fue posible guardar. Revisa los datos e inténtalo de nuevo.')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <Section title="Datos personales">
        <div className="grid gap-2">
          <label className="text-sm font-semibold" htmlFor="email">Email</label>
          <Input id="email" type="email" value={form.email} required
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
        </div>
        <ProfileFields value={form.profile} onChange={(profile) => setForm((p) => ({ ...p, profile }))} />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm font-semibold" htmlFor="nationality">Nacionalidad</label>
            <Input id="nationality" value={form.nationality}
              onChange={(e) => setForm((p) => ({ ...p, nationality: e.target.value }))} />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-semibold" htmlFor="next_course">Próximo curso</label>
            <Input id="next_course" value={form.next_course}
              onChange={(e) => setForm((p) => ({ ...p, next_course: e.target.value }))} />
          </div>
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-semibold" htmlFor="profile_picture_url">URL de foto de perfil</label>
          <Input id="profile_picture_url" type="url" value={form.profile_picture_url}
            onChange={(e) => setForm((p) => ({ ...p, profile_picture_url: e.target.value }))} />
        </div>
      </Section>

      {user.is_consultant ? (
        <Section title="Mi ficha de consultor">
          <ConsultantFields value={form.consultant} onChange={(consultant) => setForm((p) => ({ ...p, consultant }))} />
        </Section>
      ) : null}

      {feedback ? (
        <p className="rounded-2xl bg-[hsl(var(--secondary))] px-4 py-3 text-sm font-medium">{feedback}</p>
      ) : null}
      {error ? (
        <p className="rounded-2xl bg-[hsl(var(--danger))/0.12] px-4 py-3 text-sm font-medium text-[hsl(var(--danger))]">{error}</p>
      ) : null}

      <div>
        <Button type="submit" disabled={isPending}>{isPending ? 'Guardando…' : 'Guardar cambios'}</Button>
      </div>
    </form>
  )
}
