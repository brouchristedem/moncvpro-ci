import { CVData } from "./types";

export interface ATSCriterion {
  labelKey: string;
  tipKey: string;
  done: boolean;
  weight: number;
}

export interface ATSResult {
  percent: number;
  tier: "excellent" | "bon" | "faible";
  tipKeys: string[]; // clés i18n des tips non satisfaits, triées par impact décroissant
  criteria: ATSCriterion[]; // détail des 8 critères, dans un ordre fixe (pour l'affichage checklist)
}

const ACTION_VERBS_FR = [
  "géré", "gérée", "dirigé", "dirigée", "développé", "développée", "créé", "créée",
  "piloté", "pilotée", "conçu", "conçue", "optimisé", "optimisée", "augmenté", "augmentée",
  "réduit", "réduite", "amélioré", "améliorée", "coordonné", "coordonnée", "supervisé",
  "supervisée", "mis en place", "lancé", "lancée", "négocié", "négociée", "formé", "formée",
  "analysé", "analysée", "livré", "livrée", "atteint", "atteinte", "généré", "générée",
];

const ACTION_VERBS_EN = [
  "managed", "led", "developed", "created", "built", "designed", "optimized", "increased",
  "reduced", "improved", "coordinated", "supervised", "launched", "negotiated", "trained",
  "analyzed", "delivered", "achieved", "generated", "implemented",
];

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function hasQuantifiedResult(text: string): boolean {
  // Détecte un chiffre, un pourcentage, ou une devise (FCFA, €, $) dans le texte.
  return /\d/.test(text);
}

function hasActionVerb(text: string, lang: "fr" | "en"): boolean {
  const lower = text.toLowerCase();
  const verbs = lang === "en" ? ACTION_VERBS_EN : ACTION_VERBS_FR;
  return verbs.some((v) => lower.includes(v));
}

// Calcule un score de compatibilité ATS (0-100), purement heuristique et local
// (aucun appel réseau). Le but n'est pas d'imiter un vrai parseur ATS mais de
// donner des signaux actionnables et objectifs à l'utilisateur.
export function computeATSScore(cv: CVData): ATSResult {
  const lang = cv.langue;
  const checks: { done: boolean; weight: number; tipKey: string; labelKey: string }[] = [];

  const p = cv.personalInfo;
  const contactDone = Boolean(p.email.trim() && p.telephone.trim() && p.titre.trim());
  checks.push({ done: contactDone, weight: 10, tipKey: "atsTipContact", labelKey: "atsLabelContact" });

  const experience = cv.sections.find((s) => s.type === "experience");
  const expItems = experience?.items ?? [];
  const datesDone =
    expItems.length > 0 && expItems.every((it) => Boolean(it.dateDebut?.trim()));
  checks.push({ done: datesDone, weight: 15, tipKey: "atsTipDates", labelKey: "atsLabelDates" });

  const experienceDescriptions = expItems
    .map((it) => it.description || "")
    .filter((d) => d.trim().length > 0);
  const hasResults =
    experienceDescriptions.length > 0 &&
    experienceDescriptions.some((d) => hasQuantifiedResult(d));
  checks.push({ done: hasResults, weight: 15, tipKey: "atsTipResults", labelKey: "atsLabelResults" });

  const hasVerbs =
    experienceDescriptions.length > 0 &&
    experienceDescriptions.some((d) => hasActionVerb(d, lang));
  checks.push({ done: hasVerbs, weight: 15, tipKey: "atsTipVerbs", labelKey: "atsLabelVerbs" });

  const formation = cv.sections.find((s) => s.type === "formation");
  const formationDone = Boolean(formation && formation.items.length > 0);
  checks.push({ done: formationDone, weight: 10, tipKey: "atsTipFormation", labelKey: "atsLabelFormation" });

  const competences = cv.sections.find((s) => s.type === "competences");
  const competencesCount = competences?.items.length ?? 0;
  const keywordsDone = competencesCount >= 5;
  checks.push({ done: keywordsDone, weight: 15, tipKey: "atsTipKeywords", labelKey: "atsLabelKeywords" });

  const emptyVisibleSection = cv.sections.some((s) => s.visible && s.items.length === 0);
  checks.push({ done: !emptyVisibleSection, weight: 10, tipKey: "atsTipEmptySection", labelKey: "atsLabelEmptySection" });

  const totalWords = cv.sections.reduce((sum, s) => {
    return (
      sum +
      s.items.reduce((itemSum, it) => itemSum + countWords(it.description || ""), 0)
    );
  }, 0);
  const lengthDone = totalWords >= 60;
  checks.push({ done: lengthDone, weight: 10, tipKey: "atsTipLength", labelKey: "atsLabelLength" });

  const totalWeight = checks.reduce((sum, c) => sum + c.weight, 0);
  const doneWeight = checks.reduce((sum, c) => sum + (c.done ? c.weight : 0), 0);
  const percent = Math.round((doneWeight / totalWeight) * 100);

  const tier: ATSResult["tier"] = percent >= 80 ? "excellent" : percent >= 50 ? "bon" : "faible";

  // Priorité par impact : le critère non satisfait le plus lourd (donc celui
  // qui ferait le plus progresser le score) est mis en avant en premier,
  // plutôt que dans l'ordre arbitraire d'évaluation.
  const tipKeys = checks
    .filter((c) => !c.done)
    .sort((a, b) => b.weight - a.weight)
    .map((c) => c.tipKey);

  const criteria: ATSCriterion[] = checks.map((c) => ({
    labelKey: c.labelKey,
    tipKey: c.tipKey,
    done: c.done,
    weight: c.weight,
  }));

  return { percent, tier, tipKeys, criteria };
}
