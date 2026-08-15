"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  LayoutTemplate,
  ShieldCheck,
  SlidersHorizontal,
  FileOutput,
  Sparkles,
} from "lucide-react";
import TemplateGallery from "@/components/landing/TemplateGallery";
import FadeIn from "@/components/landing/FadeIn";
import ScanCard from "@/components/landing/ScanCard";
import AtsCriteriaGrid from "@/components/landing/AtsCriteriaGrid";
import { ENTRY_GATE_KEY } from "@/lib/entryGate";

const FEATURES = [
  {
    icon: LayoutTemplate,
    titre: "15 modèles distincts",
    texte: "Des designs prisés par les recruteurs, adaptés à tous les secteurs.",
  },
  {
    icon: ShieldCheck,
    titre: "Score de compatibilité ATS",
    texte: "Un indicateur vérifie que la structure et les mots-clés de votre CV se lisent bien par les logiciels de tri.",
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

const STEPS = [
  {
    num: "1",
    titre: "Remplissez vos informations",
    texte: "Renseignez votre parcours dans l'éditeur, section par section.",
  },
  {
    num: "2",
    titre: "Choisissez un modèle",
    texte: "Changez de style et de couleur à tout moment, en aperçu direct.",
  },
  {
    num: "3",
    titre: "Payez par Wave et téléchargez",
    texte: "1 000 FCFA via Wave, puis votre CV en PDF est prêt.",
  },
];

// Version sobre (structure de la toute première maquette), avec en plus la
// galerie de modèles, le bloc "Comment ça marche", le tarif détaillé et le
// pied de page complet (CGU, confidentialité, contact) restaurés. Couleurs
// de marque actuelles (vert #0B6E4F / orange accent), tarif en vigueur
// (1 000 FCFA). Textes fixes dans le code (pas de personnalisation admin).
export default function Home() {
  const ctaHref = "/editor";

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
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-background text-foreground">
      {/* ===== En-tête sobre ===== */}
      <header className="sticky top-0 z-20 grid grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 py-4 border-b border-border bg-background/95 backdrop-blur overflow-hidden">
        <span />
        <span className="relative font-bold text-xl sm:text-2xl tracking-tight">
          {/* Drapeau ivoirien discret, en fond, derrière le nom */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 flex h-full w-[160%] min-w-[220px] opacity-90"
          >
            <span className="flex-1 bg-[#9A4600]" />
            <span className="flex-1 bg-white" />
            <span className="flex-1 bg-[#00512B]" />
          </span>
          <span className="text-white dark:text-black">
            MON CV PRO CI
          </span>
        </span>
        <nav className="hidden sm:flex items-center justify-end gap-6 text-sm text-foreground/60">
          <a href="#modeles" className="hover:text-foreground transition">Modèles</a>
          <a href="#scan-ats" className="hover:text-foreground transition">Scan ATS</a>
          <a href="#tarifs" className="hover:text-foreground transition">Tarifs</a>
        </nav>
      </header>

      {/* ===== Hero, centré ===== */}
      <section className="px-4 sm:px-6 py-14 sm:py-20">
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 dark:text-brand-400 bg-brand-600/10 px-3 py-1.5 rounded-full mb-5">
            <Sparkles size={13} /> 15 modèles testés par des recruteurs ivoiriens
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[3.1rem] font-bold mb-5 leading-tight">
            Le CV qui retient l&apos;attention des recruteurs.
          </h1>
          <p className="text-base sm:text-lg text-foreground/60 mb-8 max-w-md leading-relaxed">
            15 modèles pensés pour convaincre, un score de compatibilité ATS pour vérifier que
            votre CV se lit bien, et un export PDF prêt à l&apos;envoi en quelques minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <Link
              href={ctaHref}
              className="flex items-center justify-center gap-2 rounded-lg bg-brand-600 text-white px-6 py-3 text-sm font-semibold hover:bg-brand-700 transition"
            >
              Créer mon CV maintenant <ArrowRight size={16} />
            </Link>
            <a
              href="#modeles"
              className="flex items-center justify-center gap-1.5 px-6 py-3 text-sm font-medium border border-border rounded-lg hover:border-foreground/30 transition"
            >
              Voir les modèles
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-foreground/45 border-t border-border pt-5 mb-14 w-full max-w-sm">
            <span>1 000 FCFA</span>
            <span className="w-1 h-1 rounded-full bg-foreground/20" />
            <span>Paiement Wave</span>
            <span className="w-1 h-1 rounded-full bg-foreground/20" />
            <span>15 modèles</span>
            <span className="w-1 h-1 rounded-full bg-foreground/20" />
            <span>Export PDF</span>
          </div>

          <FadeIn>
            <ScanCard />
          </FadeIn>
        </div>
      </section>

      {/* ===== Galerie de modèles ===== */}
      <section id="modeles" className="px-4 sm:px-6 py-16 sm:py-24 border-t border-border bg-surface-muted">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="flex flex-col items-center text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600 mb-3">
              Bibliothèque de modèles
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Un modèle pour chaque profil</h2>
            <p className="text-sm text-foreground/55 max-w-md">
              Changez de modèle et de couleur à tout moment, en aperçu direct dans l&apos;éditeur.
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <TemplateGallery />
          </FadeIn>
        </div>
      </section>

      {/* ===== Scan ATS ===== */}
      <section id="scan-ats" className="px-4 sm:px-6 py-16 sm:py-24 bg-background">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="flex flex-col items-center text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600 mb-3">
              Compatibilité ATS
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Un score ATS calculé sur 8 critères
            </h2>
            <p className="text-sm text-foreground/55 max-w-lg">
              Dès que vous remplissez votre CV dans l&apos;éditeur, un score de compatibilité
              s&apos;affiche en direct et vous indique précisément quoi améliorer pour passer les
              logiciels de tri des recruteurs.
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <AtsCriteriaGrid />
          </FadeIn>
        </div>
      </section>

      {/* ===== Fonctionnalités — grille de cartes ===== */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 bg-background">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="flex flex-col items-center text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-700 mb-3">
              Ce que vous obtenez
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold">Tout pour un CV qui convainc</h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-4">
            {FEATURES.map((item, i) => (
              <FadeIn key={item.titre} delay={i * 80}>
                <div className="h-full flex flex-col items-center text-center rounded-xl border border-border bg-surface p-6 hover:border-brand-600/40 transition">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600/10 text-brand-600 mb-4">
                    <item.icon size={19} />
                  </div>
                  <h3 className="font-semibold mb-1.5">{item.titre}</h3>
                  <p className="text-sm text-foreground/55 leading-relaxed">{item.texte}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Comment ça marche ===== */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 bg-surface-muted border-y border-border">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="flex flex-col items-center text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600 mb-3">
              Trois étapes
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold">Comment ça marche</h2>
          </FadeIn>

          <div className="grid sm:grid-cols-3 relative gap-y-10 text-center sm:text-left">
            <div aria-hidden className="hidden sm:block absolute top-6 left-0 right-0 h-px bg-brand-600/15" />
            {STEPS.map((step, i) => (
              <FadeIn key={step.num} delay={i * 100} className="relative flex flex-col items-center sm:items-start sm:pr-8">
                <span className="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-full bg-surface border border-brand-600/25 text-brand-600 font-bold">
                  {step.num}
                </span>
                <h3 className="font-semibold mb-1.5 mt-4">{step.titre}</h3>
                <p className="text-sm text-foreground/55 leading-relaxed max-w-[240px]">{step.texte}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Tarif ===== */}
      <section id="tarifs" className="px-4 sm:px-6 py-16 sm:py-24 bg-background">
        <FadeIn className="max-w-sm mx-auto">
          <p className="text-lg sm:text-xl font-bold uppercase tracking-[0.1em] text-accent-700 mb-4 text-center">
            Tarif
          </p>
          <div className="rounded-xl border border-border bg-surface px-8 pt-8 pb-7 text-center">
            <p className="text-sm text-foreground/55 mb-1">Prix unique</p>
            <p className="flex items-center justify-center gap-2 text-5xl font-bold">
              <span>1 000</span> <span className="text-2xl text-foreground/45 font-normal leading-none">FCFA</span>
            </p>
          </div>
          <p className="text-center text-xs text-foreground/45 mt-4">Payez par Wave, sans carte bancaire.</p>
        </FadeIn>
      </section>

      {/* ===== Pied de page ===== */}
      <footer className="px-4 sm:px-6 pt-10 pb-24 sm:pb-10 bg-surface-muted border-t border-border text-foreground/55">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col items-center text-center gap-8 sm:flex-row sm:items-start sm:justify-between sm:text-left">
            <div className="flex flex-col items-center sm:items-start">
              <p className="text-foreground font-semibold mb-1.5 text-sm">MON CV PRO CI</p>
              <p className="text-xs max-w-xs leading-relaxed">
                Créateur de CV professionnel pensé pour le marché ivoirien. Vos données restent confidentielles.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-10 text-xs sm:justify-start">
              <div className="flex flex-col items-center gap-2 sm:items-start">
                <span className="text-foreground/35 uppercase tracking-[0.12em] text-[10px] mb-1">Produit</span>
                <a href="#modeles" className="hover:text-foreground transition">Modèles</a>
                <a href="#scan-ats" className="hover:text-foreground transition">Scan ATS</a>
                <a href="#tarifs" className="hover:text-foreground transition">Tarifs</a>
                <Link href={ctaHref} className="hover:text-foreground transition">Créer mon CV</Link>
              </div>
              <div className="flex flex-col items-center gap-2 sm:items-start">
                <span className="text-foreground/35 uppercase tracking-[0.12em] text-[10px] mb-1">Légal</span>
                <Link href="/cgu" className="hover:text-foreground transition text-center sm:text-left">Conditions d&apos;utilisation</Link>
                <Link href="/cgu#confidentialite" className="hover:text-foreground transition">Confidentialité</Link>
              </div>
              <div className="flex flex-col items-center gap-2 sm:items-start">
                <span className="text-foreground/35 uppercase tracking-[0.12em] text-[10px] mb-1">Contact</span>
                <a
                  href="https://wa.me/2250545177571"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition"
                >
                  WhatsApp
                </a>
                <span className="text-center sm:text-left">+225 05 45 17 75 71</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border text-xs text-center sm:text-left">
            © {new Date().getFullYear()} MON CV PRO CI. Tous droits réservés.
          </div>
        </div>
      </footer>

      {/* ===== CTA sticky mobile ===== */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-background/95 backdrop-blur border-t border-border">
        <Link
          href={ctaHref}
          className="flex items-center justify-center gap-2 rounded-lg bg-brand-600 text-white px-5 py-3 text-sm font-semibold hover:bg-brand-700 transition"
        >
          Créer mon CV — 1 000 FCFA <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
