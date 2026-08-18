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
//   2. TOUTES les sections avec contenu (expérience, formation,
//      compétences, langues, projets, etc. — pas une seule ciblée) ne
//      gardent que leur premier élément, avec sa description réduite à un
//      "teaser" ; tout élément suivant est remplacé par un repère "masqué".
//      Ainsi un CV sans expérience professionnelle (ex: uniquement
//      formation + compétences) reste tout autant tronqué. Le corps de la
//      lettre de motivation suit la même logique.
//
// Cette fonction ne doit être utilisée QUE pour la zone d'impression du flux
// "Aperçu gratuit" (voir CVPreviewFit, prop `watermark`). L'aperçu à l'écran
// pendant l'édition doit toujours utiliser les vraies données de `cv`.

const MASK_CHAR = "•";
const TEASER_WORD_COUNT = 8;

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

/** Tronque CHAQUE section visible (pas seulement "expérience") : ne garde
 * que le premier élément, avec sa description réduite à un teaser, et
 * remplace tous les éléments suivants par un unique repère "masqué". Ainsi
 * même un CV sans expérience professionnelle (uniquement formation,
 * compétences, langues, projets...) se retrouve avec plusieurs parties
 * visiblement incomplètes, pas juste une seule section ciblée. */
function maskSections(sections: Section[], langue: "fr" | "en"): Section[] {
  return sections.map((section) => {
    if (!section.visible || section.items.length === 0) return section;

    const [first, ...rest] = section.items;
    const maskedFirst: EntryItem = {
      ...first,
      description: first.description ? teaserText(first.description, langue) : first.description,
    };
    const hiddenCount = rest.length;
    const items: EntryItem[] = [maskedFirst];
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
