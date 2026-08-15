"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

const CHECKS = [
  { label: "Structure", delay: 900 },
  { label: "Mots-clés", delay: 1500 },
  { label: "Format ATS", delay: 2100 },
];

export default function ScanCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [sweeping, setSweeping] = useState(false);
  const [score, setScore] = useState(0);
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      const t = setTimeout(() => setStarted(true), 0);
      return () => clearTimeout(t);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    const fallback = setTimeout(() => setStarted(true), 1500);
    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!started) return;
    // La ligne de scan ne reste montée que le temps de son animation, pour
    // qu'elle disparaisse proprement à la fin au lieu de se figer à l'écran
    // et de masquer les informations en dessous.
    setSweeping(true);
    const sweepEnd = setTimeout(() => setSweeping(false), 2100);
    const timers = CHECKS.map((c, i) =>
      setTimeout(() => setChecked((prev) => prev.map((v, idx) => (idx === i ? true : v))), c.delay)
    );
    const startCount = setTimeout(() => {
      const target = 96;
      const duration = 1200;
      const startTime = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        setScore(Math.round(target * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, 2200);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(startCount);
      clearTimeout(sweepEnd);
    };
  }, [started]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[380px] select-none" aria-hidden>
      {/* halo doux aux couleurs de la marque derrière la carte */}
      <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-600/15 via-transparent to-accent-500/10 blur-xl" />

      <div className="relative overflow-hidden rounded-xl border border-brand-600/15 bg-surface shadow-lg shadow-brand-600/5">
        {/* barre de titre type document */}
        <div className="flex items-center gap-2 border-b border-border px-5 py-3.5">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-foreground/15" />
            <span className="h-2 w-2 rounded-full bg-foreground/15" />
            <span className="h-2 w-2 rounded-full bg-foreground/15" />
          </div>
          <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/40">
            Analyse.pdf
          </span>
          <span className="ml-auto flex items-center gap-1 rounded-full bg-brand-600/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-brand-600">
            <span className={`h-1.5 w-1.5 rounded-full bg-brand-600 ${sweeping ? "animate-pulse" : ""}`} />
            {sweeping ? "Scan..." : "Scan ATS"}
          </span>
        </div>

        {/* corps du "CV", deux colonnes */}
        <div className="relative grid grid-cols-[36%_64%] gap-0 px-5 py-5">
          <div className="space-y-4 pr-4">
            <div className="h-11 w-11 rounded-full bg-foreground/10" />
            <div className="space-y-1.5">
              <span className="block font-mono text-[8px] uppercase tracking-[0.14em] text-foreground/35 mb-1">
                Profil
              </span>
              <div className="h-1.5 w-full rounded-full bg-foreground/10" />
              <div className="h-1.5 w-4/5 rounded-full bg-foreground/10" />
              <div className="h-1.5 w-3/5 rounded-full bg-foreground/10" />
            </div>
            <div className="space-y-1.5">
              <span className="block font-mono text-[8px] uppercase tracking-[0.14em] text-foreground/35 mb-1">
                Compétences
              </span>
              <div className="h-1.5 w-full rounded-full bg-foreground/10" />
              <div className="h-1.5 w-2/3 rounded-full bg-foreground/10" />
            </div>
          </div>
          <div className="space-y-4 border-l border-border pl-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="h-2 w-24 rounded-full bg-foreground/20" />
                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-foreground/30">
                  Expérience
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-foreground/10" />
              <div className="h-1.5 w-full rounded-full bg-foreground/10" />
              <div className="h-1.5 w-4/5 rounded-full bg-foreground/10" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="h-2 w-20 rounded-full bg-foreground/20" />
                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-foreground/30">
                  Formation
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-foreground/10" />
              <div className="h-1.5 w-3/5 rounded-full bg-foreground/10" />
            </div>
          </div>

          {/* ligne de scan animée : montée seulement pendant le balayage,
              puis démontée pour ne pas rester figée à l'écran */}
          {sweeping && (
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-brand-500/20 to-transparent"
              style={{ animation: "scanSweep 2.1s ease-in-out 1" }}
            />
          )}
        </div>

        {/* pied : score ATS + coches */}
        <div className="border-t border-border bg-surface-muted px-5 py-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/40">
              Score ATS
            </span>
            <span className="font-mono text-2xl font-medium text-brand-600 tabular-nums">
              {started ? score : 0}%
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {CHECKS.map((c, i) => (
              <span
                key={c.label}
                className={`flex items-center gap-1 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide transition-all duration-300 ${
                  checked[i]
                    ? "border-brand-600/40 bg-brand-600/10 text-brand-600 opacity-100"
                    : "border-border text-foreground/30 opacity-60"
                }`}
              >
                <Check size={11} className={checked[i] ? "opacity-100" : "opacity-0"} />
                {c.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scanSweep {
          0% {
            transform: translateY(-70px);
          }
          100% {
            transform: translateY(260px);
          }
        }
      `}</style>
    </div>
  );
}
