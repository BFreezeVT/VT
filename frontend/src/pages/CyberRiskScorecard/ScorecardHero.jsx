import { ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Shield } from "lucide-react";

const HOW_IT_WORKS = [
  { num: "1", title: "Answer a few simple questions", desc: "12 quick questions about your current IT and security setup." },
  { num: "2", title: "Get your risk score and ROI", desc: "See your score, top risks, potential savings from fixing them, and actionable recommendations." },
  { num: "3", title: "Review with our team (optional)", desc: "Book a free risk review to get a clear action plan." },
];

export default function ScorecardHero({ onStart }) {
  return (
    <div className="py-20 lg:py-32" data-testid="scorecard-hero">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="w-20 h-20 mx-auto flex items-center justify-center bg-[#0077B3]/10 border border-[#0077B3]/30 rounded-full mb-8">
          <Shield className="w-10 h-10 text-[#0077B3]" />
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6" style={{ fontFamily: "Outfit" }}>
          What&rsquo;s Your Business&rsquo;s<br /><span className="text-[#0077B3]">Cyber Risk Score?</span>
        </h1>
        <p className="text-lg text-[#94a8be] max-w-2xl mx-auto mb-10">
          Answer 12 quick questions and see where your business stands - plus your potential ROI from closing the gaps - in under 3 minutes.
        </p>
        <Button data-testid="start-assessment" onClick={onStart} className="bg-[#0077B3] hover:bg-[#0077B3]/90 text-white rounded-md font-bold text-lg px-10 h-14 animate-pulse-glow">
          Start Your Risk Score <ChevronRight className="w-5 h-5 ml-1" />
        </Button>
        <p className="text-[#94a8be]/60 text-sm mt-6">No sales pressure. Instant results. Used by businesses like yours.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 text-left">
          {HOW_IT_WORKS.map((step) => (
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
  );
}
