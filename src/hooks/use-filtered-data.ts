'use client'

import { useMemo } from 'react'
import { useDataStore } from '@/store/use-data-store'

export function useFilteredData() {
  const data = useDataStore((state) => state.data)
  const filters = useDataStore((state) => state.filters)

  return useMemo(() => {
    return data.filter((ad) => {
      if (filters.produit && ad.produit !== filters.produit) return false
      if (filters.mois && ad.mois !== filters.mois) return false
      if (filters.statut && ad.statut !== filters.statut) return false
      if (filters.createur && ad.createur !== filters.createur) return false
      if (filters.typeContenu && ad.typeContenu !== filters.typeContenu) return false
      if (
        filters.search &&
        !ad.nomAnnonce.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false
      return true
    })
  }, [data, filters])
}
