"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  LayoutTemplate,
  SlidersHorizontal,
  FileOutput,
} from "lucide-react";
import TemplateGallery from "@/components/landing/TemplateGallery";
import FadeIn from "@/components/landing/FadeIn";
import ScanCard from "@/components/landing/ScanCard";
import { ENTRY_GATE_KEY } from "@/lib/entryGate";
import { useHomeContent } from "@/lib/homeContent";

const FEATURES = [
  {
    icon: LayoutTemplate,
    titre: "15 modèles distincts",
    texte: "Des mises en page pensées pour tous les secteurs, du classique administratif au profil créatif.",
  },
  {
    icon: ShieldCheck,
    titre: "Score de compatibilité ATS",
    texte: "Un indicateur vérifie que la structure et les mots-clés de votre CV se lisent bien par les logiciels de tri.",
  },
  {
    icon: SlidersHorizontal,
    titre: "Personnalisation complète",
    texte: "Couleurs, rubriques et ordre des sections s'ajustent en quelques clics, sans notion de design.",
  },
  {
    icon: FileOutput,
    titre: "Export au format PDF",
    texte: "Téléchargez votre CV en PDF haute qualité, le format standard attendu par les recruteurs.",
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

// Cette page reprend volontairement les mêmes tokens de couleur et la même
// police que l'éditeur (bg-background / text-foreground / bg-surface /
// border-border / brand-600, font-sans) : aucune palette ni typographie
// distincte pour la landing page, pour qu'il n'y ait aucune différence de
// design entre la page d'accueil et le reste de l'application.
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
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-background text-foreground">
      {/* ===== En-tête — identique à l'en-tête de l'éditeur ===== */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border bg-background/95 backdrop-blur">
        <Link href="/" className="font-extrabold text-xs sm:text-sm tracking-wide uppercase flex-shrink-0">
          MON CV PRO CI
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-foreground/60">
          <a href="#modeles" className="hover:text-foreground transition">Modèles</a>
          <a href="#tarifs" className="hover:text-foreground transition">Tarifs</a>
          <Link
            href={ctaHref}
            className="flex items-center gap-1.5 rounded-lg bg-brand-600 text-white px-3.5 py-2 text-xs font-semibold hover:bg-brand-700 transition"
          >
            Créer mon CV <ArrowRight size={14} />
          </Link>
        </nav>
        <Link
          href={ctaHref}
          className="sm:hidden flex items-center gap-1.5 rounded-lg bg-brand-600 text-white px-3 py-2 text-xs font-semibold hover:bg-brand-700 transition"
        >
          Créer <ArrowRight size={13} />
        </Link>
      </header>

      {/* ===== Hero ===== */}
      <section className="px-4 sm:px-6 py-14 sm:py-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-16 lg:gap-10 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-700 mb-4">
              {content.heroEyebrow}
            </p>
            <h1 className="text-[2.4rem] sm:text-[3.1rem] font-bold leading-[1.1] tracking-tight mb-5">
              {content.heroTitleLine1}
              <br />
              <span className="text-brand-600">{content.heroTitleLine2}</span>
            </h1>
            <p className="text-base sm:text-lg text-foreground/60 mb-8 max-w-md leading-relaxed">
              {content.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3 mb-8">
              <Link
                href={ctaHref}
                className="flex items-center justify-center gap-2 rounded-lg bg-brand-600 text-white px-6 py-3 text-sm font-semibold hover:bg-brand-700 transition"
              >
                {content.ctaPrimary} <ArrowRight size={16} />
              </Link>
              <a
                href="#modeles"
                className="flex items-center justify-center gap-1.5 px-6 py-3 text-sm font-medium border border-border rounded-lg hover:border-foreground/30 transition"
              >
                {content.ctaSecondary}
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-foreground/45 border-t border-border pt-5">
              <span>1 000 FCFA</span>
              <span className="w-1 h-1 rounded-full bg-foreground/20" />
              <span>Paiement Wave</span>
              <span className="w-1 h-1 rounded-full bg-foreground/20" />
              <span>15 modèles</span>
              <span className="w-1 h-1 rounded-full bg-foreground/20" />
              <span>Export PDF</span>
            </div>
          </div>

          <FadeIn>
            <ScanCard />
          </FadeIn>
        </div>
      </section>

      {/* ===== Galerie de modèles ===== */}
      <section id="modeles" className="px-4 sm:px-6 py-16 sm:py-24 border-t border-border bg-surface-muted">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="flex items-end justify-between mb-10 gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600 mb-3">
                Bibliothèque de modèles
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold">Un modèle pour chaque profil</h2>
            </div>
            <p className="hidden sm:block text-sm text-foreground/55 max-w-xs text-right">
              Changez de modèle et de couleur à tout moment, en aperçu direct dans l&apos;éditeur.
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <TemplateGallery />
          </FadeIn>
        </div>
      </section>

      {/* ===== Fonctionnalités — grille de cartes ===== */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 bg-background">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="mb-12 max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-700 mb-3">
              Ce que vous obtenez
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold">Tout pour un CV qui convainc</h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-4">
            {FEATURES.map((item, i) => (
              <FadeIn key={item.titre} delay={i * 80}>
                <div className="h-full rounded-xl border border-border bg-surface p-6 hover:border-brand-600/40 transition">
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
          <FadeIn className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600 mb-3">
              Trois étapes
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold">Comment ça marche</h2>
          </FadeIn>

          <div className="grid sm:grid-cols-3 relative gap-y-10">
            <div aria-hidden className="hidden sm:block absolute top-6 left-0 right-0 h-px bg-brand-600/15" />
            {STEPS.map((step, i) => (
              <FadeIn key={step.num} delay={i * 100} className="relative pr-8">
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
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-700 mb-4 text-center">
            Tarif
          </p>
          <div className="rounded-xl border border-border bg-surface px-8 pt-8 pb-7">
            <p className="text-sm text-foreground/55 mb-1">Téléchargement du CV</p>
            <p className="text-5xl font-bold mb-1">
              1 000 <span className="text-2xl text-foreground/45 font-normal">FCFA</span>
            </p>
            <p className="text-sm text-foreground/45 mb-6">Paiement unique, sans abonnement</p>
            <Link
              href={ctaHref}
              className="flex items-center justify-center gap-2 w-full rounded-lg bg-brand-600 text-white px-6 py-3 text-sm font-semibold hover:bg-brand-700 transition"
            >
              Commencer mon CV <ArrowUpRight size={15} />
            </Link>
          </div>
          <p className="text-center text-xs text-foreground/45 mt-4">Payez par Wave, sans carte bancaire.</p>
        </FadeIn>
      </section>

      {/* ===== Pied de page ===== */}
      <footer className="px-4 sm:px-6 pt-10 pb-24 sm:pb-10 bg-surface-muted border-t border-border text-foreground/55">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-8">
            <div>
              <p className="text-foreground font-semibold mb-1.5 text-sm">MON CV PRO CI</p>
              <p className="text-xs max-w-xs leading-relaxed">
                Créateur de CV professionnel pensé pour le marché ivoirien. Vos données restent confidentielles.
              </p>
            </div>

            <div className="flex gap-10 text-xs">
              <div className="flex flex-col gap-2">
                <span className="text-foreground/35 uppercase tracking-[0.12em] text-[10px] mb-1">Produit</span>
                <a href="#modeles" className="hover:text-foreground transition">Modèles</a>
                <a href="#tarifs" className="hover:text-foreground transition">Tarifs</a>
                <Link href={ctaHref} className="hover:text-foreground transition">Créer mon CV</Link>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-foreground/35 uppercase tracking-[0.12em] text-[10px] mb-1">Légal</span>
                <Link href="/cgu" className="hover:text-foreground transition">Conditions d&apos;utilisation</Link>
                <Link href="/cgu#confidentialite" className="hover:text-foreground transition">Confidentialité</Link>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-foreground/35 uppercase tracking-[0.12em] text-[10px] mb-1">Contact</span>
                <a
                  href="https://wa.me/2250545177571"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition"
                >
                  WhatsApp
                </a>
                <span>{content.phone}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border text-xs">
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
