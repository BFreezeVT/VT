// jsPDF is loaded on demand only (dynamic import), so the PDF library stays out of
// the blog bundle and downloads only when a visitor actually requests a checklist
// PDF. The helpers module still imports jspdf statically; the dynamic import
// below is what keeps it in a separate chunk.
async function loadPdfHelpers() {
  return import("./pdfReportHelpers");
}

function buildChecklistDoc(helpers, { companyName, checklistTitle, sections }) {
  const { createBrandedDoc, addListSection, addNextStepsAndFooter } = helpers;
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
 * Async: the jsPDF chunk loads on first call only.
 */
export async function generateChecklistPDF(data) {
  const helpers = await loadPdfHelpers();
  helpers.saveDoc(buildChecklistDoc(helpers, data), "veracity-checklist", data.companyName);
}

/** Same checklist, returned as a base64 string for emailing as an attachment. */
export async function getChecklistPDFBase64(data) {
  const helpers = await loadPdfHelpers();
  return helpers.docToBase64(buildChecklistDoc(helpers, data));
}
