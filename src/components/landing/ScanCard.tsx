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
  const [score, setScore] = useState(0);
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
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
    };
  }, [started]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[380px] select-none" aria-hidden>
      {/* Halo d'ambiance */}
      <div className="absolute -inset-10 rounded-full bg-[#22C55E]/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0F2B21] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
        {/* barre de titre type document */}
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
          </div>
          <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
            Analyse.pdf
          </span>
        </div>

        {/* corps du "CV", deux colonnes */}
        <div className="relative grid grid-cols-[36%_64%] gap-0 px-5 py-5">
          <div className="space-y-4 pr-4">
            <div className="h-11 w-11 rounded-full bg-white/10" />
            <div className="space-y-1.5">
              <div className="h-1.5 w-full rounded-full bg-white/15" />
              <div className="h-1.5 w-4/5 rounded-full bg-white/15" />
              <div className="h-1.5 w-3/5 rounded-full bg-white/15" />
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 w-full rounded-full bg-white/15" />
              <div className="h-1.5 w-2/3 rounded-full bg-white/15" />
            </div>
          </div>
          <div className="space-y-4 border-l border-white/10 pl-4">
            <div className="space-y-1.5">
              <div className="h-2 w-24 rounded-full bg-white/25" />
              <div className="h-1.5 w-full rounded-full bg-white/15" />
              <div className="h-1.5 w-full rounded-full bg-white/15" />
              <div className="h-1.5 w-4/5 rounded-full bg-white/15" />
            </div>
            <div className="space-y-1.5">
              <div className="h-2 w-20 rounded-full bg-white/25" />
              <div className="h-1.5 w-full rounded-full bg-white/15" />
              <div className="h-1.5 w-3/5 rounded-full bg-white/15" />
            </div>
          </div>

          {/* ligne de scan animée */}
          {started && (
            <div
              className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-[#4ADE80]/25 to-transparent"
              style={{ animation: "scanSweep 2.1s ease-in-out 1" }}
            />
          )}
        </div>

        {/* pied : score ATS + coches */}
        <div className="border-t border-white/10 bg-[#0B231A] px-5 py-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
              Score ATS
            </span>
            <span className="font-mono text-2xl font-medium text-[#4ADE80] tabular-nums">
              {started ? score : 0}%
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {CHECKS.map((c, i) => (
              <span
                key={c.label}
                className={`flex items-center gap-1 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide transition-all duration-300 ${
                  checked[i]
                    ? "border-[#4ADE80]/40 bg-[#4ADE80]/10 text-[#4ADE80] opacity-100"
                    : "border-white/10 text-white/30 opacity-60"
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
