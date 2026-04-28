import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "../components/ui/button";
import { ShieldCheck, ShieldAlert, RotateCcw, CheckCircle, XCircle, Trophy, ChevronRight, Clock, Flame, Share2, Zap, Target, Crown } from "lucide-react";

const emails = [
  { id: 1, from: "payroll@company-hr-update.net", subject: "URGENT: Verify Your Direct Deposit Information", preview: "We've detected an issue with your bank details. Click here immediately to re-verify or your next paycheck will be delayed...", isPhishing: true, explanation: "The domain 'company-hr-update.net' is suspicious. Urgency language and threatening delayed pay are classic phishing tactics.", difficulty: "easy" },
  { id: 2, from: "jthompson@turnerconstruction.com", subject: "Re: Updated Schedule for Phase 2 Steel Delivery", preview: "Hi Mike, Attached is the revised schedule for the Phase 2 steel delivery. Let me know if the Thursday window works for your crew.", isPhishing: false, explanation: "Legitimate business email — references a specific project, proper company domain, natural tone.", difficulty: "easy" },
  { id: 3, from: "accounting@sage-invoices-portal.com", subject: "Invoice #INV-2847 Payment Overdue — Wire Transfer Required", preview: "Your invoice is past due. To avoid service interruption, please wire $47,250 to the updated bank account below. New routing number: 0281...", isPhishing: true, explanation: "Wire transfer requests with 'updated bank details' are the #1 payment fraud tactic. The domain mimics Sage but isn't official.", difficulty: "medium" },
  { id: 4, from: "noreply@microsoft365.com", subject: "Your Microsoft 365 Subscription Renewal Confirmation", preview: "Thank you for renewing your Microsoft 365 Business Premium subscription. Your next billing date is January 15, 2026.", isPhishing: false, explanation: "Legitimate Microsoft domain, routine renewal, no suspicious links or credential requests.", difficulty: "easy" },
  { id: 5, from: "ceo@company-exec-office.co", subject: "Confidential — Need your help with something", preview: "Hey, are you at your desk? I need you to purchase some gift cards for a client meeting this afternoon. Keep this between us...", isPhishing: true, explanation: "Classic CEO impersonation. Fake domain (.co), gift card request, and 'keep this between us' bypasses approvals.", difficulty: "easy" },
  { id: 6, from: "alerts@chase.com", subject: "Security Alert: Unusual Sign-in Activity Detected", preview: "We noticed a sign-in attempt from an unrecognized device in Dallas, TX. If this wasn't you, review your activity in the Chase Mobile app.", isPhishing: false, explanation: "Legitimate Chase security alert. Directs to official app, informational, no credential demands.", difficulty: "medium" },
  { id: 7, from: "it-support@yourcompany-helpdesk.io", subject: "Action Required: Password Expires in 2 Hours", preview: "Your network password expires today. Click the link below to reset it now or you will be locked out of all systems.", isPhishing: true, explanation: "Real IT uses your company domain, not '-helpdesk.io'. The 2-hour deadline creates panic.", difficulty: "easy" },
  { id: 8, from: "procore-notifications@procore.com", subject: "Daily Log Submitted for Riverside Commons — Dec 4", preview: "A new daily log has been submitted by Site Superintendent Dave Martinez for the Riverside Commons project.", isPhishing: false, explanation: "Standard Procore notification from the legitimate domain with specific project details.", difficulty: "medium" },
  { id: 9, from: "security@amaz0n-verify.com", subject: "Your Amazon Account Has Been Locked", preview: "We detected suspicious activity on your account. Please verify your identity within 24 hours or your account will be permanently suspended.", isPhishing: true, explanation: "The '0' in 'amaz0n' is a zero — a typosquatting trick. The 24-hour ultimatum is designed to create panic.", difficulty: "medium" },
  { id: 10, from: "hr@company.com", subject: "Updated PTO Policy — Effective January 1", preview: "Hi team, Please review the attached updated PTO policy. Key changes include increased carryover limits and a new floating holiday. Questions? Reach out to HR.", isPhishing: false, explanation: "Internal HR communication from the correct domain with a routine policy update and no urgent calls to action.", difficulty: "medium" },
  { id: 11, from: "docusign@docusign-notifications.net", subject: "Action Required: Sign Your Updated Service Agreement", preview: "John Smith has sent you a document to review and sign. Please complete by end of business today. Click here to review document.", isPhishing: true, explanation: "Real DocuSign uses @docusign.com, not '-notifications.net'. The urgency and generic sender name are red flags.", difficulty: "hard" },
  { id: 12, from: "shipping@fedex.com", subject: "FedEx: Your Package Is Scheduled for Delivery Tomorrow", preview: "Tracking #7892-4521-8834. Your package from Grainger Industrial Supply is out for delivery. Estimated arrival: December 5, 10am-2pm.", isPhishing: false, explanation: "Legitimate FedEx notification with specific tracking number, sender name, and delivery window.", difficulty: "hard" },
  { id: 13, from: "admin@m1crosoft-security.com", subject: "Critical: Unauthorized Access Detected on Your Account", preview: "Our AI systems detected 47 failed login attempts from Russia. Your account is at risk. Click immediately to secure your account and change your password.", isPhishing: true, explanation: "'m1crosoft' uses a '1' instead of 'i' — another typosquatting domain. The dramatic '47 failed attempts from Russia' is fear-based manipulation.", difficulty: "hard" },
  { id: 14, from: "no-reply@zoom.us", subject: "Cloud Recording Available: Q4 Planning Meeting", preview: "Hi, your cloud recording for 'Q4 Planning Meeting' from Dec 3 is now available. The recording will be available for 30 days.", isPhishing: false, explanation: "Legitimate Zoom notification from the correct domain referencing a specific meeting with standard retention info.", difficulty: "hard" },
  { id: 15, from: "billing@quickbooks-invoicing.net", subject: "Payment Received — $12,450.00 Applied to Invoice #3847", preview: "A payment of $12,450.00 has been applied. However, we noticed a discrepancy. Please log in to review and confirm the payment allocation.", isPhishing: true, explanation: "QuickBooks uses @intuit.com, not '-invoicing.net'. The 'discrepancy' lure triggers curiosity and urgency to click.", difficulty: "hard" },
];

const DIFFICULTIES = {
  easy: { label: "Rookie", icon: Target, timer: 0, count: 5, pool: "easy", color: "text-[#0077B3]" },
  medium: { label: "Analyst", icon: Zap, timer: 20, count: 6, pool: "all", color: "text-[#FF5722]" },
  hard: { label: "CISO", icon: Crown, timer: 12, count: 7, pool: "hard", color: "text-[#FF5722]" },
};

const BADGES = [
  { id: "first_game", label: "First Scan", desc: "Complete your first game", icon: Target },
  { id: "perfect", label: "Perfect Score", desc: "Get every answer right", icon: Crown },
  { id: "speed_demon", label: "Speed Demon", desc: "Answer in under 5 seconds", icon: Zap },
  { id: "streak_3", label: "Hot Streak", desc: "3 correct in a row", icon: Flame },
  { id: "all_modes", label: "Full Spectrum", desc: "Complete all difficulty levels", icon: ShieldCheck },
];

function getStoredData() {
  try {
    const raw = localStorage.getItem("veracity_game");
    return raw ? JSON.parse(raw) : { highScores: {}, badges: [], gamesPlayed: 0, modesCompleted: [] };
  } catch { return { highScores: {}, badges: [], gamesPlayed: 0, modesCompleted: [] }; }
}
function storeData(data) {
  try { localStorage.setItem("veracity_game", JSON.stringify(data)); } catch {}
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
  const [shuffledEmails, setShuffledEmails] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [answerTime, setAnswerTime] = useState(0);
  const [stored, setStored] = useState(getStoredData());
  const [newBadges, setNewBadges] = useState([]);
  const timerRef = useRef(null);
  const questionStartRef = useRef(null);

  const config = DIFFICULTIES[difficulty];

  // Timer
  useEffect(() => {
    if (gameState === "playing" && config.timer > 0 && !answered) {
      setTimeLeft(config.timer);
      questionStartRef.current = Date.now();
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            // Time's up — count as wrong
            setLastCorrect(false);
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
    if (cfg.pool === "easy") pool = emails.filter((e) => e.difficulty === "easy" || e.difficulty === "medium");
    else if (cfg.pool === "hard") pool = emails.filter((e) => e.difficulty === "medium" || e.difficulty === "hard");
    else pool = [...emails];
    const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, cfg.count);
    setShuffledEmails(shuffled);
    setDifficulty(d);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setAnswered(false);
    setLastCorrect(null);
    setNewBadges([]);
    setGameState("playing");
    if (window.gtag) window.gtag("event", "game_start", { event_category: "phishing_game", difficulty: d });
  }, [difficulty]);

  const handleAnswer = (userSaysPhishing) => {
    if (answered) return;
    clearInterval(timerRef.current);
    const current = shuffledEmails[currentIndex];
    const correct = userSaysPhishing === current.isPhishing;
    const elapsed = questionStartRef.current ? Math.round((Date.now() - questionStartRef.current) / 1000) : 0;
    setAnswerTime(elapsed);
    if (correct) {
      setScore((s) => s + 1);
      setStreak((s) => {
        const ns = s + 1;
        setBestStreak((b) => Math.max(b, ns));
        return ns;
      });
    } else {
      setStreak(0);
    }
    setLastCorrect(correct);
    setAnswered(true);
  };

  const nextEmail = () => {
    if (currentIndex + 1 >= shuffledEmails.length) {
      // Calculate badges
      const data = { ...stored };
      const earned = [];
      data.gamesPlayed += 1;
      if (!data.badges.includes("first_game")) { data.badges.push("first_game"); earned.push("first_game"); }
      if (score === shuffledEmails.length && !data.badges.includes("perfect")) { data.badges.push("perfect"); earned.push("perfect"); }
      if (bestStreak >= 3 && !data.badges.includes("streak_3")) { data.badges.push("streak_3"); earned.push("streak_3"); }
      if (answerTime < 5 && lastCorrect && !data.badges.includes("speed_demon")) { data.badges.push("speed_demon"); earned.push("speed_demon"); }
      if (!data.modesCompleted.includes(difficulty)) data.modesCompleted.push(difficulty);
      if (data.modesCompleted.length >= 3 && !data.badges.includes("all_modes")) { data.badges.push("all_modes"); earned.push("all_modes"); }
      const pct = Math.round((score / shuffledEmails.length) * 100);
      if (!data.highScores[difficulty] || pct > data.highScores[difficulty]) data.highScores[difficulty] = pct;
      storeData(data);
      setStored(data);
      setNewBadges(earned);
      setGameState("result");
      if (window.gtag) window.gtag("event", "game_complete", { event_category: "phishing_game", score, difficulty, best_streak: bestStreak });
    } else {
      setCurrentIndex((i) => i + 1);
      setAnswered(false);
      setLastCorrect(null);
    }
  };

  const shareResults = () => {
    const pct = Math.round((score / shuffledEmails.length) * 100);
    const text = `I scored ${score}/${shuffledEmails.length} (${pct}%) on the Veracity Technologies Phishing Detection Challenge (${config.label} mode)! Can you beat my score? 🛡️`;
    if (navigator.share) {
      navigator.share({ title: "Phishing Detection Challenge", text, url: window.location.origin });
    } else {
      const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`;
      window.open(url, "_blank");
    }
    if (window.gtag) window.gtag("event", "game_share", { event_category: "phishing_game", score });
  };

  const current = shuffledEmails[currentIndex];
  const highScore = stored.highScores[difficulty] || 0;

  return (
    <section id="cyber-game" data-testid="cyber-game-section" className="py-24 lg:py-32 bg-[#1a3355]/30">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="overline text-[#FF5722] mb-4 animate-fade-in-up">Interactive Challenge</p>
          <h2 data-testid="cyber-game-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 animate-fade-in-up stagger-1" style={{ fontFamily: "Outfit, sans-serif" }}>
            Can you spot the phish?
          </h2>
          <p className="text-[#d0dce8] text-base max-w-xl mx-auto animate-fade-in-up stagger-2">
            Test your cybersecurity instincts across three difficulty levels. Earn badges, beat your high score, and share your results.
          </p>
        </div>

        <div className="grid-border-card p-6 sm:p-8 lg:p-10 animate-fade-in-up stagger-3">
          {/* INTRO */}
          {gameState === "intro" && (
            <div data-testid="game-intro">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto flex items-center justify-center bg-[#0077B3]/10 border border-[#0077B3]/30 mb-4">
                  <ShieldCheck className="w-8 h-8 text-[#0077B3]" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: "Outfit" }}>Choose Your Difficulty</h3>
                <p className="text-[#d0dce8] text-sm max-w-md mx-auto">
                  Each level increases the challenge with harder emails, a countdown timer, and more questions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {Object.entries(DIFFICULTIES).map(([key, cfg]) => {
                  const Icon = cfg.icon;
                  const hs = stored.highScores[key];
                  return (
                    <button
                      key={key}
                      data-testid={`game-difficulty-${key}`}
                      onClick={() => startGame(key)}
                      className={`p-5 border text-left transition-all hover:border-[#0077B3] hover:bg-[#0077B3]/5 ${difficulty === key ? "border-[#0077B3] bg-[#0077B3]/5" : "border-[#1e6bb8] bg-transparent"}`}
                    >
                      <Icon className={`w-5 h-5 ${cfg.color} mb-3`} />
                      <p className="text-white font-semibold text-sm mb-1" style={{ fontFamily: "Outfit" }}>{cfg.label}</p>
                      <p className="text-[#d0dce8] text-xs mb-2">
                        {cfg.count} emails{cfg.timer > 0 ? ` · ${cfg.timer}s timer` : " · No timer"}
                      </p>
                      {hs !== undefined && (
                        <p className="text-[#0077B3] text-xs font-medium">Best: {hs}%</p>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Badges */}
              {stored.badges.length > 0 && (
                <div className="border-t border-[#1e6bb8] pt-6">
                  <p className="text-xs text-[#d0dce8] mb-3 uppercase tracking-wider">Your Badges</p>
                  <div className="flex flex-wrap gap-2">
                    {BADGES.filter((b) => stored.badges.includes(b.id)).map((b) => {
                      const Icon = b.icon;
                      return (
                        <div key={b.id} data-testid={`badge-${b.id}`} className="flex items-center gap-2 bg-[#0077B3]/10 border border-[#0077B3]/30 px-3 py-1.5" title={b.desc}>
                          <Icon className="w-3 h-3 text-[#0077B3]" />
                          <span className="text-xs text-[#0077B3] font-medium">{b.label}</span>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-[#d0dce8]/50 mt-2">{stored.gamesPlayed} games played</p>
                </div>
              )}
            </div>
          )}

          {/* PLAYING */}
          {gameState === "playing" && current && (
            <div data-testid="game-playing">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#d0dce8]">
                    Email {currentIndex + 1}/{shuffledEmails.length}
                  </span>
                  <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
                </div>
                <div className="flex items-center gap-4">
                  {streak >= 2 && (
                    <span className="flex items-center gap-1 text-xs text-[#FF5722] font-semibold animate-fade-in">
                      <Flame className="w-3 h-3" /> {streak} streak
                    </span>
                  )}
                  <span data-testid="game-score" className="text-xs text-[#0077B3] font-semibold">
                    {score}/{shuffledEmails.length}
                  </span>
                </div>
              </div>

              {/* Progress + Timer */}
              <div className="relative w-full bg-[#1e6bb8]/30 h-1.5 mb-6">
                <div className="bg-[#0077B3] h-1.5 transition-all duration-500" style={{ width: `${((currentIndex + 1) / shuffledEmails.length) * 100}%` }} />
              </div>
              {config.timer > 0 && !answered && (
                <div className="flex items-center gap-2 mb-4">
                  <Clock className={`w-3 h-3 ${timeLeft <= 5 ? "text-[#FF5722] animate-pulse" : "text-[#d0dce8]"}`} />
                  <div className="flex-1 bg-[#1e6bb8]/30 h-1">
                    <div
                      className={`h-1 transition-all duration-1000 ${timeLeft <= 5 ? "bg-[#FF5722]" : "bg-[#0077B3]"}`}
                      style={{ width: `${(timeLeft / config.timer) * 100}%` }}
                    />
                  </div>
                  <span className={`text-xs font-mono ${timeLeft <= 5 ? "text-[#FF5722]" : "text-[#d0dce8]"}`}>{timeLeft}s</span>
                </div>
              )}

              {/* Email card */}
              <div className="bg-[#112240] border border-[#1e6bb8] p-5 sm:p-6 mb-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 flex-shrink-0 rounded-full bg-[#1e6bb8] flex items-center justify-center text-white text-xs font-bold">
                    {current.from[0].toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p data-testid="email-from" className="text-white text-sm font-medium truncate">{current.from}</p>
                    <p data-testid="email-subject" className="text-white text-base font-semibold mt-1" style={{ fontFamily: "Outfit" }}>{current.subject}</p>
                  </div>
                </div>
                <div className="border-t border-[#1e6bb8] pt-4 mt-3">
                  <p data-testid="email-preview" className="text-[#d0dce8] text-sm leading-relaxed">{current.preview}</p>
                </div>
              </div>

              {/* Buttons or feedback */}
              {!answered ? (
                <div className="grid grid-cols-2 gap-4">
                  <Button data-testid="game-btn-legitimate" onClick={() => handleAnswer(false)} className="bg-transparent border border-[#1e6bb8] hover:border-[#0077B3] hover:bg-[#0077B3]/10 text-white rounded-sm h-12 font-semibold">
                    <ShieldCheck className="w-4 h-4 mr-2" /> Legitimate
                  </Button>
                  <Button data-testid="game-btn-phishing" onClick={() => handleAnswer(true)} className="bg-transparent border border-[#1e6bb8] hover:border-[#FF5722] hover:bg-[#FF5722]/10 text-white rounded-sm h-12 font-semibold">
                    <ShieldAlert className="w-4 h-4 mr-2" /> Phishing
                  </Button>
                </div>
              ) : (
                <div data-testid="game-feedback">
                  <div className={`flex items-start gap-3 p-4 border mb-4 ${lastCorrect ? "border-[#0077B3]/50 bg-[#0077B3]/5" : "border-[#FF5722]/50 bg-[#FF5722]/5"}`}>
                    {lastCorrect ? <CheckCircle className="w-5 h-5 text-[#0077B3] flex-shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 text-[#FF5722] flex-shrink-0 mt-0.5" />}
                    <div>
                      <p className={`font-semibold text-sm mb-1 ${lastCorrect ? "text-[#0077B3]" : "text-[#FF5722]"}`}>
                        {timeLeft === 0 && config.timer > 0 && !lastCorrect ? "Time's up!" : lastCorrect ? "Correct!" : "Not quite."}{" "}
                        This email is <span className="text-white font-bold">{current.isPhishing ? "PHISHING" : "LEGITIMATE"}</span>.
                      </p>
                      <p className="text-[#d0dce8] text-sm leading-relaxed">{current.explanation}</p>
                    </div>
                  </div>
                  <Button data-testid="game-next-button" onClick={nextEmail} className="w-full bg-[#0077B3] hover:bg-[#0077B3]/90 text-white rounded-sm h-11 font-semibold">
                    {currentIndex + 1 >= shuffledEmails.length ? "See Results" : "Next Email"} <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* RESULTS */}
          {gameState === "result" && (
            <div data-testid="game-results" className="text-center py-4">
              <div className="w-16 h-16 mx-auto flex items-center justify-center bg-[#0077B3]/10 border border-[#0077B3]/30 mb-4">
                <Trophy className="w-8 h-8 text-[#0077B3]" />
              </div>
              <p className="text-xs text-[#d0dce8] mb-1">{config.label} Mode</p>
              <h3 className="text-white font-bold text-xl mb-1" style={{ fontFamily: "Outfit" }}>Challenge Complete!</h3>
              <p data-testid="game-final-score" className="stat-number text-5xl text-white my-3">
                {score}<span className="text-[#0077B3]">/{shuffledEmails.length}</span>
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-[#1a3355] border border-[#1e6bb8] p-3">
                  <p className="stat-number text-xl text-white">{Math.round((score / shuffledEmails.length) * 100)}%</p>
                  <p className="text-[10px] text-[#d0dce8]">Accuracy</p>
                </div>
                <div className="bg-[#1a3355] border border-[#1e6bb8] p-3">
                  <p className="stat-number text-xl text-white flex items-center justify-center gap-1">{bestStreak} <Flame className="w-3 h-3 text-[#FF5722]" /></p>
                  <p className="text-[10px] text-[#d0dce8]">Best Streak</p>
                </div>
                <div className="bg-[#1a3355] border border-[#1e6bb8] p-3">
                  <p className="stat-number text-xl text-[#0077B3]">{highScore}%</p>
                  <p className="text-[10px] text-[#d0dce8]">Personal Best</p>
                </div>
              </div>

              {/* New badges */}
              {newBadges.length > 0 && (
                <div className="mb-6 p-4 border border-[#0077B3]/30 bg-[#0077B3]/5">
                  <p className="text-xs text-[#0077B3] font-semibold mb-2 uppercase tracking-wider">New Badges Earned!</p>
                  <div className="flex justify-center gap-3">
                    {newBadges.map((bid) => {
                      const badge = BADGES.find((b) => b.id === bid);
                      if (!badge) return null;
                      const Icon = badge.icon;
                      return (
                        <div key={bid} className="flex items-center gap-1.5 bg-[#0077B3]/10 border border-[#0077B3]/30 px-3 py-1.5">
                          <Icon className="w-3 h-3 text-[#0077B3]" />
                          <span className="text-xs text-[#0077B3] font-medium">{badge.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <p className="text-[#d0dce8] text-sm mb-6">
                {score === shuffledEmails.length
                  ? "Flawless. You've got elite instincts."
                  : score >= shuffledEmails.length * 0.7
                  ? "Solid performance — but even one missed phish can cost millions."
                  : "Phishing is getting harder to spot. That's exactly why you need experts in your corner."}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
                <Button data-testid="game-restart-button" onClick={() => setGameState("intro")} className="bg-transparent border border-[#1e6bb8] hover:border-[#0077B3] text-white rounded-sm font-semibold px-5 h-10">
                  <RotateCcw className="w-4 h-4 mr-2" /> Play Again
                </Button>
                <Button data-testid="game-share-button" onClick={shareResults} className="bg-transparent border border-[#1e6bb8] hover:border-[#0077B3] text-white rounded-sm font-semibold px-5 h-10">
                  <Share2 className="w-4 h-4 mr-2" /> Share Score
                </Button>
                <Button data-testid="game-cta-button" onClick={() => document.getElementById("audit")?.scrollIntoView({ behavior: "smooth" })} className="bg-white text-[#1e6bb8] hover:bg-white/90 rounded-sm font-semibold px-5 h-10">
                  Get Your Free Audit
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
