import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { CheckCircle, ChevronRight, ChevronLeft, Brain, Zap, Shield, Eye, BarChart3, Clock, ArrowRight, AlertTriangle } from "lucide-react";
import { useLeadSubmit } from "../hooks/useLeadSubmit";

const steps = [
  {
    category: "Business Context",
    icon: BarChart3,
    questions: [
      { id: "industry", text: "What industry is your business in?", options: ["Construction", "Financial Services", "Manufacturing", "Healthcare", "Professional Services", "Other"] },
      { id: "team_size", text: "How many people are on your team?", options: ["1-10", "11-50", "51-200", "200+"] },
    ],
  },
  {
    category: "Operational Efficiency",
    icon: Zap,
    questions: [
      { id: "manual_work_level", text: "How much of your daily work relies on manual processes?", options: [
        { text: "Very little - most is automated", score: 0 },
        { text: "Some tasks are still manual", score: 5 },
        { text: "Most workflows are manual", score: 10 },
      ]},
      { id: "system_visibility", text: "Can you see your entire operation in one place?", options: [
        { text: "Yes - unified dashboards", score: 0 },
        { text: "Partially - some tools connected", score: 5 },
        { text: "No - siloed systems everywhere", score: 10 },
      ]},
    ],
  },
  {
    category: "Automation Maturity",
    icon: Zap,
    questions: [
      { id: "automation_usage", text: "How would you describe your current use of automation?", options: [
        { text: "Automated workflows across departments", score: 0 },
        { text: "Some automation in select areas", score: 5 },
        { text: "Little to no automation", score: 10 },
      ]},
      { id: "repetitive_tasks", text: "How often does your team repeat the same tasks manually?", options: [
        { text: "Rarely - processes are streamlined", score: 0 },
        { text: "Sometimes - some redundancy", score: 5 },
        { text: "Daily - significant repetition", score: 10 },
      ]},
    ],
  },
  {
    category: "AI Readiness",
    icon: Brain,
    questions: [
      { id: "ai_usage_flag", text: "Is your organization currently using any AI tools?", options: [
        { text: "Yes - governed and integrated", score: 0 },
        { text: "Some employees use AI informally", score: 5 },
        { text: "No AI usage or awareness", score: 10 },
      ]},
      { id: "ai_governance", text: "Do you have policies governing AI use in your organization?", options: [
        { text: "Yes - formal AI governance", score: 0 },
        { text: "Informal guidelines", score: 5 },
        { text: "No policies at all", score: 10 },
      ]},
    ],
  },
  {
    category: "Access & Data Control",
    icon: Eye,
    questions: [
      { id: "access_visibility", text: "Do you know who has access to what data across your organization?", options: [
        { text: "Full visibility with role-based controls", score: 0 },
        { text: "Partial visibility", score: 5 },
        { text: "Limited or no visibility", score: 10 },
      ]},
      { id: "data_protection", text: "How confident are you that sensitive data is properly protected?", options: [
        { text: "Very confident - controls in place", score: 0 },
        { text: "Somewhat - some gaps exist", score: 5 },
        { text: "Not confident", score: 10 },
      ]},
    ],
  },
  {
    category: "Business Continuity",
    icon: Shield,
    questions: [
      { id: "continuity_readiness", text: "If your systems went down today, how quickly could you recover?", options: [
        { text: "Within hours - tested plan in place", score: 0 },
        { text: "Within days - some planning done", score: 5 },
        { text: "Unsure - no tested plan", score: 10 },
      ]},
      { id: "monitoring", text: "Are your systems monitored for issues before they become problems?", options: [
        { text: "Yes - 24/7 proactive monitoring", score: 0 },
        { text: "During business hours only", score: 5 },
        { text: "No - we react when things break", score: 10 },
      ]},
    ],
  },
];

function getScoreLabel(pct) {
  if (pct >= 80) return { label: "Strong", color: "#10b981" };
  if (pct >= 50) return { label: "Developing", color: "#f59e0b" };
  return { label: "Needs Attention", color: "#ef4444" };
}

function ScoreRing({ score, size = 120, label }) {
  const s = getScoreLabel(score);
  const circumference = 2 * Math.PI * 44;
  return (
    <div className="text-center">
      <div className="relative mx-auto" style={{ width: size, height: size }}>
        <svg className="-rotate-90" width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" stroke="rgba(255,255,255,0.06)" strokeWidth="6" fill="none" />
          <circle cx="50" cy="50" r="44" stroke={s.color} strokeWidth="6" fill="none"
            strokeDasharray={`${(score / 100) * circumference} ${circumference}`}
            strokeLinecap="round" className="transition-all duration-1000" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="stat-number text-2xl text-white">{score}</span>
        </div>
      </div>
      <p className="text-white text-sm font-semibold mt-2">{label}</p>
      <p className="text-xs mt-0.5" style={{ color: s.color }}>{s.label}</p>
    </div>
  );
}

export default function FreeAuditOffer() {
  const { submitted, submitting, submitLead } = useLeadSubmit();
  const [stage, setStage] = useState("intro"); // intro, assess, contact, results
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [animating, setAnimating] = useState(false);
  const [contactInfo, setContactInfo] = useState({ company: "", name: "", phone: "", email: "" });

  const totalScoredQuestions = steps.flatMap(s => s.questions).filter(q => q.options[0]?.score !== undefined);
  const maxScore = totalScoredQuestions.length * 10;

  // Calculate category scores
  const calcCategoryScore = (categoryQuestions) => {
    const scored = categoryQuestions.filter(q => q.options[0]?.score !== undefined);
    if (scored.length === 0) return 100;
    const total = scored.reduce((sum, q) => sum + (answers[q.id]?.score ?? 10), 0);
    const worst = scored.length * 10;
    return Math.round(((worst - total) / worst) * 100);
  };

  const operationalScore = calcCategoryScore(steps[1].questions);
  const automationScore = calcCategoryScore(steps[2].questions);
  const aiScore = calcCategoryScore(steps[3].questions);
  const accessScore = calcCategoryScore(steps[4].questions);
  const continuityScore = calcCategoryScore(steps[5].questions);
  const riskScore = Math.round((accessScore + continuityScore) / 2);

  // Pull Human Risk Score from simulation (localStorage)
  const getHumanRiskScore = () => {
    try {
      const raw = localStorage.getItem("veracity_hri");
      if (!raw) return null;
      const data = JSON.parse(raw);
      const scores = Object.values(data.highScores || {});
      return scores.length > 0 ? Math.max(...scores) : null;
    } catch(e) { return null; }
  };
  const humanRiskScore = getHumanRiskScore();

  // Overall = weighted average of all available scores
  const allScores = [automationScore, aiScore, riskScore, operationalScore, continuityScore];
  if (humanRiskScore !== null) allScores.push(humanRiskScore);
  const overallScore = Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length);

  // Intelligent gap analysis based on lowest scores
  const allCategories = [
    { id: "manual", label: "Manual Workflow Dependence", score: operationalScore, desc: "Your team spends excessive time on tasks that should be automated, reducing capacity for strategic work.", opportunity: "Automate repetitive workflows to free up 15-20 hours per employee per month." },
    { id: "automation", label: "Automation Maturity Gap", score: automationScore, desc: "Disconnected systems and manual handoffs create bottlenecks, errors, and invisible delays.", opportunity: "Implement intelligent workflow automation across your highest-volume processes." },
    { id: "ai", label: "Uncontrolled AI Usage", score: aiScore, desc: "Employees are using AI tools without governance, risking data leakage and compliance violations.", opportunity: "Deploy governed AI tools with guardrails - increasing productivity while controlling risk." },
    { id: "access", label: "Access Visibility Gaps", score: accessScore, desc: "Limited visibility into who accesses what data creates audit risk and undetected exposure.", opportunity: "Implement role-based access controls with automated audit trails across all systems." },
    { id: "continuity", label: "Untested Recovery Plans", score: continuityScore, desc: "If systems went down today, recovery timelines are uncertain or untested.", opportunity: "Build and test automated disaster recovery that restores operations in hours, not days." },
    { id: "human", label: "Human Decision-Making Risk", score: humanRiskScore ?? 50, desc: "Team members may not recognize sophisticated AI-generated threats, creating entry points for attackers.", opportunity: "Implement behavioral awareness training with simulated real-world threat scenarios." },
  ];

  const topGaps = [...allCategories].sort((a, b) => a.score - b.score).slice(0, 3);
  const topOpportunities = [...allCategories].sort((a, b) => a.score - b.score).slice(0, 3);

  const selectAnswer = (questionId, option) => {
    const value = typeof option === "string" ? { text: option } : option;
    setAnswers({ ...answers, [questionId]: value });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setAnimating(true);
      setTimeout(() => { setCurrentStep(currentStep + 1); setAnimating(false); }, 250);
    } else {
      setAnimating(true);
      setTimeout(() => { setStage("contact"); setAnimating(false); }, 250);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setAnimating(true);
      setTimeout(() => { setCurrentStep(currentStep - 1); setAnimating(false); }, 200);
    }
  };

  const canProceed = steps[currentStep].questions.every(q => answers[q.id] !== undefined);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = {
      company: fd.get("company"),
      name: fd.get("name"),
      phone: fd.get("phone"),
      email: fd.get("email"),
      source_page: "ai-business-assessment",
    };
    setContactInfo(data);
    await submitLead(data);
    setStage("results");
    if (window.gtag) window.gtag("event", "assessment_complete", {
      event_category: "ai_assessment",
      overall_score: overallScore,
      automation_score: automationScore,
      ai_score: aiScore,
      risk_score: riskScore,
    });
  };

  return (
    <section
      id="audit"
      data-testid="audit-section"
      aria-label="AI Business Intelligence Assessment"
      className="py-12 lg:py-18 bg-transparent"
    >
      <div className="max-w-4xl mx-auto px-6">

        {/* INTRO */}
        {stage === "intro" && (
          <div data-testid="assessment-intro" className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0077B3] mb-4">Limited Availability</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-4" style={{ fontFamily: "Outfit" }}>
              AI Business Intelligence Assessment
            </h2>
            <p className="text-[#c0cfe0] text-base max-w-2xl mx-auto mb-8">
              Answer 12 questions across 6 categories. Get your Business Intelligence Score instantly - covering automation maturity, AI readiness, and operational risk.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl mx-auto mb-8">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-[#c0cfe0] text-xs">
                  <s.icon className="w-3.5 h-3.5 text-[#0077B3]" />
                  <span>{s.category}</span>
                </div>
              ))}
            </div>
            <Button
              data-testid="start-assessment-btn"
              onClick={() => { setStage("assess"); if (window.gtag) window.gtag("event", "assessment_start", { event_category: "ai_assessment" }); }}
              className="bg-[#0077B3] hover:bg-[#005f8f] text-white rounded-md font-bold text-base px-8 h-12"
            >
              Start Assessment <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <p className="text-[#c0cfe0]/40 text-xs mt-4">Takes under 3 minutes. No sales pressure.</p>
          </div>
        )}

        {/* ASSESSMENT STEPS */}
        {stage === "assess" && (
          <div data-testid="assessment-steps">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#c0cfe0] text-xs">{steps[currentStep].category} ({currentStep + 1}/{steps.length})</span>
                <span className="text-[#0077B3] text-xs font-semibold">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full">
                <div className="bg-[#0077B3] h-2 rounded-full transition-all duration-500" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
              </div>
            </div>

            <div className={`transition-all duration-250 ${animating ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"}`}>
              <div className="flex items-center gap-3 mb-6">
                {(() => { const Icon = steps[currentStep].icon; return <Icon className="w-5 h-5 text-[#0077B3]" />; })()}
                <h3 className="text-white font-bold text-xl" style={{ fontFamily: "Outfit" }}>{steps[currentStep].category}</h3>
              </div>

              {steps[currentStep].questions.map((q) => (
                <div key={q.id} className="mb-6">
                  <p className="text-white font-medium text-base mb-3">{q.text}</p>
                  <div className="space-y-2">
                    {q.options.map((opt, i) => {
                      const optText = typeof opt === "string" ? opt : opt.text;
                      const isSelected = answers[q.id]?.text === optText;
                      return (
                        <button
                          key={i}
                          data-testid={`q-${q.id}-opt-${i}`}
                          onClick={() => selectAnswer(q.id, opt)}
                          className={`w-full text-left p-4 rounded-md border transition-all text-sm ${
                            isSelected
                              ? "border-[#0077B3] bg-[#0077B3]/10 text-white"
                              : "border-white/8 bg-white/[0.02] text-[#c0cfe0] hover:border-[#0077B3]/50"
                          }`}
                        >
                          {optText}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between mt-8">
                {currentStep > 0 ? (
                  <button onClick={prevStep} className="flex items-center gap-1 text-[#c0cfe0] hover:text-white text-sm">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                ) : <div />}
                <Button
                  onClick={nextStep}
                  disabled={!canProceed}
                  className={`rounded-md font-semibold px-6 h-10 ${canProceed ? "bg-[#0077B3] hover:bg-[#005f8f] text-white" : "bg-white/5 text-white/30 cursor-not-allowed"}`}
                >
                  {currentStep < steps.length - 1 ? "Next" : "See Results"} <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT INFO (before showing results) */}
        {stage === "contact" && (
          <div data-testid="assessment-contact" className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-white font-bold text-2xl mb-2" style={{ fontFamily: "Outfit" }}>Almost there.</h3>
              <p className="text-[#c0cfe0] text-sm">Enter your details to see your full Business Intelligence Score.</p>
            </div>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <Input name="company" placeholder="Company name" required className="bg-white/5 border-white/10 text-white placeholder:text-[#c0cfe0]/40 rounded-md h-11" />
              <Input name="name" placeholder="Your name" required className="bg-white/5 border-white/10 text-white placeholder:text-[#c0cfe0]/40 rounded-md h-11" />
              <Input name="phone" type="tel" placeholder="Phone" required className="bg-white/5 border-white/10 text-white placeholder:text-[#c0cfe0]/40 rounded-md h-11" />
              <Input name="email" type="email" placeholder="Email" required className="bg-white/5 border-white/10 text-white placeholder:text-[#c0cfe0]/40 rounded-md h-11" />
              <Button type="submit" className="w-full bg-[#0077B3] hover:bg-[#005f8f] text-white rounded-md font-semibold h-12">
                Show My Results <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <p className="text-[#c0cfe0]/30 text-xs text-center">No spam. No sales pressure. Your data stays private.</p>
            </form>
          </div>
        )}

        {/* RESULTS - Business Health Dashboard */}
        {stage === "results" && (
          <div data-testid="assessment-results">
            <div className="text-center mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0077B3] mb-3">Your Results</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2" style={{ fontFamily: "Outfit" }}>
                Business Intelligence Score
              </h2>
              <p className="text-[#c0cfe0] text-sm">{contactInfo.company || "Your organization"}</p>
            </div>

            {/* Primary score - large */}
            <div className="text-center mb-10">
              <ScoreRing score={overallScore} size={160} label="Overall Score" />
            </div>

            {/* 6 score grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
              {[
                { score: automationScore, label: "Automation Maturity", icon: Zap },
                { score: aiScore, label: "AI Readiness", icon: Brain },
                { score: riskScore, label: "Operational Risk", icon: Shield },
                { score: humanRiskScore ?? 50, label: humanRiskScore !== null ? "Human Risk" : "Human Risk (est.)", icon: Eye },
                { score: continuityScore, label: "Business Continuity", icon: Clock },
                { score: operationalScore, label: "Operational Efficiency", icon: BarChart3 },
              ].map((item, i) => {
                const s = getScoreLabel(item.score);
                return (
                  <div key={i} className="bg-white/[0.03] border border-white/8 rounded-md p-4 text-center">
                    <item.icon className="w-4 h-4 mx-auto mb-2" style={{ color: s.color }} />
                    <p className="stat-number text-2xl text-white">{item.score}</p>
                    <p className="text-[#c0cfe0] text-xs mt-1">{item.label}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: s.color }}>{s.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Top 3 Gaps + Top 3 Opportunities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2" style={{ fontFamily: "Outfit" }}>
                  <AlertTriangle className="w-5 h-5 text-[#ef4444]" /> Top Gaps
                </h3>
                <div className="space-y-3">
                  {topGaps.map((gap, i) => (
                    <div key={i} className="p-4 rounded-md bg-[#ef4444]/5 border border-[#ef4444]/10">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-white text-sm font-medium">{gap.label}</p>
                        <span className="text-xs font-semibold" style={{ color: getScoreLabel(gap.score).color }}>{gap.score}/100</span>
                      </div>
                      <p className="text-[#c0cfe0] text-xs leading-relaxed">{gap.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2" style={{ fontFamily: "Outfit" }}>
                  <CheckCircle className="w-5 h-5 text-[#10b981]" /> Top Opportunities
                </h3>
                <div className="space-y-3">
                  {topOpportunities.map((opp, i) => (
                    <div key={i} className="p-4 rounded-md bg-[#10b981]/5 border border-[#10b981]/10">
                      <p className="text-white text-sm font-medium mb-1">{opp.label}</p>
                      <p className="text-[#c0cfe0] text-xs leading-relaxed">{opp.opportunity}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Category breakdown bars */}
            <div className="mb-12">
              <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Full Breakdown</h3>
              <div className="space-y-3">
                {allCategories.map((cat, i) => {
                  const s = getScoreLabel(cat.score);
                  return (
                    <div key={i} className="flex items-center gap-4">
                      <span className="text-[#c0cfe0] text-xs w-44 flex-shrink-0">{cat.label.replace(" Gap", "").replace(" Dependence", "").replace("Uncontrolled ", "").replace("Untested ", "")}</span>
                      <div className="flex-1 bg-white/5 h-2 rounded-full">
                        <div className="h-2 rounded-full transition-all duration-700" style={{ width: `${cat.score}%`, backgroundColor: s.color }} />
                      </div>
                      <span className="text-xs font-semibold w-12 text-right" style={{ color: s.color }}>{cat.score}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {humanRiskScore === null && (
              <div className="text-center mb-8 p-4 border border-[#0077B3]/20 bg-[#0077B3]/5 rounded-md">
                <p className="text-[#0077B3] text-sm font-medium mb-1">Want a more accurate score?</p>
                <p className="text-[#c0cfe0] text-xs">Complete the Human Risk Simulation above to add real behavioral data to your Business Intelligence Score.</p>
              </div>
            )}

            {/* CTA */}
            <div className="bg-white rounded-lg p-8 text-center">
              <img src="https://customer-assets.emergentagent.com/job_jobsite-it-secure/artifacts/yo1g9lv0_2.png" alt="Veracity" className="w-16 h-16 object-contain mx-auto mb-4 drop-shadow-[0_0_10px_rgba(0,119,179,0.4)]" />
              <h3 className="text-[#003B71] font-bold text-xl mb-2" style={{ fontFamily: "Outfit" }}>
                Review Your Results With Veracity
              </h3>
              <p className="text-[#4a5e78] text-sm mb-6 max-w-md mx-auto">
                We&rsquo;ll walk through every score, prioritize the highest-impact improvements, and build a clear roadmap to reduce manual work, strengthen AI readiness, and lower operational risk.
              </p>
              <a href="tel:9529417333">
                <Button className="bg-[#003B71] hover:bg-[#002a52] text-white rounded-md font-semibold px-8 h-12">
                  Schedule Your Review Call
                </Button>
              </a>
              <p className="text-[#4a5e78] text-xs mt-3">Or call (952) 941-7333</p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
