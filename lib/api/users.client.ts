import type {
  AuthSession,
  RegisterInput,
  SafeUser,
  UpdateUserInput
} from '@/lib/api/contracts'
import { clientApiFetch } from '@/lib/api/client'

export type UserResponse = {
  user: SafeUser
}

export async function createUser(payload: RegisterInput): Promise<AuthSession> {
  return clientApiFetch<AuthSession>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export async function updateUser(id: string, payload: UpdateUserInput): Promise<UserResponse> {
  return clientApiFetch<UserResponse>(`/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload)
  })
}

export async function deleteUser(id: string): Promise<void> {
  await clientApiFetch<void>(`/users/${id}`, {
    method: 'DELETE'
  })
}
