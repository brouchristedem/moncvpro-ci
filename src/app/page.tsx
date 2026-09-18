"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import TemplateGallery from "@/components/landing/TemplateGallery";
import ProfileSelector from "@/components/landing/ProfileSelector";
import ScanCard from "@/components/landing/ScanCard";
import AtsCriteriaGrid from "@/components/landing/AtsCriteriaGrid";
import AvisSection from "@/components/landing/AvisSection";
import FAQSection from "@/components/landing/FAQSection";
import { ENTRY_GATE_KEY } from "@/lib/entryGate";

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
    titre: "Testez gratuitement, puis payez par Wave",
    texte: "Aperçu gratuit avant paiement, puis 1 000 FCFA pour le CV seul ou 1 500 FCFA avec la lettre de motivation.",
  },
];

// Refonte de la page d'accueil (septembre 2026) : structure resserrée pour
// réduire le défilement — les sections "Avant/Après", grille de fonctionnalités
// et "Débutants" (redondantes avec le hero/les étapes) ont été retirées, la
// section WhatsApp en page a été retirée car le bouton flottant global
// (WhatsAppButton.tsx, dans layout.tsx) remplit déjà ce rôle sur tout le site.
// Les animations d'apparition au défilement sur chaque section ont été
// retirées au profit d'un seul moment animé (le ScanCard du hero, déjà réel).
// Les titres utilisent Space Grotesk (déjà chargée dans layout.tsx mais
// jusqu'ici inutilisée) pour donner une identité typographique propre à la
// page d'accueil, sans toucher à la police du reste du site (éditeur, admin).
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
      {/* ===== En-tête ===== */}
      <header className="sticky top-0 z-20 grid grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 py-4 border-b border-border bg-background/95 backdrop-blur overflow-hidden">
        <span />
        <span className="relative font-bold text-xl sm:text-2xl tracking-tight font-['Space_Grotesk']">
          {/* Drapeau ivoirien discret, en fond, derrière le nom */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 flex h-full w-[160%] min-w-[220px] opacity-90"
          >
            <span className="flex-1 bg-[#9A4600]" />
            <span className="flex-1 bg-white" />
            <span className="flex-1 bg-[#00512B]" />
          </span>
          <span className="text-black">MON CV PRO CI</span>
        </span>
        <nav className="hidden sm:flex items-center justify-end gap-6 text-sm text-foreground/60">
          <a href="#modeles" className="hover:text-foreground transition">Modèles</a>
          <a href="#scan-ats" className="hover:text-foreground transition">Scan ATS</a>
          <a href="#faq" className="hover:text-foreground transition">FAQ</a>
          <a href="#tarifs" className="hover:text-foreground transition">Tarifs</a>
          <Link
            href={ctaHref}
            className="rounded-full bg-brand-600 text-white px-4 py-2 text-sm font-semibold hover:bg-brand-700 transition"
          >
            Créer mon CV
          </Link>
        </nav>
      </header>

      {/* ===== Hero — mise en page asymétrique : texte à gauche, aperçu réel à droite ===== */}
      <section className="px-4 sm:px-6 pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          <div>
            <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-[3.4rem] font-bold mb-6 leading-[1.05] max-w-[13ch]">
              Créez le CV qui vous décroche l&apos;entretien.
            </h1>
            <p className="text-base sm:text-lg text-foreground/60 mb-8 max-w-md leading-relaxed">
              15 modèles pensés pour le marché ivoirien, un éditeur gratuit et un score ATS
              inclus. Vous ne payez qu&apos;au moment de télécharger.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
              <Link
                href={ctaHref}
                className="flex items-center justify-center gap-2 rounded-full bg-brand-600 text-white px-6 py-3 text-sm font-semibold hover:bg-brand-700 transition"
              >
                Commencer gratuitement <ArrowRight size={16} />
              </Link>
              <a
                href="#modeles"
                className="flex items-center justify-center gap-1.5 px-6 py-3 text-sm font-medium text-foreground/70 hover:text-foreground transition"
              >
                Voir les modèles →
              </a>
            </div>
            <p className="text-xs text-foreground/45">Aucune carte bancaire requise pour créer votre CV.</p>
          </div>

          <ScanCard />
        </div>
      </section>

      {/* ===== Bandeau de preuves ===== */}
      <section className="border-y border-border bg-surface-muted">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 divide-x divide-border">
          {[
            { chiffre: "15", label: "modèles professionnels" },
            { chiffre: "1 000 FCFA", label: "par CV téléchargé" },
            { chiffre: "100%", label: "éditeur gratuit, sans compte" },
            { chiffre: "Wave", label: "paiement mobile, sans carte" },
          ].map((item, i) => (
            <div key={item.label} className={`px-5 py-7 text-center ${i >= 2 ? "border-t sm:border-t-0 border-border" : ""}`}>
              <p className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold">{item.chiffre}</p>
              <p className="text-[11px] sm:text-xs text-foreground/55 mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Comment ça marche ===== */}
      <section className="px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-14">
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold">Trois étapes, un CV prêt</h2>
          </div>

          <div className="grid sm:grid-cols-3 relative gap-y-10 text-center sm:text-left">
            <div aria-hidden className="hidden sm:block absolute top-6 left-0 right-0 h-px bg-brand-600/15" />
            {STEPS.map((step) => (
              <div key={step.num} className="relative flex flex-col items-center sm:items-start sm:pr-8">
                <span className="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-full bg-surface border border-brand-600/25 text-brand-600 font-bold">
                  {step.num}
                </span>
                <h3 className="font-semibold mb-1.5 mt-4">{step.titre}</h3>
                <p className="text-sm text-foreground/55 leading-relaxed max-w-[240px]">{step.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Galerie de modèles (réels) ===== */}
      <section id="modeles" className="px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-10">
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold mb-3">Un modèle pour chaque profil</h2>
            <p className="text-sm text-foreground/55 max-w-md">
              Changez de modèle et de couleur à tout moment, en aperçu direct dans l&apos;éditeur.
            </p>
          </div>
          <div className="mb-10">
            <ProfileSelector />
          </div>
          <TemplateGallery />
        </div>
      </section>

      {/* ===== Scan ATS (réel) ===== */}
      <section id="scan-ats" className="px-4 sm:px-6 py-16 sm:py-24 bg-surface-muted border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 dark:text-brand-400 bg-brand-600/10 px-3 py-1.5 rounded-full mb-4">
              <ShieldCheck size={13} /> Compatibilité ATS
            </span>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold mb-3">
              Un CV parfait ne suffit pas s&apos;il n&apos;est jamais lu
            </h2>
            <p className="text-sm text-foreground/55 max-w-lg">
              La majorité des grandes entreprises filtrent les candidatures avec un logiciel
              avant qu&apos;un humain ne les voie. Voici les 8 critères vérifiés en direct dans
              l&apos;éditeur.
            </p>
          </div>
          <AtsCriteriaGrid />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href="/scanner-cv"
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 text-white px-5 py-2.5 text-sm font-semibold hover:bg-brand-700 transition"
            >
              Scanner mon CV actuel (gratuit) <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Tarifs ===== */}
      <section id="tarifs" className="px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-center mb-10">
            Un tarif simple, sans abonnement
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-border bg-surface px-8 pt-8 pb-7 text-center">
              <p className="text-sm text-foreground/55 mb-1">CV seul</p>
              <p className="flex items-center justify-center gap-2 text-4xl font-bold mb-2 font-['Space_Grotesk']">
                <span>1 000</span> <span className="text-xl text-foreground/45 font-normal leading-none">FCFA</span>
              </p>
              <p className="text-xs text-foreground/50">Votre CV en PDF, prêt à l&apos;envoi.</p>
            </div>
            <div className="relative rounded-2xl border-2 border-brand-600 bg-surface px-8 pt-8 pb-7 text-center">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 text-white text-[10px] font-semibold uppercase tracking-wide px-3 py-1">
                Recommandé
              </span>
              <p className="text-sm text-foreground/55 mb-1">Pack Candidature Complète</p>
              <p className="flex items-center justify-center gap-2 text-4xl font-bold mb-2 font-['Space_Grotesk']">
                <span>1 500</span> <span className="text-xl text-foreground/45 font-normal leading-none">FCFA</span>
              </p>
              <p className="text-xs text-foreground/50">
                Votre CV et une lettre de motivation assortie, en un seul PDF prêt à l&apos;envoi.
              </p>
            </div>
          </div>
          <p className="text-center text-xs text-foreground/45 mt-5">
            Payez par Wave, sans carte bancaire. Aperçu gratuit avant tout paiement.
          </p>
          <div className="text-center mt-8">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 text-white px-6 py-3 text-sm font-semibold hover:bg-brand-700 transition"
            >
              Créer mon CV maintenant <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Avis (réels, modérés depuis /admin) ===== */}
      <section id="avis" className="px-4 sm:px-6 py-16 sm:py-24 bg-surface-muted border-y border-border">
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold">Ce qu&apos;en pensent nos utilisateurs</h2>
        </div>
        <AvisSection />
      </section>

      {/* ===== FAQ (réelle) ===== */}
      <section id="faq" className="px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold">Questions fréquentes</h2>
        </div>
        <FAQSection />
      </section>

      {/* ===== Pied de page ===== */}
      <footer className="px-4 sm:px-6 pt-10 pb-24 sm:pb-10 bg-surface-muted border-t border-border text-foreground/55">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col items-center text-center gap-8 sm:flex-row sm:items-start sm:justify-between sm:text-left">
            <div className="flex flex-col items-center sm:items-start">
              <p className="text-foreground font-semibold mb-1.5 text-sm font-['Space_Grotesk']">MON CV PRO CI</p>
              <p className="text-xs max-w-xs leading-relaxed">
                Créateur de CV professionnel pensé pour le marché ivoirien. Vos données restent confidentielles.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-10 text-xs sm:justify-start">
              <div className="flex flex-col items-center gap-2 sm:items-start">
                <span className="text-foreground/35 uppercase tracking-[0.12em] text-[10px] mb-1">Produit</span>
                <a href="#modeles" className="hover:text-foreground transition">Modèles</a>
                <a href="#scan-ats" className="hover:text-foreground transition">Scan ATS</a>
                <Link href="/scanner-cv" className="hover:text-foreground transition">Scanner mon CV</Link>
                <a href="#avis" className="hover:text-foreground transition">Avis</a>
                <a href="#faq" className="hover:text-foreground transition">FAQ</a>
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
          className="flex items-center justify-center gap-2 rounded-full bg-brand-600 text-white px-5 py-3 text-sm font-semibold hover:bg-brand-700 transition"
        >
          Créer mon CV — 1 000 FCFA <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
