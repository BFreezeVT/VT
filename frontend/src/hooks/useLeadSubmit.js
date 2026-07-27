import { useState } from "react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export function useLeadSubmit() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const submitLead = async (data) => {
    setSubmitting(true);
    setError(false);
    try {
      await axios.post(`${API}/leads`, data);
      setSubmitted(true);
      // GA4 conversion event - only fires on a confirmed successful save
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
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return { submitted, submitting, error, submitLead };
}

