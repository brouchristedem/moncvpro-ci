import { Mail, CalendarCheck, TrendingUp, Zap, GraduationCap, Tags, ListChecks, AlignLeft } from "lucide-react";
import Reveal from "./Reveal";

// Les 8 critères réellement évalués par le module de scoring ATS local
// (voir src/lib/atsScore.ts), présentés ici pour informer la personne de ce
// qui est vérifié avant même qu'elle n'ouvre l'éditeur.
const CRITERIA = [
  { icon: Mail, titre: "Coordonnées complètes", texte: "Email, téléphone, titre de poste." },
  { icon: CalendarCheck, titre: "Dates d'expérience", texte: "Une date de début par poste." },
  { icon: TrendingUp, titre: "Résultats chiffrés", texte: "Réalisations appuyées par des chiffres." },
  { icon: Zap, titre: "Verbes d'action", texte: "« Géré », « développé », « optimisé »…" },
  { icon: GraduationCap, titre: "Formation renseignée", texte: "Une section formation complète." },
  { icon: Tags, titre: "Mots-clés / compétences", texte: "Au moins 5 compétences listées." },
  { icon: ListChecks, titre: "Aucune section vide", texte: "Rubriques activées, jamais vides." },
  { icon: AlignLeft, titre: "Longueur suffisante", texte: "Assez de contenu pour être évalué." },
];

export default function AtsCriteriaGrid() {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {CRITERIA.map((item, i) => (
        <Reveal key={item.titre} delay={i * 50}>
          <div className="h-full flex items-center gap-3 text-left rounded-2xl border border-[#E3F0E9] bg-white px-4 py-3.5 hover:shadow-[0_10px_24px_-16px_rgba(12,59,46,0.2)] transition">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-2xl bg-[#E3F0E9] text-[#157A52]">
              <item.icon size={16} />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-[#1A2E28]">{item.titre}</h3>
              <p className="text-xs text-[#1A2E28]/60 leading-snug">{item.texte}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
