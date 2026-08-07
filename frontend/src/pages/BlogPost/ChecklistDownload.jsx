import { useState } from "react";
import { ClipboardCheck, Download, Mail, ArrowRight } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useLeadSubmit } from "../../hooks/useLeadSubmit";
import { emailReport } from "../../lib/emailReport";
import { generateChecklistPDF, getChecklistPDFBase64 } from "../../lib/generateChecklistPDF";

/** Gated "checklist" lead magnet embedded in a resource article. Collects a lead, then
 * unlocks an instant client-side PDF download + an optional "email me a copy" action. */
export default function ChecklistDownload({ checklist, post }) {
  const { submitLead } = useLeadSubmit();
  const [stage, setStage] = useState("form"); // form, unlocked
  const [contactInfo, setContactInfo] = useState({ company: "", name: "", phone: "", email: "" });
  const [emailingReport, setEmailingReport] = useState(false);
  const [reportEmailStatus, setReportEmailStatus] = useState(null); // null, "sent", "error"

  const buildPDFPayload = () => ({
    companyName: contactInfo.company,
    checklistTitle: checklist.pdfTitle,
    sections: checklist.sections,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = {
      company: fd.get("company"),
      name: fd.get("name"),
      phone: fd.get("phone"),
      email: fd.get("email"),
      source_page: `checklist-${post.slug}`,
      contact_preference: "email",
    };
    setContactInfo(data);
    await submitLead(data);
    setStage("unlocked");
    if (window.gtag) window.gtag("event", "checklist_download_unlock", { event_category: "lead_magnet", post_slug: post.slug });
  };

  const handleDownload = () => {
    generateChecklistPDF(buildPDFPayload());
    if (window.gtag) window.gtag("event", "checklist_pdf_download", { event_category: "lead_magnet", post_slug: post.slug });
  };

  const handleEmailChecklist = async () => {
    setEmailingReport(true);
    setReportEmailStatus(null);
    try {
      const pdfBase64 = getChecklistPDFBase64(buildPDFPayload());
      await emailReport({
        recipientEmail: contactInfo.email,
        recipientName: contactInfo.name,
        companyName: contactInfo.company,
        reportTitle: checklist.pdfTitle,
        pdfBase64,
      });
      setReportEmailStatus("sent");
    } catch {
      setReportEmailStatus("error");
    } finally {
      setEmailingReport(false);
    }
  };

  return (
    <div data-testid="checklist-download-card" className="my-12 grid-border-card p-8">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-11 h-11 rounded-sm bg-[#0077B3]/10 border border-[#0077B3]/30 flex items-center justify-center flex-shrink-0">
          <ClipboardCheck className="w-5 h-5 text-[#0077B3]" />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg mb-1" style={{ fontFamily: "Outfit" }}>{checklist.title}</h3>
          <p className="text-[#94a8be] text-sm">{checklist.description}</p>
        </div>
      </div>

      {stage === "form" && (
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-3">
          <Input name="company" placeholder="Company name" required data-testid="checklist-input-company" className="bg-white/5 border-white/10 text-white placeholder:text-[#94a8be]/40 rounded-sm h-11" />
          <Input name="name" placeholder="Your name" required data-testid="checklist-input-name" className="bg-white/5 border-white/10 text-white placeholder:text-[#94a8be]/40 rounded-sm h-11" />
          <Input name="phone" type="tel" placeholder="Phone" required data-testid="checklist-input-phone" className="bg-white/5 border-white/10 text-white placeholder:text-[#94a8be]/40 rounded-sm h-11" />
          <Input name="email" type="email" placeholder="Email" required data-testid="checklist-input-email" className="bg-white/5 border-white/10 text-white placeholder:text-[#94a8be]/40 rounded-sm h-11" />
          <Button type="submit" data-testid="checklist-unlock-button" className="sm:col-span-2 bg-[#0077B3] hover:bg-[#005f8f] text-white rounded-sm font-semibold h-11">
            Get the Free Checklist <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <p className="sm:col-span-2 text-[#94a8be]/40 text-xs text-center">No spam. Just the checklist.</p>
        </form>
      )}

      {stage === "unlocked" && (
        <div data-testid="checklist-unlocked-state">
          <p className="text-[#94a8be] text-sm mb-4">Your checklist is ready{contactInfo.name ? `, ${contactInfo.name.split(" ")[0]}` : ""}.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Button data-testid="checklist-download-button" onClick={handleDownload} className="bg-white/5 border border-[#0077B3]/30 hover:bg-[#0077B3]/10 text-white rounded-sm font-semibold text-sm px-6 h-11">
              <Download className="w-4 h-4 mr-2" /> Download Checklist (PDF)
            </Button>
            <Button data-testid="checklist-email-button" onClick={handleEmailChecklist} disabled={emailingReport} variant="ghost" className="text-[#94a8be] hover:text-white text-sm h-11 px-4">
              <Mail className="w-4 h-4 mr-2" /> {emailingReport ? "Sending..." : "Email me a copy"}
            </Button>
          </div>
          {reportEmailStatus === "sent" && (
            <p data-testid="checklist-email-success" className="text-[#0077B3] text-sm mt-3">Sent! Check your inbox at {contactInfo.email}.</p>
          )}
          {reportEmailStatus === "error" && (
            <p data-testid="checklist-email-error" className="text-[#ef4444] text-sm mt-3">Couldn&rsquo;t send that email - please use the Download button instead.</p>
          )}
        </div>
      )}
    </div>
  );
}
