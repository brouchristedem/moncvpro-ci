import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions d'utilisation et confidentialité",
};

export default function CGUPage() {
  return (
    <div className="min-h-screen bg-white text-[#10241C]" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <header className="border-b border-[#E5E7E2] px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-[#10241C]/60 hover:text-[#10241C] transition">
            <ArrowLeft size={15} /> Retour à l&apos;accueil
          </Link>
          <span className="font-semibold" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
            Mon CV Pro <span className="text-[#0B6E4F]">CI</span>
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-14 space-y-10 text-sm leading-relaxed text-[#10241C]/80">
        <div>
          <h1 className="text-2xl font-semibold mb-2 text-[#10241C]" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
            Conditions générales d&apos;utilisation
          </h1>
          <p className="text-xs text-[#10241C]/45">Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long" })}</p>
        </div>

        <section className="space-y-2">
          <h2 className="font-semibold text-[#10241C]">1. Objet</h2>
          <p>
            Mon CV Pro CI est un service en ligne permettant de créer, personnaliser et télécharger
            un curriculum vitae au format PDF. L&apos;utilisation du service implique l&apos;acceptation
            pleine et entière des présentes conditions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-[#10241C]">2. Fonctionnement du service</h2>
          <p>
            L&apos;éditeur permet de renseigner ses informations, de choisir un modèle parmi ceux
            proposés, puis d&apos;exporter son CV en PDF. Le téléchargement du CV est soumis à un
            paiement unique de 1 000 FCFA via Wave, sans abonnement ni frais récurrents.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-[#10241C]">3. Paiement</h2>
          <p>
            Le paiement s&apos;effectue par Wave. Une fois la transaction confirmée, le téléchargement
            du CV est débloqué. Un code promotionnel valide peut remplacer le paiement lorsque
            l&apos;offre est active.
          </p>
        </section>

        <section id="confidentialite" className="space-y-2 scroll-mt-24">
          <h2 className="font-semibold text-[#10241C]">4. Confidentialité des données</h2>
          <p>
            Les informations saisies dans l&apos;éditeur (nom, expériences, coordonnées, photo, etc.)
            sont utilisées uniquement pour générer votre CV et ne sont ni vendues ni partagées avec
            des tiers à des fins commerciales. Elles sont conservées de façon sécurisée le temps
            nécessaire à l&apos;utilisation du service.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-[#10241C]">5. Propriété du contenu</h2>
          <p>
            Le contenu de votre CV (textes, photo, informations personnelles) vous appartient. Les
            modèles, le design et le code de la plateforme restent la propriété de Mon CV Pro CI.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-[#10241C]">6. Contact</h2>
          <p>
            Pour toute question relative à ces conditions ou à vos données, contactez-nous via
            WhatsApp au +225 05 45 17 75 71.
          </p>
        </section>
      </main>
    </div>
  );
}
