"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Star, Quote } from "lucide-react";
import AvisForm from "./AvisForm";

interface Avis {
  id: string;
  nom: string;
  texte: string;
  note: number;
}

export default function AvisSection() {
  const [avis, setAvis] = useState<Avis[]>([]);

  useEffect(() => {
    // Seuls les avis marqués "displayed" par l'admin (choix manuel) sont
    // visibles publiquement — voir la section "Avis" de /admin.
    const unsub = onSnapshot(
      query(collection(db, "reviews"), where("displayed", "==", true)),
      (snap) => {
        setAvis(
          snap.docs.map((d) => ({
            id: d.id,
            nom: d.data().nom,
            texte: d.data().texte,
            note: d.data().note,
          }))
        );
      },
      () => setAvis([])
    );
    return () => unsub();
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      {avis.length > 0 && (
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {avis.slice(0, 3).map((a) => (
            <div
              key={a.id}
              className="flex flex-col items-center text-center rounded-2xl border border-[#E3F0E9] bg-white p-6 shadow-[0_12px_28px_-16px_rgba(12,59,46,0.18)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E3F0E9] text-[#157A52] font-['Space_Grotesk'] font-bold text-sm mb-3">
                {a.nom.trim().charAt(0).toUpperCase()}
              </span>
              <div className="flex gap-0.5 mb-3" aria-label={`${a.note} sur 5 étoiles`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className={i < a.note ? "fill-[#157A52] text-[#157A52]" : "text-[#1A2E28]/15"}
                  />
                ))}
              </div>
              <Quote className="text-[#157A52]/30 mb-2" size={18} aria-hidden />
              <p className="text-sm text-[#1A2E28]/75 leading-relaxed mb-3 max-w-[32ch]">
                {a.texte}
              </p>
              <p className="text-xs font-semibold text-[#1A2E28]/50">— {a.nom}</p>
            </div>
          ))}
        </div>
      )}

      <div className="max-w-md mx-auto">
        <p className="text-center text-sm font-semibold mb-3">Donnez votre avis</p>
        <AvisForm />
      </div>
    </div>
  );
}
