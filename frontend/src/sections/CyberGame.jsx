import { useState, useCallback } from "react";
import { Button } from "../components/ui/button";
import { ShieldCheck, ShieldAlert, RotateCcw, CheckCircle, XCircle, Trophy, ChevronRight } from "lucide-react";

const emails = [
  {
    id: 1,
    from: "payroll@company-hr-update.net",
    subject: "URGENT: Verify Your Direct Deposit Information",
    preview: "We've detected an issue with your bank details. Click here immediately to re-verify or your next paycheck will be delayed...",
    isPhishing: true,
    explanation: "The domain 'company-hr-update.net' is suspicious — legitimate HR emails come from your company domain. Urgency language and threatening delayed pay are classic phishing tactics.",
  },
  {
    id: 2,
    from: "jthompson@turnerconstruction.com",
    subject: "Re: Updated Schedule for Phase 2 Steel Delivery",
    preview: "Hi Mike, Attached is the revised schedule for the Phase 2 steel delivery. Let me know if the Thursday window works for your crew. Thanks, Jeff",
    isPhishing: false,
    explanation: "This is a legitimate business email — it references a specific project detail, uses a proper company domain, and has a natural conversational tone with no urgent calls to action.",
  },
  {
    id: 3,
    from: "accounting@sage-invoices-portal.com",
    subject: "Invoice #INV-2847 Payment Overdue — Wire Transfer Required",
    preview: "Your invoice is past due. To avoid service interruption, please wire $47,250 to the updated bank account below. New routing number: 0281...",
    isPhishing: true,
    explanation: "Wire transfer requests with 'updated bank details' are the #1 payment fraud tactic in construction and finance. The domain mimics Sage but isn't official. Always verify bank changes by phone.",
  },
  {
    id: 4,
    from: "noreply@microsoft365.com",
    subject: "Your Microsoft 365 Subscription Renewal Confirmation",
    preview: "Thank you for renewing your Microsoft 365 Business Premium subscription. Your next billing date is January 15, 2026. View your receipt in the admin portal.",
    isPhishing: false,
    explanation: "This comes from a legitimate Microsoft domain, references a routine subscription renewal, and doesn't ask you to click suspicious links or provide credentials.",
  },
  {
    id: 5,
    from: "ceo@company-exec-office.co",
    subject: "Confidential — Need your help with something",
    preview: "Hey, are you at your desk? I need you to purchase some gift cards for a client meeting this afternoon. Keep this between us for now. I'll reimburse you...",
    isPhishing: true,
    explanation: "This is a classic CEO impersonation scam. The domain is fake (.co instead of .com), the request for gift cards is a known fraud pattern, and 'keep this between us' is designed to bypass normal approval processes.",
  },
  {
    id: 6,
    from: "alerts@chase.com",
    subject: "Security Alert: Unusual Sign-in Activity Detected",
    preview: "We noticed a sign-in attempt from an unrecognized device in Dallas, TX. If this wasn't you, please review your recent activity in the Chase Mobile app or at chase.com.",
    isPhishing: false,
    explanation: "This is a legitimate security alert from Chase's real domain. It directs you to the official app or website — not a suspicious link. It's informational and doesn't demand immediate credential entry.",
  },
  {
    id: 7,
    from: "it-support@yourcompany-helpdesk.io",
    subject: "Action Required: Password Expires in 2 Hours",
    preview: "Your network password expires today. Click the link below to reset it now or you will be locked out of all systems including email, VPN, and project management tools.",
    isPhishing: true,
    explanation: "Real IT departments use your actual company domain, not a generic '-helpdesk.io'. The artificial 2-hour deadline and threat of total lockout create panic to bypass your judgment.",
  },
  {
    id: 8,
    from: "procore-notifications@procore.com",
    subject: "Daily Log Submitted for Riverside Commons — Dec 4",
    preview: "A new daily log has been submitted by Site Superintendent Dave Martinez for the Riverside Commons project. View the full report in Procore.",
    isPhishing: false,
    explanation: "This is a standard Procore notification from the legitimate domain. It references specific project details, a named team member, and links to the platform you'd expect.",
  },
];

export default function CyberGame() {
  const [gameState, setGameState] = useState("intro"); // intro, playing, result
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(null);
  const [shuffledEmails, setShuffledEmails] = useState([]);

  const startGame = useCallback(() => {
    const shuffled = [...emails].sort(() => Math.random() - 0.5).slice(0, 5);
    setShuffledEmails(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setLastCorrect(null);
    setGameState("playing");
    if (window.gtag) window.gtag("event", "game_start", { event_category: "phishing_game" });
  }, []);

  const handleAnswer = (userSaysPhishing) => {
    if (answered) return;
    const current = shuffledEmails[currentIndex];
    const correct = userSaysPhishing === current.isPhishing;
    if (correct) setScore((s) => s + 1);
    setLastCorrect(correct);
    setAnswered(true);
  };

  const nextEmail = () => {
    if (currentIndex + 1 >= shuffledEmails.length) {
      setGameState("result");
      if (window.gtag) window.gtag("event", "game_complete", { event_category: "phishing_game", score: score });
    } else {
      setCurrentIndex((i) => i + 1);
      setAnswered(false);
      setLastCorrect(null);
    }
  };

  const current = shuffledEmails[currentIndex];

  return (
    <section
      id="cyber-game"
      data-testid="cyber-game-section"
      className="py-24 lg:py-32 bg-[#001A33]/30"
    >
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="overline text-[#FF5722] mb-4 animate-fade-in-up">Interactive Challenge</p>
          <h2
            data-testid="cyber-game-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 animate-fade-in-up stagger-1"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Can you spot the phish?
          </h2>
          <p className="text-[#A0B6CD] text-base max-w-xl mx-auto animate-fade-in-up stagger-2">
            Test your cybersecurity instincts. We&rsquo;ll show you 5 emails — decide if each one is legitimate or a phishing attempt.
          </p>
        </div>

        {/* Game area */}
        <div className="grid-border-card p-6 sm:p-8 lg:p-10 animate-fade-in-up stagger-3">
          {/* INTRO STATE */}
          {gameState === "intro" && (
            <div data-testid="game-intro" className="text-center py-8">
              <div className="w-16 h-16 mx-auto flex items-center justify-center bg-[#0077B3]/10 border border-[#0077B3]/30 mb-6">
                <ShieldCheck className="w-8 h-8 text-[#0077B3]" />
              </div>
              <h3 className="text-white font-bold text-xl mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
                Phishing Detection Challenge
              </h3>
              <p className="text-[#A0B6CD] text-sm mb-8 max-w-md mx-auto">
                You&rsquo;ll see 5 emails that might land in your inbox. For each one, decide: 
                is it <span className="text-white font-medium">legitimate</span> or a <span className="text-[#FF5722] font-medium">phishing attempt</span>?
              </p>
              <Button
                data-testid="game-start-button"
                onClick={startGame}
                className="bg-[#0077B3] hover:bg-[#0077B3]/90 text-white rounded-sm font-semibold px-8 h-11"
              >
                Start Challenge
              </Button>
            </div>
          )}

          {/* PLAYING STATE */}
          {gameState === "playing" && current && (
            <div data-testid="game-playing">
              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs text-[#A0B6CD]">
                  Email {currentIndex + 1} of {shuffledEmails.length}
                </span>
                <span data-testid="game-score" className="text-xs text-[#0077B3] font-semibold">
                  Score: {score}/{shuffledEmails.length}
                </span>
              </div>
              <div className="w-full bg-[#003B71]/30 h-1 mb-8">
                <div
                  className="bg-[#0077B3] h-1 transition-all duration-500"
                  style={{ width: `${((currentIndex + 1) / shuffledEmails.length) * 100}%` }}
                />
              </div>

              {/* Email card */}
              <div className="bg-[#020812] border border-[#003B71] p-5 sm:p-6 mb-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 flex-shrink-0 rounded-full bg-[#003B71] flex items-center justify-center text-white text-xs font-bold">
                    {current.from[0].toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p data-testid="email-from" className="text-white text-sm font-medium truncate">{current.from}</p>
                    <p data-testid="email-subject" className="text-white text-base font-semibold mt-1" style={{ fontFamily: "Outfit, sans-serif" }}>
                      {current.subject}
                    </p>
                  </div>
                </div>
                <div className="border-t border-[#003B71] pt-4 mt-3">
                  <p data-testid="email-preview" className="text-[#A0B6CD] text-sm leading-relaxed">
                    {current.preview}
                  </p>
                </div>
              </div>

              {/* Answer buttons or feedback */}
              {!answered ? (
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    data-testid="game-btn-legitimate"
                    onClick={() => handleAnswer(false)}
                    className="bg-transparent border border-[#003B71] hover:border-[#0077B3] hover:bg-[#0077B3]/10 text-white rounded-sm h-12 font-semibold"
                  >
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    Legitimate
                  </Button>
                  <Button
                    data-testid="game-btn-phishing"
                    onClick={() => handleAnswer(true)}
                    className="bg-transparent border border-[#003B71] hover:border-[#FF5722] hover:bg-[#FF5722]/10 text-white rounded-sm h-12 font-semibold"
                  >
                    <ShieldAlert className="w-4 h-4 mr-2" />
                    Phishing
                  </Button>
                </div>
              ) : (
                <div data-testid="game-feedback">
                  <div className={`flex items-start gap-3 p-4 border mb-4 ${
                    lastCorrect 
                      ? "border-[#0077B3]/50 bg-[#0077B3]/5" 
                      : "border-[#FF5722]/50 bg-[#FF5722]/5"
                  }`}>
                    {lastCorrect ? (
                      <CheckCircle className="w-5 h-5 text-[#0077B3] flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-[#FF5722] flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className={`font-semibold text-sm mb-1 ${lastCorrect ? "text-[#0077B3]" : "text-[#FF5722]"}`}>
                        {lastCorrect ? "Correct!" : "Not quite."}
                        {" "}This email is <span className="text-white font-bold">{current.isPhishing ? "PHISHING" : "LEGITIMATE"}</span>.
                      </p>
                      <p className="text-[#A0B6CD] text-sm leading-relaxed">{current.explanation}</p>
                    </div>
                  </div>
                  <Button
                    data-testid="game-next-button"
                    onClick={nextEmail}
                    className="w-full bg-[#0077B3] hover:bg-[#0077B3]/90 text-white rounded-sm h-11 font-semibold"
                  >
                    {currentIndex + 1 >= shuffledEmails.length ? "See Results" : "Next Email"}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* RESULT STATE */}
          {gameState === "result" && (
            <div data-testid="game-results" className="text-center py-6">
              <div className="w-16 h-16 mx-auto flex items-center justify-center bg-[#0077B3]/10 border border-[#0077B3]/30 mb-6">
                <Trophy className="w-8 h-8 text-[#0077B3]" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
                Challenge Complete!
              </h3>
              <p data-testid="game-final-score" className="stat-number text-5xl text-white my-4">
                {score}<span className="text-[#0077B3]">/{shuffledEmails.length}</span>
              </p>
              <p className="text-[#A0B6CD] text-sm mb-2">
                {score === shuffledEmails.length
                  ? "Perfect score! You've got sharp instincts."
                  : score >= 3
                  ? "Good eye! But even one missed phish can cost millions."
                  : "Phishing is getting harder to spot. That's exactly why you need experts in your corner."}
              </p>
              <p className="text-[#A0B6CD] text-xs mb-8">
                {score < shuffledEmails.length
                  ? "In a real attack, one wrong click is all it takes. Our AI-powered threat detection catches what humans miss."
                  : "Even experts can be fooled eventually. Our AI-powered monitoring adds a 24/7 safety net your team deserves."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  data-testid="game-restart-button"
                  onClick={startGame}
                  className="bg-transparent border border-[#003B71] hover:border-[#0077B3] text-white rounded-sm font-semibold px-6 h-11"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Play Again
                </Button>
                <Button
                  data-testid="game-cta-button"
                  onClick={() => document.getElementById("audit")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-white text-[#003B71] hover:bg-white/90 rounded-sm font-semibold px-6 h-11"
                >
                  Get Your Free Security Audit
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
