import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

/** Emails a client-generated PDF report (base64) to the given recipient via the backend.
 * leadId/reportToken must come from the POST /api/leads response for the lead this report
 * belongs to - the backend uses them to prove the send is tied to a genuine prior lead
 * capture (single-use), rather than allowing any caller to relay content to any email. */
export async function emailReport({ leadId, reportToken, recipientEmail, recipientName, companyName, reportTitle, pdfBase64 }) {
  const res = await axios.post(`${API}/reports/email`, {
    lead_id: leadId,
    report_token: reportToken,
    recipient_email: recipientEmail,
    recipient_name: recipientName,
    company_name: companyName,
    report_title: reportTitle,
    pdf_base64: pdfBase64,
  });
  return res.data;
}
