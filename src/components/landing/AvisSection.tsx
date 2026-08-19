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
          {avis.map((a) => (
            <div
              key={a.id}
              className="flex flex-col rounded-xl border border-border bg-surface p-5 text-left"
            >
              <Quote className="text-brand-600/30 mb-2" size={20} />
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className={i < a.note ? "fill-accent-600 text-accent-600" : "text-foreground/15"}
                  />
                ))}
              </div>
              <p className="text-sm text-foreground/70 leading-relaxed mb-3 flex-1">
                {a.texte}
              </p>
              <p className="text-xs font-semibold text-foreground/50">— {a.nom}</p>
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
