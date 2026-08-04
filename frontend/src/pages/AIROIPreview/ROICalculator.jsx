import { Link } from "react-router-dom";
import { ArrowRight, Info } from "lucide-react";
import { Slider } from "../../components/ui/slider";
import { Button } from "../../components/ui/button";

// Transparent, industry-average assumptions used to produce a directional sample estimate.
// These are NOT personalized figures - the real assessment produces a tailored number.
const AVG_HOURLY_LABOR_COST = 38; // fully-loaded avg hourly cost for admin/ops roles (MN market)
const AUTOMATION_EFFICIENCY_RATE = 0.45; // avg % of manual/repetitive hours reclaimable via managed AI + automation
const WEEKS_PER_YEAR = 52;

export default function ROICalculator({ teamSize, setTeamSize, manualHours, setManualHours }) {
  const weeklyManualHoursTotal = teamSize * manualHours;
  const weeklyHoursReclaimed = weeklyManualHoursTotal * AUTOMATION_EFFICIENCY_RATE;
  const annualHoursReclaimed = Math.round(weeklyHoursReclaimed * WEEKS_PER_YEAR);
  const annualSavings = Math.round(annualHoursReclaimed * AVG_HOURLY_LABOR_COST);

  return (
    <section data-testid="ai-roi-calculator-section" aria-label="AI ROI Calculator" className="py-16 lg:py-20 bg-[#0f1d32]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="overline text-[#0077B3] mb-3">Free Interactive Tool</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-4" style={{ fontFamily: "Outfit" }}>
            AI ROI Calculator
          </h2>
          <p className="text-[#c0cfe0] text-base max-w-2xl mx-auto">
            Adjust the sliders below to see a sample estimate of the time and money managed AI and IT automation could reclaim for a business like yours.
          </p>
        </div>

        <div className="grid-border-card p-6 sm:p-10">
          {/* Team Size Slider */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <label htmlFor="team-size-slider" className="text-white font-semibold text-base">Team Size</label>
              <span data-testid="team-size-value" className="stat-number text-2xl text-[#0077B3]">{teamSize}</span>
            </div>
            <Slider
              id="team-size-slider"
              data-testid="team-size-slider"
              value={[teamSize]}
              onValueChange={(v) => setTeamSize(v[0])}
              min={1}
              max={150}
              step={1}
              aria-label="Team size"
            />
            <div className="flex justify-between text-[#c0cfe0]/50 text-xs mt-2">
              <span>1 employee</span>
              <span>150+ employees</span>
            </div>
          </div>

          {/* Manual Hours Slider */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <label htmlFor="manual-hours-slider" className="text-white font-semibold text-base">Manual Hours (per employee, per week)</label>
              <span data-testid="manual-hours-value" className="stat-number text-2xl text-[#0077B3]">{manualHours}</span>
            </div>
            <Slider
              id="manual-hours-slider"
              data-testid="manual-hours-slider"
              value={[manualHours]}
              onValueChange={(v) => setManualHours(v[0])}
              min={1}
              max={25}
              step={1}
              aria-label="Manual hours per employee per week"
            />
            <div className="flex justify-between text-[#c0cfe0]/50 text-xs mt-2">
              <span>1 hour</span>
              <span>25+ hours</span>
            </div>
          </div>

          {/* Results */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <p data-testid="roi-sample-estimate-label" className="text-sm font-bold uppercase tracking-[0.15em] text-[#f59e0b]">Sample Estimates</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="text-center bg-white/[0.03] border border-white/8 rounded-md p-6">
                <p data-testid="roi-result-hours" className="stat-number text-3xl sm:text-4xl text-white mb-1">
                  {annualHoursReclaimed.toLocaleString()}
                </p>
                <p className="text-[#c0cfe0] text-sm">Hours reclaimed / year</p>
              </div>
              <div className="text-center bg-white/[0.03] border border-white/8 rounded-md p-6">
                <p data-testid="roi-result-savings" className="stat-number text-3xl sm:text-4xl text-[#0077B3] mb-1">
                  ${annualSavings.toLocaleString()}
                </p>
                <p className="text-[#c0cfe0] text-sm">Estimated annual savings</p>
              </div>
            </div>
            <p data-testid="roi-assumptions-note" className="flex items-start gap-2 text-[#c0cfe0]/50 text-xs max-w-xl mx-auto text-center mb-8">
              <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              These are directional sample estimates based on industry-average assumptions (~${AVG_HOURLY_LABOR_COST}/hr fully-loaded labor cost, {Math.round(AUTOMATION_EFFICIENCY_RATE * 100)}% average automation efficiency gain) - not a quote or guarantee. Your actual ROI depends on your specific workflows and systems.
            </p>
            <div className="text-center">
              <Link to="/business-technology-assessment" data-testid="roi-primary-cta">
                <Button className="bg-[#0077B3] hover:bg-[#005f8f] text-white rounded-md font-bold text-base px-8 h-12">
                  Get Your Personalized ROI & Readiness Report <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <p className="text-[#c0cfe0]/40 text-xs mt-3">Free. Takes under 3 minutes. No sales pressure.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
