'use client'

import { useMemo } from 'react'
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Target,
  Banknote,
  LayoutGrid,
} from 'lucide-react'
import { KpiCard } from '@/components/kpi-card'
import { FilterSelect } from '@/components/filters/filter-select'
import { RoasByMonthChart } from '@/components/charts/roas-by-month'
import { BudgetByProductChart } from '@/components/charts/budget-by-product'
import { TopCreas } from '@/components/rankings/top-creas'
import { TopCreators } from '@/components/rankings/top-creators'
import { useFilteredData } from '@/hooks/use-filtered-data'
import { useDataStore } from '@/store/use-data-store'
import { formatCurrency, formatDecimal, formatNumber } from '@/lib/utils'

export default function OverviewPage() {
  const data = useFilteredData()
  const getUniqueProduits = useDataStore((state) => state.getUniqueProduits)
  const getUniqueMois = useDataStore((state) => state.getUniqueMois)
  const getUniqueStatuts = useDataStore((state) => state.getUniqueStatuts)

  const kpis = useMemo(() => {
    const totalBudget = data.reduce((sum, ad) => sum + ad.budgetDepense, 0)
    const totalConversions = data.reduce((sum, ad) => sum + ad.conversions, 0)
    const avgRoas =
      data.length > 0
        ? data.reduce((sum, ad) => sum + ad.roas, 0) / data.length
        : 0
    const avgCoutConversion =
      data.length > 0
        ? data.reduce((sum, ad) => sum + ad.coutParConversion, 0) / data.length
        : 0
    const totalRevenu = data.reduce((sum, ad) => sum + ad.revenuEstime, 0)

    return {
      budgetDepense: formatCurrency(totalBudget),
      conversions: formatNumber(totalConversions),
      roasMoyen: formatDecimal(avgRoas, 2),
      coutParConversion: formatCurrency(avgCoutConversion),
      revenuTotal: formatCurrency(totalRevenu),
      nombreCreas: formatNumber(data.length),
    }
  }, [data])

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Vue d&apos;ensemble de vos performances publicitaires
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-4">
        <FilterSelect
          filterKey="produit"
          placeholder="Produit"
          options={getUniqueProduits()}
          allLabel="Tous les produits"
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
      </div>

      {/* KPI Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard
          title="Budget dépensé"
          value={kpis.budgetDepense}
          icon={DollarSign}
        />
        <KpiCard
          title="Conversions"
          value={kpis.conversions}
          icon={ShoppingCart}
        />
        <KpiCard
          title="ROAS moyen"
          value={kpis.roasMoyen}
          icon={TrendingUp}
        />
        <KpiCard
          title="Coût par conversion"
          value={kpis.coutParConversion}
          icon={Target}
        />
        <KpiCard
          title="Revenu total"
          value={kpis.revenuTotal}
          icon={Banknote}
        />
        <KpiCard
          title="Nombre de créas"
          value={kpis.nombreCreas}
          icon={LayoutGrid}
        />
      </div>

      {/* Charts */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <RoasByMonthChart />
        <BudgetByProductChart />
      </div>

      {/* Rankings */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TopCreas />
        <TopCreators />
      </div>
    </div>
  )
}
