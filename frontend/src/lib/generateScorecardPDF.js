import { createBrandedDoc, addScoreBlock, addROIBlock, addListSection, addNextStepsAndFooter, saveDoc, docToBase64 } from "./pdfReportHelpers";

function buildScorecardDoc({ companyName, riskLevel, totalScore, maxScore, topRisks, topRecs, roi }) {
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
 */
export function generateScorecardPDF(data) {
  saveDoc(buildScorecardDoc(data), "veracity-risk-roi-report", data.companyName);
}

/** Same report, returned as a base64 string for emailing as an attachment. */
export function getScorecardPDFBase64(data) {
  return docToBase64(buildScorecardDoc(data));
}
