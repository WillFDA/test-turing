export interface Ad {
  id: number;
  nomAnnonce: string;
  produit: string;
  createur: string;
  typeContenu: string;
  angleMarketing: string;
  hook: string;
  audience: string;
  mois: string;
  nomAdSet: string;
  nomCampagne: string;
  statut: Statut;
  dateLancement: string;
  personnesTouchees: number;
  impressions: number;
  frequence: number;
  clics: number;
  conversions: number;
  budgetDepense: number;
  revenuEstime: number;
  roas: number;
  cpm: number;
  coutParClic: number;
  tauxClic: number;
  coutParConversion: number;
  tauxConversion: number;
  hookRate: number;
  panierMoyen: number;
  lienApercu: string;
  idAdSet: string;
  idAnnonce: string;
}

export type Statut = 'En ligne' | 'Arrêtée' | 'En pause' | 'Archivée';

export type TypeContenu = 'UGC' | 'Podcast' | 'Image statique' | 'Motion/Vidéo' | 'Témoignage';

export const STATUT_COLORS: Record<Statut, { bg: string; text: string }> = {
  'En ligne': { bg: 'bg-green-100', text: 'text-green-700' },
  'En pause': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  'Arrêtée': { bg: 'bg-gray-100', text: 'text-gray-700' },
  'Archivée': { bg: 'bg-red-100', text: 'text-red-700' },
};

export const PRODUIT_COLORS: Record<string, string> = {
  'AG1 Powder': '#10B981',
  'AG1 Travel Packs': '#3B82F6',
  'Vitamine D3+K2': '#F59E0B',
  'Omega-3': '#8B5CF6',
  'Shaker': '#EC4899',
  'Bundle Complet': '#06B6D4',
  'Abonnement': '#84CC16',
};
