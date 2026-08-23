import { create } from "zustand";
import { CVData, Section } from "./types";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function defaultCV(): CVData {
  return {
    id: uid(),
    langue: "fr",
    templateId: "template-01",
    couleurPrimaire: "#2563eb",
    couleurFond: "#ffffff",
    tailleTexte: 13,
    dateFormat: "texte",
    iconStyle: "aucune",
    ordreNom: "prenom-nom",
    modeCompact: false,
    step: 0,
    updatedAt: Date.now(),
    personalInfo: {
      photoShape: "cercle",
      showPhoto: true,
      prenom: "",
      nom: "",
      titre: "",
      email: "",
      telephone: "",
      adresse: "",
      permis: "",
      linkedin: "",
      siteWeb: "",
      autresInfos: [],
    },
    lettreMotivation: {
      activee: false,
      destinataire: "",
      entreprise: "",
      poste: "",
      ville: "",
      corps: "",
    },
    sections: [
      { id: uid(), type: "profil", titre: "Profil", visible: true, ordre: 0, items: [] },
      { id: uid(), type: "experience", titre: "Expérience professionnelle", visible: true, ordre: 1, items: [] },
      { id: uid(), type: "formation", titre: "Formation", visible: true, ordre: 2, items: [] },
      { id: uid(), type: "competences", titre: "Compétences", visible: true, ordre: 3, items: [], affichage: "ligne" },
      { id: uid(), type: "langues", titre: "Langues", visible: true, ordre: 4, items: [], affichage: "ligne" },
      { id: uid(), type: "certifications", titre: "Certifications", visible: true, ordre: 5, items: [] },
      { id: uid(), type: "projets", titre: "Projet académique", visible: true, ordre: 6, items: [] },
      { id: uid(), type: "interets", titre: "Centres d'intérêt", visible: true, ordre: 7, items: [], affichage: "ligne" },
    ],
  };
}

export function mergeWithDefaults(data: Partial<CVData> | undefined | null): CVData {
  const def = defaultCV();
  if (!data) return def;
  return {
    ...def,
    ...data,
    personalInfo: { ...def.personalInfo, ...(data.personalInfo || {}) },
    lettreMotivation: { ...def.lettreMotivation!, ...(data.lettreMotivation || {}) },
    sections: data.sections && data.sections.length > 0 ? data.sections : def.sections,
  };
}

interface CVStore {
  cv: CVData;
  history: CVData[];
  future: CVData[];
  set: (updater: (cv: CVData) => CVData) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  reset: (cv: CVData) => void;
  addSection: (section: Section) => void;
  removeSection: (id: string) => void;
  duplicateSection: (id: string) => void;
  resetSection: (id: string) => void;
  reorderSections: (fromId: string, toId: string) => void;
}

export const useCVStore = create<CVStore>((set, get) => ({
  cv: defaultCV(),
  history: [],
  future: [],
  canUndo: false,
  canRedo: false,
  set: (updater) => {
    const current = get().cv;
    const next = updater(current);
    next.updatedAt = Date.now();
    set((s) => ({
      cv: next,
      history: [...s.history, current].slice(-50),
      future: [],
      canUndo: true,
      canRedo: false,
    }));
  },
  undo: () => {
    const { history, cv, future } = get();
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    set({
      cv: prev,
      history: history.slice(0, -1),
      future: [cv, ...future],
      canUndo: history.length - 1 > 0,
      canRedo: true,
    });
  },
  redo: () => {
    const { future, cv, history } = get();
    if (future.length === 0) return;
    const next = future[0];
    set({
      cv: next,
      future: future.slice(1),
      history: [...history, cv],
      canRedo: future.length - 1 > 0,
      canUndo: true,
    });
  },
  reset: (cv) => set({ cv, history: [], future: [], canUndo: false, canRedo: false }),
  addSection: (section) =>
    get().set((cv) => ({ ...cv, sections: [...cv.sections, section] })),
  removeSection: (id) =>
    get().set((cv) => ({ ...cv, sections: cv.sections.filter((s) => s.id !== id) })),
  // Duplique une rubrique (avec ses entrées) et l'insère juste après
  // l'originale, avec de nouveaux identifiants pour éviter tout conflit.
  duplicateSection: (id) =>
    get().set((cv) => {
      const idx = cv.sections.findIndex((s) => s.id === id);
      if (idx === -1) return cv;
      const original = cv.sections[idx];
      const copy: Section = {
        ...original,
        id: uid(),
        titre: `${original.titre} (copie)`,
        items: original.items.map((it) => ({ ...it, id: uid() })),
      };
      const sections = [...cv.sections];
      sections.splice(idx + 1, 0, copy);
      sections.forEach((s, i) => (s.ordre = i));
      return { ...cv, sections };
    }),
  // Vide les entrées d'une rubrique sans la supprimer ni toucher à son
  // titre, sa visibilité ou ses réglages d'affichage.
  resetSection: (id) =>
    get().set((cv) => ({
      ...cv,
      sections: cv.sections.map((s) => (s.id === id ? { ...s, items: [] } : s)),
    })),
  reorderSections: (fromId, toId) =>
    get().set((cv) => {
      const sections = [...cv.sections];
      const fromIdx = sections.findIndex((s) => s.id === fromId);
      const toIdx = sections.findIndex((s) => s.id === toId);
      if (fromIdx === -1 || toIdx === -1) return cv;
      const [moved] = sections.splice(fromIdx, 1);
      sections.splice(toIdx, 0, moved);
      sections.forEach((s, i) => (s.ordre = i));
      return { ...cv, sections };
    }),
}));
