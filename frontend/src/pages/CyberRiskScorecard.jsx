import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, ChevronRight, ChevronLeft as ChevronLeftIcon, Phone, CheckCircle, AlertTriangle, XCircle, Clock, Calendar, ArrowRight, Send, ShieldCheck, ShieldAlert, Monitor, Lock, Users, FileCheck, Mail } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const questions = [
  { id: 1, text: "Do you require Multi-Factor Authentication (MFA)?", options: [{ text: "Yes, company-wide", points: 0 }, { text: "Some users", points: 5 }, { text: "No", points: 10 }], risk: "account compromise", rec: "Enforce MFA across all users and systems" },
  { id: 2, text: "Are your systems monitored 24/7?", options: [{ text: "Yes", points: 0 }, { text: "During business hours", points: 5 }, { text: "No", points: 10 }], risk: "undetected breaches", rec: "Implement 24/7 AI-powered monitoring" },
  { id: 3, text: "Are your backups tested regularly?", options: [{ text: "Yes", points: 0 }, { text: "Occasionally", points: 5 }, { text: "Not sure", points: 10 }], risk: "ransomware data loss", rec: "Implement and test monitored backups" },
  { id: 4, text: "How quickly could you recover from a ransomware attack?", options: [{ text: "Within hours", points: 0 }, { text: "1-2 days", points: 5 }, { text: "Longer or unsure", points: 10 }], risk: "extended downtime", rec: "Build and test a disaster recovery plan" },
  { id: 5, text: "Do employees receive cybersecurity training?", options: [{ text: "Regular training", points: 0 }, { text: "Once per year", points: 5 }, { text: "None", points: 10 }], risk: "employee-caused breaches", rec: "Provide regular security awareness training" },
  { id: 6, text: "How confident are you your team can spot phishing emails?", options: [{ text: "Very confident", points: 0 }, { text: "Somewhat", points: 5 }, { text: "Not confident", points: 10 }], risk: "phishing vulnerability", rec: "Deploy phishing simulations and training" },
  { id: 7, text: "Do you have compliance requirements (financial, manufacturing, etc)?", options: [{ text: "Yes and we are compliant", points: 0 }, { text: "Yes but unsure", points: 5 }, { text: "No or not sure", points: 10 }], risk: "compliance violations", rec: "Conduct a compliance gap assessment" },
  { id: 8, text: "Has your cyber insurance increased requirements recently?", options: [{ text: "Yes and we meet them", points: 0 }, { text: "Yes and we struggle", points: 5 }, { text: "Not sure", points: 10 }], risk: "insurance coverage gaps", rec: "Align security controls with insurance requirements" },
  { id: 9, text: "Who manages your IT?", options: [{ text: "Dedicated managed provider", points: 0 }, { text: "Internal IT", points: 5 }, { text: "Reactive or break/fix", points: 10 }], risk: "reactive IT management", rec: "Partner with a proactive managed IT provider" },
  { id: 10, text: "How often do IT issues impact your business?", options: [{ text: "Rarely", points: 0 }, { text: "Monthly", points: 5 }, { text: "Weekly", points: 10 }], risk: "operational disruption", rec: "Implement proactive network monitoring" },
  { id: 11, text: "Do you know your current security vulnerabilities?", options: [{ text: "Yes clearly", points: 0 }, { text: "Somewhat", points: 5 }, { text: "No", points: 10 }], risk: "unknown attack surface", rec: "Run a full vulnerability assessment" },
  { id: 12, text: "How confident are you that your business is protected from cyber threats?", options: [{ text: "Very confident", points: 0 }, { text: "Somewhat", points: 5 }, { text: "Not confident", points: 10 }], risk: "overall security posture gaps", rec: "Schedule a comprehensive security audit" },
];

const timeSlots = [
  { day: "Monday", times: ["9:00 AM", "11:00 AM", "2:00 PM"] },
  { day: "Tuesday", times: ["10:00 AM", "1:00 PM", "3:00 PM"] },
  { day: "Wednesday", times: ["9:00 AM", "11:00 AM", "2:00 PM"] },
  { day: "Thursday", times: ["10:00 AM", "1:00 PM", "3:00 PM"] },
  { day: "Friday", times: ["9:00 AM", "11:00 AM"] },
];

export default function CyberRiskScorecard() {
  const [stage, setStage] = useState("hero"); // hero, quiz, results
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [animating, setAnimating] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [booked, setBooked] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

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

  const bookSlot = (day, time) => {
    setSelectedSlot({ day, time });
    setBooked(true);
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
      });
    } catch {}
    setEmailSent(true);
    if (window.gtag) window.gtag("event", "scorecard_email", { event_category: "cyber_risk_scorecard" });
  };

  return (
    <div className="min-h-screen bg-[#0f1d32]" data-testid="cyber-risk-scorecard">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Cyber Risk Scorecard", description: "Free interactive cybersecurity risk assessment tool. Answer 12 questions and get your business risk score instantly.", url: "https://www.veracitytech.com/cyber-risk-scorecard", applicationCategory: "SecurityApplication", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, provider: { "@type": "Organization", name: "Veracity Technologies" } }) }} />

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
        {/* HERO */}
        {stage === "hero" && (
          <div className="py-20 lg:py-32" data-testid="scorecard-hero">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <div className="w-20 h-20 mx-auto flex items-center justify-center bg-[#0077B3]/10 border border-[#0077B3]/30 rounded-full mb-8">
                <Shield className="w-10 h-10 text-[#0077B3]" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6" style={{ fontFamily: "Outfit" }}>
                What&rsquo;s Your Business's<br /><span className="text-[#0077B3]">Cyber Risk Score?</span>
              </h1>
              <p className="text-lg text-[#94a8be] max-w-2xl mx-auto mb-10">
                Answer 12 quick questions and see where your business stands in under 3 minutes.
              </p>
              <Button data-testid="start-assessment" onClick={() => { setStage("quiz"); if (window.gtag) window.gtag("event", "scorecard_start", { event_category: "cyber_risk_scorecard" }); }} className="bg-[#0077B3] hover:bg-[#0077B3]/90 text-white rounded-md font-bold text-lg px-10 h-14 animate-pulse-glow">
                Start Your Risk Score <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
              <p className="text-[#94a8be]/60 text-sm mt-6">No sales pressure. Instant results. Used by businesses like yours.</p>

              {/* How it works */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 text-left">
                {[
                  { num: "1", title: "Answer a few simple questions", desc: "12 quick questions about your current IT and security setup." },
                  { num: "2", title: "Get your risk score instantly", desc: "See your score, top risks, and actionable recommendations." },
                  { num: "3", title: "Review with our team (optional)", desc: "Book a free risk review to get a clear action plan." },
                ].map((step) => (
                  <div key={step.num} className="flex items-start gap-4">
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-[#0077B3]/10 border border-[#0077B3]/30 text-[#0077B3] font-bold text-sm">{step.num}</div>
                    <div>
                      <p className="text-white font-semibold text-sm mb-1" style={{ fontFamily: "Outfit" }}>{step.title}</p>
                      <p className="text-[#94a8be] text-xs leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* QUIZ */}
        {stage === "quiz" && (
          <div className="py-12 lg:py-20" data-testid="scorecard-quiz">
            <div className="max-w-2xl mx-auto px-6">
              {/* Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#94a8be] text-xs">Question {current + 1} of {questions.length}</span>
                  <span className="text-[#0077B3] text-xs font-semibold">{Math.round(((current + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full">
                  <div className="bg-[#0077B3] h-2 rounded-full transition-all duration-500 ease-out" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
                </div>
              </div>

              {/* Question */}
              <div className={`transition-all duration-300 ${animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8" style={{ fontFamily: "Outfit" }}>
                  {questions[current].text}
                </h2>

                <div className="space-y-4">
                  {questions[current].options.map((opt, i) => (
                    <button
                      key={i}
                      data-testid={`answer-${i}`}
                      onClick={() => selectAnswer(opt.points)}
                      className={`w-full text-left p-5 rounded-md border transition-all duration-200 hover:border-[#0077B3] hover:bg-[#0077B3]/5 ${
                        answers[questions[current].id] === opt.points
                          ? "border-[#0077B3] bg-[#0077B3]/10"
                          : "border-white/10 bg-white/[0.02]"
                      }`}
                    >
                      <span className="text-white font-medium">{opt.text}</span>
                    </button>
                  ))}
                </div>

                {current > 0 && (
                  <button onClick={goBack} className="flex items-center gap-1 text-[#94a8be] hover:text-white text-sm mt-6 transition-colors">
                    <ChevronLeftIcon className="w-4 h-4" /> Previous question
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* RESULTS */}
        {stage === "results" && (
          <div className={`py-12 lg:py-20 transition-all duration-500 ${animating ? "opacity-0" : "opacity-100"}`} data-testid="scorecard-results">
            <div className="max-w-4xl mx-auto px-6">
              {/* Score display */}
              <div className="text-center mb-16">
                <p className="text-[#94a8be] text-sm uppercase tracking-wider mb-4">Your Results</p>
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <svg className="w-48 h-48 -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
                    <circle cx="60" cy="60" r="52" stroke={riskColor} strokeWidth="8" fill="none" strokeDasharray={`${(pct / 100) * 327} 327`} strokeLinecap="round" className="transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="stat-number text-5xl text-white">{totalScore}</span>
                    <span className="text-xs text-[#94a8be]">/ {maxScore}</span>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: `${riskColor}15`, border: `1px solid ${riskColor}30` }}>
                  {riskLevel === "LOW" ? <CheckCircle className="w-4 h-4" style={{ color: riskColor }} /> : riskLevel === "MODERATE" ? <AlertTriangle className="w-4 h-4" style={{ color: riskColor }} /> : <XCircle className="w-4 h-4" style={{ color: riskColor }} />}
                  <span className="text-sm font-bold" style={{ color: riskColor }}>{riskLevel} RISK</span>
                </div>
                <p className="text-[#94a8be] text-base max-w-xl mx-auto mt-6">
                  {riskLevel === "LOW" && "You are ahead of most businesses, but there may still be hidden risks that only a professional assessment can uncover."}
                  {riskLevel === "MODERATE" && "You have gaps that could lead to security incidents, operational disruption, or compliance issues. These are fixable with the right plan."}
                  {riskLevel === "HIGH" && "Your business is at significant risk of disruption, data loss, or cyber attack. Immediate action is recommended to protect your operations."}
                </p>
              </div>

              {/* Risks + Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div>
                  <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2" style={{ fontFamily: "Outfit" }}>
                    <ShieldAlert className="w-5 h-5 text-[#ef4444]" /> Your Top Risks
                  </h3>
                  <div className="space-y-3">
                    {topRisks.length > 0 ? topRisks.map((q, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 rounded-md bg-[#ef4444]/5 border border-[#ef4444]/10">
                        <XCircle className="w-4 h-4 text-[#ef4444] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-white text-sm font-medium capitalize">{q.risk}</p>
                          <p className="text-[#94a8be] text-xs mt-0.5">Based on Q{q.id}: {q.text}</p>
                        </div>
                      </div>
                    )) : (
                      <p className="text-[#94a8be] text-sm">No major risks identified. Great job!</p>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2" style={{ fontFamily: "Outfit" }}>
                    <ShieldCheck className="w-5 h-5 text-[#0077B3]" /> Recommended Actions
                  </h3>
                  <div className="space-y-3">
                    {topRecs.length > 0 ? topRecs.map((rec, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 rounded-md bg-[#0077B3]/5 border border-[#0077B3]/10">
                        <CheckCircle className="w-4 h-4 text-[#0077B3] flex-shrink-0 mt-0.5" />
                        <p className="text-white text-sm font-medium">{rec}</p>
                      </div>
                    )) : (
                      <p className="text-[#94a8be] text-sm">Keep maintaining your current security posture.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* CONVERSION SECTION */}
              <div className="bg-white rounded-lg p-8 sm:p-12 mb-12" data-testid="scorecard-conversion">
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#003B71] mb-3" style={{ fontFamily: "Outfit" }}>
                    Let&rsquo;s Walk Through This Together
                  </h2>
                  <p className="text-[#4a5e78] text-base max-w-xl mx-auto">
                    We&rsquo;ll review your results, identify your biggest risks, and give you a clear action plan. No sales pressure.
                  </p>
                </div>

                {!booked ? (
                  <div>
                    <p className="text-[#003B71] font-semibold text-sm mb-4 text-center" style={{ fontFamily: "Outfit" }}>Choose a time that works for you:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                      {timeSlots.map((slot) => (
                        slot.times.map((time) => (
                          <button
                            key={`${slot.day}-${time}`}
                            data-testid={`slot-${slot.day}-${time}`}
                            onClick={() => bookSlot(slot.day, time)}
                            className="flex items-center justify-between p-3 rounded-md border border-[#e2e8f0] hover:border-[#0077B3] hover:bg-[#0077B3]/5 transition-all text-left"
                          >
                            <div>
                              <p className="text-[#003B71] text-sm font-medium">{slot.day}</p>
                              <p className="text-[#4a5e78] text-xs">{time}</p>
                            </div>
                            <Calendar className="w-4 h-4 text-[#0077B3]" />
                          </button>
                        ))
                      ))}
                    </div>
                    <div className="text-center">
                      <p className="text-[#ef4444] text-xs font-medium flex items-center justify-center gap-1">
                        <Clock className="w-3 h-3" /> We only take a limited number of assessments each week.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6" data-testid="booking-confirmed">
                    <CheckCircle className="w-16 h-16 text-[#10b981] mx-auto mb-4" />
                    <h3 className="text-[#003B71] font-bold text-xl mb-2" style={{ fontFamily: "Outfit" }}>You&rsquo;re Booked!</h3>
                    <p className="text-[#4a5e78] text-sm">
                      {selectedSlot?.day} at {selectedSlot?.time}. We&rsquo;ll send a confirmation and review your scorecard results before the call.
                    </p>
                  </div>
                )}
              </div>

              {/* Email report */}
              <div className="text-center mb-16">
                {!showEmailForm && !emailSent && (
                  <button onClick={() => setShowEmailForm(true)} className="text-[#0077B3] text-sm font-medium hover:text-white transition-colors flex items-center gap-2 mx-auto">
                    <Mail className="w-4 h-4" /> Email me my full report
                  </button>
                )}
                {showEmailForm && !emailSent && (
                  <div className="max-w-md mx-auto mt-6">
                    <form onSubmit={submitEmail} className="grid grid-cols-2 gap-3">
                      <Input name="firstName" placeholder="First name" required className="bg-white/5 border-white/10 text-white placeholder:text-[#94a8be]/50 rounded-md" />
                      <Input name="lastName" placeholder="Last name" required className="bg-white/5 border-white/10 text-white placeholder:text-[#94a8be]/50 rounded-md" />
                      <Input name="email" type="email" placeholder="Email" required className="col-span-2 bg-white/5 border-white/10 text-white placeholder:text-[#94a8be]/50 rounded-md" />
                      <Input name="company" placeholder="Company" className="col-span-2 bg-white/5 border-white/10 text-white placeholder:text-[#94a8be]/50 rounded-md" />
                      <Button type="submit" className="col-span-2 bg-[#0077B3] hover:bg-[#0077B3]/90 text-white rounded-md font-semibold">
                        <Send className="w-4 h-4 mr-2" /> Send My Report
                      </Button>
                    </form>
                  </div>
                )}
                {emailSent && (
                  <div className="flex items-center justify-center gap-2 text-[#10b981] text-sm mt-4">
                    <CheckCircle className="w-4 h-4" /> Report sent! Check your inbox.
                  </div>
                )}
              </div>

              {/* Retake */}
              <div className="text-center">
                <button onClick={() => { setStage("hero"); setCurrent(0); setAnswers({}); setBooked(false); setEmailSent(false); setShowEmailForm(false); setSelectedSlot(null); }} className="text-[#94a8be] text-sm hover:text-white transition-colors">
                  Retake Assessment
                </button>
              </div>
            </div>
          </div>
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
