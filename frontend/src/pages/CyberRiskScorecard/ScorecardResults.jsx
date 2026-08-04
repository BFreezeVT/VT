import { useState } from "react";
import { CheckCircle, AlertTriangle, XCircle, Send, ShieldCheck, ShieldAlert, Mail } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import ScorecardROI from "./ScorecardROI";

export default function ScorecardResults({
  animating, totalScore, maxScore, pct, riskLevel, riskColor, topRisks, topRecs,
  hourlyRate, industryLabel,
  followUpChoice, followUpSubmitted, followUpError, chooseFollowUp, submitFollowUp,
  emailSent, emailError, submitEmail, retake,
}) {
  const [showEmailForm, setShowEmailForm] = useState(false);

  const handleEmailSubmit = async (e) => {
    await submitEmail(e);
  };

  return (
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
              {topRisks.length > 0 ? topRisks.map((q) => (
                <div key={q.id} className="flex items-start gap-3 p-4 rounded-md bg-[#ef4444]/5 border border-[#ef4444]/10">
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
              {topRecs.length > 0 ? topRecs.map((rec) => (
                <div key={rec} className="flex items-start gap-3 p-4 rounded-md bg-[#0077B3]/5 border border-[#0077B3]/10">
                  <CheckCircle className="w-4 h-4 text-[#0077B3] flex-shrink-0 mt-0.5" />
                  <p className="text-white text-sm font-medium">{rec}</p>
                </div>
              )) : (
                <p className="text-[#94a8be] text-sm">Keep maintaining your current security posture.</p>
              )}
            </div>
          </div>
        </div>

        {/* Potential ROI from closing the gaps above - ties Risk Score to real business value */}
        <ScorecardROI pct={pct} riskLevel={riskLevel} riskColor={riskColor} totalScore={totalScore} maxScore={maxScore} topRisks={topRisks} topRecs={topRecs} hourlyRate={hourlyRate} industryLabel={industryLabel} />

        {/* FOLLOW-UP: simple yes/no instead of a calendar booking flow */}
        <div id="scorecard-followup" className="bg-white rounded-lg p-8 sm:p-12 mb-12" data-testid="scorecard-followup">
          {followUpChoice === null && (
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#003B71] mb-3" style={{ fontFamily: "Outfit" }}>
                Would you like someone from Veracity to follow up with you about these results?
              </h2>
              <p className="text-[#4a5e78] text-base max-w-xl mx-auto mb-8">
                No sales pressure - just a quick conversation about your biggest risks and how to close them.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button data-testid="scorecard-followup-yes-btn" onClick={() => chooseFollowUp("yes")} className="bg-[#0077B3] hover:bg-[#005f8f] text-white rounded-md font-semibold px-8 h-12">
                  Yes, follow up with me
                </Button>
                <button data-testid="scorecard-followup-no-btn" onClick={() => chooseFollowUp("no")} className="text-[#4a5e78] hover:text-[#003B71] text-sm font-medium px-4 h-12">
                  No thanks, just exploring
                </button>
              </div>
            </div>
          )}

          {followUpChoice === "yes" && !followUpSubmitted && (
            <div>
              <h3 className="text-[#003B71] font-bold text-xl mb-4 text-center" style={{ fontFamily: "Outfit" }}>Great - how should we reach you?</h3>
              {followUpError && (
                <p data-testid="scorecard-followup-error" className="text-[#ef4444] text-xs font-medium mb-3 text-center">
                  Something went wrong submitting your request. Please try again, or call us at (952) 941-7333.
                </p>
              )}
              <form onSubmit={submitFollowUp} className="max-w-md mx-auto grid grid-cols-1 gap-3">
                <Input name="name" placeholder="Your name" required className="bg-white/5 border-white/10 text-white placeholder:text-[#94a8be]/50 rounded-md" />
                <Input name="email" type="email" placeholder="Email" required className="bg-white/5 border-white/10 text-white placeholder:text-[#94a8be]/50 rounded-md" />
                <Input name="phone" type="tel" placeholder="Phone" className="bg-white/5 border-white/10 text-white placeholder:text-[#94a8be]/50 rounded-md" />
                <Input name="company" placeholder="Company" className="bg-white/5 border-white/10 text-white placeholder:text-[#94a8be]/50 rounded-md" />
                <Button type="submit" className="bg-[#0077B3] hover:bg-[#0077B3]/90 text-white rounded-md font-semibold">
                  Request Follow-Up
                </Button>
              </form>
            </div>
          )}

          {followUpChoice === "yes" && followUpSubmitted && (
            <div className="text-center py-6" data-testid="scorecard-followup-confirmed">
              <CheckCircle className="w-16 h-16 text-[#10b981] mx-auto mb-4" />
              <h3 className="text-[#003B71] font-bold text-xl mb-2" style={{ fontFamily: "Outfit" }}>You&rsquo;re All Set!</h3>
              <p className="text-[#4a5e78] text-sm">We&rsquo;ll reach out shortly to walk through your results.</p>
            </div>
          )}

          {followUpChoice === "no" && (
            <div className="text-center py-6" data-testid="scorecard-followup-declined">
              <CheckCircle className="w-10 h-10 text-[#94a8be] mx-auto mb-4" />
              <p className="text-[#4a5e78] text-base">No problem! Feel free to email yourself a copy of the report below, or retake the assessment anytime.</p>
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
              {emailError && (
                <p data-testid="email-report-error" className="text-[#ef4444] text-xs font-medium mb-3">
                  We couldn&rsquo;t send your report just now. Please try again, or call us at (952) 941-7333.
                </p>
              )}
              <form onSubmit={handleEmailSubmit} className="grid grid-cols-2 gap-3">
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
          <button onClick={retake} className="text-[#94a8be] text-sm hover:text-white transition-colors">
            Retake Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
