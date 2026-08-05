import { useEffect } from "react";
import humanRiskSimulationData from "../../data/humanRiskSimulationData";
import { buildServiceSchema, buildBreadcrumbSchema, buildFaqSchema } from "./humanRiskSimulationSchemas";
import HRSNav from "./HRSNav";
import HRSHero from "./HRSHero";
import HRSAnswerBox from "./HRSAnswerBox";
import HRSWhyItMatters from "./HRSWhyItMatters";
import HRSLevels from "./HRSLevels";
import HRSCommonMistakes from "./HRSCommonMistakes";
import HRSTrainingAndMeasurement from "./HRSTrainingAndMeasurement";
import HRSSimulationEmbed from "./HRSSimulationEmbed";
import HRSFAQ from "./HRSFAQ";
import HRSFinalCTA from "./HRSFinalCTA";
import HRSFooter from "./HRSFooter";

export default function HumanRiskSimulation() {
  const data = humanRiskSimulationData;

  useEffect(() => {
    document.title = "Human Risk Simulation | Veracity Technologies";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Test your team's response to AI-driven phishing and social engineering with Veracity's free Human Risk Simulation. Get a Human Risk Score and a personalized action plan.");
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://www.veracitytechmn.com/human-risk-simulation");
    return () => { document.title = "Veracity Technologies | AI-Powered Cybersecurity & Managed IT"; };
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1d32]" data-testid="human-risk-simulation-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceSchema(data)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(data)) }} />

      <HRSNav data={data} />

      <main role="main">
        <HRSHero data={data} />
        <HRSAnswerBox data={data} />
        <HRSWhyItMatters data={data} />
        <HRSLevels data={data} />
        <HRSCommonMistakes data={data} />
        <HRSTrainingAndMeasurement data={data} />
        <HRSSimulationEmbed />
        <HRSFAQ data={data} />
        <HRSFinalCTA />
      </main>

      <HRSFooter />
    </div>
  );
}
