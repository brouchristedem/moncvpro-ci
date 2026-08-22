/**
 * Détecte si le site s'exécute à l'intérieur du TWA Android (l'app "MON CV
 * PRO CI" installée depuis le Play Store), par opposition à un navigateur
 * classique (Chrome mobile/desktop, Safari, etc.) ou à la PWA installée via
 * "Ajouter à l'écran d'accueil".
 *
 * Android renseigne document.referrer avec le schéma "android-app://<package>"
 * lorsqu'une page est ouverte depuis une Trusted Web Activity. C'est le
 * signal le plus fiable, et il ne dépend d'aucune configuration côté
 * manifest (contrairement à display-mode: standalone, qui est aussi vrai
 * pour une PWA installée normalement).
 *
 * Sert à adapter le parcours de paiement : Google Play interdit en principe
 * de proposer un moyen de paiement autre que Google Play Billing depuis
 * l'intérieur d'une app distribuée sur le Store. On ne peut pas utiliser
 * Google Play Billing ici (Côte d'Ivoire non éligible aux versements
 * Google), donc on affiche une information claire indiquant que le paiement
 * s'effectue dans le navigateur plutôt que de le présenter comme un
 * parcours intégré et invisible.
 */
export function isTwaContext(): boolean {
  if (typeof document === "undefined") return false;
  return document.referrer.startsWith("android-app://");
}
