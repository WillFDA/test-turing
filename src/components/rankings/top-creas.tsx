'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useFilteredData } from '@/hooks/use-filtered-data'
import { formatDecimal } from '@/lib/utils'
import { cn } from '@/lib/utils'

export function TopCreas() {
  const data = useFilteredData()

  const topCreas = useMemo(() => {
    return [...data]
      .sort((a, b) => b.roas - a.roas)
      .slice(0, 5)
  }, [data])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Top 5 créas par ROAS</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topCreas.map((crea, index) => (
            <Link
              href={`/crea/${crea.id}`}
              key={crea.id}
              className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100"
            >
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold',
                  index === 0
                    ? 'bg-yellow-100 text-yellow-700'
                    : index === 1
                    ? 'bg-gray-200 text-gray-700'
                    : index === 2
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-gray-100 text-gray-600'
                )}
              >
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {crea.nomAnnonce}
                </p>
                <p className="text-xs text-muted-foreground">{crea.produit}</p>
              </div>
              <Badge variant="success" className="shrink-0">
                {formatDecimal(crea.roas, 2)}
              </Badge>
            </Link>
          ))}
          {topCreas.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-4">
              Aucune donnée disponible
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
