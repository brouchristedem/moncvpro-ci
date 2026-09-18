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
import { ENTRY_GATE_KEY } from "@/lib/entryGate";

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
  { chiffre: "100%", label: "gratuit à l'essai" },
  { chiffre: "Wave", label: "sans carte bancaire" },
];

// Refonte complète (septembre 2026) — deuxième passe. La première refonte
// (structure allégée, hero à deux colonnes) gardait encore l'ossature d'un
// gabarit SaaS générique (bouton pilule + badge arrondi centrés). Cette
// version change de parti pris visuel : la page d'accueil s'ouvre sur une
// "couverture" sombre pleine largeur (texte + un cachet circulaire, motif
// repris de la maquette validée au tout début mais jamais vraiment intégré
// au code jusqu'ici), puis bascule franchement vers le contenu clair — pas
// de dégradé, une coupure nette, comme un dossier qu'on ouvre. Les étapes
// sont numérotées en gros chiffres fantômes plutôt qu'en petits ronds. Les
// tarifs sont présentés en registre à règles, pas en cartes avec ombre. Le
// pied de page reprend le sombre de la couverture, en écho.
//
// Le bouton "Comparer" de la galerie de modèles est masqué ici
// (showCompare=false) : fonctionnalité réelle et utile dans l'éditeur, mais
// hors sujet sur une page dont le rôle est de convertir, pas de comparer.
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
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-background text-foreground">
      {/* ===== Couverture sombre : en-tête + hero + preuves, un seul bloc ===== */}
      <div className="bg-[#04140F] text-[#EAF2EC]">
        <header className="flex items-center justify-between px-4 sm:px-6 py-5 max-w-6xl mx-auto">
          <span className="flex items-center gap-2.5 font-bold text-lg tracking-tight font-['Space_Grotesk']">
            <span
              aria-hidden
              className="w-7 h-7 rounded-full flex-shrink-0"
              style={{ background: "conic-gradient(#FF9A52 0deg 180deg, #EAF2EC 180deg 190deg, #39C293 190deg 360deg)" }}
            />
            MON CV PRO CI
          </span>
          <nav className="hidden sm:flex items-center gap-7 text-sm text-[#EAF2EC]/60">
            <a href="#modeles" className="hover:text-[#EAF2EC] transition">Modèles</a>
            <a href="#scan-ats" className="hover:text-[#EAF2EC] transition">Scan ATS</a>
            <a href="#tarifs" className="hover:text-[#EAF2EC] transition">Tarifs</a>
            <a href="#faq" className="hover:text-[#EAF2EC] transition">FAQ</a>
          </nav>
          <Link
            href={ctaHref}
            className="rounded-full bg-[#39C293] text-[#04140F] px-4 py-2 text-sm font-semibold hover:bg-[#5fd4ac] transition"
          >
            Créer mon CV
          </Link>
        </header>

        <section className="px-4 sm:px-6 pt-8 pb-14 sm:pt-12 sm:pb-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-14 items-center">
            <div>
              <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#39C293] mb-5">
                Dossier candidat
              </span>
              <h1 className="font-['Space_Grotesk'] text-[2.6rem] sm:text-6xl lg:text-[4.2rem] font-bold leading-[0.98] mb-7 max-w-[11ch]">
                Le CV qui vous décroche l&apos;entretien.
              </h1>
              <p className="text-base sm:text-lg text-[#EAF2EC]/55 mb-9 max-w-md leading-relaxed">
                15 modèles pensés pour le marché ivoirien, un éditeur gratuit et un score
                ATS inclus. Vous ne payez qu&apos;au moment de télécharger.
              </p>
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 rounded-full bg-[#39C293] text-[#04140F] px-7 py-3.5 text-sm font-semibold hover:bg-[#5fd4ac] transition"
              >
                Commencer gratuitement <ArrowRight size={16} />
              </Link>
            </div>

            {/* Cachet — motif de marque, purement illustratif */}
            <div className="flex justify-center lg:justify-end" aria-hidden>
              <div className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] motion-safe:animate-[seal-in_0.6s_cubic-bezier(0.2,1.4,0.4,1)_0.2s_both]">
                <div className="absolute inset-0 rounded-full border-2 border-[#FF9A52]/70" />
                <div className="absolute inset-3 rounded-full border border-[#FF9A52]/30" />
                <div className="absolute inset-0 flex flex-col items-center justify-center -rotate-[10deg] text-[#FF9A52] font-['Space_Grotesk'] text-center">
                  <span className="text-[11px] tracking-[0.2em] font-semibold">CONFORME</span>
                  <span className="text-2xl sm:text-3xl font-bold my-0.5">ATS</span>
                  <span className="text-[11px] tracking-[0.2em] font-semibold">✓ VALIDÉ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bandeau de preuves — reste sur fond sombre, pas de carte séparée */}
          <div className="max-w-6xl mx-auto mt-14 sm:mt-20 flex flex-wrap gap-x-10 gap-y-6 border-t border-[#EAF2EC]/10 pt-8">
            {PROOF.map((item) => (
              <div key={item.label} className="flex items-baseline gap-2">
                <span className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold">{item.chiffre}</span>
                <span className="text-xs sm:text-sm text-[#EAF2EC]/45">{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ===== Comment ça marche — chiffres fantômes ===== */}
      <section className="px-4 sm:px-6 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto flex flex-col gap-12 sm:gap-16">
          {STEPS.map((step) => (
            <div key={step.num} className="flex items-start gap-6 sm:gap-10">
              <span className="font-['Space_Grotesk'] text-5xl sm:text-7xl font-bold text-brand-600/15 leading-none flex-shrink-0 select-none">
                {step.num}
              </span>
              <div className="pt-2 sm:pt-4">
                <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl font-semibold mb-2">{step.titre}</h3>
                <p className="text-sm sm:text-base text-foreground/55 leading-relaxed max-w-md">{step.texte}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Galerie de modèles (réels) ===== */}
      <section id="modeles" className="px-4 sm:px-6 py-16 sm:py-24 bg-surface-muted border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold mb-3">Un modèle pour chaque profil</h2>
            <p className="text-sm text-foreground/55 max-w-md">
              Changez de modèle et de couleur à tout moment, en aperçu direct dans l&apos;éditeur.
            </p>
          </div>
          <div className="mb-10">
            <ProfileSelector />
          </div>
          <TemplateGallery showCompare={false} />
        </div>
      </section>

      {/* ===== Scan ATS (réel) ===== */}
      <section id="scan-ats" className="px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.85fr_1.15fr] gap-14 items-center">
          <div>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold mb-4 max-w-[14ch]">
              Un CV parfait ne suffit pas s&apos;il n&apos;est jamais lu
            </h2>
            <p className="text-sm sm:text-base text-foreground/55 mb-8 max-w-md leading-relaxed">
              La majorité des grandes entreprises filtrent les candidatures avec un logiciel
              avant qu&apos;un humain ne les voie. Voici les 8 critères vérifiés en direct
              dans l&apos;éditeur.
            </p>
            <Link
              href="/scanner-cv"
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 text-white px-5 py-2.5 text-sm font-semibold hover:bg-brand-700 transition"
            >
              Scanner mon CV actuel (gratuit) <ArrowRight size={14} />
            </Link>
          </div>
          <ScanCard />
        </div>
        <div className="max-w-6xl mx-auto mt-14">
          <AtsCriteriaGrid />
        </div>
      </section>

      {/* ===== Tarifs — registre à règles, pas de cartes ===== */}
      <section id="tarifs" className="px-4 sm:px-6 py-16 sm:py-24 bg-surface-muted border-y border-border">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold mb-10">
            Un tarif simple, sans abonnement
          </h2>

          <div className="rounded-3xl bg-surface border border-border overflow-hidden">
            <div className="flex items-center justify-between px-7 sm:px-9 py-6 border-b border-border">
              <div>
                <p className="font-medium">CV seul</p>
                <p className="text-xs text-foreground/50 mt-0.5">PDF haute qualité, prêt à l&apos;envoi</p>
              </div>
              <p className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold whitespace-nowrap ml-4">
                1 000 <span className="text-sm text-foreground/45 font-normal">FCFA</span>
              </p>
            </div>
            <div className="flex items-center justify-between px-7 sm:px-9 py-6">
              <div>
                <p className="font-medium flex items-center gap-2">
                  Pack Candidature Complète
                  <span className="rounded-full bg-brand-600/10 text-brand-700 dark:text-brand-400 text-[10px] font-semibold px-2 py-0.5">
                    Recommandé
                  </span>
                </p>
                <p className="text-xs text-foreground/50 mt-0.5">CV + lettre de motivation assortie</p>
              </div>
              <p className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold whitespace-nowrap ml-4">
                1 500 <span className="text-sm text-foreground/45 font-normal">FCFA</span>
              </p>
            </div>
          </div>

          <p className="text-xs text-foreground/45 mt-5">
            Payez par Wave, sans carte bancaire. Aperçu gratuit avant tout paiement.
          </p>
          <Link
            href={ctaHref}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 text-white px-7 py-3.5 text-sm font-semibold hover:bg-brand-700 transition"
          >
            Créer mon CV maintenant <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ===== Avis (réels, modérés depuis /admin) ===== */}
      <section id="avis" className="px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold mb-10">
            Ce qu&apos;en pensent nos utilisateurs
          </h2>
          <AvisSection />
        </div>
      </section>

      {/* ===== FAQ (réelle) ===== */}
      <section id="faq" className="px-4 sm:px-6 py-16 sm:py-24 bg-surface-muted border-y border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold mb-10">Questions fréquentes</h2>
          <FAQSection />
        </div>
      </section>

      {/* ===== Pied de page — reprend le sombre de la couverture, en écho ===== */}
      <footer className="px-4 sm:px-6 pt-12 pb-28 sm:pb-12 bg-[#04140F] text-[#EAF2EC]/55">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-[#EAF2EC] font-semibold mb-1.5 text-sm font-['Space_Grotesk']">MON CV PRO CI</p>
              <p className="text-xs max-w-xs leading-relaxed">
                Créateur de CV professionnel pensé pour le marché ivoirien. Vos données restent confidentielles.
              </p>
            </div>

            <div className="flex flex-wrap gap-10 text-xs">
              <div className="flex flex-col gap-2">
                <span className="text-[#EAF2EC]/30 uppercase tracking-[0.12em] text-[10px] mb-1">Produit</span>
                <a href="#modeles" className="hover:text-[#EAF2EC] transition">Modèles</a>
                <a href="#scan-ats" className="hover:text-[#EAF2EC] transition">Scan ATS</a>
                <Link href="/scanner-cv" className="hover:text-[#EAF2EC] transition">Scanner mon CV</Link>
                <a href="#avis" className="hover:text-[#EAF2EC] transition">Avis</a>
                <a href="#tarifs" className="hover:text-[#EAF2EC] transition">Tarifs</a>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[#EAF2EC]/30 uppercase tracking-[0.12em] text-[10px] mb-1">Légal</span>
                <Link href="/cgu" className="hover:text-[#EAF2EC] transition">Conditions d&apos;utilisation</Link>
                <Link href="/cgu#confidentialite" className="hover:text-[#EAF2EC] transition">Confidentialité</Link>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[#EAF2EC]/30 uppercase tracking-[0.12em] text-[10px] mb-1">Contact</span>
                <a
                  href="https://wa.me/2250545177571"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#EAF2EC] transition"
                >
                  WhatsApp
                </a>
                <span>+225 05 45 17 75 71</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#EAF2EC]/10 text-xs">
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
