import { createBrandedDoc, addSectionHeader, addScoreBlock, addROIBlock, addListSection, addNextStepsAndFooter, saveDoc, docToBase64 } from "./pdfReportHelpers";

function buildAssessmentDoc({ companyName, overallScore, scoreLabel, subScores, topGaps, topOpportunities, roi }) {
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
 */
export function generateAssessmentPDF(data) {
  saveDoc(buildAssessmentDoc(data), "veracity-roi-readiness-report", data.companyName);
}

/** Same report, returned as a base64 string for emailing as an attachment. */
export function getAssessmentPDFBase64(data) {
  return docToBase64(buildAssessmentDoc(data));
}
