'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useDataStore } from '@/store/use-data-store'

export function SearchInput() {
  const search = useDataStore((state) => state.filters.search)
  const setFilter = useDataStore((state) => state.setFilter)

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Rechercher une annonce..."
        value={search}
        onChange={(e) => setFilter('search', e.target.value)}
        className="w-[250px] bg-white pl-9"
      />
    </div>
  )
}
