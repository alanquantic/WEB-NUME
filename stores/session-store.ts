'use client'

import { create } from 'zustand'

import type { SafeUser } from '@/lib/api/contracts'
import { ClientApiError, clientApiFetch } from '@/lib/api/client'

type SessionState = {
  user: SafeUser | null
  isHydrated: boolean
  isLoading: boolean
  setUser: (user: SafeUser | null) => void
  loadSession: () => Promise<void>
  clearSession: () => void
}

export const useSessionStore = create<SessionState>((set) => ({
  user: null,
  isHydrated: false,
  isLoading: false,
  setUser: (user) => set({ user, isHydrated: true }),
  clearSession: () => set({ user: null, isHydrated: true, isLoading: false }),
  loadSession: async () => {
    set({ isLoading: true })

    try {
      const user = await clientApiFetch<SafeUser>('/auth/me')
      set({ user, isHydrated: true, isLoading: false })
    } catch (error) {
      if (error instanceof ClientApiError && error.status === 401) {
        set({ user: null, isHydrated: true, isLoading: false })
      } else {
        set({ isHydrated: true, isLoading: false })
      }
    }
  }
}))

