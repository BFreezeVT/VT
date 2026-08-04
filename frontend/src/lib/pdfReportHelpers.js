import jsPDF from "jspdf";

export const NAVY = [0, 59, 113];
export const BLUE = [0, 119, 179];
export const DARK = [15, 29, 50];
export const GRAY = [90, 105, 128];
export const PAGE_WIDTH = 210;

export function createBrandedDoc(subtitle, contextLine) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, PAGE_WIDTH, 32, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("VERACITY TECHNOLOGIES", 15, 14);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(subtitle, 15, 22);
  doc.setFontSize(9);
  doc.setTextColor(200, 220, 235);
  doc.text(contextLine, 15, 28);
  return { doc, y: 44 };
}

export function addSectionHeader(doc, text, y) {
  doc.setFillColor(...BLUE);
  doc.rect(15, y, 3, 6, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...DARK);
  doc.text(text, 21, y + 5);
  return y + 12;
}

/** Rounded score box: a big number + label + colored tag underneath the label. */
export function addScoreBlock(doc, y, { scoreText, scoreSubLabel, tag }) {
  doc.setFillColor(245, 248, 251);
  doc.roundedRect(15, y, PAGE_WIDTH - 30, 24, 2, 2, "F");
  doc.setTextColor(...DARK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(scoreText, 22, y + 16);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...GRAY);
  doc.text(scoreSubLabel, 42, y + 11);
  doc.setTextColor(...BLUE);
  doc.setFont("helvetica", "bold");
  doc.text(tag, 42, y + 18);
  return y + 32;
}

/** Intro sentence + 2 stat boxes (hours reclaimed / savings) + disclaimer note. */
export function addROIBlock(doc, y, roi) {
  y = addSectionHeader(doc, "Personalized Efficiency Forecast", y);
  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...GRAY);
  const roiIntro = doc.splitTextToSize(
    `Based on an estimated team of ${roi.teamSize} and roughly ${roi.weeklyHoursPerPerson} manual hours per person per week, here is a sample estimate of what closing your gaps could be worth:`,
    PAGE_WIDTH - 30
  );
  doc.text(roiIntro, 21, y);
  y += roiIntro.length * 5 + 4;

  const boxWidth = (PAGE_WIDTH - 34) / 2;
  doc.setFillColor(245, 248, 251);
  doc.roundedRect(15, y, boxWidth, 22, 2, 2, "F");
  doc.roundedRect(15 + boxWidth + 4, y, boxWidth, 22, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...DARK);
  doc.text(roi.annualHoursReclaimed.toLocaleString(), 21, y + 12);
  doc.setTextColor(...BLUE);
  doc.text(`$${roi.monthlySavingsForecast.toLocaleString()}`, 21 + boxWidth + 4, y + 12);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...GRAY);
  doc.text("Annual Hours Reclaimed", 21, y + 18);
  doc.text("Monthly Savings Forecast", 21 + boxWidth + 4, y + 18);
  y += 28;

  doc.setFontSize(7.5);
  doc.setTextColor(...GRAY);
  const disclaimer = doc.splitTextToSize(
    `Directional sample estimate based on industry-average assumptions (~$${roi.hourlyRate}/hr fully-loaded labor cost) and your answers - not a quote or guarantee. A formal review with our team will refine this to your actual workflows.`,
    PAGE_WIDTH - 30
  );
  doc.text(disclaimer, 21, y);
  return y + disclaimer.length * 4 + 6;
}

/** Generic "bold label + description" bulleted section, page-break aware. */
export function addListSection(doc, y, title, items) {
  if (y > 230) { doc.addPage(); y = 20; }
  y = addSectionHeader(doc, title, y);
  doc.setFontSize(9.5);
  items.forEach(({ label, desc }) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...DARK);
    doc.text(`\u2022 ${label}`, 21, y);
    y += 5;
    if (desc) {
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...GRAY);
      const wrapped = doc.splitTextToSize(desc, PAGE_WIDTH - 36);
      doc.text(wrapped, 24, y);
      y += wrapped.length * 4.5 + 3;
    }
  });
  return y + 4;
}

export function addNextStepsAndFooter(doc, y, nextStepsText) {
  if (y > 220) { doc.addPage(); y = 20; }
  y = addSectionHeader(doc, "Next Steps", y);
  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...GRAY);
  const wrapped = doc.splitTextToSize(nextStepsText, PAGE_WIDTH - 30);
  doc.text(wrapped, 21, y);
  y += wrapped.length * 4.5 + 8;

  doc.setFillColor(...NAVY);
  doc.roundedRect(15, y, PAGE_WIDTH - 30, 18, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Veracity Technologies  |  (952) 941-7333  |  www.veracitytechmn.com", PAGE_WIDTH / 2, y + 11, { align: "center" });
}

export function saveDoc(doc, filenamePrefix, companyName) {
  const fileSafe = (companyName || "your-organization").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  doc.save(`${filenamePrefix}-${fileSafe}.pdf`);
}

/** Returns the PDF as a pure base64 string (no data-URI prefix), for emailing as an attachment. */
export function docToBase64(doc) {
  const dataUri = doc.output("datauristring");
  return dataUri.split(",")[1];
}
