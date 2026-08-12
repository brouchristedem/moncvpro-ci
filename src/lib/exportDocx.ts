import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
} from "docx";
import { CVData, EntryItem, Section } from "@/lib/types";
import { formatDate } from "@/lib/formatDate";
import { parseRichRuns } from "@/lib/richText";

// Génère un document Word (.docx) à partir des données du CV. La mise en
// page reste volontairement simple et linéaire (pas de colonnes ni de
// couleurs de gabarit) : l'objectif est un document propre, éditable dans
// Word, qui reprend fidèlement le contenu et l'ordre choisis dans
// l'éditeur — pas un clone visuel du modèle PDF.

const BRAND_HEX = "0B6E4F";

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

export async function generateCvDocxBlob(cv: CVData): Promise<Blob> {
  const { personalInfo } = cv;
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
      children: [new TextRun({ text: fullName || "CV", bold: true, size: 44, color: BRAND_HEX })],
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

  const body: Paragraph[] = [...headerParagraphs];

  for (const section of orderedSections) {
    body.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 100 },
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 6, color: BRAND_HEX, space: 2 },
        },
        children: [new TextRun({ text: section.titre, bold: true, size: 26, color: BRAND_HEX })],
      })
    );
    for (const item of section.items) {
      body.push(...buildItemParagraphs(item, section, cv));
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
