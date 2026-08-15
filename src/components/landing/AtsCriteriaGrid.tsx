import { Mail, CalendarCheck, TrendingUp, Zap, GraduationCap, Tags, ListChecks, AlignLeft } from "lucide-react";

// Les 8 critères réellement évalués par le module de scoring ATS local
// (voir src/lib/atsScore.ts), présentés ici pour informer la personne de ce
// qui est vérifié avant même qu'elle n'ouvre l'éditeur.
const CRITERIA = [
  {
    icon: Mail,
    titre: "Coordonnées complètes",
    texte: "Email, téléphone et titre de poste renseignés, pour que les recruteurs vous identifient immédiatement.",
  },
  {
    icon: CalendarCheck,
    titre: "Dates d'expérience",
    texte: "Chaque expérience professionnelle doit indiquer une date de début claire.",
  },
  {
    icon: TrendingUp,
    titre: "Résultats chiffrés",
    texte: "Vos réalisations gagnent à être appuyées par des chiffres concrets (%, FCFA, volumes…).",
  },
  {
    icon: Zap,
    titre: "Verbes d'action",
    texte: "Des formulations comme « géré », « développé » ou « optimisé » renforcent l'impact de vos descriptions.",
  },
  {
    icon: GraduationCap,
    titre: "Formation renseignée",
    texte: "Une section formation complète, attendue par la majorité des filtres automatiques.",
  },
  {
    icon: Tags,
    titre: "Mots-clés / compétences",
    texte: "Au moins 5 compétences listées, pour matcher avec les mots-clés recherchés par les recruteurs.",
  },
  {
    icon: ListChecks,
    titre: "Aucune section vide",
    texte: "Les rubriques activées mais laissées vides pénalisent la lisibilité de votre CV.",
  },
  {
    icon: AlignLeft,
    titre: "Longueur suffisante",
    texte: "Un contenu assez détaillé pour donner aux recruteurs et aux logiciels de quoi évaluer votre profil.",
  },
];

export default function AtsCriteriaGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {CRITERIA.map((item) => (
        <div
          key={item.titre}
          className="h-full flex flex-col items-center text-center rounded-xl border border-border bg-surface p-5 hover:border-brand-600/40 transition"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600/10 text-brand-600 mb-3">
            <item.icon size={18} />
          </div>
          <h3 className="font-semibold text-sm mb-1.5">{item.titre}</h3>
          <p className="text-xs text-foreground/55 leading-relaxed">{item.texte}</p>
        </div>
      ))}
    </div>
  );
}
