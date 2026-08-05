import { useState, useEffect } from "react";
import axios from "axios";
import { questions } from "../../data/cyberRiskScorecardData";
import { calculateScorecardROI } from "../../lib/scorecardRoiCalculator";
import { INDUSTRY_HOURLY_RATES, DEFAULT_HOURLY_LABOR_COST } from "../../lib/roiCalculator";
import { getScorecardPDFBase64 } from "../../lib/generateScorecardPDF";
import { emailReport } from "../../lib/emailReport";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// All state + business logic for the Cyber Risk Scorecard flow (hero -> industry -> quiz ->
// results), extracted out of the page component so CyberRiskScorecard() itself stays a thin
// composition/rendering layer.
export function useScorecardFlow() {
  const [stage, setStage] = useState("hero"); // hero, industry, quiz, results
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [animating, setAnimating] = useState(false);
  const [industry, setIndustry] = useState(null);
  const [otherIndustry, setOtherIndustry] = useState("");
  const [followUpChoice, setFollowUpChoice] = useState(null); // null, "yes", "no"
  const [followUpSubmitted, setFollowUpSubmitted] = useState(false);
  const [followUpError, setFollowUpError] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const industryLabel = industry === "Other" ? (otherIndustry.trim() || "Other") : industry;
  const hourlyRate = industry ? (INDUSTRY_HOURLY_RATES[industry] || DEFAULT_HOURLY_LABOR_COST) : DEFAULT_HOURLY_LABOR_COST;

  useEffect(() => {
    document.title = "Cyber Risk Scorecard | Veracity Technologies";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Take the free Cyber Risk Scorecard assessment. Answer 12 questions in under 3 minutes and get your business's cybersecurity risk score plus a sample ROI estimate for closing the gaps. Instant results.");
    return () => { document.title = "Veracity Technologies | AI-Powered Cybersecurity & Managed IT"; };
  }, []);

  const totalScore = Object.values(answers).reduce((sum, pts) => sum + pts, 0);
  const maxScore = 120;
  const pct = Math.round((totalScore / maxScore) * 100);
  const riskLevel = totalScore <= 30 ? "LOW" : totalScore <= 70 ? "MODERATE" : "HIGH";
  const riskColor = riskLevel === "LOW" ? "#10b981" : riskLevel === "MODERATE" ? "#f59e0b" : "#ef4444";

  const topRisks = questions
    .filter((q) => (answers[q.id] || 0) >= 5)
    .sort((a, b) => (answers[b.id] || 0) - (answers[a.id] || 0))
    .slice(0, 3);

  const topRecs = topRisks.map((q) => q.rec);

  const startAssessment = () => {
    setStage("industry");
    if (window.gtag) window.gtag("event", "scorecard_start", { event_category: "cyber_risk_scorecard" });
  };

  const continueToQuiz = () => {
    setStage("quiz");
    if (window.gtag) window.gtag("event", "scorecard_industry_selected", { event_category: "cyber_risk_scorecard", industry: industryLabel });
  };

  const selectAnswer = (points) => {
    setAnswers({ ...answers, [questions[current].id]: points });
    if (current < questions.length - 1) {
      setAnimating(true);
      setTimeout(() => {
        setCurrent(current + 1);
        setAnimating(false);
      }, 300);
    } else {
      setAnimating(true);
      setTimeout(() => {
        setStage("results");
        setAnimating(false);
        if (window.gtag) window.gtag("event", "scorecard_complete", { event_category: "cyber_risk_scorecard", score: totalScore + points, risk_level: (totalScore + points) <= 30 ? "LOW" : (totalScore + points) <= 70 ? "MODERATE" : "HIGH" });
      }, 300);
    }
  };

  const goBack = () => {
    if (current > 0) {
      setAnimating(true);
      setTimeout(() => {
        setCurrent(current - 1);
        setAnimating(false);
      }, 200);
    }
  };

  const chooseFollowUp = (choice) => {
    setFollowUpChoice(choice);
    setFollowUpError(false);
    if (window.gtag) window.gtag("event", "scorecard_followup_choice", { event_category: "cyber_risk_scorecard", choice });
  };

  const submitFollowUp = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    setFollowUpError(false);
    try {
      await axios.post(`${API}/leads`, {
        company: fd.get("company") || "",
        name: fd.get("name"),
        email: fd.get("email"),
        phone: fd.get("phone") || "",
        source_page: "cyber-risk-scorecard-followup",
        situation: `Requested follow-up after Cyber Risk Scorecard. Industry: ${industryLabel || "Not specified"}. Risk score: ${riskLevel} (${totalScore}/${maxScore}).`,
        contact_preference: "call",
      });
      setFollowUpSubmitted(true);
      if (window.gtag) window.gtag("event", "scorecard_followup_submit", { event_category: "cyber_risk_scorecard" });
    } catch (e2) {
      console.error("Failed to submit follow-up request:", e2);
      setFollowUpError(true);
    }
  };

  const submitEmail = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const email = fd.get("email");
    const name = `${fd.get("firstName")} ${fd.get("lastName")}`;
    const company = fd.get("company") || "";
    setEmailError(false);
    try {
      await axios.post(`${API}/leads`, {
        company,
        name,
        email,
        phone: "",
        source_page: "cyber-risk-scorecard",
        situation: `Requested email report. Industry: ${industryLabel || "Not specified"}. Risk score: ${riskLevel} (${totalScore}/${maxScore}).`,
        contact_preference: "email",
      });

      // Actually generate and send the real PDF report - default assumptions (20-person team,
      // 8 manual hrs/week/person) since the ROI sliders above live in a separate section; the
      // user can always get their live-adjusted numbers via the Download button up there.
      const roi = calculateScorecardROI(pct, 20, 8, hourlyRate);
      const pdfBase64 = getScorecardPDFBase64({
        companyName: company,
        riskLevel,
        totalScore,
        maxScore,
        topRisks,
        topRecs,
        roi: { teamSize: 20, weeklyHoursPerPerson: 8, hourlyRate, annualHoursReclaimed: roi.annualHoursReclaimed, monthlySavingsForecast: roi.monthlySavings },
      });
      await emailReport({ recipientEmail: email, recipientName: name, companyName: company, reportTitle: "Cyber Risk & ROI Readiness Report", pdfBase64 });

      setEmailSent(true);
      if (window.gtag) window.gtag("event", "scorecard_email", { event_category: "cyber_risk_scorecard" });
    } catch (err) {
      console.error("Failed to email Cyber Risk Scorecard report:", err);
      setEmailError(true);
    }
  };

  const retake = () => {
    setStage("hero");
    setCurrent(0);
    setAnswers({});
    setIndustry(null);
    setOtherIndustry("");
    setFollowUpChoice(null);
    setFollowUpSubmitted(false);
    setFollowUpError(false);
    setEmailSent(false);
    setEmailError(false);
  };

  return {
    stage, current, answers, animating, industry, otherIndustry,
    followUpChoice, followUpSubmitted, followUpError, emailSent, emailError,
    industryLabel, hourlyRate, totalScore, maxScore, pct, riskLevel, riskColor, topRisks, topRecs,
    setIndustry, setOtherIndustry,
    startAssessment, continueToQuiz, selectAnswer, goBack, chooseFollowUp, submitFollowUp, submitEmail, retake,
  };
}
