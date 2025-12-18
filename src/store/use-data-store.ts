'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Ad } from '@/lib/types'

export interface Filters {
  produit: string | null
  mois: string | null
  statut: string | null
  createur: string | null
  typeContenu: string | null
  search: string
}

interface DataStore {
  data: Ad[]
  isLoading: boolean
  error: string | null
  filters: Filters
  setData: (data: Ad[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void
  resetFilters: () => void
  getUniqueProduits: () => string[]
  getUniqueMois: () => string[]
  getUniqueStatuts: () => string[]
  getUniqueCreateurs: () => string[]
  getUniqueTypesContenu: () => string[]
}

const initialFilters: Filters = {
  produit: null,
  mois: null,
  statut: null,
  createur: null,
  typeContenu: null,
  search: '',
}

const MOIS_ORDER = ['Juillet 2025', 'Août 2025', 'Septembre 2025', 'Octobre 2025', 'Novembre 2025']

export const useDataStore = create<DataStore>()(
  persist(
    (set, get) => ({
      data: [],
      isLoading: true,
      error: null,
      filters: initialFilters,

      setData: (data) => set({ data, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error, isLoading: false }),

      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),

      resetFilters: () => set({ filters: initialFilters }),

      getUniqueProduits: () => {
        const data = get().data
        return [...new Set(data.map((d) => d.produit))].sort()
      },

      getUniqueMois: () => {
        const data = get().data
        const unique = [...new Set(data.map((d) => d.mois))]
        return unique.sort((a, b) => MOIS_ORDER.indexOf(a) - MOIS_ORDER.indexOf(b))
      },

      getUniqueStatuts: () => {
        const data = get().data
        return [...new Set(data.map((d) => d.statut))].sort()
      },

      getUniqueCreateurs: () => {
        const data = get().data
        return [...new Set(data.map((d) => d.createur))]
          .filter((c) => c !== '—')
          .sort()
      },

      getUniqueTypesContenu: () => {
        const data = get().data
        return [...new Set(data.map((d) => d.typeContenu))].sort()
      },
    }),
    {
      name: 'ag1-dashboard-storage',
      partialize: (state) => ({ filters: state.filters }),
    }
  )
)
