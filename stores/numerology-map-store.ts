'use client'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type CalculatedSnapshot = {
  fullName: string
  birthDate: string
}

type NumerologyMapState = {
  fullName: string
  birthDate: string
  // Copia de los datos al momento de pulsar "Calcular". Mientras exista, las
  // cards del home y /calculatupinaculo se muestran como calculadas.
  calculated: CalculatedSnapshot | null
  setField: (field: 'fullName' | 'birthDate', value: string) => void
  calculate: () => void
  clear: () => void
}

// Persistencia por sesión del formulario "Mi Mapa Numerológico" del home:
// los datos sobreviven la navegación entre páginas, pero no al cerrar pestaña.
export const useNumerologyMapStore = create<NumerologyMapState>()(
  persist(
    (set, get) => ({
      fullName: '',
      birthDate: '',
      calculated: null,
      setField: (field, value) => set({ [field]: value }),
      calculate: () => {
        const { fullName, birthDate } = get()
        if (!fullName.trim() || !birthDate.trim()) return
        set({ calculated: { fullName, birthDate } })
      },
      clear: () => set({ fullName: '', birthDate: '', calculated: null })
    }),
    {
      name: 'nume_mapa_numerologico',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
