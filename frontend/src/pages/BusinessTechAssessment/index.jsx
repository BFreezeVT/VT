import { useEffect } from "react";
import FreeAuditOffer from "../../sections/FreeAuditOffer";
import TechMaturityTable from "../../components/TechMaturityTable";
import { answerBoxes } from "./businessTechAssessmentData";
import { buildServiceSchema, buildBreadcrumbSchema, buildFaqSchema } from "./businessTechAssessmentSchemas";
import BTANav from "./BTANav";
import BTAHero from "./BTAHero";
import BTAAreasGrid from "./BTAAreasGrid";
import BTAAnswerBoxes from "./BTAAnswerBoxes";
import BTARelatedLinks from "./BTARelatedLinks";
import BTAFooter from "./BTAFooter";

export default function BusinessTechAssessment() {
  useEffect(() => {
    document.title = "Business Technology Assessment | Veracity Technologies";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Free Business Technology Assessment scoring technology infrastructure, cybersecurity, compliance, AI readiness, AI governance, and Microsoft Copilot readiness for Minneapolis-St. Paul businesses.");
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://www.veracitytechmn.com/business-technology-assessment");
    return () => { document.title = "Veracity Technologies | AI-Powered Cybersecurity & Managed IT"; };
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1d32]" data-testid="business-tech-assessment-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(answerBoxes)) }} />

      <BTANav />

      <main role="main">
        <BTAHero />
        <BTAAreasGrid />

        {/* Maturity comparison table (GEO) */}
        <section data-testid="bta-maturity" className="py-20 bg-[#0f1d32]">
          <div className="max-w-4xl mx-auto px-6">
            <TechMaturityTable title="The Technology Maturity Model" />
          </div>
        </section>

        <BTAAnswerBoxes />

        {/* Embedded assessment tool */}
        <div className="bg-[#0f1d32]">
          <FreeAuditOffer />
        </div>

        <BTARelatedLinks />
      </main>

      <BTAFooter />
    </div>
  );
}
