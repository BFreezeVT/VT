import { useState } from "react";
import { CheckCircle, AlertTriangle, XCircle, Clock, Calendar, Send, ShieldCheck, ShieldAlert, Mail } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { timeSlots } from "../../data/cyberRiskScorecardData";

export default function ScorecardResults({
  animating, totalScore, maxScore, pct, riskLevel, riskColor, topRisks, topRecs,
  booked, selectedSlot, bookSlot, emailSent, submitEmail, retake,
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
