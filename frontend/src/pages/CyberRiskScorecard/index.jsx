import { useScorecardFlow } from "./useScorecardFlow";
import ScorecardHero from "./ScorecardHero";
import ScorecardIndustryStep from "./ScorecardIndustryStep";
import ScorecardQuiz from "./ScorecardQuiz";
import ScorecardResults from "./ScorecardResults";
import ScorecardNav from "./ScorecardNav";
import ScorecardFooter from "./ScorecardFooter";

export default function CyberRiskScorecard() {
  const flow = useScorecardFlow();

  return (
    <div className="min-h-screen bg-[#0f1d32]" data-testid="cyber-risk-scorecard">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Cyber Risk Scorecard", description: "Free interactive cybersecurity risk assessment tool. Answer 12 questions to get your business risk score plus a sample ROI estimate for closing the gaps, instantly.", url: "https://www.veracitytechmn.com/cyber-risk-scorecard", applicationCategory: "SecurityApplication", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, provider: { "@type": "Organization", name: "Veracity Technologies" } }) }} />

      <ScorecardNav />

      <main>
        {flow.stage === "hero" && <ScorecardHero onStart={flow.startAssessment} />}

        {flow.stage === "industry" && (
          <ScorecardIndustryStep
            industry={flow.industry}
            otherIndustry={flow.otherIndustry}
            onSelectIndustry={flow.setIndustry}
            onOtherIndustryChange={flow.setOtherIndustry}
            onContinue={flow.continueToQuiz}
          />
        )}

        {flow.stage === "quiz" && (
          <ScorecardQuiz current={flow.current} animating={flow.animating} answers={flow.answers} selectAnswer={flow.selectAnswer} goBack={flow.goBack} />
        )}

        {flow.stage === "results" && (
          <ScorecardResults
            animating={flow.animating} totalScore={flow.totalScore} maxScore={flow.maxScore} pct={flow.pct}
            riskLevel={flow.riskLevel} riskColor={flow.riskColor} topRisks={flow.topRisks} topRecs={flow.topRecs}
            hourlyRate={flow.hourlyRate} industryLabel={flow.industryLabel}
            followUpChoice={flow.followUpChoice} followUpSubmitted={flow.followUpSubmitted} followUpError={flow.followUpError}
            chooseFollowUp={flow.chooseFollowUp} submitFollowUp={flow.submitFollowUp}
            emailSent={flow.emailSent} emailError={flow.emailError} submitEmail={flow.submitEmail} retake={flow.retake}
          />
        )}
      </main>

      <ScorecardFooter />
    </div>
  );
}
