export interface TemplateMeta {
  id: string;
  nom: string;
  style: string; // description courte pour la galerie
  actif: boolean; // gérable depuis l'admin
  colonnes: 1 | 2;
  // Indique si le modèle met une photo en avant visuellement (utilisé pour
  // le filtre "Avec photo" de la galerie). Tous les modèles acceptent une
  // photo dans l'éditeur ; ce champ ne fait que refléter le style visuel.
  photo: boolean;
  // Catégorie éditoriale (choix de classement, pas une mesure) : aide à
  // s'orienter dans les 15 modèles. "ats" regroupe les mises en page une
  // colonne à structure simple, généralement plus sûres pour les logiciels
  // de tri automatique — voir la mise en garde dans AtsCriteriaGrid /
  // TemplateGallery : ce n'est pas une garantie de compatibilité avec un
  // ATS précis, chaque logiciel de recrutement se comporte différemment.
  categorie: "ats" | "corporate" | "moderne" | "specialise";
}

// Cette liste sera synchronisée avec Firestore (collection "templates") pour
// permettre l'activation/désactivation depuis l'admin. Valeurs par défaut ci-dessous.
export const TEMPLATE_LIST: TemplateMeta[] = [
  { id: "template-01", nom: "Classique Élégant", style: "Sobre, une colonne, idéal finance/droit", actif: true, colonnes: 1, photo: false, categorie: "ats" },
  { id: "template-02", nom: "Moderne Bicolore", style: "Deux colonnes, bandeau latéral coloré", actif: true, colonnes: 2, photo: true, categorie: "moderne" },
  { id: "template-03", nom: "Minimaliste", style: "Beaucoup de blanc, typographie fine", actif: true, colonnes: 1, photo: false, categorie: "ats" },
  { id: "template-04", nom: "Corporate", style: "Deux colonnes, style cabinet de conseil", actif: true, colonnes: 2, photo: false, categorie: "corporate" },
  { id: "template-05", nom: "Créatif Accent", style: "Une colonne, touches de couleur audacieuses", actif: true, colonnes: 1, photo: true, categorie: "moderne" },
  { id: "template-06", nom: "Ingénieur Tech", style: "Deux colonnes, focus compétences techniques", actif: true, colonnes: 2, photo: false, categorie: "specialise" },
  { id: "template-07", nom: "Exécutif Premium", style: "Une colonne, style haut de gamme", actif: true, colonnes: 1, photo: false, categorie: "corporate" },
  { id: "template-08", nom: "Compact Data", style: "Deux colonnes, dense et organisé", actif: true, colonnes: 2, photo: false, categorie: "specialise" },
  { id: "template-09", nom: "Académique", style: "Une colonne, orienté recherche/enseignement", actif: true, colonnes: 1, photo: false, categorie: "ats" },
  { id: "template-10", nom: "Sidebar Clair", style: "Deux colonnes, bandeau latéral discret", actif: true, colonnes: 2, photo: true, categorie: "corporate" },
  { id: "template-11", nom: "Épuré Grille", style: "Une colonne, séparateurs fins", actif: true, colonnes: 1, photo: false, categorie: "ats" },
  { id: "template-12", nom: "International", style: "Deux colonnes, format anglo-saxon", actif: true, colonnes: 2, photo: false, categorie: "specialise" },
  { id: "template-13", nom: "Startup Dynamique", style: "Une colonne, moderne et vivant", actif: true, colonnes: 1, photo: true, categorie: "moderne" },
  { id: "template-14", nom: "Consultant", style: "Deux colonnes, structuré et formel", actif: true, colonnes: 2, photo: false, categorie: "corporate" },
  { id: "template-15", nom: "Photo Focus", style: "Une colonne, photo mise en avant", actif: true, colonnes: 1, photo: true, categorie: "specialise" },
];

export const CATEGORIES: Record<TemplateMeta["categorie"], { label: string; description: string }> = {
  ats: {
    label: "Structure simple",
    description: "Une colonne, mise en page sobre — pensée pour rester lisible par les logiciels de tri.",
  },
  corporate: {
    label: "Corporate",
    description: "Formel et structuré, adapté aux secteurs classiques (conseil, finance, administration).",
  },
  moderne: {
    label: "Moderne",
    description: "Couleurs et mise en page plus visuelles, pour se démarquer.",
  },
  specialise: {
    label: "Spécialisé",
    description: "Orienté technique, international ou mise en avant de la photo.",
  },
};

// Suggestions éditoriales (choix de style, pas une mesure) selon le profil
// choisi dans le sélecteur de la landing page. Chaque profil renvoie vers 3
// modèles existants et actifs.
export const PROFILE_SUGGESTIONS: Record<string, { label: string; emoji: string; templateIds: string[] }> = {
  etudiant: { label: "Étudiant / jeune diplômé", emoji: "🎓", templateIds: ["template-13", "template-03", "template-11"] },
  professionnel: { label: "Professionnel", emoji: "💼", templateIds: ["template-01", "template-04", "template-10"] },
  cadre: { label: "Cadre / manager", emoji: "👔", templateIds: ["template-07", "template-14", "template-04"] },
  ingenieur: { label: "Ingénieur / IT", emoji: "💻", templateIds: ["template-06", "template-08", "template-11"] },
  finance: { label: "Finance / comptabilité", emoji: "📊", templateIds: ["template-01", "template-14", "template-04"] },
  marketing: { label: "Marketing / communication", emoji: "📣", templateIds: ["template-05", "template-13", "template-02"] },
  administration: { label: "Administration", emoji: "🏛️", templateIds: ["template-01", "template-09", "template-10"] },
  international: { label: "Candidature internationale", emoji: "🌍", templateIds: ["template-12", "template-07", "template-14"] },
};
