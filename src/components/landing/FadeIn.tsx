"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

export default function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Si l'API n'existe pas (vieux navigateur) on affiche directement le
    // contenu plutôt que de le laisser invisible indéfiniment.
    if (typeof IntersectionObserver === "undefined") {
      const t = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(t);
    }

    try {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(el);

      // Filet de sécurité : si pour une raison quelconque (bug de mise en
      // page sur un navigateur particulier, élément de hauteur nulle, etc.)
      // l'observer ne se déclenche jamais, on force l'affichage après un
      // court délai plutôt que de laisser le contenu invisible pour de bon.
      const fallback = setTimeout(() => setVisible(true), 1500);

      return () => {
        observer.disconnect();
        clearTimeout(fallback);
      };
    } catch {
      // En cas d'échec inattendu de l'observer, on n'immobilise pas le
      // contenu en opacité 0.
      const t = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
