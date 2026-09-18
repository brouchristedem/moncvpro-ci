"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TemplateGallery from "@/components/landing/TemplateGallery";
import ProfileSelector from "@/components/landing/ProfileSelector";
import ScanCard from "@/components/landing/ScanCard";
import AtsCriteriaGrid from "@/components/landing/AtsCriteriaGrid";
import AvisSection from "@/components/landing/AvisSection";
import FAQSection from "@/components/landing/FAQSection";
import Reveal from "@/components/landing/Reveal";
import TemplateThumbnail from "@/components/landing/TemplateThumbnail";
import { demoCV } from "@/lib/demoCV";
import { ENTRY_GATE_KEY } from "@/lib/entryGate";

/**
 * ============================================================================
 * AUDIT DE PALETTE (src/app/globals.css, bloc @theme) — couleurs disponibles,
 * aucune autre couleur n'est utilisée dans ce fichier :
 *
 *   brand  (vert)   50 #e9f6ef · 100 #d2eedf · 200 #a6ddc0 · 300 #78cba0
 *                    400 #3fae7c · 500 #128f63 · 600 #0b6e4f · 700 #085b41
 *                    800 #073c2a · 900 #05291d
 *   accent (orange)  50 #fff3ea · 100 #ffe9d9 · 200 #ffd0ad · 300 #ffb37d
 *                    400 #ff9650 · 500 #ff8730 · 600 #ff7a1a · 700 #e35f05
 *                    800 #b84a03
 *   neutres (auto clair/sombre) background · foreground · surface ·
 *                    surface-muted · border · blanc pur (= --surface en clair)
 *
 * Convention déjà documentée dans globals.css et enfin appliquée partout
 * ici : le VERT (brand) porte la navigation et les actions ; l'ORANGE
 * (accent) est réservé aux prix, badges et mises en avant ponctuelles.
 * ============================================================================
 *
 * Trois polices, déjà chargées dans layout.tsx mais jusque-là inutilisées
 * (Space Grotesk et Inter servaient à décorer le <head>, sans être câblées
 * nulle part) :
 *   - Space Grotesk : titres (display)
 *   - Inter          : corps de texte, sur cette page uniquement — le reste
 *                      du site (éditeur, admin) garde sa police système,
 *                      aucune modification globale
 *   - JetBrains Mono : chiffres et étiquettes (prix, étapes, badges) — une
 *                      troisième couche typographique pour les éléments
 *                      "données", cohérente avec le champ de police
 *                      `--font-mono` déjà utilisé par ScanCard
 *
 * Micro-interactions : Reveal.tsx (IntersectionObserver natif, ~50 lignes,
 * aucune librairie) pour les apparitions au scroll.
 *
 * Écarts assumés par rapport au brief, par souci d'honnêteté (voir aussi
 * /preferences : aucune statistique inventée) :
 *   - Pas de "nombre d'utilisateurs" en preuve sociale : aucun chiffre de ce
 *     type n'est mesuré aujourd'hui. À la place, des faits vérifiables (15
 *     modèles, 1 000 FCFA, Wave) et les vrais avis modérés plus bas.
 *   - Témoignages sans photo ni métier : les avis sont des soumissions
 *     anonymes modérées (voir AvisForm/AvisSection) — aucun de ces champs
 *     n'existe. Avatar = monogramme généré à partir du prénom réel donné.
 *   - Badge "Populaire" : mise en avant éditoriale d'un modèle, pas une
 *     statistique d'usage (aucune donnée de ce type collectée aujourd'hui).
 * ============================================================================
 */

const STEPS = [
  {
    num: "01",
    titre: "Remplissez vos informations",
    texte: "Renseignez votre parcours dans l'éditeur, section par section.",
  },
  {
    num: "02",
    titre: "Choisissez un modèle",
    texte: "Changez de style et de couleur à tout moment, en aperçu direct.",
  },
  {
    num: "03",
    titre: "Testez, puis payez par Wave",
    texte: "Aperçu gratuit avant paiement — 1 000 FCFA le CV seul, 1 500 FCFA avec la lettre de motivation.",
  },
];

const PROOF = [
  { chiffre: "15", label: "modèles" },
  { chiffre: "1 000", label: "FCFA / CV" },
  { chiffre: "0", label: "abonnement" },
  { chiffre: "Wave", label: "sans carte bancaire" },
];

export default function Home() {
  const ctaHref = "/editor";

  useEffect(() => {
    try {
      window.sessionStorage.setItem(ENTRY_GATE_KEY, "1");
    } catch {
      // sessionStorage indisponible (navigation privée stricte, etc.) : on
      // laisse simplement l'éditeur accessible sans bloquer la personne.
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-background text-foreground font-['Inter']">
      {/* ===== Couverture : navigation + hero + preuves, un seul bloc vert foncé ===== */}
      <div className="bg-brand-900">
        <header className="flex items-center justify-between px-4 sm:px-6 py-5 max-w-6xl mx-auto">
          <span className="flex items-center gap-2.5 font-bold text-lg tracking-tight font-['Space_Grotesk'] text-white">
            <span aria-hidden className="w-2.5 h-2.5 rounded-full bg-accent-500 flex-shrink-0" />
            MON CV PRO CI
          </span>
          <nav className="hidden sm:flex items-center gap-7 text-sm text-brand-200" aria-label="Navigation principale">
            <a href="#modeles" className="hover:text-white transition focus-visible:outline-2 focus-visible:outline-accent-500 rounded">Modèles</a>
            <a href="#scan-ats" className="hover:text-white transition focus-visible:outline-2 focus-visible:outline-accent-500 rounded">Scan ATS</a>
            <a href="#tarifs" className="hover:text-white transition focus-visible:outline-2 focus-visible:outline-accent-500 rounded">Tarifs</a>
            <a href="#faq" className="hover:text-white transition focus-visible:outline-2 focus-visible:outline-accent-500 rounded">FAQ</a>
          </nav>
          <Link
            href={ctaHref}
            className="rounded-full bg-white text-brand-900 px-4 py-2 text-sm font-semibold hover:bg-brand-50 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
          >
            Créer mon CV
          </Link>
        </header>

        <section className="px-4 sm:px-6 pt-8 pb-14 sm:pt-14 sm:pb-20" aria-labelledby="hero-heading">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
            <div>
              <span className="inline-block text-[11px] font-['JetBrains_Mono'] font-semibold uppercase tracking-[0.18em] text-accent-400 mb-5">
                Dossier candidat
              </span>
              <h1
                id="hero-heading"
                className="font-['Space_Grotesk'] text-[2.5rem] sm:text-6xl lg:text-[3.9rem] font-bold leading-[1.02] mb-6 text-white max-w-[12ch]"
              >
                Le CV qui vous décroche l&apos;entretien.
              </h1>
              <p className="text-base sm:text-lg text-brand-100 mb-9 max-w-md leading-relaxed">
                15 modèles pensés pour le marché ivoirien, un éditeur gratuit et un score
                ATS inclus. Vous ne payez qu&apos;au moment de télécharger.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Link
                  href={ctaHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-brand-900 px-7 py-3.5 text-sm font-semibold hover:bg-brand-50 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
                >
                  Commencer gratuitement <ArrowRight size={16} />
                </Link>
                <a
                  href="#modeles"
                  className="inline-flex items-center justify-center gap-1.5 px-2 py-3.5 text-sm font-medium text-brand-200 hover:text-white transition focus-visible:outline-2 focus-visible:outline-accent-500 rounded"
                >
                  Voir les 15 modèles →
                </a>
              </div>
            </div>

            {/* Aperçu réel d'un modèle, incliné en perspective — pas un mockup fictif */}
            <div className="flex justify-center lg:justify-end" style={{ perspective: "1400px" }}>
              <div
                className="w-[210px] sm:w-[250px] rounded-lg overflow-hidden shadow-[0_50px_80px_-20px_rgba(0,0,0,0.6)]"
                style={{ transform: "rotateY(-16deg) rotateX(5deg) rotateZ(2deg)" }}
              >
                <TemplateThumbnail cv={demoCV("template-13", "#ff8730", "cercle")} />
              </div>
            </div>
          </div>

          {/* Bandeau de preuves — reste dans la couverture, pas de section séparée */}
          <div className="max-w-6xl mx-auto mt-14 sm:mt-20 flex flex-wrap gap-x-10 gap-y-6 border-t border-white/10 pt-8">
            {PROOF.map((item) => (
              <div key={item.label} className="flex items-baseline gap-2">
                <span className="font-['JetBrains_Mono'] text-2xl sm:text-3xl font-bold text-white">{item.chiffre}</span>
                <span className="text-xs sm:text-sm text-brand-300">{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ===== Comment ça marche ===== */}
      <section className="px-4 sm:px-6 py-20 sm:py-28" aria-labelledby="steps-heading">
        <h2 id="steps-heading" className="sr-only">Comment ça marche</h2>
        <div className="max-w-4xl mx-auto flex flex-col gap-12 sm:gap-16">
          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 100}>
              <div className="flex items-start gap-6 sm:gap-10">
                <span className="font-['JetBrains_Mono'] text-4xl sm:text-6xl font-bold text-brand-600/15 leading-none flex-shrink-0 select-none" aria-hidden>
                  {step.num}
                </span>
                <div className="pt-1 sm:pt-3">
                  <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl font-semibold mb-2">{step.titre}</h3>
                  <p className="text-sm sm:text-base text-foreground/55 leading-relaxed max-w-md">{step.texte}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Galerie de modèles (réels) ===== */}
      <section id="modeles" className="px-4 sm:px-6 py-16 sm:py-24 bg-surface-muted border-y border-border" aria-labelledby="modeles-heading">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-10">
            <h2 id="modeles-heading" className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold mb-3">Un modèle pour chaque profil</h2>
            <p className="text-sm text-foreground/55 max-w-md">
              Changez de modèle et de couleur à tout moment, en aperçu direct dans l&apos;éditeur.
            </p>
          </Reveal>
          <div className="mb-10">
            <ProfileSelector />
          </div>
          <TemplateGallery showCompare={false} />
        </div>
      </section>

      {/* ===== Scan ATS (réel) ===== */}
      <section id="scan-ats" className="px-4 sm:px-6 py-16 sm:py-24" aria-labelledby="ats-heading">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.85fr_1.15fr] gap-14 items-center mb-14">
          <Reveal>
            <h2 id="ats-heading" className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold mb-4 max-w-[14ch]">
              Un CV parfait ne suffit pas s&apos;il n&apos;est jamais lu
            </h2>
            <p className="text-sm sm:text-base text-foreground/55 mb-8 max-w-md leading-relaxed">
              La majorité des grandes entreprises filtrent les candidatures avec un logiciel
              avant qu&apos;un humain ne les voie. Voici les 8 critères vérifiés en direct
              dans l&apos;éditeur, avec un score en temps réel.
            </p>
            <Link
              href="/scanner-cv"
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 text-white px-5 py-2.5 text-sm font-semibold hover:bg-brand-700 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
            >
              Scanner mon CV actuel (gratuit) <ArrowRight size={14} />
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <ScanCard />
          </Reveal>
        </div>
        <div className="max-w-6xl mx-auto">
          <AtsCriteriaGrid />
        </div>
      </section>

      {/* ===== Tarification — 2 cartes, orange réservé au prix/mise en avant ===== */}
      <section id="tarifs" className="px-4 sm:px-6 py-16 sm:py-24 bg-surface-muted border-y border-border" aria-labelledby="tarifs-heading">
        <div className="max-w-3xl mx-auto">
          <Reveal className="mb-10">
            <h2 id="tarifs-heading" className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold mb-2">
              Un tarif simple, sans abonnement
            </h2>
            <p className="text-sm text-foreground/55">Aperçu gratuit avant tout paiement. Payez par Wave, sans carte bancaire.</p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-5">
            <Reveal>
              <div className="h-full rounded-2xl border border-border bg-surface px-8 pt-8 pb-7">
                <p className="text-sm font-medium text-foreground/70 mb-4">CV seul</p>
                <p className="font-['JetBrains_Mono'] text-4xl font-bold text-accent-600 mb-1">
                  1 000<span className="text-lg text-foreground/40 font-normal ml-1.5">FCFA</span>
                </p>
                <p className="text-xs text-foreground/50 mb-6">par téléchargement</p>
                <ul className="text-sm text-foreground/70 space-y-2">
                  <li>PDF haute qualité, prêt à l&apos;envoi</li>
                  <li>Score ATS inclus dans l&apos;éditeur</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="h-full relative rounded-2xl border-2 border-brand-600 bg-surface px-8 pt-8 pb-7">
                <span className="absolute -top-3 left-8 rounded-full bg-accent-600 text-white text-[10px] font-semibold uppercase tracking-wide px-3 py-1">
                  Recommandé
                </span>
                <p className="text-sm font-medium text-foreground/70 mb-4">Pack Candidature Complète</p>
                <p className="font-['JetBrains_Mono'] text-4xl font-bold text-accent-600 mb-1">
                  1 500<span className="text-lg text-foreground/40 font-normal ml-1.5">FCFA</span>
                </p>
                <p className="text-xs text-foreground/50 mb-6">par téléchargement</p>
                <ul className="text-sm text-foreground/70 space-y-2">
                  <li>CV + lettre de motivation assortie</li>
                  <li>Un seul PDF, prêt à l&apos;envoi</li>
                  <li>Score ATS inclus dans l&apos;éditeur</li>
                </ul>
              </div>
            </Reveal>
          </div>

          <Link
            href={ctaHref}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 text-white px-7 py-3.5 text-sm font-semibold hover:bg-brand-700 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
          >
            Créer mon CV maintenant <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ===== Avis (réels, modérés depuis /admin) ===== */}
      <section id="avis" className="px-4 sm:px-6 py-16 sm:py-24" aria-labelledby="avis-heading">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-10">
            <h2 id="avis-heading" className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold">
              Ce qu&apos;en pensent nos utilisateurs
            </h2>
          </Reveal>
          <AvisSection />
        </div>
      </section>

      {/* ===== FAQ (réelle, 5 questions sélectionnées) ===== */}
      <section id="faq" className="px-4 sm:px-6 py-16 sm:py-24 bg-surface-muted border-y border-border" aria-labelledby="faq-heading">
        <div className="max-w-2xl mx-auto">
          <Reveal className="mb-10">
            <h2 id="faq-heading" className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold">Questions fréquentes</h2>
          </Reveal>
          <FAQSection pick={[0, 5, 1, 2, 8]} />
        </div>
      </section>

      {/* ===== CTA final + pied de page — même vert foncé que la couverture, en écho ===== */}
      <div className="bg-brand-900 text-brand-200">
        <section className="px-4 sm:px-6 pt-20 pb-16 sm:pt-24 sm:pb-20 text-center" aria-labelledby="cta-final-heading">
          <Reveal>
            <h2 id="cta-final-heading" className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white max-w-lg mx-auto mb-8">
              Votre prochain emploi commence par un bon CV.
            </h2>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-full bg-white text-brand-900 px-8 py-4 text-sm font-semibold hover:bg-brand-50 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
            >
              Créer mon CV maintenant <ArrowRight size={16} />
            </Link>
          </Reveal>
        </section>

        <footer className="px-4 sm:px-6 pt-10 pb-28 sm:pb-10 border-t border-white/10">
          <div className="max-w-6xl mx-auto flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between text-xs">
            <div>
              <p className="text-white font-semibold mb-1.5 text-sm font-['Space_Grotesk']">MON CV PRO CI</p>
              <p className="max-w-xs leading-relaxed">
                Créateur de CV professionnel pensé pour le marché ivoirien. Vos données restent confidentielles.
              </p>
            </div>
            <nav className="flex flex-wrap gap-10" aria-label="Pied de page">
              <div className="flex flex-col gap-2">
                <span className="text-brand-400 uppercase tracking-[0.12em] text-[10px] mb-1">Produit</span>
                <a href="#modeles" className="hover:text-white transition">Modèles</a>
                <a href="#scan-ats" className="hover:text-white transition">Scan ATS</a>
                <Link href="/scanner-cv" className="hover:text-white transition">Scanner mon CV</Link>
                <a href="#tarifs" className="hover:text-white transition">Tarifs</a>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-brand-400 uppercase tracking-[0.12em] text-[10px] mb-1">Légal</span>
                <Link href="/cgu" className="hover:text-white transition">Conditions d&apos;utilisation</Link>
                <Link href="/cgu#confidentialite" className="hover:text-white transition">Confidentialité</Link>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-brand-400 uppercase tracking-[0.12em] text-[10px] mb-1">Contact</span>
                <a href="https://wa.me/2250545177571" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  WhatsApp
                </a>
                <span>+225 05 45 17 75 71</span>
              </div>
            </nav>
          </div>
          <div className="max-w-6xl mx-auto pt-6 mt-8 border-t border-white/10 text-xs">
            © {new Date().getFullYear()} MON CV PRO CI. Tous droits réservés.
          </div>
        </footer>
      </div>

      {/* ===== CTA sticky mobile ===== */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-background/95 backdrop-blur border-t border-border">
        <Link
          href={ctaHref}
          className="flex items-center justify-center gap-2 rounded-full bg-brand-600 text-white px-5 py-3 text-sm font-semibold hover:bg-brand-700 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
        >
          Créer mon CV — 1 000 FCFA <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
