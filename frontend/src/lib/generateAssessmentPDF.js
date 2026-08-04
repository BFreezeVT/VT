import jsPDF from "jspdf";

const NAVY = [0, 59, 113];
const BLUE = [0, 119, 179];
const DARK = [15, 29, 50];
const GRAY = [90, 105, 128];

function addSectionHeader(doc, text, y) {
  doc.setFillColor(...BLUE);
  doc.rect(15, y, 3, 6, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...DARK);
  doc.text(text, 21, y + 5);
  return y + 12;
}

/**
 * Generates and downloads a branded "Executive ROI & Readiness Report" PDF summarizing a
 * completed Business Technology Assessment - client-side only, no backend call required since
 * all the underlying data already lives in the results page state.
 */
export function generateAssessmentPDF({ companyName, overallScore, scoreLabel, subScores, topGaps, topOpportunities, roi }) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = 210;
  let y = 0;

  // Header band
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, pageWidth, 32, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("VERACITY TECHNOLOGIES", 15, 14);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Executive ROI & Readiness Report", 15, 22);
  doc.setFontSize(9);
  doc.setTextColor(200, 220, 235);
  doc.text(`Prepared for: ${companyName || "Your Organization"}  |  ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, 15, 28);

  y = 44;

  // Overall score block
  doc.setFillColor(245, 248, 251);
  doc.roundedRect(15, y, pageWidth - 30, 24, 2, 2, "F");
  doc.setTextColor(...DARK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(String(overallScore), 22, y + 16);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...GRAY);
  doc.text("Overall Business Intelligence Score (out of 100)", 42, y + 11);
  doc.setTextColor(...BLUE);
  doc.setFont("helvetica", "bold");
  doc.text(scoreLabel, 42, y + 18);
  y += 32;

  // Sub-scores
  y = addSectionHeader(doc, "Readiness Score Breakdown", y);
  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...DARK);
  subScores.forEach((s) => {
    doc.text(`${s.label}`, 21, y);
    doc.text(`${s.score}/100`, 180, y, { align: "right" });
    y += 6;
  });
  y += 4;

  // ROI section
  y = addSectionHeader(doc, "Personalized Efficiency Forecast", y);
  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...GRAY);
  const roiIntro = doc.splitTextToSize(
    `Based on an estimated team of ${roi.teamSize} and roughly ${roi.weeklyHoursPerPerson} manual hours per person per week, here is a sample estimate of what closing your automation gaps could be worth:`,
    pageWidth - 30
  );
  doc.text(roiIntro, 21, y);
  y += roiIntro.length * 5 + 4;

  doc.setFillColor(245, 248, 251);
  doc.roundedRect(15, y, (pageWidth - 34) / 2, 22, 2, 2, "F");
  doc.roundedRect(15 + (pageWidth - 30) / 2 + 4, y, (pageWidth - 34) / 2, 22, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...DARK);
  doc.text(roi.annualHoursReclaimed.toLocaleString(), 21, y + 12);
  doc.setTextColor(...BLUE);
  doc.text(`$${roi.monthlySavingsForecast.toLocaleString()}`, 21 + (pageWidth - 30) / 2 + 4, y + 12);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...GRAY);
  doc.text("Annual Hours Reclaimed", 21, y + 18);
  doc.text("Monthly Savings Forecast", 21 + (pageWidth - 30) / 2 + 4, y + 18);
  y += 28;

  doc.setFontSize(7.5);
  doc.setTextColor(...GRAY);
  const disclaimer = doc.splitTextToSize(
    "Directional sample estimate based on industry-average assumptions ($38/hr fully-loaded labor cost) and your assessment answers - not a quote or guarantee. A formal review with our team will refine this to your actual workflows.",
    pageWidth - 30
  );
  doc.text(disclaimer, 21, y);
  y += disclaimer.length * 4 + 6;

  // Top Gaps
  if (y > 230) { doc.addPage(); y = 20; }
  y = addSectionHeader(doc, "Top Gaps Identified", y);
  doc.setFontSize(9.5);
  doc.setTextColor(...DARK);
  topGaps.forEach((g) => {
    doc.setFont("helvetica", "bold");
    doc.text(`• ${g.label} (${g.score}/100)`, 21, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...GRAY);
    const desc = doc.splitTextToSize(g.desc, pageWidth - 36);
    doc.text(desc, 24, y);
    y += desc.length * 4.5 + 3;
    doc.setTextColor(...DARK);
  });
  y += 4;

  // Top Opportunities
  if (y > 230) { doc.addPage(); y = 20; }
  y = addSectionHeader(doc, "Top Opportunities", y);
  doc.setFontSize(9.5);
  topOpportunities.forEach((o) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...DARK);
    doc.text(`• ${o.label}`, 21, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...GRAY);
    const desc = doc.splitTextToSize(o.opportunity, pageWidth - 36);
    doc.text(desc, 24, y);
    y += desc.length * 4.5 + 3;
  });
  y += 4;

  // Next Steps
  if (y > 220) { doc.addPage(); y = 20; }
  y = addSectionHeader(doc, "Next Steps", y);
  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...GRAY);
  const nextSteps = doc.splitTextToSize(
    "Schedule a free review call with Veracity Technologies to walk through every score, prioritize the highest-impact improvements, and build a clear roadmap to reduce manual work, strengthen AI readiness, and lower operational risk.",
    pageWidth - 30
  );
  doc.text(nextSteps, 21, y);
  y += nextSteps.length * 4.5 + 8;

  doc.setFillColor(...NAVY);
  doc.roundedRect(15, y, pageWidth - 30, 18, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Veracity Technologies  |  (952) 941-7333  |  www.veracitytechmn.com", pageWidth / 2, y + 11, { align: "center" });

  const fileSafeCompany = (companyName || "your-organization").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  doc.save(`veracity-roi-readiness-report-${fileSafeCompany}.pdf`);
}
