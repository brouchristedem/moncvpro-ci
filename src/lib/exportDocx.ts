import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  VerticalAlign,
} from "docx";
import { CVData, EntryItem, Section } from "@/lib/types";
import { formatDate } from "@/lib/formatDate";
import { parseRichRuns } from "@/lib/richText";
import { TEMPLATE_LIST } from "@/lib/templateRegistry";

// Génère un document Word (.docx) à partir des données du CV. Pour rester
// simple et fiable à éditer dans Word, le document ne reproduit pas
// pixel pour pixel le modèle PDF choisi (dégradés, icônes, positions
// exactes), mais reprend désormais les deux éléments qui font la plus
// grosse différence visuelle perçue : la couleur choisie pour ce CV
// (cv.couleurPrimaire, au lieu d'une couleur fixe) et la disposition à
// une ou deux colonnes du modèle actif (avec la même répartition
// "bandeau latéral / contenu principal" que dans l'aperçu et le PDF).

// Mêmes règles de colonne par défaut que dans SectionPanel.tsx, à garder
// synchronisées : détermine dans quelle colonne une rubrique tombe tant
// que la personne n'a pas forcé un choix via section.colonne.
const DEFAULT_SIDEBAR_TYPES = new Set(["langues", "competences", "certifications", "interets", "references"]);

function effectiveColonne(section: Section): "lateral" | "principal" {
  if (section.colonne) return section.colonne;
  return DEFAULT_SIDEBAR_TYPES.has(section.type) ? "lateral" : "principal";
}

function hexNoHash(hex: string, fallback: string): string {
  const clean = (hex || "").replace("#", "").trim();
  return /^[0-9a-fA-F]{6}$/.test(clean) ? clean.toUpperCase() : fallback;
}

function textRunsFromMarkerText(text: string | undefined, sizeHalfPt: number): TextRun[] {
  const runs = parseRichRuns(text);
  if (runs.length === 0) return [];
  const out: TextRun[] = [];
  runs.forEach((run, i) => {
    const lines = run.text.split("\n");
    lines.forEach((line, li) => {
      if (li > 0) out.push(new TextRun({ text: "", break: 1 }));
      if (line.length === 0) return;
      out.push(
        new TextRun({
          text: line,
          bold: run.bold,
          underline: run.underline ? {} : undefined,
          size: sizeHalfPt,
        })
      );
    });
    void i;
  });
  return out;
}

function itemDateRange(item: EntryItem, cv: CVData): string {
  const t = cv.langue === "en" ? "Present" : "Aujourd'hui";
  const start = formatDate(item.dateDebut, cv.dateFormat, cv.langue);
  const end = item.enCours ? t : formatDate(item.dateFin, cv.dateFormat, cv.langue);
  if (!start && !end) return "";
  return `${start} — ${end}`;
}

function buildItemParagraphs(item: EntryItem, section: Section, cv: CVData): Paragraph[] {
  const paragraphs: Paragraph[] = [];
  const isLangOrSkill = section.type === "langues" || section.type === "competences";
  const isJustTitle = section.type === "interets";

  if (isJustTitle) {
    paragraphs.push(
      new Paragraph({
        bullet: { level: 0 },
        children: [new TextRun({ text: item.titre, size: 20 })],
      })
    );
    return paragraphs;
  }

  if (isLangOrSkill) {
    const label = item.niveau ? `${item.titre} — ${item.niveau}` : item.titre;
    paragraphs.push(
      new Paragraph({
        bullet: { level: 0 },
        children: [new TextRun({ text: label, size: 20 })],
      })
    );
    return paragraphs;
  }

  // Titre de l'entrée (poste, diplôme, projet, certification...)
  paragraphs.push(
    new Paragraph({
      spacing: { before: 160, after: 20 },
      children: [new TextRun({ text: item.titre || "", bold: true, size: 22 })],
    })
  );

  // Sous-titre (entreprise, école, organisme...) + lieu
  const subtitleParts = [item.sousTitre, item.lieu].filter(Boolean);
  if (subtitleParts.length > 0) {
    paragraphs.push(
      new Paragraph({
        spacing: { after: 20 },
        children: [
          new TextRun({ text: subtitleParts.join(" — "), italics: true, size: 20, color: "555555" }),
        ],
      })
    );
  }

  // Dates
  const dateRange = itemDateRange(item, cv);
  if (dateRange) {
    paragraphs.push(
      new Paragraph({
        spacing: { after: 40 },
        children: [new TextRun({ text: dateRange, size: 18, color: "777777" })],
      })
    );
  }

  // Description (avec gras / souligné conservés)
  if (item.description) {
    const runs = textRunsFromMarkerText(item.description, 20);
    if (runs.length > 0) {
      paragraphs.push(new Paragraph({ spacing: { after: 100 }, children: runs }));
    }
  }

  return paragraphs;
}

function buildSectionParagraphs(section: Section, cv: CVData, accentHex: string): Paragraph[] {
  const out: Paragraph[] = [
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 100 },
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 6, color: accentHex, space: 2 },
      },
      children: [new TextRun({ text: section.titre, bold: true, size: 26, color: accentHex })],
    }),
  ];
  for (const item of section.items) {
    out.push(...buildItemParagraphs(item, section, cv));
  }
  return out;
}

export async function generateCvDocxBlob(cv: CVData): Promise<Blob> {
  const { personalInfo } = cv;
  const accentHex = hexNoHash(cv.couleurPrimaire, "0B6E4F");
  const templateMeta = TEMPLATE_LIST.find((tpl) => tpl.id === cv.templateId);
  const isTwoColumn = templateMeta?.colonnes === 2;

  const fullName =
    cv.ordreNom === "nom-prenom"
      ? `${personalInfo.nom} ${personalInfo.prenom}`.trim()
      : `${personalInfo.prenom} ${personalInfo.nom}`.trim();

  const contactLine = [personalInfo.email, personalInfo.telephone, personalInfo.adresse]
    .filter(Boolean)
    .join("   •   ");

  const extraLines = [
    personalInfo.linkedin,
    personalInfo.siteWeb,
    personalInfo.permis,
    ...personalInfo.autresInfos.map((info) => (info.valeur ? `${info.label} : ${info.valeur}` : "")),
  ].filter(Boolean);

  const headerParagraphs: Paragraph[] = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
      children: [new TextRun({ text: fullName || "CV", bold: true, size: 44, color: accentHex })],
    }),
  ];

  if (personalInfo.titre) {
    headerParagraphs.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [new TextRun({ text: personalInfo.titre, size: 24, color: "444444" })],
      })
    );
  }

  if (contactLine) {
    headerParagraphs.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: extraLines.length > 0 ? 20 : 200 },
        children: [new TextRun({ text: contactLine, size: 18, color: "555555" })],
      })
    );
  }

  if (extraLines.length > 0) {
    headerParagraphs.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [new TextRun({ text: extraLines.join("   •   "), size: 18, color: "555555" })],
      })
    );
  }

  const orderedSections = [...cv.sections]
    .filter((s) => s.visible && s.items.length > 0)
    .sort((a, b) => a.ordre - b.ordre);

  const body: (Paragraph | Table)[] = [...headerParagraphs];

  if (isTwoColumn) {
    // Reproduit la disposition "bandeau latéral / contenu principal" du
    // modèle choisi, avec la même répartition des rubriques que dans
    // l'aperçu et le PDF (section.colonne, sinon les types par défaut du
    // bandeau : langues, compétences, certifications, centres d'intérêt,
    // références). Un tableau à 2 cellules sans bordures visibles sert de
    // colonnes, ce que Word gère nativement.
    const sidebarSections = orderedSections.filter((s) => effectiveColonne(s) === "lateral");
    const mainSections = orderedSections.filter((s) => effectiveColonne(s) === "principal");

    const sidebarChildren = sidebarSections.flatMap((s) => buildSectionParagraphs(s, cv, accentHex));
    const mainChildren = mainSections.flatMap((s) => buildSectionParagraphs(s, cv, accentHex));

    body.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 34, type: WidthType.PERCENTAGE },
                verticalAlign: VerticalAlign.TOP,
                margins: { top: 100, bottom: 100, left: 100, right: 200 },
                children:
                  sidebarChildren.length > 0
                    ? sidebarChildren
                    : [new Paragraph({ children: [] })],
              }),
              new TableCell({
                width: { size: 66, type: WidthType.PERCENTAGE },
                verticalAlign: VerticalAlign.TOP,
                margins: { top: 100, bottom: 100, left: 200, right: 100 },
                children:
                  mainChildren.length > 0
                    ? mainChildren
                    : [new Paragraph({ children: [] })],
              }),
            ],
          }),
        ],
      })
    );
  } else {
    for (const section of orderedSections) {
      body.push(...buildSectionParagraphs(section, cv, accentHex));
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: body,
      },
    ],
  });

  return Packer.toBlob(doc);
}

export function triggerDocxDownload(blob: Blob, cv: CVData) {
  const { personalInfo } = cv;
  const nameSlug = [personalInfo.prenom, personalInfo.nom]
    .filter(Boolean)
    .join("-")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9-]/g, "") || "cv";

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `CV-${nameSlug}.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
