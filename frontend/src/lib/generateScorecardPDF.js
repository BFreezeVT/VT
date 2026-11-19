// jsPDF is loaded on demand only (dynamic import), so the PDF library stays out of
// the scorecard bundle and downloads only when a visitor actually requests a PDF
// report. The helpers module still imports jspdf statically; the dynamic import
// below is what keeps it in a separate chunk.
async function loadPdfHelpers() {
  return import("./pdfReportHelpers");
}

function buildScorecardDoc(helpers, { companyName, riskLevel, totalScore, maxScore, topRisks, topRecs, roi }) {
  const { createBrandedDoc, addScoreBlock, addROIBlock, addListSection, addNextStepsAndFooter } = helpers;
  const { doc, y: startY } = createBrandedDoc(
    "Cyber Risk & ROI Readiness Report",
    `Prepared for: ${companyName || "Your Organization"}  |  ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`
  );
  let y = startY;

  y = addScoreBlock(doc, y, { scoreText: `${totalScore}/${maxScore}`, scoreSubLabel: "Cyber Risk Score", tag: `${riskLevel} RISK` });

  y = addROIBlock(doc, y, roi);
  y = addListSection(doc, y, "Top Risks Identified", topRisks.map((r) => ({ label: r.risk, desc: `Based on: ${r.text}` })));
  y = addListSection(doc, y, "Recommended Actions", topRecs.map((rec) => ({ label: rec })));
  addNextStepsAndFooter(doc, y, "Schedule a free risk review call with Veracity Technologies to walk through your score, prioritize the highest-impact fixes, and build a clear roadmap to reduce risk and reclaim wasted hours.");

  return doc;
}

/**
 * Generates and downloads a branded "Cyber Risk & ROI Readiness Report" PDF - client-side only.
 * Async: the jsPDF chunk loads on first call only.
 */
export async function generateScorecardPDF(data) {
  const helpers = await loadPdfHelpers();
  helpers.saveDoc(buildScorecardDoc(helpers, data), "veracity-risk-roi-report", data.companyName);
}

/** Same report, returned as a base64 string for emailing as an attachment. */
export async function getScorecardPDFBase64(data) {
  const helpers = await loadPdfHelpers();
  return helpers.docToBase64(buildScorecardDoc(helpers, data));
}
