// jsPDF is loaded on demand only (dynamic import), so the PDF library stays out of
// the homepage bundle and downloads only when a visitor actually requests a PDF
// report. The helpers module still imports jspdf statically; the dynamic import
// below is what keeps it in a separate chunk.
async function loadPdfHelpers() {
  return import("./pdfReportHelpers");
}

function buildAssessmentDoc(helpers, { companyName, overallScore, scoreLabel, subScores, topGaps, topOpportunities, roi }) {
  const { createBrandedDoc, addSectionHeader, addScoreBlock, addROIBlock, addListSection, addNextStepsAndFooter } = helpers;
  const { doc, y: startY } = createBrandedDoc(
    "Executive ROI & Readiness Report",
    `Prepared for: ${companyName || "Your Organization"}  |  ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`
  );
  let y = startY;

  y = addScoreBlock(doc, y, { scoreText: String(overallScore), scoreSubLabel: "Overall Business Intelligence Score (out of 100)", tag: scoreLabel });

  y = addSectionHeader(doc, "Readiness Score Breakdown", y);
  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(15, 29, 50);
  subScores.forEach((s) => {
    doc.text(s.label, 21, y);
    doc.text(`${s.score}/100`, 180, y, { align: "right" });
    y += 6;
  });
  y += 4;

  y = addROIBlock(doc, y, roi);
  y = addListSection(doc, y, "Top Gaps Identified", topGaps.map((g) => ({ label: `${g.label} (${g.score}/100)`, desc: g.desc })));
  y = addListSection(doc, y, "Top Opportunities", topOpportunities.map((o) => ({ label: o.label, desc: o.opportunity })));
  addNextStepsAndFooter(doc, y, "Schedule a free review call with Veracity Technologies to walk through every score, prioritize the highest-impact improvements, and build a clear roadmap to reduce manual work, strengthen AI readiness, and lower operational risk.");

  return doc;
}

/**
 * Generates and downloads a branded "Executive ROI & Readiness Report" PDF summarizing a
 * completed Business Technology Assessment - client-side only, no backend call required.
 * Async: the jsPDF chunk loads on first call only.
 */
export async function generateAssessmentPDF(data) {
  const helpers = await loadPdfHelpers();
  helpers.saveDoc(buildAssessmentDoc(helpers, data), "veracity-roi-readiness-report", data.companyName);
}

/** Same report, returned as a base64 string for emailing as an attachment. */
export async function getAssessmentPDFBase64(data) {
  const helpers = await loadPdfHelpers();
  return helpers.docToBase64(buildAssessmentDoc(helpers, data));
}
