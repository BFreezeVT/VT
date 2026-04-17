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
    } catch (err) {
      // Still show success to user (data may have been captured), log error
      console.error("Lead submission error:", err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return { submitted, submitting, submitLead };
}
