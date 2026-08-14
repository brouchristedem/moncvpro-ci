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

export default function Home() {
  const ctaHref = "/editor";
  const content = useHomeContent();
  const dark = content.heroTheme === "sombre";

  // Le hero peut être affiché sur fond blanc (par défaut) ou sur fond vert
  // foncé (ancien style), au choix depuis Administration → Page d'accueil.
  const hero = dark
    ? {
        wrapperBg: "bg-[#0A1F16] text-white",
        headerBg: "bg-[#0A1F16]/90 border-white/10",
        navText: "text-white/60",
        eyebrow: "text-[#FF9A50]",
        titleLine1: "text-white",
        subtitle: "text-white/60",
        ctaSecondary: "text-white/80 border-white/15 hover:border-white/40 hover:text-white",
        metaText: "text-white/40 border-white/10",
        metaDot: "bg-white/20",
        dotGrid: "opacity-[0.05]",
      }
    : {
        wrapperBg: "bg-white text-[#10241C]",
        headerBg: "bg-white/90 border-[#E5E7E2]",
        navText: "text-[#10241C]/55",
        eyebrow: "text-[#E35F05]",
        titleLine1: "text-[#10241C]",
        subtitle: "text-[#10241C]/55",
        ctaSecondary: "text-[#10241C]/80 border-[#10241C]/15 hover:border-[#10241C]/40 hover:text-[#10241C]",
        metaText: "text-[#10241C]/40 border-[#E5E7E2]",
        metaDot: "bg-[#10241C]/20",
        dotGrid: "opacity-[0.04]",
      };

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
    <div
      className={`min-h-screen flex flex-col overflow-x-hidden bg-white text-[#10241C]`}
      style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
    >
      {/* ===== HERO — fond blanc par défaut (configurable en Administration), carte de scan ATS en signature ===== */}
      <div className={`relative overflow-hidden transition-colors ${hero.wrapperBg}`}>
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 ${hero.dotGrid}`}
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${dark ? "white" : "#10241C"} 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[-10%] h-[480px] w-[480px] rounded-full bg-[#0B6E4F]/20 blur-[120px]"
        />

        <header className={`relative z-10 sticky top-0 border-b backdrop-blur transition-colors ${hero.headerBg}`}>
          <div className="flex items-center justify-between px-6 py-4 max-w-6xl w-full mx-auto">
            <span className="text-lg sm:text-xl font-semibold tracking-tight">
              Mon CV Pro <span className="text-[#0B6E4F]">CI</span>
            </span>
            <nav className={`hidden sm:flex items-center gap-8 text-sm ${hero.navText}`}>
              <a href="#modeles" className="hover:text-[#0B6E4F] transition">Modèles</a>
              <a href="#tarifs" className="hover:text-[#0B6E4F] transition">Tarifs</a>
              <Link
                href={ctaHref}
                className="flex items-center gap-1.5 rounded-full bg-[#0B6E4F] text-white px-4 py-2 text-sm font-semibold hover:bg-[#085b41] transition"
              >
                Créer mon CV <ArrowRight size={14} />
              </Link>
            </nav>
          </div>
        </header>

        <section className="relative z-10 px-6 pt-14 pb-20 sm:pt-20 sm:pb-28">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-16 lg:gap-10 items-center">
            <div>
              <p
                className={`text-xs font-medium uppercase tracking-[0.18em] mb-5 ${hero.eyebrow}`}
                style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
              >
                {content.heroEyebrow}
              </p>
              <h1 className={`text-[2.6rem] sm:text-[3.4rem] font-semibold leading-[1.05] tracking-tight mb-6 ${hero.titleLine1}`}>
                {content.heroTitleLine1}
                <br />
                <span className="text-[#0B6E4F]">{content.heroTitleLine2}</span>
              </h1>
              <p
                className={`text-base sm:text-lg mb-8 max-w-md leading-relaxed ${hero.subtitle}`}
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                {content.heroSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-3 mb-9">
                <Link
                  href={ctaHref}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#0B6E4F] text-white px-7 py-3.5 text-base font-semibold hover:bg-[#085b41] transition"
                >
                  {content.ctaPrimary} <ArrowRight size={18} />
                </Link>
                <a
                  href="#modeles"
                  className={`flex items-center justify-center gap-1.5 px-7 py-3.5 text-base font-medium border rounded-full transition ${hero.ctaSecondary}`}
                >
                  {content.ctaSecondary}
                </a>
              </div>

              <div
                className={`flex flex-wrap items-center gap-x-6 gap-y-2 text-xs border-t pt-5 ${hero.metaText}`}
                style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
              >
                <span>1 000 FCFA</span>
                <span className={`w-1 h-1 rounded-full ${hero.metaDot}`} />
                <span>Paiement Wave</span>
                <span className={`w-1 h-1 rounded-full ${hero.metaDot}`} />
                <span>15 modèles</span>
                <span className={`w-1 h-1 rounded-full ${hero.metaDot}`} />
                <span>Export PDF</span>
              </div>
            </div>

            <FadeIn>
              <ScanCard />
            </FadeIn>
          </div>
        </section>
      </div>

      {/* ===== Galerie de modèles ===== */}
      <section id="modeles" className="px-6 py-16 sm:py-24 border-b border-[#E5E7E2] bg-[#F7F8F4]">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="flex items-end justify-between mb-10 gap-6">
            <div>
              <p
                className="text-xs font-medium uppercase tracking-[0.18em] text-[#0B6E4F] mb-3"
                style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
              >
                Bibliothèque de modèles
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold">Un modèle pour chaque profil</h2>
            </div>
            <p
              className="hidden sm:block text-sm text-[#10241C]/55 max-w-xs text-right"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              Changez de modèle et de couleur à tout moment, en aperçu direct dans l&apos;éditeur.
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <TemplateGallery />
          </FadeIn>
        </div>
      </section>

      {/* ===== Fonctionnalités — grille de cartes ===== */}
      <section className="px-6 py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="mb-12 max-w-lg">
            <p
              className="text-xs font-medium uppercase tracking-[0.18em] text-[#FF7A1A] mb-3"
              style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
            >
              Ce que vous obtenez
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold">Tout pour un CV qui convainc</h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-4">
            {FEATURES.map((item, i) => (
              <FadeIn key={item.titre} delay={i * 80}>
                <div className="h-full rounded-2xl border border-[#E5E7E2] p-6 hover:border-[#0B6E4F]/30 hover:shadow-[0_20px_40px_-30px_rgba(11,110,79,0.4)] transition">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B6E4F]/10 text-[#0B6E4F] mb-4">
                    <item.icon size={19} />
                  </div>
                  <h3 className="font-semibold mb-1.5">{item.titre}</h3>
                  <p
                    className="text-sm text-[#10241C]/55 leading-relaxed"
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  >
                    {item.texte}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Comment ça marche ===== */}
      <section className="px-6 py-16 sm:py-24 bg-[#F7F8F4] border-y border-[#E5E7E2]">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-14">
            <p
              className="text-xs font-medium uppercase tracking-[0.18em] text-[#0B6E4F] mb-3"
              style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
            >
              Trois étapes
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold">Comment ça marche</h2>
          </FadeIn>

          <div className="grid sm:grid-cols-3 relative gap-y-10">
            <div
              aria-hidden
              className="hidden sm:block absolute top-6 left-0 right-0 h-px bg-[#0B6E4F]/15"
            />
            {STEPS.map((step, i) => (
              <FadeIn key={step.num} delay={i * 100} className="relative pr-8">
                <span
                  className="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border border-[#0B6E4F]/25 text-[#0B6E4F] font-semibold"
                  style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
                >
                  {step.num}
                </span>
                <h3 className="font-semibold mb-1.5 mt-4">{step.titre}</h3>
                <p
                  className="text-sm text-[#10241C]/55 leading-relaxed max-w-[240px]"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  {step.texte}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Tarif — carte sombre en écho au hero ===== */}
      <section id="tarifs" className="px-6 py-16 sm:py-24 bg-white">
        <FadeIn className="max-w-sm mx-auto">
          <p
            className="text-xs font-medium uppercase tracking-[0.18em] text-[#FF7A1A] mb-4 text-center"
            style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
          >
            Tarif
          </p>
          <div className="rounded-2xl bg-[#0A1F16] text-white px-8 pt-8 pb-7 shadow-[0_30px_60px_-30px_rgba(10,31,22,0.5)]">
            <p className="text-sm text-white/50 mb-1" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
              Téléchargement du CV
            </p>
            <p className="text-5xl font-semibold mb-1">
              1 000 <span className="text-2xl text-white/50 font-normal">FCFA</span>
            </p>
            <p className="text-sm text-white/40 mb-6" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
              Paiement unique, sans abonnement
            </p>
            <Link
              href={ctaHref}
              className="flex items-center justify-center gap-2 w-full rounded-full bg-[#4ADE80] text-[#0A1F16] px-6 py-3.5 text-sm font-semibold hover:bg-[#6EE7A0] transition"
            >
              Commencer mon CV <ArrowUpRight size={15} />
            </Link>
          </div>
          <p className="text-center text-xs text-[#10241C]/45 mt-4" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
            Payez par Wave, sans carte bancaire.
          </p>
        </FadeIn>
      </section>

      {/* ===== Pied de page ===== */}
      <footer className="px-6 pt-10 pb-24 sm:pb-10 bg-[#0A1F16] text-white/50">
        <div
          className="max-w-6xl mx-auto flex flex-col gap-8"
          style={{ fontFamily: "Inter, system-ui, sans-serif" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-8">
            <div>
              <p className="text-white/80 font-medium mb-1.5">Mon CV Pro CI</p>
              <p className="text-xs max-w-xs leading-relaxed">
                Créateur de CV professionnel pensé pour le marché ivoirien. Vos données restent confidentielles.
              </p>
            </div>

            <div className="flex gap-10 text-xs">
              <div className="flex flex-col gap-2">
                <span className="text-white/30 uppercase tracking-[0.14em] text-[10px] mb-1">Produit</span>
                <a href="#modeles" className="hover:text-white transition">Modèles</a>
                <a href="#tarifs" className="hover:text-white transition">Tarifs</a>
                <Link href={ctaHref} className="hover:text-white transition">Créer mon CV</Link>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-white/30 uppercase tracking-[0.14em] text-[10px] mb-1">Légal</span>
                <Link href="/cgu" className="hover:text-white transition">Conditions d&apos;utilisation</Link>
                <Link href="/cgu#confidentialite" className="hover:text-white transition">Confidentialité</Link>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-white/30 uppercase tracking-[0.14em] text-[10px] mb-1">Contact</span>
                <a
                  href="https://wa.me/2250545177571"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  WhatsApp
                </a>
                <span>{content.phone}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 text-xs">
            © {new Date().getFullYear()} Mon CV Pro CI. Tous droits réservés.
          </div>
        </div>
      </footer>

      {/* ===== CTA sticky mobile ===== */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-[#0A1F16]/95 backdrop-blur border-t border-white/10">
        <Link
          href={ctaHref}
          className="flex items-center justify-center gap-2 rounded-full bg-[#4ADE80] text-[#0A1F16] px-5 py-3.5 text-sm font-semibold hover:bg-[#6EE7A0] transition"
        >
          Créer mon CV — 1 000 FCFA <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
