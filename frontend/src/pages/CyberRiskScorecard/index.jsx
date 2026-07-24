import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import axios from "axios";
import { questions } from "../../data/cyberRiskScorecardData";
import ScorecardHero from "./ScorecardHero";
import ScorecardQuiz from "./ScorecardQuiz";
import ScorecardResults from "./ScorecardResults";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function CyberRiskScorecard() {
  const [stage, setStage] = useState("hero"); // hero, quiz, results
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [animating, setAnimating] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [booked, setBooked] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    document.title = "Cyber Risk Scorecard | Veracity Technologies";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Take the free Cyber Risk Scorecard assessment. Answer 12 questions in under 3 minutes and discover your business's cybersecurity risk score. Instant results.");
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
    setStage("quiz");
    if (window.gtag) window.gtag("event", "scorecard_start", { event_category: "cyber_risk_scorecard" });
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

  const bookSlot = async (day, time) => {
    setSelectedSlot({ day, time });
    setBooked(true);
    try {
      await axios.post(`${API}/leads`, {
        company: "",
        name: "Discovery Call Request",
        email: "",
        phone: "",
        source_page: "cyber-risk-scorecard-booking",
        situation: `Booked discovery call: ${day} at ${time}. Risk score: ${riskLevel} (${totalScore}/${maxScore}).`,
        contact_preference: "call",
      });
    } catch (e) { console.error("Failed to submit discovery call booking lead:", e); }
    if (window.gtag) window.gtag("event", "scorecard_book", { event_category: "cyber_risk_scorecard" });
  };

  const submitEmail = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    try {
      await axios.post(`${API}/leads`, {
        company: fd.get("company") || "",
        name: `${fd.get("firstName")} ${fd.get("lastName")}`,
        email: fd.get("email"),
        phone: "",
        source_page: "cyber-risk-scorecard",
        situation: `Requested email report. Risk score: ${riskLevel} (${totalScore}/${maxScore}).`,
        contact_preference: "email",
      });
    } catch (err) { console.error("Failed to submit Cyber Risk Scorecard email report lead:", err); }
    setEmailSent(true);
    if (window.gtag) window.gtag("event", "scorecard_email", { event_category: "cyber_risk_scorecard" });
  };

  const retake = () => {
    setStage("hero");
    setCurrent(0);
    setAnswers({});
    setBooked(false);
    setEmailSent(false);
    setSelectedSlot(null);
  };

  return (
    <div className="min-h-screen bg-[#0f1d32]" data-testid="cyber-risk-scorecard">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Cyber Risk Scorecard", description: "Free interactive cybersecurity risk assessment tool. Answer 12 questions and get your business risk score instantly.", url: "https://www.veracitytechmn.com/cyber-risk-scorecard", applicationCategory: "SecurityApplication", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, provider: { "@type": "Organization", name: "Veracity Technologies" } }) }} />

      {/* Nav */}
      <nav className="bg-[#003B71]/95 backdrop-blur-md border-b border-[#003B71] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="https://customer-assets.emergentagent.com/job_jobsite-it-secure/artifacts/yo1g9lv0_2.png" alt="Veracity" className="w-14 h-14 object-contain brightness-200 drop-shadow-[0_0_8px_rgba(0,119,179,0.4)]" />
            <span className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "Outfit" }}>VERACITY<span className="text-[#0077B3]"> TECHNOLOGIES</span></span>
          </Link>
          <a href="tel:9529417333" className="hidden sm:flex items-center gap-2 text-white/80 hover:text-white text-sm"><Phone className="w-4 h-4" /> (952) 941-7333</a>
        </div>
      </nav>

      <main>
        {stage === "hero" && <ScorecardHero onStart={startAssessment} />}

        {stage === "quiz" && (
          <ScorecardQuiz current={current} animating={animating} answers={answers} selectAnswer={selectAnswer} goBack={goBack} />
        )}

        {stage === "results" && (
          <ScorecardResults
            animating={animating} totalScore={totalScore} maxScore={maxScore} pct={pct}
            riskLevel={riskLevel} riskColor={riskColor} topRisks={topRisks} topRecs={topRecs}
            booked={booked} selectedSlot={selectedSlot} bookSlot={bookSlot}
            emailSent={emailSent} submitEmail={submitEmail} retake={retake}
          />
        )}
      </main>

      <footer className="bg-white border-t border-[#e2e8f0] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#94a3b8] text-xs">&copy; {new Date().getFullYear()} Veracity Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-[#4a5e78]">
            <a href="tel:9529417333" className="hover:text-[#003B71] flex items-center gap-1"><Phone className="w-3 h-3" /> (952) 941-7333</a>
            <Link to="/" className="hover:text-[#003B71]">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
