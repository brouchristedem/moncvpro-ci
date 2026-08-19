import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/ThemeContext";
import { AuthProvider } from "@/lib/AuthContext";
import { Analytics } from "@vercel/analytics/next";
import WhatsAppButton from "@/components/WhatsAppButton";

const siteUrl = "https://moncvpro-ci.vercel.app";
const title = "MON CV PRO CI — Créez un CV professionnel en quelques minutes";
const description =
  "Créez un CV professionnel et moderne, prisé par les recruteurs internationaux. 15 modèles, personnalisation complète, lettre de motivation assortie, export PDF. Pensé pour la Côte d'Ivoire.";

// Explicite plutôt que de laisser Next.js déduire un viewport par défaut :
// certaines versions de Safari iPad appliquent un zoom/scaling incohérent
// sans cette déclaration, ce qui peut faire disparaître ou mal positionner
// des blocs de la page d'accueil.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | MON CV PRO CI",
  },
  description,
  keywords: [
    "créer un CV",
    "CV en ligne",
    "CV professionnel",
    "modèle de CV",
    "CV gratuit",
    "CV Côte d'Ivoire",
    "CV Abidjan",
    "générateur de CV",
    "faire un CV PDF",
    "lettre de motivation",
    "lettre de motivation Côte d'Ivoire",
  ],
  authors: [{ name: "MON CV PRO CI" }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  verification: {
    google: "p9gV1Gq-92jhVbkcomEXCRKBbOKmkzbU8k9ZCZfd-H0",
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "MON CV PRO CI",
    title,
    description,
    images: [
      {
        url: "/og-image-v5.png",
        width: 1200,
        height: 630,
        alt: "MON CV PRO CI — Créez un CV professionnel en quelques minutes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image-v5.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "MON CV PRO CI",
              url: siteUrl,
              description,
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: [
                {
                  "@type": "Offer",
                  name: "CV seul",
                  priceCurrency: "XOF",
                  price: "1000",
                },
                {
                  "@type": "Offer",
                  name: "Pack Candidature Complète (CV + lettre de motivation)",
                  priceCurrency: "XOF",
                  price: "1500",
                },
              ],
              inLanguage: ["fr", "en"],
            }),
          }}
        />
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
