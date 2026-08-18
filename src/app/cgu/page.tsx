import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions d'utilisation et confidentialité",
};

export default function CGUPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-foreground/60 hover:text-foreground transition">
            <ArrowLeft size={15} /> Retour à l&apos;accueil
          </Link>
          <span className="font-extrabold text-xs sm:text-sm tracking-wide uppercase">
            MON CV PRO CI
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-10 text-sm leading-relaxed text-foreground/75">
        <div>
          <h1 className="text-2xl font-bold mb-2 text-foreground">
            Conditions générales d&apos;utilisation
          </h1>
          <p className="text-xs text-foreground/45">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long" })}
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="font-semibold text-foreground">1. Objet</h2>
          <p>
            MON CV PRO CI est un service en ligne permettant de créer, personnaliser et télécharger
            un curriculum vitae au format PDF, avec possibilité d&apos;y associer une lettre de
            motivation assortie. L&apos;utilisation du service implique l&apos;acceptation pleine et
            entière des présentes conditions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-foreground">2. Fonctionnement du service</h2>
          <p>
            L&apos;éditeur permet de renseigner ses informations, de choisir un modèle parmi ceux
            proposés, puis d&apos;exporter son CV en PDF. Un aperçu gratuit filigrané est disponible
            avant tout paiement. Le téléchargement du CV finalisé est soumis à un paiement unique de
            1 000 FCFA via Wave (CV seul), ou 1 500 FCFA pour le Pack Candidature Complète incluant en
            plus une lettre de motivation assortie au CV. Aucun abonnement ni frais récurrent.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-foreground">3. Paiement</h2>
          <p>
            Le paiement s&apos;effectue par Wave. Une fois la transaction confirmée, le téléchargement
            du CV est débloqué. Un code promotionnel valide peut remplacer le paiement lorsque
            l&apos;offre est active.
          </p>
        </section>

        <section id="confidentialite" className="space-y-2 scroll-mt-24">
          <h2 className="font-semibold text-foreground">4. Confidentialité des données</h2>
          <p>
            Les informations saisies dans l&apos;éditeur (nom, expériences, coordonnées, photo, etc.)
            sont utilisées uniquement pour générer votre CV et ne sont ni vendues ni partagées avec
            des tiers à des fins commerciales. Elles sont conservées de façon sécurisée le temps
            nécessaire à l&apos;utilisation du service.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-foreground">5. Propriété du contenu</h2>
          <p>
            Le contenu de votre CV (textes, photo, informations personnelles) vous appartient. Les
            modèles, le design et le code de la plateforme restent la propriété de MON CV PRO CI.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-foreground">6. Contact</h2>
          <p>
            Pour toute question relative à ces conditions ou à vos données, contactez-nous via
            WhatsApp au +225 05 45 17 75 71.
          </p>
        </section>
      </main>
    </div>
  );
}
