import type {
  ApiListResponse,
  Role,
  SafeUser
} from '@/lib/api/contracts'
import { serverApiFetch } from '@/lib/api/server'

export type GetUsersParams = {
  page?: number
  limit?: number
  role?: Role
  is_consultant?: boolean
  search?: string
}

export type UserResponse = {
  user: SafeUser
}

function toQueryString(params: Record<string, string | number | boolean | undefined>): string {
  const query = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      query.set(key, String(value))
    }
  })

  return query.toString()
}

export async function getUsers(params: GetUsersParams): Promise<ApiListResponse<SafeUser>> {
  const query = toQueryString(params)
  return serverApiFetch<ApiListResponse<SafeUser>>(`/users${query ? `?${query}` : ''}`)
}

export async function getUserById(id: string): Promise<UserResponse> {
  return serverApiFetch<UserResponse>(`/users/${id}`)
}
