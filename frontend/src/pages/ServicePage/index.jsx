import { useParams } from "react-router-dom";
import { useEffect } from "react";
import coreServicesData from "../../data/coreServicesData";
import NotFound from "../NotFound";
import { buildServiceSchema, buildBreadcrumbSchema, buildFaqSchema } from "./servicePageSchemas";
import ServiceNav from "./ServiceNav";
import ServiceHero from "./ServiceHero";
import ServiceAnswerBox from "./ServiceAnswerBox";
import ServiceBenefits from "./ServiceBenefits";
import ServiceDetails from "./ServiceDetails";
import ServiceIndustryExamples from "./ServiceIndustryExamples";
import ServiceFAQ from "./ServiceFAQ";
import ServiceCTA from "./ServiceCTA";
import ServiceRelated from "./ServiceRelated";
import ServiceFooter from "./ServiceFooter";

export default function ServicePage() {
  const { serviceSlug } = useParams();
  const svc = coreServicesData.find((s) => s.slug === serviceSlug);

  useEffect(() => {
    if (svc) {
      document.title = svc.metaTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", svc.metaDescription);
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute("href", `https://www.veracitytechmn.com/services/${svc.slug}`);
    }
    return () => { document.title = "Veracity Technologies | AI-Powered Cybersecurity & Managed IT"; };
  }, [svc]);

  if (!svc) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-[#0f1d32]" data-testid={`service-page-${svc.slug}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceSchema(svc)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(svc)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(svc)) }} />

      <ServiceNav svc={svc} />

      <main role="main">
        <ServiceHero svc={svc} />
        <ServiceAnswerBox svc={svc} />
        <ServiceBenefits svc={svc} />
        <ServiceDetails svc={svc} />
        <ServiceIndustryExamples svc={svc} />
        <ServiceFAQ svc={svc} />
        <ServiceCTA svc={svc} />
        <ServiceRelated svc={svc} />
      </main>

      <ServiceFooter />
    </div>
  );
}
