import ScorecardROI from "./ScorecardROI";
import ScorecardScoreDisplay from "./ScorecardScoreDisplay";
import ScorecardRisksAndRecs from "./ScorecardRisksAndRecs";
import ScorecardFollowUp from "./ScorecardFollowUp";
import ScorecardEmailReport from "./ScorecardEmailReport";

export default function ScorecardResults({
  animating, totalScore, maxScore, pct, riskLevel, riskColor, topRisks, topRecs,
  hourlyRate, industryLabel,
  followUpChoice, followUpSubmitted, followUpError, chooseFollowUp, submitFollowUp,
  emailSent, emailError, submitEmail, retake,
}) {
  return (
    <div className={`py-12 lg:py-20 transition-all duration-500 ${animating ? "opacity-0" : "opacity-100"}`} data-testid="scorecard-results">
      <div className="max-w-4xl mx-auto px-6">
        <ScorecardScoreDisplay totalScore={totalScore} maxScore={maxScore} pct={pct} riskLevel={riskLevel} riskColor={riskColor} />

        <ScorecardRisksAndRecs topRisks={topRisks} topRecs={topRecs} />

        {/* Potential ROI from closing the gaps above - ties Risk Score to real business value */}
        <ScorecardROI pct={pct} riskLevel={riskLevel} riskColor={riskColor} totalScore={totalScore} maxScore={maxScore} topRisks={topRisks} topRecs={topRecs} hourlyRate={hourlyRate} industryLabel={industryLabel} />

        {/* FOLLOW-UP: simple yes/no instead of a calendar booking flow */}
        <ScorecardFollowUp followUpChoice={followUpChoice} followUpSubmitted={followUpSubmitted} followUpError={followUpError} chooseFollowUp={chooseFollowUp} submitFollowUp={submitFollowUp} />

        <ScorecardEmailReport emailSent={emailSent} emailError={emailError} submitEmail={submitEmail} />

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
