'use client'

import { useMemo } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDataStore } from '@/store/use-data-store'
import { formatCurrency } from '@/lib/utils'
import { PRODUIT_COLORS } from '@/lib/types'

export function BudgetByProductChart() {
  const allData = useDataStore((state) => state.data)
  const selectedProduit = useDataStore((state) => state.filters.produit)

  const chartData = useMemo(() => {
    const grouped: Record<string, number> = {}
    let total = 0

    allData.forEach((ad) => {
      if (!grouped[ad.produit]) {
        grouped[ad.produit] = 0
      }
      grouped[ad.produit] += ad.budgetDepense
      total += ad.budgetDepense
    })

    // Si un produit est sélectionné, montrer produit vs reste
    if (selectedProduit) {
      const selectedBudget = grouped[selectedProduit] || 0
      const restBudget = total - selectedBudget

      return [
        {
          name: selectedProduit,
          value: selectedBudget,
          percentage: total > 0 ? ((selectedBudget / total) * 100).toFixed(1) : '0',
          color: PRODUIT_COLORS[selectedProduit] || '#6B7280',
        },
        {
          name: 'Autres produits',
          value: restBudget,
          percentage: total > 0 ? ((restBudget / total) * 100).toFixed(1) : '0',
          color: '#D1D5DB',
        },
      ].filter((d) => d.value > 0)
    }

    // Sinon, montrer tous les produits
    return Object.entries(grouped)
      .map(([name, value]) => ({
        name,
        value,
        percentage: total > 0 ? ((value / total) * 100).toFixed(1) : '0',
        color: PRODUIT_COLORS[name] || '#6B7280',
      }))
      .sort((a, b) => b.value - a.value)
  }, [allData, selectedProduit])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Budget par produit</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="rounded-lg border bg-white p-3 shadow-lg">
                        <p className="font-medium">{data.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Budget: <span className="font-semibold">{formatCurrency(data.value)}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Part: <span className="font-semibold">{data.percentage}%</span>
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                formatter={(value, entry) => {
                  const data = chartData.find((d) => d.name === value)
                  return (
                    <span className="text-sm text-gray-600">
                      {value} ({data?.percentage}%)
                    </span>
                  )
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
