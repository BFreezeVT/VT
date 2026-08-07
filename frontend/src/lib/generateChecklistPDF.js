import { createBrandedDoc, addListSection, addNextStepsAndFooter, saveDoc, docToBase64 } from "./pdfReportHelpers";

function buildChecklistDoc({ companyName, checklistTitle, sections }) {
  const { doc, y: startY } = createBrandedDoc(
    checklistTitle,
    `Prepared for: ${companyName || "Your Organization"}  |  ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`
  );
  let y = startY;

  sections.forEach((section) => {
    y = addListSection(doc, y, section.title, section.items.map((label) => ({ label })));
  });

  addNextStepsAndFooter(
    doc,
    y,
    "Schedule a free cybersecurity assessment with Veracity Technologies to see exactly where your organization stands against these threat trends - and get a prioritized roadmap to close the gaps."
  );

  return doc;
}

/**
 * Generates and downloads a branded checklist PDF (blog post lead magnet) - client-side only.
 */
export function generateChecklistPDF(data) {
  saveDoc(buildChecklistDoc(data), "veracity-checklist", data.companyName);
}

/** Same checklist, returned as a base64 string for emailing as an attachment. */
export function getChecklistPDFBase64(data) {
  return docToBase64(buildChecklistDoc(data));
}
