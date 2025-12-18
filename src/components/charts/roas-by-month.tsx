'use client'

import { useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useFilteredData } from '@/hooks/use-filtered-data'
import { formatDecimal } from '@/lib/utils'

const MOIS_ORDER = [
  'Juillet 2025',
  'Août 2025',
  'Septembre 2025',
  'Octobre 2025',
  'Novembre 2025',
]

export function RoasByMonthChart() {
  const data = useFilteredData()

  const chartData = useMemo(() => {
    const grouped: Record<string, { total: number; count: number }> = {}

    data.forEach((ad) => {
      if (!grouped[ad.mois]) {
        grouped[ad.mois] = { total: 0, count: 0 }
      }
      grouped[ad.mois].total += ad.roas
      grouped[ad.mois].count += 1
    })

    return MOIS_ORDER.filter((mois) => grouped[mois]).map((mois) => ({
      mois: mois.split(' ')[0], // Just month name
      fullMois: mois,
      roas: grouped[mois].total / grouped[mois].count,
    }))
  }, [data])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">ROAS par mois</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis
                dataKey="mois"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickFormatter={(value) => formatDecimal(value, 1)}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-white p-3 shadow-lg">
                        <p className="font-medium">{payload[0].payload.fullMois}</p>
                        <p className="text-sm text-muted-foreground">
                          ROAS: <span className="font-semibold text-green-600">{formatDecimal(payload[0].value as number, 2)}</span>
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar
                dataKey="roas"
                fill="#10B981"
                radius={[6, 6, 0, 0]}
                maxBarSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
