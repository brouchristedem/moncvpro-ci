"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Réponses vérifiées sur le fonctionnement réel du produit (voir DownloadPanel.tsx
// / AuthContext.tsx) plutôt que des réponses génériques. Point important :
// incrementDownloads() remet paidUnlocked à false juste après le téléchargement
// (voir AuthContext.tsx) — chaque téléchargement est donc un paiement séparé,
// que ce soit pour retélécharger le même CV ou après une modification. Il n'y a
// pas d'accès illimité après un seul paiement. Un compte gère un CV à la fois
// (pas de multi-CV pour l'instant), mais la modification dans l'éditeur reste
// gratuite — seul l'export PDF est payant, à chaque fois.
const FAQ = [
  {
    q: "Est-ce vraiment gratuit ?",
    a: "Oui. Vous pouvez créer votre CV et voir un aperçu complet (avec un filigrane) sans rien payer. Le paiement n'intervient qu'au moment de télécharger le PDF final.",
  },
  {
    q: "Combien coûte le téléchargement ?",
    a: "1 000 FCFA pour le CV seul, ou 1 500 FCFA pour le Pack Candidature Complète (CV + lettre de motivation assortie), à chaque téléchargement.",
  },
  {
    q: "Comment payer ?",
    a: "Par Wave, directement depuis votre téléphone. Aucune carte bancaire n'est nécessaire.",
  },
  {
    q: "Puis-je changer de modèle en cours de route ?",
    a: "Oui, à tout moment dans l'éditeur : vos informations restent, seule la mise en page change. C'est gratuit tant que vous ne téléchargez pas le PDF.",
  },
  {
    q: "Puis-je modifier mon CV après l'avoir téléchargé ?",
    a: "Oui, l'éditeur reste accessible et la modification en elle-même est gratuite. En revanche, chaque téléchargement du PDF est un paiement séparé : que ce soit pour retélécharger le même CV ou pour récupérer une version modifiée, il faut repayer 1 000 FCFA (ou 1 500 FCFA pour le Pack) à chaque fois.",
  },
  {
    q: "Mes modèles sont-ils compatibles avec les logiciels de tri (ATS) ?",
    a: "Les modèles classés \"Structure simple\" (une colonne, mise en page sobre) suivent les recommandations générales pour rester lisibles par ces logiciels. Les modèles à deux colonnes sont plus visuels, mais peuvent être moins bien interprétés selon le logiciel utilisé par le recruteur — il n'existe pas de garantie universelle, chaque ATS fonctionne différemment. Un score de compatibilité vous guide dans l'éditeur, quel que soit le modèle choisi.",
  },
  {
    q: "Puis-je créer plusieurs CV avec un seul compte ?",
    a: "Pour l'instant, un compte gère un CV à la fois : vous pouvez le modifier librement, mais pas garder plusieurs versions séparées en parallèle.",
  },
  {
    q: "Comment obtenir une lettre de motivation ?",
    a: "En activant le Pack Candidature Complète dans l'éditeur : vous obtenez votre CV et une lettre de motivation au même style, dans un seul PDF, pour 1 500 FCFA.",
  },
  {
    q: "Mes données sont-elles en sécurité ?",
    a: "Vos informations ne sont ni vendues ni partagées à des fins commerciales, et servent uniquement à générer votre CV. Vous pouvez demander leur suppression à tout moment via WhatsApp. Détails complets dans nos Conditions d'utilisation.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-2xl mx-auto divide-y divide-border border-y border-border">
      {FAQ.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium">{item.q}</span>
              <ChevronDown
                size={16}
                className={`shrink-0 text-foreground/40 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <p className="pb-4 text-sm text-foreground/60 leading-relaxed pr-6">{item.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
