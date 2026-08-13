"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import TemplateGallery from "@/components/landing/TemplateGallery";
import FadeIn from "@/components/landing/FadeIn";
import DossierPreview from "@/components/landing/DossierPreview";
import { ENTRY_GATE_KEY } from "@/lib/entryGate";

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
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-[#FAF9F5] text-[#10241C]">
      {/* En-tête façon papier à en-tête : liseré fin, pas de pilule flottante */}
      <header className="sticky top-0 z-30 bg-[#FAF9F5]/95 backdrop-blur border-b border-[#0B6E4F]">
        <div className="flex items-center justify-between px-6 py-4 max-w-6xl w-full mx-auto">
          <span className="font-serif text-lg sm:text-xl tracking-tight">
            Mon CV Pro <span className="text-[#0B6E4F]">CI</span>
          </span>
          <nav className="hidden sm:flex items-center gap-8 text-sm text-[#10241C]/70">
            <a href="#modeles" className="hover:text-[#0B6E4F] transition">
              Modèles
            </a>
            <a href="#tarifs" className="hover:text-[#0B6E4F] transition">
              Tarifs
            </a>
            <Link
              href={ctaHref}
              className="flex items-center gap-1.5 rounded-[2px] bg-[#0B6E4F] text-white px-4 py-2 text-sm font-medium hover:bg-[#085b41] transition"
            >
              Créer mon CV <ArrowRight size={14} />
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero : deux colonnes, dossier annoté à droite */}
      <section className="px-6 pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-10 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FF7A1A] mb-5">
              Conçu pour le marché ivoirien
            </p>
            <h1 className="font-serif text-[2.5rem] sm:text-[3.25rem] leading-[1.08] tracking-tight mb-6">
              Le CV qui passe le
              <br className="hidden sm:block" /> premier tri du recruteur.
            </h1>
            <p className="text-base sm:text-lg text-[#10241C]/65 mb-8 max-w-md leading-relaxed">
              15 modèles pensés pour convaincre, un score de compatibilité ATS pour vérifier que
              votre CV se lit bien, et un export prêt en quelques minutes. Aucune compétence en
              design requise.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3 mb-9">
              <Link
                href={ctaHref}
                className="flex items-center justify-center gap-2 rounded-[2px] bg-[#0B6E4F] text-white px-7 py-3.5 text-base font-medium hover:bg-[#085b41] transition"
              >
                Créer mon CV maintenant <ArrowRight size={18} />
              </Link>
              <a
                href="#modeles"
                className="flex items-center justify-center gap-1.5 px-7 py-3.5 text-base font-medium text-[#10241C]/80 border border-[#10241C]/15 rounded-[2px] hover:border-[#0B6E4F] hover:text-[#0B6E4F] transition"
              >
                Voir les 15 modèles
              </a>
            </div>

            <div className="flex items-center gap-6 text-sm text-[#10241C]/55 border-t border-[#0B6E4F]/15 pt-5">
              <span>Téléchargement — 1 000 FCFA</span>
              <span className="w-1 h-1 rounded-full bg-[#10241C]/25" />
              <span>Paiement Wave</span>
            </div>
          </div>

          <FadeIn>
            <DossierPreview />
          </FadeIn>
        </div>
      </section>

      {/* Galerie de modèles */}
      <section id="modeles" className="px-6 py-16 sm:py-24 border-y border-[#E4E0D3] bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="flex items-end justify-between mb-10 gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FF7A1A] mb-3">
                Bibliothèque de modèles
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl">Un modèle pour chaque profil</h2>
            </div>
            <p className="hidden sm:block text-sm text-[#10241C]/55 max-w-xs text-right">
              Changez de modèle et de couleur à tout moment, en aperçu direct dans l&apos;éditeur.
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <TemplateGallery />
          </FadeIn>
        </div>
      </section>

      {/* Ce que contient l'outil : présenté comme un sommaire de dossier */}
      <section className="px-6 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FF7A1A] mb-3">
              Ce que vous obtenez
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl">Le contenu du dossier</h2>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="border-t border-[#10241C]/12">
              {[
                {
                  n: "01",
                  titre: "15 modèles distincts",
                  texte:
                    "Des mises en page pensées pour tous les secteurs, du classique administratif au profil créatif.",
                },
                {
                  n: "02",
                  titre: "Score de compatibilité ATS",
                  texte:
                    "Un indicateur vérifie que la structure et les mots-clés de votre CV se lisent bien par les logiciels de tri.",
                },
                {
                  n: "03",
                  titre: "Personnalisation complète",
                  texte:
                    "Couleurs, rubriques et ordre des sections s'ajustent en quelques clics, sans notion de design.",
                },
                {
                  n: "04",
                  titre: "Export PDF ou Word",
                  texte: "Téléchargez le format attendu par le recruteur, prêt à envoyer.",
                },
              ].map((item) => (
                <div
                  key={item.n}
                  className="flex items-baseline gap-5 sm:gap-8 py-5 border-b border-[#10241C]/12"
                >
                  <span className="font-serif text-sm text-[#0B6E4F]/50 w-6 shrink-0">
                    {item.n}
                  </span>
                  <div>
                    <h3 className="font-medium mb-1">{item.titre}</h3>
                    <p className="text-sm text-[#10241C]/55 leading-relaxed">{item.texte}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Comment ça marche : bande de progression, sans pastilles génériques */}
      <section className="px-6 py-16 sm:py-24 bg-white border-y border-[#E4E0D3]">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FF7A1A] mb-3">
              Trois étapes
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl">Comment ça marche</h2>
          </FadeIn>

          <div className="grid sm:grid-cols-3 relative">
            <div
              aria-hidden
              className="hidden sm:block absolute top-6 left-0 right-0 h-px bg-[#10241C]/12"
            />
            {[
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
                texte: "1 000 FCFA via Wave, puis votre CV en PDF ou Word est prêt.",
              },
            ].map((step, i) => (
              <FadeIn key={step.num} delay={i * 100} className="relative pt-0 pr-8">
                <span className="relative z-10 inline-flex items-center justify-center w-12 h-12 bg-[#FAF9F5]">
                  <span className="font-serif text-2xl text-[#0B6E4F]">{step.num}</span>
                </span>
                <h3 className="font-medium mb-1.5 mt-3">{step.titre}</h3>
                <p className="text-sm text-[#10241C]/55 leading-relaxed max-w-[240px]">
                  {step.texte}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Tarif : présenté comme un reçu Wave, ancré dans l'usage réel */}
      <section id="tarifs" className="px-6 py-16 sm:py-24">
        <FadeIn className="max-w-sm mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FF7A1A] mb-3 text-center">
            Tarif
          </p>
          <div
            className="bg-white border border-[#10241C]/12 px-8 pt-8 pb-6"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent, transparent 7px, #E4E0D3 7px, #E4E0D3 8px)",
              backgroundPosition: "bottom",
              backgroundSize: "1px 100%",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex items-center justify-between text-sm text-[#10241C]/55 mb-1">
              <span>Téléchargement du CV</span>
            </div>
            <p className="font-serif text-5xl mb-1">1 000 FCFA</p>
            <p className="text-sm text-[#10241C]/50 mb-6">Paiement unique, sans abonnement</p>
            <Link
              href={ctaHref}
              className="flex items-center justify-center gap-2 w-full rounded-[2px] bg-[#0B6E4F] text-white px-6 py-3 text-sm font-medium hover:bg-[#085b41] transition"
            >
              Commencer mon CV <ArrowUpRight size={15} />
            </Link>
          </div>
          <p className="text-center text-xs text-[#10241C]/45 mt-4">
            Payez par Wave, sans carte bancaire.
          </p>
        </FadeIn>
      </section>

      {/* Pied de page façon en-tête administratif */}
      <footer className="px-6 py-8 pb-24 sm:pb-8 border-t border-[#0B6E4F]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#10241C]/50">
          <p className="font-serif text-[#10241C]/70">Mon CV Pro CI</p>
          <p>Assistance : +225 05 45 17 75 71</p>
          <p>Vos données restent confidentielles.</p>
        </div>
      </footer>

      {/* CTA sticky mobile */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-[#FAF9F5]/95 backdrop-blur border-t border-[#0B6E4F]">
        <Link
          href={ctaHref}
          className="flex items-center justify-center gap-2 rounded-[2px] bg-[#0B6E4F] text-white px-5 py-3.5 text-sm font-medium hover:bg-[#085b41] transition"
        >
          Créer mon CV — 1 000 FCFA <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
