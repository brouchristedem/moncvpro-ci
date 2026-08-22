"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "moncvpro_pwa_install_dismissed";

export default function PwaInstall() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Echec silencieux : l'app reste utilisable normalement sans SW.
      });
    }

    const standaloneMql = window.matchMedia("(display-mode: standalone)");
    setIsStandalone(
      standaloneMql.matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true
    );

    const dismissed = localStorage.getItem(DISMISS_KEY);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      if (dismissed) return;
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    const handleInstalled = () => {
      setVisible(false);
      setDeferredPrompt(null);
    };
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  if (isStandalone || !visible || !deferredPrompt) return null;

  const handleInstall = async () => {
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setVisible(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto flex max-w-sm items-center gap-3 rounded-2xl border border-black/5 bg-white p-3 shadow-xl dark:border-white/10 dark:bg-neutral-900 sm:left-auto sm:right-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600">
        <Download className="h-5 w-5 text-white" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">
          Installer MON CV PRO CI
        </p>
        <p className="truncate text-xs text-foreground/60">
          Accès rapide depuis votre écran d&apos;accueil
        </p>
      </div>
      <button
        onClick={handleInstall}
        className="shrink-0 rounded-lg bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-600/90"
      >
        Installer
      </button>
      <button
        onClick={handleDismiss}
        aria-label="Fermer"
        className="shrink-0 rounded-lg p-1.5 text-foreground/40 hover:bg-black/5 dark:hover:bg-white/10"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
