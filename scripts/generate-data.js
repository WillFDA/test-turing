const fs = require('fs');
const path = require('path');

const PRODUITS = [
  'AG1 Powder',
  'AG1 Travel Packs',
  'Vitamine D3+K2',
  'Omega-3',
  'Shaker',
  'Bundle Complet',
  'Abonnement',
];

const CREATEURS = [
  'Emma_Health',
  'Lucas_Active',
  'Sophia_Wellness',
  'Marcus_Fit',
  'Olivia_Green',
  'Ethan_Fuel',
  'Mia_Mindful',
  'Jake_Strong',
  'Lily_Nutrition',
  'Noah_Vitality',
  'Ava_Balance',
  'Ben_Recovery',
  'Chloe_Clean',
  'Zoe_Energy',
  'Max_Performance',
  'Chris_Endurance',
  '—',
];

const TYPES_CONTENU = ['UGC', 'Podcast', 'Image statique', 'Motion/Vidéo', 'Témoignage'];

const MOIS = ['Juillet 2025', 'Août 2025', 'Septembre 2025', 'Octobre 2025', 'Novembre 2025'];

const STATUTS = ['En ligne', 'Arrêtée', 'En pause', 'Archivée'];

const ANGLES_MARKETING = [
  'Énergie quotidienne',
  'Santé digestive',
  'Immunité renforcée',
  'Performance sportive',
  'Bien-être général',
  'Nutrition optimale',
  'Anti-fatigue',
  'Concentration mentale',
];

const HOOKS = [
  "Je ne peux plus m'en passer",
  'Le matin parfait commence par...',
  '30 jours de transformation',
  "Les 3 raisons pour lesquelles j'adore",
  'Ce que je prends chaque matin',
  'Mon secret énergie révélé',
  "Pourquoi j'ai changé d'avis sur les compléments",
  "Le seul complément dont j'ai besoin",
];

const AUDIENCES = [
  '25-34 ans Fitness',
  '35-44 ans Santé',
  '18-24 ans Étudiants',
  '45-54 ans Wellness',
  'Broad FR',
  'LAL Purchasers',
  'Retargeting 30j',
  'Intérêt Nutrition',
];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
  return Math.floor(randomBetween(min, max + 1));
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRow(index) {
  const produit = randomChoice(PRODUITS);
  const createur = randomChoice(CREATEURS);
  const typeContenu = randomChoice(TYPES_CONTENU);
  const mois = randomChoice(MOIS);
  const statut = randomChoice(STATUTS);
  const angleMarketing = randomChoice(ANGLES_MARKETING);
  const hook = randomChoice(HOOKS);
  const audience = randomChoice(AUDIENCES);

  const budgetDepense = randomBetween(100, 5000);
  const impressions = randomInt(10000, 500000);
  const personnesTouchees = Math.floor(impressions * randomBetween(0.6, 0.9));
  const frequence = parseFloat((impressions / personnesTouchees).toFixed(2));
  const clics = randomInt(50, impressions * 0.05);
  const tauxClic = parseFloat(((clics / impressions) * 100).toFixed(2));
  const conversions = randomInt(0, Math.floor(clics * 0.15));
  const coutParClic = parseFloat((budgetDepense / clics).toFixed(2));
  const coutParConversion = conversions > 0 ? parseFloat((budgetDepense / conversions).toFixed(2)) : 0;
  const panierMoyen = randomBetween(60, 150);
  const revenuEstime = parseFloat((conversions * panierMoyen).toFixed(2));
  const roas = budgetDepense > 0 ? parseFloat((revenuEstime / budgetDepense).toFixed(2)) : 0;
  const cpm = parseFloat(((budgetDepense / impressions) * 1000).toFixed(2));
  const tauxConversion = clics > 0 ? parseFloat(((conversions / clics) * 100).toFixed(2)) : 0;
  const hookRate = parseFloat(randomBetween(15, 60).toFixed(2));

  const moisIndex = MOIS.indexOf(mois);
  const monthNum = 7 + moisIndex;
  const day = randomInt(1, 28);
  const dateLancement = `2025-${monthNum.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  const nomAnnonce = `${produit} - ${typeContenu} - ${hook.slice(0, 30)}... - ${index}`;
  const nomAdSet = `${audience} - ${produit}`;
  const nomCampagne = `Campagne ${produit} ${mois}`;
  const idAdSet = `as_${randomInt(100000, 999999)}`;
  const idAnnonce = `ad_${randomInt(100000, 999999)}`;
  const lienApercu = `https://www.facebook.com/ads/library/?id=${idAnnonce}`;

  return [
    nomAnnonce,
    produit,
    createur,
    typeContenu,
    angleMarketing,
    hook,
    audience,
    mois,
    nomAdSet,
    nomCampagne,
    statut,
    dateLancement,
    personnesTouchees,
    impressions,
    frequence,
    clics,
    conversions,
    budgetDepense.toFixed(2),
    revenuEstime.toFixed(2),
    roas,
    cpm,
    coutParClic,
    tauxClic,
    coutParConversion,
    tauxConversion,
    hookRate,
    panierMoyen.toFixed(2),
    lienApercu,
    idAdSet,
    idAnnonce,
  ];
}

const headers = [
  "Nom de l'annonce",
  'Produit',
  'Créateur',
  'Type de contenu',
  'Angle marketing',
  'Hook',
  'Audience',
  'Mois',
  'Nom Ad Set',
  'Nom Campagne',
  'Statut',
  'Date de lancement',
  'Personnes touchées',
  'Impressions',
  'Fréquence',
  'Clics',
  'Conversions (achats)',
  'Budget dépensé (€)',
  'Revenu estimé (€)',
  'ROAS',
  'CPM (€)',
  'Coût par clic (€)',
  'Taux de clic (%)',
  'Coût par conversion (€)',
  'Taux de conversion (%)',
  'Hook rate (%)',
  'Panier moyen (€)',
  'Lien aperçu',
  'ID Ad Set',
  'ID Annonce',
];

const rows = [headers];
for (let i = 1; i <= 1268; i++) {
  rows.push(generateRow(i));
}

const csvContent = rows.map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');

const outputPath = path.join(__dirname, '..', 'public', 'data', 'AG1-Data.csv');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, csvContent, 'utf8');

console.log(`CSV file generated with ${rows.length - 1} rows at ${outputPath}`);
