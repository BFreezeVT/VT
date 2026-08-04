import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

/** Emails a client-generated PDF report (base64) to the given recipient via the backend. */
export async function emailReport({ recipientEmail, recipientName, companyName, reportTitle, pdfBase64 }) {
  const res = await axios.post(`${API}/reports/email`, {
    recipient_email: recipientEmail,
    recipient_name: recipientName,
    company_name: companyName,
    report_title: reportTitle,
    pdf_base64: pdfBase64,
  });
  return res.data;
}
