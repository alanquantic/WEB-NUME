import Link from 'next/link'
import type { UrlObject } from 'url'

import { MembershipTierBadge } from '@/components/memberships/membership-tier-badge'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Role } from '@/lib/api/contracts'
import { getUsers } from '@/lib/api/users.server'
import { cn } from '@/lib/utils'

type SearchParams = {
  page?: string
  search?: string
  role?: string
  is_consultant?: string
}

const roleValues: Role[] = ['admin', 'subscriber', 'reader']
const pageLimit = 10

const selectClassName = cn(
  'h-11 min-w-0 w-full rounded-2xl border border-[hsl(var(--border))] bg-white px-4 text-sm',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]'
)

function parseRole(value: string | undefined): Role | undefined {
  return roleValues.find((role) => role === value)
}

function parseIsConsultant(value: string | undefined): boolean | undefined {
  if (value === 'true') {
    return true
  }

  if (value === 'false') {
    return false
  }

  return undefined
}

function buildPageHref(searchParams: SearchParams, page: number): UrlObject {
  const query: Record<string, string> = { page: String(page) }

  if (searchParams.search) {
    query.search = searchParams.search
  }

  if (searchParams.role) {
    query.role = searchParams.role
  }

  if (searchParams.is_consultant) {
    query.is_consultant = searchParams.is_consultant
  }

  return { pathname: '/perfil/usuarios', query }
}

export default async function ProfileUsersPage({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const page = Number(searchParams.page) > 0 ? Number(searchParams.page) : 1
  const role = parseRole(searchParams.role)
  const isConsultant = parseIsConsultant(searchParams.is_consultant)

  const users = await getUsers({
    page,
    limit: pageLimit,
    search: searchParams.search,
    role,
    is_consultant: isConsultant
  })

  const totalPages = Math.max(1, Math.ceil(users.pagination.total / users.pagination.limit))

  return (
    <div className="grid gap-6">
      <div className="rounded-[2rem] bg-white p-6 shadow-panel">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold">Usuarios</h1>
            <p className="mt-2 text-sm text-[hsl(var(--foreground))/0.72]">
              Gestiona las cuentas registradas. {users.pagination.total} usuarios en total.
            </p>
          </div>
          <Link
            href="/perfil/usuarios/nuevo"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[hsl(var(--primary))] px-5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Nuevo usuario
          </Link>
        </div>

        <form method="get" className="mt-6 grid min-w-0 grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-[1fr_180px_180px_auto]">
          <Input
            name="search"
            placeholder="Buscar por correo electrónico"
            defaultValue={searchParams.search ?? ''}
          />
          <select name="role" className={selectClassName} defaultValue={searchParams.role ?? ''}>
            <option value="">Todos los roles</option>
            {roleValues.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <select
            name="is_consultant"
            className={selectClassName}
            defaultValue={searchParams.is_consultant ?? ''}
          >
            <option value="">Consultor: todos</option>
            <option value="true">Solo consultores</option>
            <option value="false">No consultores</option>
          </select>
          <Button type="submit">Filtrar</Button>
        </form>
      </div>

      <div className="rounded-[2rem] bg-white p-6 shadow-panel">
        {users.data.length === 0 ? (
          <p className="text-sm text-[hsl(var(--foreground))/0.72]">
            No se encontraron usuarios con los filtros aplicados.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-[hsl(var(--border))] text-left text-[hsl(var(--foreground))/0.6]">
                  <th className="px-3 py-3 font-semibold">Correo electrónico</th>
                  <th className="px-3 py-3 font-semibold">Rol</th>
                  <th className="px-3 py-3 font-semibold">Membresía</th>
                  <th className="px-3 py-3 font-semibold">Consultor</th>
                  <th className="px-3 py-3 font-semibold" />
                </tr>
              </thead>
              <tbody>
                {users.data.map((user) => (
                  <tr key={user.id} className="border-b border-[hsl(var(--border))/0.6]">
                    <td className="px-3 py-3 font-medium">{user.email}</td>
                    <td className="px-3 py-3">
                      <Badge>{user.role}</Badge>
                    </td>
                    <td className="px-3 py-3">
                      <MembershipTierBadge tier={user.current_membership} />
                    </td>
                    <td className="px-3 py-3">{user.is_consultant ? 'Sí' : 'No'}</td>
                    <td className="px-3 py-3 text-right">
                      <Link
                        href={`/perfil/usuarios/${user.id}`}
                        className="text-sm font-semibold text-[hsl(var(--primary))]"
                      >
                        Gestionar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between text-sm">
          <span className="text-[hsl(var(--foreground))/0.6]">
            Página {page} de {totalPages}
          </span>
          <div className="flex gap-2">
            {page > 1 ? (
              <Link
                href={buildPageHref(searchParams, page - 1)}
                className="rounded-full bg-[hsl(var(--secondary))] px-4 py-2 font-semibold"
              >
                Anterior
              </Link>
            ) : null}
            {page < totalPages ? (
              <Link
                href={buildPageHref(searchParams, page + 1)}
                className="rounded-full bg-[hsl(var(--secondary))] px-4 py-2 font-semibold"
              >
                Siguiente
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
