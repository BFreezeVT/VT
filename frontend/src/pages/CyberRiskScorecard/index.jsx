import { useEffect } from "react";
import { useScorecardFlow } from "./useScorecardFlow";
import ScorecardHero from "./ScorecardHero";
import ScorecardIndustryStep from "./ScorecardIndustryStep";
import ScorecardQuiz from "./ScorecardQuiz";
import ScorecardResults from "./ScorecardResults";
import ScorecardNav from "./ScorecardNav";
import ScorecardFooter from "./ScorecardFooter";

export default function CyberRiskScorecard() {
  const flow = useScorecardFlow();

  useEffect(() => {
    document.title = "Cyber Risk Scorecard | Veracity Technologies";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Take Veracity Technologies free Cyber Risk Scorecard - answer 12 quick questions to get your risk score and a personalized ROI estimate.");
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://www.veracitytechmn.com/cyber-risk-scorecard");
    return () => {
      document.title = "Veracity Technologies | AI-Powered Cybersecurity & Managed IT";
      if (metaDesc) metaDesc.setAttribute("content", "Managed IT & cybersecurity for Minnesota businesses, powered by AI and automation. SOC 2 compliant, CMMC registered. Free assessment available.");
      if (canonical) canonical.setAttribute("href", "https://www.veracitytechmn.com/");
    };
  }, []);

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
