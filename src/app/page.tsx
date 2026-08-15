"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, LayoutTemplate, SlidersHorizontal, FileOutput } from "lucide-react";
import { ENTRY_GATE_KEY } from "@/lib/entryGate";
import { useHomeContent } from "@/lib/homeContent";

const FEATURES = [
  {
    icon: LayoutTemplate,
    titre: "15 modèles distincts",
    texte: "Des designs prisés par les recruteurs, adaptés à tous les secteurs.",
  },
  {
    icon: SlidersHorizontal,
    titre: "Personnalisation totale",
    texte: "Couleurs, rubriques, mise en page — tout est ajustable.",
  },
  {
    icon: FileOutput,
    titre: "Export PDF prêt à l'envoi",
    texte: "Téléchargez votre CV en PDF haute qualité en quelques minutes.",
  },
];

// Version sobre, alignée sur la toute première maquette de la page d'accueil :
// en-tête minimal, hero centré unique, une seule grille de 3 points forts,
// pied de page simple. Le texte du hero reste éditable depuis
// Administration → Page d'accueil (voir src/lib/homeContent.ts) ; seule la
// mise en page a été ramenée à l'essentiel, avec les couleurs de marque
// actuelles (vert #0B6E4F / orange accent) et le tarif en vigueur (1 000 FCFA).
export default function Home() {
  const ctaHref = "/editor";
  const content = useHomeContent();

  // Marque que la personne est bien passée par la page d'accueil : la page
  // éditeur exige cette marque (voir src/lib/entryGate.ts) pour empêcher un
  // accès direct à l'éditeur sans être d'abord passé par ici.
  useEffect(() => {
    try {
      window.sessionStorage.setItem(ENTRY_GATE_KEY, "1");
    } catch {
      // sessionStorage indisponible (navigation privée stricte, etc.) : on
      // laisse simplement l'éditeur accessible sans bloquer la personne.
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* ===== En-tête sobre ===== */}
      <header className="flex items-center justify-between px-6 py-4 max-w-5xl w-full mx-auto">
        <span className="font-bold">MON CV PRO CI</span>
        <Link
          href={ctaHref}
          className="text-sm px-4 py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition"
        >
          Commencer
        </Link>
      </header>

      {/* ===== Hero centré, unique ===== */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 max-w-2xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-700 mb-3">
          {content.heroEyebrow}
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
          {content.heroTitleLine1} {content.heroTitleLine2}
        </h1>
        <p className="text-foreground/60 mb-8">
          {content.heroSubtitle}
        </p>
        <Link
          href={ctaHref}
          className="flex items-center gap-2 rounded-xl bg-brand-600 text-white px-6 py-3 font-medium hover:bg-brand-700 transition"
        >
          {content.ctaPrimary} <ArrowRight size={16} />
        </Link>
        <p className="text-xs text-foreground/45 mt-4">1 000 FCFA — paiement Wave, sans carte bancaire</p>

        <div className="grid sm:grid-cols-3 gap-6 mt-16 text-left">
          {FEATURES.map((item) => (
            <div key={item.titre}>
              <item.icon className="text-brand-600 mb-2" size={20} />
              <h3 className="font-semibold text-sm mb-1">{item.titre}</h3>
              <p className="text-xs text-foreground/60">{item.texte}</p>
            </div>
          ))}
        </div>
      </main>

      {/* ===== Pied de page sobre ===== */}
      <footer className="text-center text-xs text-foreground/40 py-6 flex flex-col items-center gap-2">
        <div className="flex items-center gap-3">
          <Link href="/cgu" className="hover:text-foreground/60 transition">Conditions d&apos;utilisation</Link>
          <span className="w-1 h-1 rounded-full bg-foreground/20" />
          <a
            href="https://wa.me/2250545177571"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground/60 transition"
          >
            WhatsApp
          </a>
        </div>
        <span>MON CV PRO CI — Abidjan, Côte d&apos;Ivoire</span>
      </footer>
    </div>
  );
}
