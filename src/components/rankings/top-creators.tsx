'use client'

import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useFilteredData } from '@/hooks/use-filtered-data'
import { formatNumber } from '@/lib/utils'
import { cn } from '@/lib/utils'

export function TopCreators() {
  const data = useFilteredData()

  const topCreators = useMemo(() => {
    const grouped: Record<string, number> = {}

    data.forEach((ad) => {
      if (ad.createur !== '—') {
        if (!grouped[ad.createur]) {
          grouped[ad.createur] = 0
        }
        grouped[ad.createur] += ad.conversions
      }
    })

    return Object.entries(grouped)
      .map(([name, conversions]) => ({ name, conversions }))
      .sort((a, b) => b.conversions - a.conversions)
      .slice(0, 5)
  }, [data])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Top 5 créateurs par conversions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topCreators.map((creator, index) => (
            <div
              key={creator.name}
              className="flex items-center gap-3 rounded-lg bg-gray-50 p-3"
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
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {creator.name}
                </p>
              </div>
              <Badge variant="default" className="shrink-0 bg-blue-100 text-blue-700">
                {formatNumber(creator.conversions)} conv.
              </Badge>
            </div>
          ))}
          {topCreators.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-4">
              Aucune donnée disponible
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
