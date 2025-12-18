'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useDataStore, Filters } from '@/store/use-data-store'

interface FilterSelectProps {
  filterKey: keyof Omit<Filters, 'search'>
  placeholder: string
  options: string[]
  allLabel?: string
}

export function FilterSelect({
  filterKey,
  placeholder,
  options,
  allLabel = 'Tous',
}: FilterSelectProps) {
  const value = useDataStore((state) => state.filters[filterKey] as string | null)
  const setFilter = useDataStore((state) => state.setFilter)

  return (
    <Select
      value={value || 'all'}
      onValueChange={(val) => setFilter(filterKey, val === 'all' ? null : val)}
    >
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{allLabel}</SelectItem>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
