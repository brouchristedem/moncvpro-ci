"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";
import { TEMPLATE_LIST, PROFILE_SUGGESTIONS } from "@/lib/templateRegistry";
import { demoCV } from "@/lib/demoCV";
import TemplateThumbnail from "./TemplateThumbnail";

// Suggestions éditoriales : un raccourci pour s'orienter dans les 15
// modèles, pas un algorithme de recommandation basé sur des données
// d'usage réelles (on n'en a pas encore). Le libellé "vous pourrait
// convenir" reflète bien ce choix éditorial plutôt qu'une mesure.
const PROFILE_KEYS = Object.keys(PROFILE_SUGGESTIONS);

export default function ProfileSelector() {
  const [selected, setSelected] = useState<string | null>(null);

  const suggestion = selected ? PROFILE_SUGGESTIONS[selected] : null;
  const suggestedTemplates = suggestion
    ? suggestion.templateIds
        .map((id) => TEMPLATE_LIST.find((t) => t.id === id))
        .filter((t): t is (typeof TEMPLATE_LIST)[number] => Boolean(t) && t!.actif)
    : [];

  return (
    <div>
      <p className="text-center text-sm font-medium text-foreground/70 mb-4">
        Quel profil vous correspond ?
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {PROFILE_KEYS.map((key) => {
          const p = PROFILE_SUGGESTIONS[key];
          const isActive = selected === key;
          return (
            <button
              key={key}
              onClick={() => setSelected(isActive ? null : key)}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition whitespace-nowrap ${
                isActive
                  ? "bg-brand-600 text-white border-brand-600"
                  : "bg-surface text-foreground/65 border-border hover:border-brand-600/40"
              }`}
            >
              <span className="mr-1.5">{p.emoji}</span>
              {p.label}
            </button>
          );
        })}
      </div>

      {suggestion && suggestedTemplates.length > 0 && (
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-xs text-foreground/45 mb-4">
            {suggestion.emoji} {suggestion.label} — 3 modèles qui pourraient vous convenir
          </p>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {suggestedTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="rounded-lg border border-border bg-surface overflow-hidden hover:border-brand-600 transition flex flex-col"
              >
                <Link href={`/editor?template=${tpl.id}`} className="block pointer-events-none">
                  <TemplateThumbnail cv={demoCV(tpl.id)} />
                </Link>
                <div className="p-2.5 border-t border-border">
                  <p className="font-medium text-xs truncate">{tpl.nom}</p>
                  <Link
                    href={`/editor?template=${tpl.id}`}
                    className="inline-flex items-center gap-1 mt-1.5 text-[11px] font-medium text-brand-600 hover:underline"
                  >
                    <Eye size={10} /> Voir <ArrowRight size={10} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
