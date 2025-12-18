'use client'

import { FilterSelect } from '@/components/filters/filter-select'
import { SearchInput } from '@/components/filters/search-input'
import { CreaTable } from '@/components/tables/crea-table'
import { useDataStore } from '@/store/use-data-store'
import { Button } from '@/components/ui/button'
import { RotateCcw } from 'lucide-react'

export default function CreaPage() {
  const getUniqueProduits = useDataStore((state) => state.getUniqueProduits)
  const getUniqueMois = useDataStore((state) => state.getUniqueMois)
  const getUniqueStatuts = useDataStore((state) => state.getUniqueStatuts)
  const getUniqueCreateurs = useDataStore((state) => state.getUniqueCreateurs)
  const getUniqueTypesContenu = useDataStore((state) => state.getUniqueTypesContenu)
  const resetFilters = useDataStore((state) => state.resetFilters)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Créas</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Explorez et analysez toutes vos publicités
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <FilterSelect
          filterKey="produit"
          placeholder="Produit"
          options={getUniqueProduits()}
          allLabel="Tous les produits"
        />
        <FilterSelect
          filterKey="createur"
          placeholder="Créateur"
          options={getUniqueCreateurs()}
          allLabel="Tous les créateurs"
        />
        <FilterSelect
          filterKey="typeContenu"
          placeholder="Type de contenu"
          options={getUniqueTypesContenu()}
          allLabel="Tous les types"
        />
        <FilterSelect
          filterKey="mois"
          placeholder="Mois"
          options={getUniqueMois()}
          allLabel="Tous les mois"
        />
        <FilterSelect
          filterKey="statut"
          placeholder="Statut"
          options={getUniqueStatuts()}
          allLabel="Tous les statuts"
        />
        <SearchInput />
        <Button variant="outline" size="sm" onClick={resetFilters}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Réinitialiser
        </Button>
      </div>

      {/* Table */}
      <CreaTable />
    </div>
  )
}
