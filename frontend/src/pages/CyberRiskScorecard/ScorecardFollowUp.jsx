import { CheckCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function ScorecardFollowUp({ followUpChoice, followUpSubmitted, followUpError, chooseFollowUp, submitFollowUp }) {
  return (
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
  );
}
