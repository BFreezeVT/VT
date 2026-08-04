import { Slider } from "../../components/ui/slider";
import { Button } from "../../components/ui/button";
import { Info, ArrowRight, TrendingUp, Download } from "lucide-react";
import { useState } from "react";
import { generateScorecardPDF } from "../../lib/generateScorecardPDF";
import { calculateScorecardROI, AVG_HOURLY_LABOR_COST } from "../../lib/scorecardRoiCalculator";

export default function ScorecardROI({ pct, riskLevel, riskColor, totalScore, maxScore, topRisks, topRecs }) {
  const [teamSize, setTeamSize] = useState(20);
  const [manualHours, setManualHours] = useState(8);

  const { riskAdjustedEfficiency, annualHoursReclaimed, annualSavings, monthlySavings } = calculateScorecardROI(pct, teamSize, manualHours);

  const scrollToBooking = () => {
    document.getElementById("scorecard-booking")?.scrollIntoView({ behavior: "smooth" });
    if (window.gtag) window.gtag("event", "scorecard_roi_cta_click", { event_category: "cyber_risk_scorecard", risk_level: riskLevel, estimated_savings: annualSavings });
  };

  const handleDownloadReport = () => {
    generateScorecardPDF({
      riskLevel,
      totalScore,
      maxScore,
      topRisks,
      topRecs,
      roi: { teamSize, weeklyHoursPerPerson: manualHours, hourlyRate: AVG_HOURLY_LABOR_COST, annualHoursReclaimed, monthlySavingsForecast: monthlySavings },
    });
    if (window.gtag) window.gtag("event", "scorecard_report_download", { event_category: "cyber_risk_scorecard", risk_level: riskLevel });
  };

  return (
    <div data-testid="scorecard-roi-section" className="grid-border-card p-6 sm:p-10 mb-16">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-[#0077B3]" />
          <p className="overline text-[#0077B3]">Beyond Your Risk Score</p>
        </div>
        <h3 className="text-white font-bold text-xl sm:text-2xl mb-2" style={{ fontFamily: "Outfit" }}>
          Your Potential ROI From Closing These Gaps
        </h3>
        <p className="text-[#94a8be] text-sm max-w-xl mx-auto">
          Based on your <span style={{ color: riskColor }} className="font-semibold">{riskLevel} risk</span> profile, here&rsquo;s a sample estimate of what fixing these gaps could be worth for a team your size.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="scorecard-team-size-slider" className="text-white font-medium text-sm">Team Size</label>
          <span data-testid="scorecard-team-size-value" className="stat-number text-xl text-[#0077B3]">{teamSize}</span>
        </div>
        <Slider
          id="scorecard-team-size-slider"
          data-testid="scorecard-team-size-slider"
          value={[teamSize]}
          onValueChange={(v) => setTeamSize(v[0])}
          onValueCommit={(v) => { if (window.gtag) window.gtag("event", "scorecard_roi_adjust", { event_category: "cyber_risk_scorecard", field: "team_size", value: v[0] }); }}
          min={1}
          max={150}
          step={1}
          aria-label="Team size"
        />
      </div>

      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="scorecard-manual-hours-slider" className="text-white font-medium text-sm">Manual Hours (per employee, per week)</label>
          <span data-testid="scorecard-manual-hours-value" className="stat-number text-xl text-[#0077B3]">{manualHours}</span>
        </div>
        <Slider
          id="scorecard-manual-hours-slider"
          data-testid="scorecard-manual-hours-slider"
          value={[manualHours]}
          onValueChange={(v) => setManualHours(v[0])}
          onValueCommit={(v) => { if (window.gtag) window.gtag("event", "scorecard_roi_adjust", { event_category: "cyber_risk_scorecard", field: "manual_hours", value: v[0] }); }}
          min={1}
          max={25}
          step={1}
          aria-label="Manual hours per employee per week"
        />
      </div>

      <div className="border-t border-white/10 pt-8">
        <div className="flex items-center justify-center mb-6">
          <p data-testid="scorecard-roi-sample-label" className="text-xs font-bold uppercase tracking-[0.15em] text-[#f59e0b]">Sample Estimates</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="text-center bg-white/[0.03] border border-white/8 rounded-md p-6">
            <p data-testid="scorecard-roi-hours" className="stat-number text-3xl sm:text-4xl text-white mb-1">{annualHoursReclaimed.toLocaleString()}</p>
            <p className="text-[#94a8be] text-sm">Hours reclaimed / year</p>
          </div>
          <div className="text-center bg-white/[0.03] border border-white/8 rounded-md p-6">
            <p data-testid="scorecard-roi-savings" className="stat-number text-3xl sm:text-4xl text-[#0077B3] mb-1">${annualSavings.toLocaleString()}</p>
            <p className="text-[#94a8be] text-sm">Estimated annual savings</p>
          </div>
        </div>
        <p data-testid="scorecard-roi-assumptions-note" className="flex items-start gap-2 text-[#94a8be]/50 text-xs max-w-xl mx-auto text-center mb-8">
          <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          Directional sample estimate using industry-average assumptions (~${AVG_HOURLY_LABOR_COST}/hr fully-loaded labor cost, {Math.round(riskAdjustedEfficiency * 100)}% automation efficiency gain scaled to your risk score) - not a quote or guarantee.
        </p>
        <div className="text-center">
          <Button data-testid="scorecard-roi-cta" onClick={scrollToBooking} className="bg-[#0077B3] hover:bg-[#005f8f] text-white rounded-md font-bold text-base px-8 h-12">
            See How Veracity Can Close These Gaps <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <p className="text-[#94a8be]/60 text-xs mt-3">Minnesota&rsquo;s premier managed IT partner for growing businesses.</p>
          <div className="mt-4">
            <button data-testid="scorecard-download-report-btn" onClick={handleDownloadReport} className="inline-flex items-center gap-2 text-[#94a8be] hover:text-white text-sm transition-colors">
              <Download className="w-3.5 h-3.5" /> Download Executive ROI & Readiness Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
