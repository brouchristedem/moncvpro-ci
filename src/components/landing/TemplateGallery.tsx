"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, X, Columns3, Eye, Sparkles, ArrowRight } from "lucide-react";
import { TEMPLATE_LIST } from "@/lib/templateRegistry";
import { demoCV } from "@/lib/demoCV";
import TemplateThumbnail from "./TemplateThumbnail";

// Une couleur d'accent différente par modèle, pour que la galerie ne donne
// pas l'impression que tous les modèles se ressemblent. Choisies pour rester
// lisibles sur fond blanc et cohérentes avec le style de chaque modèle.
const PREVIEW_COLORS: Record<string, string> = {
  "template-01": "#1e3a5f", // Classique Élégant — bleu marine sobre
  "template-02": "#2563eb", // Moderne Bicolore — bleu vif
  "template-03": "#334155", // Minimaliste — gris ardoise
  "template-04": "#0f766e", // Corporate — vert émeraude foncé
  "template-05": "#e11d48", // Créatif Accent — rose vif
  "template-06": "#7c3aed", // Ingénieur Tech — violet
  "template-07": "#78350f", // Exécutif Premium — brun doré
  "template-08": "#0e7490", // Compact Data — cyan foncé
  "template-09": "#4b5563", // Académique — gris neutre
  "template-10": "#0284c7", // Sidebar Clair — bleu ciel
  "template-11": "#059669", // Épuré Grille — vert
  "template-12": "#1d4ed8", // International — bleu classique
  "template-13": "#ea580c", // Startup Dynamique — orange
  "template-14": "#4338ca", // Consultant — indigo
  "template-15": "#a21caf", // Photo Focus — fuchsia
};

// On fait tourner l'intitulé du bouton d'une carte à l'autre pour que la
// galerie ne paraisse pas répétitive. Toutes les actions mènent au même
// endroit (l'éditeur avec ce modèle pré-sélectionné) : ce n'est qu'une
// variation de formulation, pas de comportement.
const CTA_LABELS = ["Aperçu", "Personnaliser", "Utiliser"];

type ColonneFiltre = "toutes" | 1 | 2;
type PhotoFiltre = "toutes" | "avec" | "sans";

const MAX_COMPARE = 3;

export default function TemplateGallery() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [colonneFiltre, setColonneFiltre] = useState<ColonneFiltre>("toutes");
  const [photoFiltre, setPhotoFiltre] = useState<PhotoFiltre>("toutes");
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);

  const active = TEMPLATE_LIST.filter((tpl) => tpl.actif);

  const filtered = useMemo(() => {
    return active.filter((tpl) => {
      if (colonneFiltre !== "toutes" && tpl.colonnes !== colonneFiltre) return false;
      if (photoFiltre === "avec" && !tpl.photo) return false;
      if (photoFiltre === "sans" && tpl.photo) return false;
      return true;
    });
  }, [active, colonneFiltre, photoFiltre]);

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  };

  const compareTemplates = compareIds
    .map((id) => active.find((t) => t.id === id))
    .filter((t): t is (typeof active)[number] => Boolean(t));

  const chipBase =
    "px-3 py-1.5 rounded-full text-xs font-medium border transition whitespace-nowrap";
  const chipActive = "bg-[#0B6E4F] text-white border-[#0B6E4F]";
  const chipInactive = "bg-white text-[#10241C]/60 border-[#10241C]/15 hover:border-[#0B6E4F]/40";

  return (
    <div className="relative">
      {/* Filtres */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <span className="flex items-center gap-1 text-xs text-[#10241C]/40 mr-1">
          <Columns3 size={13} /> Filtrer :
        </span>
        <button
          onClick={() => setColonneFiltre("toutes")}
          className={`${chipBase} ${colonneFiltre === "toutes" ? chipActive : chipInactive}`}
        >
          Toutes les mises en page
        </button>
        <button
          onClick={() => setColonneFiltre(1)}
          className={`${chipBase} ${colonneFiltre === 1 ? chipActive : chipInactive}`}
        >
          1 colonne
        </button>
        <button
          onClick={() => setColonneFiltre(2)}
          className={`${chipBase} ${colonneFiltre === 2 ? chipActive : chipInactive}`}
        >
          2 colonnes
        </button>
        <span className="w-px h-4 bg-[#10241C]/10 mx-1" />
        <button
          onClick={() => setPhotoFiltre(photoFiltre === "avec" ? "toutes" : "avec")}
          className={`${chipBase} ${photoFiltre === "avec" ? chipActive : chipInactive}`}
        >
          Avec photo
        </button>
        <button
          onClick={() => setPhotoFiltre(photoFiltre === "sans" ? "toutes" : "sans")}
          className={`${chipBase} ${photoFiltre === "sans" ? chipActive : chipInactive}`}
        >
          Sans photo
        </button>
      </div>

      <div className="flex items-center justify-between gap-2 mb-3">
        <p className="text-xs text-[#10241C]/40">
          {filtered.length} modèle{filtered.length > 1 ? "s" : ""}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Précédent"
            className="p-2 rounded-[2px] border border-[#10241C]/15 hover:border-[#0B6E4F] hover:text-[#0B6E4F] transition"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Suivant"
            className="p-2 rounded-[2px] border border-[#10241C]/15 hover:border-[#0B6E4F] hover:text-[#0B6E4F] transition"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-px-6 -mx-6 px-6"
        style={{ scrollbarWidth: "thin" }}
      >
        {filtered.map((tpl, i) => {
          const ctaLabel = CTA_LABELS[i % CTA_LABELS.length];
          const isComparing = compareIds.includes(tpl.id);
          return (
            <div
              key={tpl.id}
              className="group shrink-0 w-[200px] sm:w-[240px] snap-start rounded-[2px] border border-[#10241C]/12 bg-white overflow-hidden hover:border-[#0B6E4F] hover:shadow-[0_16px_32px_-20px_rgba(10,40,25,0.35)] transition relative"
            >
              <Link href={`/editor?template=${tpl.id}`} className="block pointer-events-none">
                <TemplateThumbnail cv={demoCV(tpl.id, PREVIEW_COLORS[tpl.id])} />
              </Link>

              <button
                type="button"
                onClick={() => toggleCompare(tpl.id)}
                disabled={!isComparing && compareIds.length >= MAX_COMPARE}
                className={`absolute top-2 right-2 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium border backdrop-blur transition disabled:opacity-40 disabled:cursor-not-allowed ${
                  isComparing
                    ? "bg-[#0B6E4F] text-white border-[#0B6E4F]"
                    : "bg-white/90 text-[#10241C]/60 border-[#10241C]/15 hover:border-[#0B6E4F]"
                }`}
              >
                <Sparkles size={11} /> {isComparing ? "Sélectionné" : "Comparer"}
              </button>

              <div className="p-3 border-t border-[#10241C]/12">
                <p className="font-medium text-sm truncate">{tpl.nom}</p>
                <p className="text-[11px] text-[#10241C]/45 mt-0.5 line-clamp-1">{tpl.style}</p>
                <Link
                  href={`/editor?template=${tpl.id}`}
                  className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-[#0B6E4F] group-hover:underline"
                >
                  {ctaLabel === "Aperçu" && <Eye size={12} />}
                  {ctaLabel} →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Barre de comparaison */}
      {compareIds.length > 0 && (
        <div className="sticky bottom-3 sm:bottom-4 z-30 mt-4 flex justify-center">
          <div className="flex items-center gap-3 rounded-full bg-[#0A1F16] text-white pl-4 pr-2 py-2 shadow-[0_20px_40px_-15px_rgba(10,31,22,0.5)]">
            <span className="text-xs">
              {compareIds.length} modèle{compareIds.length > 1 ? "s" : ""} sélectionné
              {compareIds.length > 1 ? "s" : ""}
            </span>
            <button
              onClick={() => setCompareOpen(true)}
              className="flex items-center gap-1 rounded-full bg-[#0B6E4F] px-3.5 py-1.5 text-xs font-semibold hover:bg-[#085b41] transition"
            >
              Comparer <ArrowRight size={12} />
            </button>
            <button
              onClick={() => setCompareIds([])}
              aria-label="Vider la sélection"
              className="p-1.5 rounded-full hover:bg-white/10 transition"
            >
              <X size={13} />
            </button>
          </div>
        </div>
      )}

      {/* Panneau de comparaison côte à côte */}
      {compareOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-6"
          onClick={() => setCompareOpen(false)}
        >
          <div
            className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-5 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-lg" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                Comparer les modèles
              </h3>
              <button
                onClick={() => setCompareOpen(false)}
                aria-label="Fermer"
                className="p-2 rounded-full hover:bg-[#10241C]/5 transition"
              >
                <X size={18} />
              </button>
            </div>
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: `repeat(${Math.max(compareTemplates.length, 1)}, minmax(0, 1fr))` }}
            >
              {compareTemplates.map((tpl) => (
                <div key={tpl.id} className="rounded-lg border border-[#10241C]/12 overflow-hidden">
                  <div className="pointer-events-none">
                    <TemplateThumbnail cv={demoCV(tpl.id, PREVIEW_COLORS[tpl.id])} />
                  </div>
                  <div className="p-3 border-t border-[#10241C]/12">
                    <p className="font-medium text-sm">{tpl.nom}</p>
                    <p className="text-[11px] text-[#10241C]/45 mt-0.5">{tpl.style}</p>
                    <Link
                      href={`/editor?template=${tpl.id}`}
                      className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-[#0B6E4F] hover:underline"
                    >
                      Utiliser ce modèle <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
