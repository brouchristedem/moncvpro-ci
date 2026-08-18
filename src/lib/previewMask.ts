import { CVData, EntryItem, LettreMotivation, PersonalInfo, Section } from "./types";

// Masquage du CV pour l'aperçu gratuit ("Test Gratuit" avant paiement).
//
// Le filigrane visuel seul ne protège rien : un utilisateur peut demander à
// une IA de retirer le filigrane (inpainting), ou simplement recopier le
// texte affiché (voire le sélectionner/copier directement, puisque
// window.print() produit un PDF vectoriel avec du vrai texte, pas une
// image). La vraie protection doit donc porter sur les DONNÉES envoyées au
// rendu, pas sur une couche visuelle par-dessus :
//   1. Coordonnées de contact (email, téléphone, adresse, liens, infos
//      complémentaires) entièrement remplacées par des caractères "•" avant
//      le rendu — l'information réelle n'existe simplement plus dans le DOM
//      envoyé à l'impression, donc rien à "retirer" pour la récupérer.
//   2. Le contenu le plus consultable (description de la première
//      expérience, corps de la lettre de motivation) est tronqué à un
//      "teaser" ; les expériences suivantes sont remplacées par un unique
//      item indiquant qu'elles sont masquées.
//
// Cette fonction ne doit être utilisée QUE pour la zone d'impression du flux
// "Aperçu gratuit" (voir CVPreviewFit, prop `watermark`). L'aperçu à l'écran
// pendant l'édition doit toujours utiliser les vraies données de `cv`.

const MASK_CHAR = "•";
const TEASER_WORD_COUNT = 12;

/** Remplace chaque caractère non-blanc par "•", en gardant la structure
 * (espaces, longueur) pour que la mise en page ne bouge pas trop. */
function maskValue(value: string): string {
  if (!value) return value;
  return value.replace(/\S/g, MASK_CHAR);
}

function teaserText(text: string, langue: "fr" | "en"): string {
  const trimmed = text.trim();
  if (!trimmed) return text;
  const words = trimmed.split(/\s+/);
  const suffix =
    langue === "en"
      ? " […] (unlock the full text after payment)"
      : " […] (texte complet débloqué après paiement)";
  if (words.length <= TEASER_WORD_COUNT) {
    // Même un texte court reste tronqué à mi-longueur : sinon une
    // description déjà brève se retrouverait affichée intégralement.
    const half = Math.max(1, Math.ceil(words.length / 2));
    return `${words.slice(0, half).join(" ")}${suffix}`;
  }
  return `${words.slice(0, TEASER_WORD_COUNT).join(" ")}${suffix}`;
}

function maskPersonalInfo(p: PersonalInfo): PersonalInfo {
  return {
    ...p,
    email: maskValue(p.email),
    telephone: maskValue(p.telephone),
    adresse: maskValue(p.adresse),
    permis: p.permis ? maskValue(p.permis) : p.permis,
    linkedin: p.linkedin ? maskValue(p.linkedin) : p.linkedin,
    siteWeb: p.siteWeb ? maskValue(p.siteWeb) : p.siteWeb,
    autresInfos: p.autresInfos.map((info) => ({
      ...info,
      valeur: maskValue(info.valeur),
    })),
  };
}

/** Choisit la section la plus "précieuse" à tronquer : en priorité
 * l'expérience professionnelle (le plus consulté par un recruteur), sinon
 * le profil (résumé en tête de CV), sinon la première section rencontrée
 * qui contient un texte descriptif exploitable. */
function maskSections(sections: Section[], langue: "fr" | "en"): Section[] {
  const priority: Section["type"][] = ["experience", "profil"];
  let targetIndex = sections.findIndex(
    (s) => s.visible && s.items.length > 0 && priority.includes(s.type)
  );
  // priorité stricte : d'abord "experience" partout, sinon "profil"
  for (const type of priority) {
    const idx = sections.findIndex((s) => s.visible && s.items.length > 0 && s.type === type);
    if (idx !== -1) {
      targetIndex = idx;
      break;
    }
  }
  if (targetIndex === -1) {
    targetIndex = sections.findIndex(
      (s) => s.visible && s.items.some((i) => (i.description || "").trim().length > 0)
    );
  }
  if (targetIndex === -1) return sections;

  return sections.map((section, idx) => {
    if (idx !== targetIndex) return section;
    const [first, ...rest] = section.items;
    const maskedFirst = first
      ? {
          ...first,
          description: first.description ? teaserText(first.description, langue) : first.description,
        }
      : first;
    const hiddenCount = rest.length;
    const items: EntryItem[] = maskedFirst ? [maskedFirst] : [];
    if (hiddenCount > 0) {
      items.push({
        id: `preview-locked-${section.id}`,
        titre:
          langue === "en"
            ? `+ ${hiddenCount} more entr${hiddenCount > 1 ? "ies" : "y"} hidden`
            : `+ ${hiddenCount} élément${hiddenCount > 1 ? "s" : ""} supplémentaire${hiddenCount > 1 ? "s" : ""} masqué${hiddenCount > 1 ? "s" : ""}`,
        sousTitre:
          langue === "en"
            ? "Unlock the full CV to see them"
            : "Débloquez le CV complet pour les voir",
        description: undefined,
      });
    }
    return { ...section, items };
  });
}

function maskLettre(l: LettreMotivation | undefined, langue: "fr" | "en"): LettreMotivation | undefined {
  if (!l) return l;
  return {
    ...l,
    corps: l.corps ? teaserText(l.corps, langue) : l.corps,
  };
}

export function maskCvForPreview(cv: CVData): CVData {
  return {
    ...cv,
    personalInfo: maskPersonalInfo(cv.personalInfo),
    sections: maskSections(cv.sections, cv.langue),
    lettreMotivation: maskLettre(cv.lettreMotivation, cv.langue),
  };
}
