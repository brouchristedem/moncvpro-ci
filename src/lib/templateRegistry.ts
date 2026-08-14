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
}

// Cette liste sera synchronisée avec Firestore (collection "templates") pour
// permettre l'activation/désactivation depuis l'admin. Valeurs par défaut ci-dessous.
export const TEMPLATE_LIST: TemplateMeta[] = [
  { id: "template-01", nom: "Classique Élégant", style: "Sobre, une colonne, idéal finance/droit", actif: true, colonnes: 1, photo: false },
  { id: "template-02", nom: "Moderne Bicolore", style: "Deux colonnes, bandeau latéral coloré", actif: true, colonnes: 2, photo: true },
  { id: "template-03", nom: "Minimaliste", style: "Beaucoup de blanc, typographie fine", actif: true, colonnes: 1, photo: false },
  { id: "template-04", nom: "Corporate", style: "Deux colonnes, style cabinet de conseil", actif: true, colonnes: 2, photo: false },
  { id: "template-05", nom: "Créatif Accent", style: "Une colonne, touches de couleur audacieuses", actif: true, colonnes: 1, photo: true },
  { id: "template-06", nom: "Ingénieur Tech", style: "Deux colonnes, focus compétences techniques", actif: true, colonnes: 2, photo: false },
  { id: "template-07", nom: "Exécutif Premium", style: "Une colonne, style haut de gamme", actif: true, colonnes: 1, photo: false },
  { id: "template-08", nom: "Compact Data", style: "Deux colonnes, dense et organisé", actif: true, colonnes: 2, photo: false },
  { id: "template-09", nom: "Académique", style: "Une colonne, orienté recherche/enseignement", actif: true, colonnes: 1, photo: false },
  { id: "template-10", nom: "Sidebar Clair", style: "Deux colonnes, bandeau latéral discret", actif: true, colonnes: 2, photo: true },
  { id: "template-11", nom: "Épuré Grille", style: "Une colonne, séparateurs fins", actif: true, colonnes: 1, photo: false },
  { id: "template-12", nom: "International", style: "Deux colonnes, format anglo-saxon", actif: true, colonnes: 2, photo: false },
  { id: "template-13", nom: "Startup Dynamique", style: "Une colonne, moderne et vivant", actif: true, colonnes: 1, photo: true },
  { id: "template-14", nom: "Consultant", style: "Deux colonnes, structuré et formel", actif: true, colonnes: 2, photo: false },
  { id: "template-15", nom: "Photo Focus", style: "Une colonne, photo mise en avant", actif: true, colonnes: 1, photo: true },
];
