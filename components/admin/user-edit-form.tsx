'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type {
  ConsultantCategory,
  MembershipTier,
  Role,
  SafeUser,
  UpdateUserInput
} from '@/lib/api/contracts'
import { deleteUser, updateUser } from '@/lib/api/users'
import { cn } from '@/lib/utils'

type UserEditFormProps = {
  user: SafeUser
}

type FormState = {
  email: string
  role: Role
  nationality: string
  next_course: string
  profile_picture_url: string
  is_consultant: boolean
  consultant_category: ConsultantCategory | ''
  current_membership: MembershipTier
  membership_expires_at: string
}

const roleOptions: Role[] = ['admin', 'subscriber', 'reader']
const membershipOptions: MembershipTier[] = ['none', 'membresia_180', 'membresia_365']
const consultantCategoryOptions: ConsultantCategory[] = [
  'Numerólogo Master',
  'Consultores',
  'Consultores Practicantes',
  'Instructores'
]

const fieldClassName = cn(
  'h-11 w-full rounded-2xl border border-[hsl(var(--border))] bg-white px-4 text-sm',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]'
)

function toDateTimeLocal(value: string | null): string {
  if (!value) {
    return ''
  }

  const date = new Date(value)
  const offsetMs = date.getTimezoneOffset() * 60 * 1000
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16)
}

function buildInitialState(user: SafeUser): FormState {
  return {
    email: user.email,
    role: user.role,
    nationality: user.nationality ?? '',
    next_course: user.next_course ?? '',
    profile_picture_url: user.profile_picture_url ?? '',
    is_consultant: user.is_consultant,
    consultant_category: user.consultant_category ?? '',
    current_membership: user.current_membership,
    membership_expires_at: toDateTimeLocal(user.membership_expires_at)
  }
}

function buildPayload(form: FormState): UpdateUserInput {
  return {
    email: form.email.trim(),
    role: form.role,
    nationality: form.nationality.trim() ? form.nationality.trim() : null,
    next_course: form.next_course.trim() ? form.next_course.trim() : null,
    profile_picture_url: form.profile_picture_url.trim()
      ? form.profile_picture_url.trim()
      : null,
    is_consultant: form.is_consultant,
    consultant_category: form.consultant_category ? form.consultant_category : null,
    current_membership: form.current_membership,
    membership_expires_at: form.membership_expires_at
      ? new Date(form.membership_expires_at).toISOString()
      : null
  }
}

export function UserEditForm({ user }: UserEditFormProps) {
  const router = useRouter()
  const [form, setForm] = useState<FormState>(() => buildInitialState(user))
  const [feedback, setFeedback] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [isDeleting, startDeleting] = useTransition()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFeedback(null)
    setError(null)

    startTransition(async () => {
      try {
        const response = await updateUser(user.id, buildPayload(form))
        setForm(buildInitialState(response.user))
        setFeedback('Cambios guardados correctamente.')
        router.refresh()
      } catch {
        setError('No fue posible guardar los cambios. Revisa los datos e inténtalo de nuevo.')
      }
    })
  }

  function handleDelete() {
    const confirmed = window.confirm(
      `¿Eliminar al usuario ${user.email}? Esta acción aplica un borrado lógico.`
    )

    if (!confirmed) {
      return
    }

    setFeedback(null)
    setError(null)

    startDeleting(async () => {
      try {
        await deleteUser(user.id)
        router.push('/perfil/usuarios')
        router.refresh()
      } catch {
        setError('No fue posible eliminar al usuario.')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-2">
        <label className="text-sm font-semibold" htmlFor="email">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          required
        />
      </div>

      <div className="grid gap-2 md:grid-cols-2 md:gap-4">
        <div className="grid gap-2">
          <label className="text-sm font-semibold" htmlFor="role">
            Rol
          </label>
          <select
            id="role"
            className={fieldClassName}
            value={form.role}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, role: event.target.value as Role }))
            }
          >
            {roleOptions.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold" htmlFor="current_membership">
            Membresía
          </label>
          <select
            id="current_membership"
            className={fieldClassName}
            value={form.current_membership}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                current_membership: event.target.value as MembershipTier
              }))
            }
          >
            {membershipOptions.map((tier) => (
              <option key={tier} value={tier}>
                {tier}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold" htmlFor="membership_expires_at">
          Vencimiento de membresía
        </label>
        <Input
          id="membership_expires_at"
          type="datetime-local"
          value={form.membership_expires_at}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, membership_expires_at: event.target.value }))
          }
        />
      </div>

      <div className="grid gap-2 md:grid-cols-2 md:gap-4">
        <div className="grid gap-2">
          <label className="text-sm font-semibold" htmlFor="nationality">
            Nacionalidad
          </label>
          <Input
            id="nationality"
            value={form.nationality}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, nationality: event.target.value }))
            }
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold" htmlFor="next_course">
            Próximo curso
          </label>
          <Input
            id="next_course"
            value={form.next_course}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, next_course: event.target.value }))
            }
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold" htmlFor="profile_picture_url">
          URL de foto de perfil
        </label>
        <Input
          id="profile_picture_url"
          type="url"
          value={form.profile_picture_url}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, profile_picture_url: event.target.value }))
          }
        />
      </div>

      <div className="grid gap-2 md:grid-cols-2 md:gap-4">
        <label className="flex items-center gap-3 text-sm font-semibold">
          <input
            type="checkbox"
            className="h-5 w-5 rounded border-[hsl(var(--border))]"
            checked={form.is_consultant}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, is_consultant: event.target.checked }))
            }
          />
          Es consultor
        </label>

        <div className="grid gap-2">
          <label className="text-sm font-semibold" htmlFor="consultant_category">
            Categoría de consultor
          </label>
          <select
            id="consultant_category"
            className={fieldClassName}
            value={form.consultant_category}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                consultant_category: event.target.value as ConsultantCategory | ''
              }))
            }
          >
            <option value="">Sin categoría</option>
            {consultantCategoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {feedback ? (
        <p className="rounded-2xl bg-[hsl(var(--secondary))] px-4 py-3 text-sm font-medium">
          {feedback}
        </p>
      ) : null}

      {error ? (
        <p className="rounded-2xl bg-[hsl(var(--danger))/0.12] px-4 py-3 text-sm font-medium text-[hsl(var(--danger))]">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Guardando…' : 'Guardar cambios'}
        </Button>
        <Button
          type="button"
          variant="danger"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? 'Eliminando…' : 'Eliminar usuario'}
        </Button>
      </div>
    </form>
  )
}
