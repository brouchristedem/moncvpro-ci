"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { Download, Pencil, Search, X } from "lucide-react";
import { db } from "@/lib/firebase";
import { mergeWithDefaults } from "@/lib/store";
import { CVData } from "@/lib/types";
import CVPreviewFit from "@/components/templates/CVPreviewFit";

interface UserCV {
  uid: string;
  email: string;
  nom: string;
  cv: CVData;
}

// Permet à l'admin d'ouvrir le CV d'un utilisateur et de le télécharger en
// PDF à sa place (quand la personne n'y arrive pas depuis son téléphone).
// Lecture seule : la règle Firestore existante sur /users autorise déjà
// l'admin à lire tous les comptes, rien n'est modifié côté utilisateur.
export default function AdminCVDownload() {
  const [users, setUsers] = useState<UserCV[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<UserCV | null>(null);

  useEffect(() => {
    return onSnapshot(
      collection(db, "users"),
      (snap) => {
        const list: UserCV[] = [];
        snap.docs.forEach((d) => {
          const data = d.data();
          if (!data.cv) return;
          const cv = mergeWithDefaults(data.cv as Partial<CVData>);
          const p = cv.personalInfo;
          const nom = `${p.prenom || ""} ${p.nom || ""}`.trim();
          if (!nom && !(p.titre || "").trim()) return;
          list.push({ uid: d.id, email: data.email || p.email || "", nom, cv });
        });
        list.sort((a, b) => (b.cv.updatedAt || 0) - (a.cv.updatedAt || 0));
        setUsers(list);
      },
      (err) => console.error("Erreur lecture CV utilisateurs:", err)
    );
  }, []);

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return users
      .filter((u) => u.email.toLowerCase().includes(q) || u.nom.toLowerCase().includes(q))
      .slice(0, 8);
  }, [users, search]);

  return (
    <section>
      <h2 className="text-sm font-bold mb-3">Télécharger le CV d&apos;un utilisateur</h2>
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par nom ou email"
          className="w-full rounded-2xl border border-border bg-transparent pl-9 pr-3 py-2 text-sm"
        />
      </div>

      {results.length > 0 && (
        <ul className="mt-2 space-y-1">
          {results.map((u) => (
            <li key={u.uid}>
              <button
                onClick={() => {
                  setSelected(u);
                  setSearch("");
                }}
                className="w-full text-left rounded-2xl border border-border px-3 py-2 text-sm hover:bg-surface transition"
              >
                <span className="font-medium">{u.nom || "(sans nom)"}</span>
                <span className="block text-[11px] text-foreground/50">{u.email}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium truncate">
              {selected.nom} <span className="text-foreground/50 text-[11px]">· {selected.email}</span>
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 rounded-2xl bg-brand-600 text-white px-3 py-2 text-sm font-medium"
              >
                <Download size={14} /> Télécharger le PDF
              </button>
              <button
                onClick={() => window.location.assign(`/editor?cvOf=${selected.uid}`)}
                className="inline-flex items-center gap-1.5 rounded-2xl border border-border px-3 py-2 text-sm font-medium"
              >
                <Pencil size={14} /> Modifier
              </button>
              <button
                onClick={() => setSelected(null)}
                className="p-2 rounded-2xl border border-border"
                aria-label="Fermer"
              >
                <X size={14} />
              </button>
            </div>
          </div>
          <div className="w-full max-w-[210mm] mx-auto">
            {/* Mode compact forcé (uniquement pour l'affichage/PDF admin, rien n'est
                enregistré) : un CV plus long qu'une page A4 serait sinon coupé en
                bas à l'impression. Si le CV tient déjà, l'échelle reste à 100 %. */}
            <CVPreviewFit cv={{ ...selected.cv, modeCompact: true }} printMode />
          </div>
        </div>
      )}
    </section>
  );
}
