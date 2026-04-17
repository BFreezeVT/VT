import { useState } from "react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export function useLeadSubmit() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submitLead = async (data) => {
    setSubmitting(true);
    try {
      await axios.post(`${API}/leads`, data);
      setSubmitted(true);
      // GA4 conversion event
      if (window.gtag) {
        window.gtag("event", "generate_lead", {
          event_category: "form_submission",
          event_label: data.source_page || "homepage",
          source_city: data.source_city || "",
          source_industry: data.source_industry || "",
        });
      }
    } catch (err) {
      console.error("Lead submission error:", err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return { submitted, submitting, submitLead };
}
