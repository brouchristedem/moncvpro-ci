"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Révèle son contenu (fondu + léger glissement vers le haut) quand il entre
 * dans le viewport. Volontairement minimal : un seul IntersectionObserver
 * partagé par instance, pas de dépendance externe, et respecte
 * prefers-reduced-motion via la classe motion-safe (le contenu reste visible
 * immédiatement si l'utilisateur a réduit les animations).
 */
export default function Reveal({
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
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
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
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out ${
        visible ? "opacity-100 translate-y-0" : "motion-safe:opacity-0 motion-safe:translate-y-4"
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
