"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Erreur non gérée sur la page :", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 px-6 text-center bg-background text-foreground">
      <p className="text-sm text-foreground/60 max-w-sm">
        Une erreur inattendue est survenue lors de l&apos;affichage de cette page.
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="rounded-lg bg-brand-600 text-white px-5 py-2.5 text-sm font-semibold hover:bg-brand-700 transition"
        >
          Réessayer
        </button>
        <Link
          href="/editor"
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:border-foreground/30 transition"
        >
          Aller à l&apos;éditeur
        </Link>
      </div>
    </div>
  );
}
