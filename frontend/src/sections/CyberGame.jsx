import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "../components/ui/button";
import { ShieldCheck, ShieldAlert, RotateCcw, CheckCircle, XCircle, Trophy, ChevronRight, Clock, Flame, Share2, Zap, Target, Crown, Eye, AlertTriangle, ThumbsUp } from "lucide-react";

// Scenarios reframed as AI-driven threat simulations
const scenarios = [
  // Vendor impersonation
  { id: 1, from: "accounting@sage-invoices-portal.com", subject: "Invoice #INV-2847 - Updated Payment Instructions", preview: "Your invoice is past due. To avoid service interruption, please wire $47,250 to the updated bank account below. New routing number: 0281...", threat: true, category: "Vendor Impersonation", explanation: "AI-generated vendor impersonation. The domain mimics a trusted vendor but is fraudulent. Changing payment routing is a hallmark of business email compromise.", difficulty: "easy" },
  { id: 2, from: "jthompson@turnerconstruction.com", subject: "Re: Updated Schedule for Phase 2 Steel Delivery", preview: "Hi Mike, Attached is the revised schedule for the Phase 2 steel delivery. Let me know if the Thursday window works for your crew.", threat: false, category: "Vendor Communication", explanation: "Legitimate vendor communication - references a specific project, uses a proper company domain, and has a natural conversational tone.", difficulty: "easy" },
  { id: 3, from: "billing@quickbooks-invoicing.net", subject: "Payment Received - $12,450.00 Applied to Invoice #3847", preview: "A payment of $12,450.00 has been applied. However, we noticed a discrepancy. Please log in to review and confirm the payment allocation.", threat: true, category: "Vendor Impersonation", explanation: "Impersonates a trusted financial platform. QuickBooks uses @intuit.com, not a lookalike domain. The discrepancy lure exploits curiosity.", difficulty: "hard" },
  // Payment change requests
  { id: 4, from: "ap@trusted-partner-billing.com", subject: "Updated Banking Information - Please Update Records", preview: "Due to a recent bank transition, please update our payment details in your system. New account and routing numbers are attached. This is effective immediately.", threat: true, category: "Payment Redirect", explanation: "Classic payment redirect attack. Legitimate vendors confirm banking changes via phone, not email. AI makes these messages increasingly convincing.", difficulty: "medium" },
  { id: 5, from: "shipping@fedex.com", subject: "FedEx: Your Package Is Scheduled for Delivery Tomorrow", preview: "Tracking #7892-4521-8834. Your package from Grainger Industrial Supply is out for delivery. Estimated arrival: December 5, 10am-2pm.", threat: false, category: "Legitimate Notification", explanation: "Legitimate shipping notification with specific tracking number, named sender, and realistic delivery window.", difficulty: "hard" },
  // Credential login prompts
  { id: 6, from: "it-support@yourcompany-helpdesk.io", subject: "Action Required: Password Expires in 2 Hours", preview: "Your network password expires today. Click the link below to reset it now or you will be locked out of all systems including email, VPN, and project management tools.", threat: true, category: "Credential Harvesting", explanation: "Fake IT support using a lookalike domain. Real IT departments use your actual company domain. The artificial deadline creates panic to bypass judgment.", difficulty: "easy" },
  { id: 7, from: "admin@m1crosoft-security.com", subject: "Critical: Unauthorized Access Detected on Your Account", preview: "Our AI systems detected 47 failed login attempts from Russia. Your account is at risk. Click immediately to secure your account and change your password.", threat: true, category: "Credential Harvesting", explanation: "AI-generated credential harvesting. Uses typosquatting (m1crosoft with a '1'). The dramatic scenario is designed to trigger an emotional, bypassing rational analysis.", difficulty: "hard" },
  { id: 8, from: "noreply@microsoft365.com", subject: "Your Microsoft 365 Subscription Renewal Confirmation", preview: "Thank you for renewing your Microsoft 365 Business Premium subscription. Your next billing date is January 15, 2026.", threat: false, category: "Legitimate Notification", explanation: "Legitimate platform notification from the correct domain. Informational only, no credential requests or urgent calls to action.", difficulty: "easy" },
  // Executive urgency requests
  { id: 9, from: "ceo@company-exec-office.co", subject: "Confidential - Need your help with something", preview: "Hey, are you at your desk? I need you to purchase some gift cards for a client meeting this afternoon. Keep this between us for now. I will reimburse you.", threat: true, category: "Executive Impersonation", explanation: "AI-powered executive impersonation. The fake domain (.co), gift card request, and secrecy demand are designed to exploit trust in authority.", difficulty: "easy" },
  { id: 10, from: "no-reply@zoom.us", subject: "Cloud Recording Available: Q4 Planning Meeting", preview: "Hi, your cloud recording for the Q4 Planning Meeting from Dec 3 is now available. The recording will be available for 30 days.", threat: false, category: "Legitimate Notification", explanation: "Legitimate platform notification from the correct domain referencing a specific meeting with standard retention info.", difficulty: "hard" },
  // AI-generated messages
  { id: 11, from: "payroll@company-hr-update.net", subject: "URGENT: Verify Your Direct Deposit Information", preview: "We have detected an issue with your bank details. Click here immediately to re-verify or your next paycheck will be delayed. This is an automated notification.", threat: true, category: "AI-Generated Threat", explanation: "AI-generated social engineering. The domain is suspicious, urgency language manipulates behavior, and threatening delayed pay exploits financial anxiety.", difficulty: "easy" },
  { id: 12, from: "docusign@docusign-notifications.net", subject: "Action Required: Sign Your Updated Service Agreement", preview: "John Smith has sent you a document to review and sign. Please complete by end of business today. Click here to review document.", threat: true, category: "AI-Generated Threat", explanation: "AI-crafted impersonation of a trusted platform. Real DocuSign uses @docusign.com. The generic sender name and urgency are red flags obscured by familiar formatting.", difficulty: "hard" },
  { id: 13, from: "hr@company.com", subject: "Updated PTO Policy - Effective January 1", preview: "Hi team, Please review the attached updated PTO policy. Key changes include increased carryover limits and a new floating holiday. Questions? Reach out to HR.", threat: false, category: "Legitimate Communication", explanation: "Legitimate internal communication from the correct company domain with routine policy content and no urgent calls to action.", difficulty: "medium" },
  { id: 14, from: "security@amaz0n-verify.com", subject: "Your Amazon Account Has Been Locked", preview: "We detected suspicious activity on your account. Please verify your identity within 24 hours or your account will be permanently suspended.", threat: true, category: "AI-Generated Threat", explanation: "AI-enhanced account takeover attempt. Uses typosquatting (amaz0n with a zero). The suspension threat and 24-hour deadline manufacture panic.", difficulty: "medium" },
  { id: 15, from: "procore-notifications@procore.com", subject: "Daily Log Submitted for Riverside Commons - Dec 4", preview: "A new daily log has been submitted by Site Superintendent Dave Martinez for the Riverside Commons project.", threat: false, category: "Legitimate Communication", explanation: "Legitimate platform notification from the correct domain with specific project details and named team member.", difficulty: "medium" },
];

// Actions reframed from binary to 4-choice behavioral responses
const ACTIONS = [
  { id: "trust", label: "Trust", icon: ThumbsUp, desc: "Act on the message", correctFor: false },
  { id: "verify", label: "Verify", icon: Eye, desc: "Confirm through another channel", correctFor: "both" },
  { id: "report", label: "Report", icon: AlertTriangle, desc: "Flag to security team", correctFor: true },
  { id: "ignore", label: "Ignore", icon: XCircle, desc: "Delete and move on", correctFor: null },
];

const DIFFICULTIES = {
  easy: { label: "Awareness", icon: Target, timer: 0, count: 5, pool: "easy", color: "text-[#0077B3]" },
  medium: { label: "Decision-Maker", icon: Zap, timer: 20, count: 6, pool: "all", color: "text-[#FF5722]" },
  hard: { label: "Executive", icon: Crown, timer: 12, count: 7, pool: "hard", color: "text-[#FF5722]" },
};

const BADGES = [
  { id: "first_game", label: "First Assessment", desc: "Complete your first simulation", icon: Target },
  { id: "perfect", label: "Perfect Judgment", desc: "Every response correct", icon: Crown },
  { id: "speed_demon", label: "Quick Thinker", desc: "Respond in under 5 seconds", icon: Zap },
  { id: "streak_3", label: "Sharp Instincts", desc: "3 correct in a row", icon: Flame },
  { id: "all_modes", label: "Full Spectrum", desc: "Complete all difficulty levels", icon: ShieldCheck },
];

function getStoredData() {
  try {
    const raw = localStorage.getItem("veracity_hri");
    return raw ? JSON.parse(raw) : { highScores: {}, badges: [], gamesPlayed: 0, modesCompleted: [] };
  } catch(e) { return { highScores: {}, badges: [], gamesPlayed: 0, modesCompleted: [] }; }
}
function storeData(data) {
  try { localStorage.setItem("veracity_hri", JSON.stringify(data)); } catch(e) { /* ignore */ }
}

function getCorrectAction(scenario) {
  if (scenario.threat) return "report";
  return "trust";
}

export default function CyberGame() {
  const [gameState, setGameState] = useState("intro");
  const [difficulty, setDifficulty] = useState("easy");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(null);
  const [lastAction, setLastAction] = useState(null);
  const [shuffledScenarios, setShuffledScenarios] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [answerTime, setAnswerTime] = useState(0);
  const [stored, setStored] = useState(getStoredData());
  const [newBadges, setNewBadges] = useState([]);
  const timerRef = useRef(null);
  const questionStartRef = useRef(null);

  const config = DIFFICULTIES[difficulty];

  useEffect(() => {
    if (gameState === "playing" && config.timer > 0 && !answered) {
      setTimeLeft(config.timer);
      questionStartRef.current = Date.now();
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            setLastCorrect(false);
            setLastAction("timeout");
            setStreak(0);
            setAnswered(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    } else if (config.timer === 0 && gameState === "playing" && !answered) {
      questionStartRef.current = Date.now();
    }
  }, [currentIndex, gameState, answered, config.timer]);

  const startGame = useCallback((diff) => {
    const d = diff || difficulty;
    const cfg = DIFFICULTIES[d];
    let pool;
    if (cfg.pool === "easy") pool = scenarios.filter((s) => s.difficulty === "easy" || s.difficulty === "medium");
    else if (cfg.pool === "hard") pool = scenarios.filter((s) => s.difficulty === "medium" || s.difficulty === "hard");
    else pool = [...scenarios];
    const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, cfg.count);
    setShuffledScenarios(shuffled);
    setDifficulty(d);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setAnswered(false);
    setLastCorrect(null);
    setLastAction(null);
    setNewBadges([]);
    setGameState("playing");
    if (window.gtag) window.gtag("event", "hri_start", { event_category: "human_risk_simulation", difficulty: d });
  }, [difficulty]);

  const handleAction = (actionId) => {
    if (answered) return;
    clearInterval(timerRef.current);
    const current = shuffledScenarios[currentIndex];
    const correctAction = getCorrectAction(current);
    const elapsed = questionStartRef.current ? Math.round((Date.now() - questionStartRef.current) / 1000) : 0;
    setAnswerTime(elapsed);
    setLastAction(actionId);

    // Scoring: report threat = correct, trust legit = correct, verify = partial correct for both
    let correct = false;
    if (actionId === correctAction) correct = true;
    if (actionId === "verify") correct = true; // verify is always acceptable
    if (actionId === "trust" && current.threat) correct = false;
    if (actionId === "ignore" && current.threat) correct = false; // ignoring a threat is wrong
    if (actionId === "ignore" && !current.threat) correct = false; // ignoring legit is suboptimal

    if (correct) {
      const points = actionId === "verify" ? 0.5 : 1; // verify gets partial credit
      setScore((s) => s + points);
      setStreak((s) => { const ns = s + 1; setBestStreak((b) => Math.max(b, ns)); return ns; });
    } else {
      setStreak(0);
    }
    setLastCorrect(correct);
    setAnswered(true);
  };

  const nextScenario = () => {
    if (currentIndex + 1 >= shuffledScenarios.length) {
      const data = { ...stored };
      const earned = [];
      data.gamesPlayed += 1;
      if (!data.badges.includes("first_game")) { data.badges.push("first_game"); earned.push("first_game"); }
      const finalScore = Math.round((score / shuffledScenarios.length) * 100);
      if (finalScore === 100 && !data.badges.includes("perfect")) { data.badges.push("perfect"); earned.push("perfect"); }
      if (bestStreak >= 3 && !data.badges.includes("streak_3")) { data.badges.push("streak_3"); earned.push("streak_3"); }
      if (answerTime < 5 && lastCorrect && !data.badges.includes("speed_demon")) { data.badges.push("speed_demon"); earned.push("speed_demon"); }
      if (!data.modesCompleted.includes(difficulty)) data.modesCompleted.push(difficulty);
      if (data.modesCompleted.length >= 3 && !data.badges.includes("all_modes")) { data.badges.push("all_modes"); earned.push("all_modes"); }
      if (!data.highScores[difficulty] || finalScore > data.highScores[difficulty]) data.highScores[difficulty] = finalScore;
      storeData(data);
      setStored(data);
      setNewBadges(earned);
      setGameState("result");
      if (window.gtag) window.gtag("event", "hri_complete", { event_category: "human_risk_simulation", score: finalScore, difficulty, best_streak: bestStreak });
    } else {
      setCurrentIndex((i) => i + 1);
      setAnswered(false);
      setLastCorrect(null);
      setLastAction(null);
    }
  };

  const shareResults = () => {
    const finalScore = Math.round((score / shuffledScenarios.length) * 100);
    const text = `I scored ${finalScore}/100 on the Veracity Human Risk Simulation (${config.label} mode). How would your team respond?`;
    if (navigator.share) {
      navigator.share({ title: "Human Risk Simulation", text, url: window.location.origin });
    } else {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`, "_blank");
    }
    if (window.gtag) window.gtag("event", "hri_share", { event_category: "human_risk_simulation" });
  };

  const current = shuffledScenarios[currentIndex];
  const highScore = stored.highScores[difficulty] || 0;
  const humanRiskScore = shuffledScenarios.length > 0 ? Math.round((score / shuffledScenarios.length) * 100) : 0;

  return (
    <section id="cyber-game" data-testid="cyber-game-section" className="py-12 lg:py-18 bg-gradient-to-b from-[#091422] to-[#07101c] relative">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0077B3] mb-4 animate-fade-in-up">Human Risk Simulation</p>
          <h2 data-testid="cyber-game-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-4 animate-fade-in-up stagger-1" style={{ fontFamily: "Outfit, sans-serif" }}>
            How would your team respond to real-world AI-driven threats?
          </h2>
          <p className="text-[#b0c4d8] text-base max-w-xl mx-auto animate-fade-in-up stagger-2">
            Test behavioral decision-making across realistic scenarios. Choose how to respond - your Human Risk Score reveals your organizational exposure.
          </p>
        </div>

        <div className="bg-[#001f3d] border border-[#0d4a8a] rounded-md p-6 sm:p-8 lg:p-10 animate-fade-in-up stagger-3">
          {/* INTRO */}
          {gameState === "intro" && (
            <div data-testid="game-intro">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto flex items-center justify-center bg-[#0077B3]/10 border border-[#0077B3]/30 rounded-full mb-4">
                  <ShieldCheck className="w-8 h-8 text-[#0077B3]" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: "Outfit" }}>Choose Simulation Level</h3>
                <p className="text-[#b0c4d8] text-sm max-w-md mx-auto">
                  Each level presents increasingly sophisticated AI-driven threat scenarios. For every message, decide: Trust, Verify, Report, or Ignore.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {Object.entries(DIFFICULTIES).map(([key, cfg]) => {
                  const Icon = cfg.icon;
                  const hs = stored.highScores[key];
                  return (
                    <button key={key} data-testid={`game-difficulty-${key}`} onClick={() => startGame(key)}
                      className={`p-5 border text-left transition-all hover:border-[#0077B3] hover:bg-[#0077B3]/5 rounded-md ${difficulty === key ? "border-[#0077B3] bg-[#0077B3]/5" : "border-[#0d4a8a] bg-[#002a52]"}`}>
                      <Icon className={`w-5 h-5 ${cfg.color} mb-3`} />
                      <p className="text-white font-semibold text-sm mb-1" style={{ fontFamily: "Outfit" }}>{cfg.label}</p>
                      <p className="text-[#b0c4d8] text-xs mb-2">{cfg.count} scenarios{cfg.timer > 0 ? ` / ${cfg.timer}s limit` : ""}</p>
                      {hs !== undefined && <p className="text-[#0077B3] text-xs font-medium">Best: {hs}/100</p>}
                    </button>
                  );
                })}
              </div>

              {stored.badges.length > 0 && (
                <div className="border-t border-[#0d4a8a] pt-6">
                  <p className="text-xs text-[#b0c4d8] mb-3 uppercase tracking-wider">Your Badges</p>
                  <div className="flex flex-wrap gap-2">
                    {BADGES.filter((b) => stored.badges.includes(b.id)).map((b) => {
                      const Icon = b.icon;
                      return (
                        <div key={b.id} data-testid={`badge-${b.id}`} className="flex items-center gap-2 bg-[#0077B3]/10 border border-[#0077B3]/30 px-3 py-1.5 rounded" title={b.desc}>
                          <Icon className="w-3 h-3 text-[#0077B3]" /> <span className="text-xs text-[#0077B3] font-medium">{b.label}</span>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-[#b0c4d8]/50 mt-2">{stored.gamesPlayed} simulations completed</p>
                </div>
              )}
            </div>
          )}

          {/* PLAYING */}
          {gameState === "playing" && current && (
            <div data-testid="game-playing">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#b0c4d8]">Scenario {currentIndex + 1}/{shuffledScenarios.length}</span>
                  <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
                </div>
                <div className="flex items-center gap-4">
                  {streak >= 2 && <span className="flex items-center gap-1 text-xs text-[#FF5722] font-semibold animate-fade-in"><Flame className="w-3 h-3" /> {streak} streak</span>}
                  <span data-testid="game-score" className="text-xs text-[#0077B3] font-semibold">{Math.round(score)}/{shuffledScenarios.length}</span>
                </div>
              </div>

              <div className="relative w-full bg-[#0d4a8a]/30 h-1.5 mb-6 rounded-full">
                <div className="bg-[#0077B3] h-1.5 rounded-full transition-all duration-500" style={{ width: `${((currentIndex + 1) / shuffledScenarios.length) * 100}%` }} />
              </div>

              {config.timer > 0 && !answered && (
                <div className="flex items-center gap-2 mb-4">
                  <Clock className={`w-3 h-3 ${timeLeft <= 5 ? "text-[#FF5722] animate-pulse" : "text-[#b0c4d8]"}`} />
                  <div className="flex-1 bg-[#0d4a8a]/30 h-1 rounded-full">
                    <div className={`h-1 rounded-full transition-all duration-1000 ${timeLeft <= 5 ? "bg-[#FF5722]" : "bg-[#0077B3]"}`} style={{ width: `${(timeLeft / config.timer) * 100}%` }} />
                  </div>
                  <span className={`text-xs font-mono ${timeLeft <= 5 ? "text-[#FF5722]" : "text-[#b0c4d8]"}`}>{timeLeft}s</span>
                </div>
              )}

              {/* Scenario card */}
              <div className="bg-[#0c1a2e] border border-[#0d4a8a] rounded-md p-5 sm:p-6 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] uppercase tracking-wider text-[#0077B3] border border-[#0077B3]/30 px-2 py-0.5 rounded">{current.category}</span>
                </div>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 flex-shrink-0 rounded-full bg-[#0d4a8a] flex items-center justify-center text-white text-xs font-bold">{current.from[0].toUpperCase()}</div>
                  <div className="min-w-0">
                    <p data-testid="email-from" className="text-white text-sm font-medium truncate">{current.from}</p>
                    <p data-testid="email-subject" className="text-white text-base font-semibold mt-1" style={{ fontFamily: "Outfit" }}>{current.subject}</p>
                  </div>
                </div>
                <div className="border-t border-[#0d4a8a] pt-4 mt-3">
                  <p data-testid="email-preview" className="text-[#b0c4d8] text-sm leading-relaxed">{current.preview}</p>
                </div>
              </div>

              {/* 4 Action buttons */}
              {!answered ? (
                <div>
                  <p className="text-[#b0c4d8] text-xs mb-3 text-center">How would you respond to this message?</p>
                  <div className="grid grid-cols-2 gap-3">
                    {ACTIONS.map((action) => (
                      <button key={action.id} data-testid={`game-btn-${action.id}`} onClick={() => handleAction(action.id)}
                        className="flex items-center gap-3 p-4 border border-[#0d4a8a] bg-[#002a52] rounded-md hover:border-[#0077B3] hover:bg-[#0077B3]/5 transition-all text-left">
                        <action.icon className="w-5 h-5 text-[#0077B3] flex-shrink-0" />
                        <div>
                          <p className="text-white text-sm font-medium">{action.label}</p>
                          <p className="text-[#b0c4d8] text-[10px]">{action.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div data-testid="game-feedback">
                  <div className={`flex items-start gap-3 p-4 border rounded-md mb-4 ${lastCorrect ? "border-[#0077B3]/50 bg-[#0077B3]/5" : "border-[#FF5722]/50 bg-[#FF5722]/5"}`}>
                    {lastCorrect ? <CheckCircle className="w-5 h-5 text-[#0077B3] flex-shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 text-[#FF5722] flex-shrink-0 mt-0.5" />}
                    <div>
                      <p className={`font-semibold text-sm mb-1 ${lastCorrect ? "text-[#0077B3]" : "text-[#FF5722]"}`}>
                        {lastAction === "timeout" ? "Time expired." : lastCorrect ? "Good judgment." : "Risky response."}
                        {" "}This was a <span className="text-white font-bold">{current.threat ? "THREAT" : "LEGITIMATE MESSAGE"}</span>.
                      </p>
                      <p className="text-[#b0c4d8] text-sm leading-relaxed">{current.explanation}</p>
                    </div>
                  </div>
                  <Button data-testid="game-next-button" onClick={nextScenario} className="w-full bg-[#0077B3] hover:bg-[#005f8f] text-white rounded-md h-11 font-semibold">
                    {currentIndex + 1 >= shuffledScenarios.length ? "See Your Score" : "Next Scenario"} <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* RESULTS */}
          {gameState === "result" && (
            <div data-testid="game-results" className="text-center py-4">
              <div className="w-16 h-16 mx-auto flex items-center justify-center bg-[#0077B3]/10 border border-[#0077B3]/30 rounded-full mb-4">
                <Trophy className="w-8 h-8 text-[#0077B3]" />
              </div>
              <p className="text-xs text-[#b0c4d8] mb-1">{config.label} Level</p>
              <h3 className="text-white font-bold text-xl mb-1" style={{ fontFamily: "Outfit" }}>Your Human Risk Score</h3>
              <p data-testid="game-final-score" className="stat-number text-5xl text-white my-3">
                {humanRiskScore}<span className="text-[#0077B3]">/100</span>
              </p>

              <p className="text-[#b0c4d8] text-sm mb-2 max-w-md mx-auto">
                Your Human Risk Score reflects how your organization may respond to real-world AI-driven threats.
              </p>

              <div className="grid grid-cols-3 gap-3 my-6">
                <div className="bg-[#0c1a2e] border border-[#0d4a8a] p-3 rounded-md">
                  <p className="stat-number text-xl text-white">{humanRiskScore}%</p>
                  <p className="text-[10px] text-[#b0c4d8]">Accuracy</p>
                </div>
                <div className="bg-[#0c1a2e] border border-[#0d4a8a] p-3 rounded-md">
                  <p className="stat-number text-xl text-white flex items-center justify-center gap-1">{bestStreak} <Flame className="w-3 h-3 text-[#FF5722]" /></p>
                  <p className="text-[10px] text-[#b0c4d8]">Best Streak</p>
                </div>
                <div className="bg-[#0c1a2e] border border-[#0d4a8a] p-3 rounded-md">
                  <p className="stat-number text-xl text-[#0077B3]">{highScore}/100</p>
                  <p className="text-[10px] text-[#b0c4d8]">Personal Best</p>
                </div>
              </div>

              {newBadges.length > 0 && (
                <div className="mb-6 p-4 border border-[#0077B3]/30 bg-[#0077B3]/5 rounded-md">
                  <p className="text-xs text-[#0077B3] font-semibold mb-2 uppercase tracking-wider">Badges Earned</p>
                  <div className="flex justify-center gap-3">
                    {newBadges.map((bid) => {
                      const badge = BADGES.find((b) => b.id === bid);
                      if (!badge) return null;
                      const Icon = badge.icon;
                      return (
                        <div key={bid} className="flex items-center gap-1.5 bg-[#0077B3]/10 border border-[#0077B3]/30 px-3 py-1.5 rounded">
                          <Icon className="w-3 h-3 text-[#0077B3]" /> <span className="text-xs text-[#0077B3] font-medium">{badge.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <p className="text-[#b0c4d8] text-sm mb-6">
                {humanRiskScore >= 80 ? "Strong awareness. Your team shows solid decision-making under pressure."
                  : humanRiskScore >= 50 ? "Moderate exposure. Some decisions would put your organization at risk in a real scenario."
                  : "High exposure. These response patterns leave your organization vulnerable to AI-driven threats."}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button data-testid="game-restart-button" onClick={() => setGameState("intro")} className="bg-[#002a52] border border-[#0d4a8a] hover:border-[#0077B3] text-white rounded-md font-semibold px-5 h-10">
                  <RotateCcw className="w-4 h-4 mr-2" /> Run Again
                </Button>
                <Button data-testid="game-share-button" onClick={shareResults} className="bg-[#002a52] border border-[#0d4a8a] hover:border-[#0077B3] text-white rounded-md font-semibold px-5 h-10">
                  <Share2 className="w-4 h-4 mr-2" /> Share Score
                </Button>
                <Button data-testid="game-cta-button" onClick={() => document.getElementById("audit")?.scrollIntoView({ behavior: "smooth" })} className="bg-[#0077B3] hover:bg-[#005f8f] text-white rounded-md font-semibold px-5 h-10">
                  Get Your Full Assessment
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
