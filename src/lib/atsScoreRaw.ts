// Analyse heuristique d'un CV externe (texte brut extrait d'un PDF non
// généré par MON CV PRO CI). Contrairement à computeATSScore (src/lib/atsScore.ts)
// qui travaille sur des CVData structurées, ici on ne dispose que du texte
// brut extrait par pdf.js : les signaux sont donc plus grossiers, mais
// suffisants pour donner un diagnostic actionnable en quelques secondes.

export interface RawATSCriterion {
  label: string;
  tip: string;
  done: boolean;
  weight: number;
}

export interface RawATSResult {
  percent: number;
  tier: "excellent" | "bon" | "faible";
  criteria: RawATSCriterion[];
  nextTip: string | null;
  wordCount: number;
}

const ACTION_VERBS = [
  // FR
  "géré", "gérée", "dirigé", "dirigée", "développé", "développée", "créé", "créée",
  "piloté", "pilotée", "conçu", "conçue", "optimisé", "optimisée", "augmenté", "augmentée",
  "réduit", "réduite", "amélioré", "améliorée", "coordonné", "coordonnée", "supervisé",
  "supervisée", "mis en place", "lancé", "lancée", "négocié", "négociée", "formé", "formée",
  "analysé", "analysée", "livré", "livrée", "atteint", "atteinte", "généré", "générée",
  // EN
  "managed", "led", "developed", "created", "built", "designed", "optimized", "increased",
  "reduced", "improved", "coordinated", "supervised", "launched", "negotiated", "trained",
  "analyzed", "delivered", "achieved", "generated", "implemented",
];

const EDUCATION_WORDS = [
  "formation", "diplôme", "diplome", "université", "universite", "licence", "master",
  "baccalauréat", "baccalaureat", "bts", "bac+", "école", "ecole", "degree", "university",
  "bachelor", "education", "graduated",
];

const SKILLS_WORDS = [
  "compétences", "competences", "compétence", "skills", "maîtrise", "maitrise",
  "logiciels", "outils", "langages",
];

const EMAIL_RE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i;
const PHONE_RE = /(\+?\d[\d\s.-]{7,}\d)/;
const YEAR_RE = /\b(19|20)\d{2}\b/g;

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function includesAny(lowerText: string, words: string[]): boolean {
  return words.some((w) => lowerText.includes(w));
}

export function analyzeRawCvText(rawText: string): RawATSResult {
  const text = rawText.replace(/\s+/g, " ").trim();
  const lower = text.toLowerCase();
  const wordCount = countWords(text);

  const checks: { done: boolean; weight: number; tip: string; label: string }[] = [];

  const hasEmail = EMAIL_RE.test(text);
  const hasPhone = PHONE_RE.test(text);
  checks.push({
    done: hasEmail && hasPhone,
    weight: 15,
    label: "Coordonnées détectées",
    tip: "Assurez-vous que votre email et votre numéro de téléphone apparaissent en clair (pas dans une image ou un en-tête graphique) : les logiciels ATS doivent pouvoir les lire.",
  });

  const years = text.match(YEAR_RE) ?? [];
  const distinctYears = new Set(years);
  checks.push({
    done: distinctYears.size >= 2,
    weight: 15,
    label: "Dates d'expérience repérées",
    tip: "Indiquez clairement les dates (mois/année) de chaque expérience et formation : les ATS trient les candidatures par chronologie.",
  });

  const hasQuantified = /\d/.test(text.replace(EMAIL_RE, "").replace(PHONE_RE, ""));
  checks.push({
    done: hasQuantified,
    weight: 15,
    label: "Résultats chiffrés",
    tip: "Ajoutez des chiffres concrets dans vos expériences (ex : « augmenté les ventes de 20% », « géré une équipe de 8 personnes »).",
  });

  const hasVerbs = includesAny(lower, ACTION_VERBS);
  checks.push({
    done: hasVerbs,
    weight: 15,
    label: "Verbes d'action",
    tip: "Utilisez des verbes d'action (géré, développé, piloté, optimisé...) pour décrire vos expériences plutôt que des phrases passives.",
  });

  const hasEducation = includesAny(lower, EDUCATION_WORDS);
  checks.push({
    done: hasEducation,
    weight: 10,
    label: "Formation identifiable",
    tip: "Faites apparaître clairement une rubrique Formation avec l'intitulé du diplôme et l'établissement.",
  });

  const hasSkills = includesAny(lower, SKILLS_WORDS);
  checks.push({
    done: hasSkills,
    weight: 15,
    label: "Rubrique compétences",
    tip: "Ajoutez une rubrique Compétences clairement identifiée avec des mots-clés liés à votre métier : les ATS filtrent par mots-clés.",
  });

  const lengthDone = wordCount >= 150 && wordCount <= 1000;
  checks.push({
    done: lengthDone,
    weight: 15,
    label: "Longueur adaptée",
    tip: wordCount < 150
      ? "Votre CV semble trop court : détaillez un peu plus vos expériences et compétences."
      : "Votre CV semble très long : un CV trop dense est souvent mal traité par les ATS, essayez d'aller à l'essentiel.",
  });

  const totalWeight = checks.reduce((s, c) => s + c.weight, 0);
  const doneWeight = checks.reduce((s, c) => s + (c.done ? c.weight : 0), 0);
  const percent = Math.round((doneWeight / totalWeight) * 100);
  const tier: RawATSResult["tier"] = percent >= 80 ? "excellent" : percent >= 50 ? "bon" : "faible";

  const unmet = checks.filter((c) => !c.done).sort((a, b) => b.weight - a.weight);

  return {
    percent,
    tier,
    wordCount,
    criteria: checks.map((c) => ({ label: c.label, tip: c.tip, done: c.done, weight: c.weight })),
    nextTip: unmet[0]?.tip ?? null,
  };
}
