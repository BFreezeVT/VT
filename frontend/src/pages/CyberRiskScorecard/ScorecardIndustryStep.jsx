import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { ArrowRight } from "lucide-react";
import { INDUSTRY_OPTIONS } from "../../lib/roiCalculator";

export default function ScorecardIndustryStep({ industry, otherIndustry, onSelectIndustry, onOtherIndustryChange, onContinue }) {
  const canContinue = industry && (industry !== "Other" || otherIndustry.trim().length > 0);

  return (
    <div className="py-12 lg:py-20" data-testid="scorecard-industry-step">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3" style={{ fontFamily: "Outfit" }}>
          What industry is your business in?
        </h2>
        <p className="text-[#94a8be] text-sm mb-8">This helps us tailor your ROI estimate to your industry.</p>

        <div className="space-y-2 mb-4">
          {INDUSTRY_OPTIONS.map((opt) => (
            <button
              key={opt}
              data-testid={`scorecard-industry-opt-${opt.replace(/\s+/g, "-").toLowerCase()}`}
              onClick={() => onSelectIndustry(opt)}
              className={`w-full text-left p-4 rounded-md border transition-all duration-200 ${
                industry === opt
                  ? "border-[#0077B3] bg-[#0077B3]/10"
                  : "border-white/10 bg-white/[0.02] hover:border-[#0077B3]/50"
              }`}
            >
              <span className="text-white font-medium">{opt}</span>
            </button>
          ))}
        </div>

        {industry === "Other" && (
          <div className="mb-6">
            <Input
              data-testid="scorecard-other-industry-input"
              placeholder="Tell us your industry"
              value={otherIndustry}
              onChange={(e) => onOtherIndustryChange(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-[#94a8be]/50 rounded-md h-11"
            />
          </div>
        )}

        <Button
          data-testid="scorecard-industry-continue-btn"
          onClick={onContinue}
          disabled={!canContinue}
          className={`rounded-md font-semibold px-6 h-11 ${canContinue ? "bg-[#0077B3] hover:bg-[#005f8f] text-white" : "bg-white/5 text-white/30 cursor-not-allowed"}`}
        >
          Continue <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
