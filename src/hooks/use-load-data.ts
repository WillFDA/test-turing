'use client'

import { useEffect } from 'react'
import Papa from 'papaparse'
import { useDataStore } from '@/store/use-data-store'
import { Ad, Statut } from '@/lib/types'

export function useLoadData() {
  const setData = useDataStore((state) => state.setData)
  const setLoading = useDataStore((state) => state.setLoading)
  const setError = useDataStore((state) => state.setError)
  const data = useDataStore((state) => state.data)

  useEffect(() => {
    if (data.length > 0) return

    async function loadCSV() {
      try {
        setLoading(true)
        const response = await fetch('/data/AG1-Data.csv')
        const csvText = await response.text()

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const ads: Ad[] = (results.data as Record<string, string>[]).map((row, index) => ({
              id: index,
              nomAnnonce: row['Nom de l\'annonce'] || '',
              produit: row['Produit'] || '',
              createur: row['Créateur'] || '',
              typeContenu: row['Type de contenu'] || '',
              angleMarketing: row['Angle marketing'] || '',
              hook: row['Hook'] || '',
              audience: row['Audience'] || '',
              mois: row['Mois'] || '',
              nomAdSet: row['Nom Ad Set'] || '',
              nomCampagne: row['Nom Campagne'] || '',
              statut: (row['Statut'] || 'Arrêtée') as Statut,
              dateLancement: row['Date de lancement'] || '',
              personnesTouchees: parseFloat(row['Personnes touchées']) || 0,
              impressions: parseFloat(row['Impressions']) || 0,
              frequence: parseFloat(row['Fréquence']) || 0,
              clics: parseFloat(row['Clics']) || 0,
              conversions: parseFloat(row['Conversions (achats)']) || 0,
              budgetDepense: parseFloat(row['Budget dépensé (€)']) || 0,
              revenuEstime: parseFloat(row['Revenu estimé (€)']) || 0,
              roas: parseFloat(row['ROAS']) || 0,
              cpm: parseFloat(row['CPM (€)']) || 0,
              coutParClic: parseFloat(row['Coût par clic (€)']) || 0,
              tauxClic: parseFloat(row['Taux de clic (%)']) || 0,
              coutParConversion: parseFloat(row['Coût par conversion (€)']) || 0,
              tauxConversion: parseFloat(row['Taux de conversion (%)']) || 0,
              hookRate: parseFloat(row['Hook rate (%)']) || 0,
              panierMoyen: parseFloat(row['Panier moyen (€)']) || 0,
              lienApercu: row['Lien aperçu'] || '',
              idAdSet: row['ID Ad Set'] || '',
              idAnnonce: row['ID Annonce'] || '',
            }))
            setData(ads)
          },
          error: (error: Error) => {
            setError(error.message)
          },
        })
      } catch {
        setError('Erreur lors du chargement des données')
      }
    }

    loadCSV()
  }, [setData, setLoading, setError, data.length])
}
