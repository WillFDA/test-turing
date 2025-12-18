'use client'

import { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Target,
  Banknote,
  Eye,
  MousePointer,
  Percent,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { KpiCard } from '@/components/kpi-card'
import { useDataStore } from '@/store/use-data-store'
import { formatCurrency, formatDecimal, formatNumber, formatPercent, cn } from '@/lib/utils'
import { STATUT_COLORS, Statut } from '@/lib/types'

interface CreaDetailPageProps {
  params: Promise<{ id: string }>
}

export default function CreaDetailPage({ params }: CreaDetailPageProps) {
  const resolvedParams = use(params)
  const data = useDataStore((state) => state.data)
  const ad = data.find((d) => d.id === parseInt(resolvedParams.id))

  if (!ad && data.length > 0) {
    notFound()
  }

  if (!ad) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    )
  }

  const statutColors = STATUT_COLORS[ad.statut as Statut] || STATUT_COLORS['Arrêtée']

  return (
    <div className="p-8">
      {/* Breadcrumb and back button */}
      <div className="mb-6">
        <Link href="/crea">
          <Button variant="ghost" size="sm" className="-ml-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux créas
          </Button>
        </Link>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/overview" className="hover:text-foreground">
            Overview
          </Link>
          <span>/</span>
          <Link href="/crea" className="hover:text-foreground">
            Créas
          </Link>
          <span>/</span>
          <span className="text-foreground">{ad.nomAnnonce}</span>
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">{ad.nomAnnonce}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {ad.produit} • {ad.createur === '—' ? 'Créa interne' : ad.createur}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Budget dépensé"
          value={formatCurrency(ad.budgetDepense)}
          icon={DollarSign}
        />
        <KpiCard
          title="Conversions"
          value={formatNumber(ad.conversions)}
          icon={ShoppingCart}
        />
        <KpiCard
          title="ROAS"
          value={formatDecimal(ad.roas, 2)}
          icon={TrendingUp}
          valueClassName={ad.roas >= 1 ? 'text-green-600' : 'text-red-600'}
        />
        <KpiCard
          title="Coût par conversion"
          value={formatCurrency(ad.coutParConversion)}
          icon={Target}
        />
        <KpiCard
          title="Revenu estimé"
          value={formatCurrency(ad.revenuEstime)}
          icon={Banknote}
        />
        <KpiCard
          title="Impressions"
          value={formatNumber(ad.impressions)}
          icon={Eye}
        />
        <KpiCard
          title="Clics"
          value={formatNumber(ad.clics)}
          icon={MousePointer}
        />
        <KpiCard
          title="Taux de clic"
          value={formatPercent(ad.tauxClic)}
          icon={Percent}
        />
      </div>

      {/* Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Informations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Type de contenu</p>
              <p className="mt-1 text-sm">{ad.typeContenu}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Angle marketing</p>
              <p className="mt-1 text-sm">{ad.angleMarketing}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Hook</p>
              <p className="mt-1 text-sm">{ad.hook}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Audience</p>
              <p className="mt-1 text-sm">{ad.audience}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Mois</p>
              <p className="mt-1 text-sm">{ad.mois}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Statut</p>
              <div className="mt-1">
                <Badge className={cn(statutColors.bg, statutColors.text)}>
                  {ad.statut}
                </Badge>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Date de lancement</p>
              <p className="mt-1 text-sm">{ad.dateLancement}</p>
            </div>
            <div className="sm:col-span-2 lg:col-span-2">
              <p className="text-sm font-medium text-muted-foreground">Campagne</p>
              <p className="mt-1 text-sm">{ad.nomCampagne}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional metrics */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Métriques additionnelles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Personnes touchées</p>
              <p className="mt-1 text-lg font-semibold">{formatNumber(ad.personnesTouchees)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Fréquence</p>
              <p className="mt-1 text-lg font-semibold">{formatDecimal(ad.frequence, 2)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">CPM</p>
              <p className="mt-1 text-lg font-semibold">{formatCurrency(ad.cpm)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Coût par clic</p>
              <p className="mt-1 text-lg font-semibold">{formatCurrency(ad.coutParClic)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Taux de conversion</p>
              <p className="mt-1 text-lg font-semibold">{formatPercent(ad.tauxConversion)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Hook rate</p>
              <p className="mt-1 text-lg font-semibold">{formatPercent(ad.hookRate)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Panier moyen</p>
              <p className="mt-1 text-lg font-semibold">{formatCurrency(ad.panierMoyen)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Ad Set</p>
              <p className="mt-1 text-sm truncate">{ad.nomAdSet}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
