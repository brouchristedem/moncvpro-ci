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
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 px-6 text-center bg-white text-[#10241C]">
      <p className="text-sm text-[#10241C]/60 max-w-sm">
        Une erreur inattendue est survenue lors de l&apos;affichage de cette page.
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="rounded-full bg-[#0B6E4F] text-white px-5 py-2.5 text-sm font-semibold hover:bg-[#085b41] transition"
        >
          Réessayer
        </button>
        <Link
          href="/editor"
          className="rounded-full border border-[#10241C]/15 px-5 py-2.5 text-sm font-medium hover:border-[#10241C]/40 transition"
        >
          Aller à l&apos;éditeur
        </Link>
      </div>
    </div>
  );
}
