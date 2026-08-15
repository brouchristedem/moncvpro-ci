"use client";

import { useEffect, useRef, useState } from "react";
import { CVData } from "@/lib/types";
import CVRenderer from "@/components/templates/CVRenderer";

const CONTENT_WIDTH_PX = 794; // équivalent de 210mm à 96dpi
// Ratio d'une page A4 (210 × 297 mm) : toutes les vignettes de la galerie
// gardent ce même ratio, quelle que soit la longueur réelle du contenu du
// modèle. Résultat : toutes les cartes ont exactement la même hauteur et
// s'alignent parfaitement sur une même ligne, au lieu que certaines soient
// plus grandes ou plus "coupées" que d'autres.
const A4_RATIO = 297 / 210;

/**
 * Vignette de modèle pour la landing page : un cadre de ratio A4 fixe, dans
 * lequel le CV de démo est mis à l'échelle par sa largeur puis aligné en
 * haut (montre l'en-tête / la photo, partie la plus identifiante du
 * modèle). Contrairement à un cadre de hauteur variable selon le contenu,
 * cela garantit une grille de vignettes parfaitement régulière.
 */
export default function TemplateThumbnail({ cv }: { cv: CVData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const compute = () => {
      const width = el.clientWidth;
      if (width > 0) setScale(width / CONTENT_WIDTH_PX);
    };

    compute();
    const observer = new ResizeObserver(compute);
    observer.observe(el);
    return () => observer.disconnect();
  }, [cv.templateId]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden bg-white"
      style={{ aspectRatio: `1 / ${A4_RATIO}` }}
    >
      <div
        className="bg-white cv-protected"
        style={{
          width: CONTENT_WIDTH_PX,
          transform: `scale(${scale || 1})`,
          transformOrigin: "top left",
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <CVRenderer cv={cv} />
      </div>
    </div>
  );
}

