"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Contenu texte de la page d'accueil, modifiable depuis Administration → Page
// d'accueil sans toucher au code. Stocké dans le document Firestore
// settings/homepage. Si le document n'existe pas encore (première utilisation)
// ou qu'un champ est vide, on retombe sur ces valeurs par défaut.
export interface HomeContent {
  heroEyebrow: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  phone: string;
}

export const DEFAULT_HOME_CONTENT: HomeContent = {
  heroEyebrow: "Conçu pour le marché ivoirien",
  heroTitleLine1: "Le CV qui passe",
  heroTitleLine2: "le premier tri.",
  heroSubtitle:
    "15 modèles pensés pour convaincre, un score de compatibilité ATS pour vérifier que votre CV se lit bien, et un export prêt en quelques minutes.",
  ctaPrimary: "Créer mon CV maintenant",
  ctaSecondary: "Voir les modèles",
  phone: "+225 05 45 17 75 71",
};

export function useHomeContent(): HomeContent {
  const [content, setContent] = useState<HomeContent>(DEFAULT_HOME_CONTENT);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "homepage"), (snap) => {
      if (!snap.exists()) return;
      const data = snap.data() as Partial<HomeContent>;
      setContent((prev) => ({
        ...prev,
        ...Object.fromEntries(
          Object.entries(data).filter(([, v]) => typeof v === "string" && v.trim() !== "")
        ),
      }));
    });
    return () => unsub();
  }, []);

  return content;
}
