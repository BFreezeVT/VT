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
      const svcUrl = `https://www.veracitytechmn.com/services/${svc.slug}`;
      if (canonical) canonical.setAttribute("href", svcUrl);
      const ogTags = [
        ['meta[property="og:url"]', "content", svcUrl],
        ['meta[property="og:image"]', "content", svc.heroImage],
        ['meta[property="og:image:alt"]', "content", svc.name],
        ['meta[property="og:title"]', "content", svc.metaTitle],
        ['meta[property="og:description"]', "content", svc.metaDescription],
        ['meta[name="twitter:url"]', "content", svcUrl],
        ['meta[name="twitter:image"]', "content", svc.heroImage],
        ['meta[name="twitter:image:alt"]', "content", svc.name],
        ['meta[name="twitter:title"]', "content", svc.metaTitle],
        ['meta[name="twitter:description"]', "content", svc.metaDescription],
      ];
      ogTags.forEach(([selector, attr, value]) => {
        const el = document.querySelector(selector);
        if (el) el.setAttribute(attr, value);
      });
    }
    return () => {
      document.title = "Veracity Technologies | AI-Powered Cybersecurity & Managed IT";
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute("href", "https://www.veracitytechmn.com/");
      const defaults = [
        ['meta[property="og:url"]', "content", "https://www.veracitytechmn.com/"],
        ['meta[property="og:image"]', "content", "https://www.veracitytechmn.com/og-image.png"],
        ['meta[property="og:image:alt"]', "content", "Veracity Technologies - AI Automation and Managed Intelligence"],
        ['meta[property="og:title"]', "content", "Managed IT & Cybersecurity Built for AI + Automation | Veracity Technologies"],
        ['meta[property="og:description"]', "content", "Managed IT and cybersecurity for Minnesota businesses, delivered through AI, automation, and proactive intelligence. Free business technology assessment."],
        ['meta[name="twitter:url"]', "content", "https://www.veracitytechmn.com/"],
        ['meta[name="twitter:image"]', "content", "https://www.veracitytechmn.com/og-image.png"],
        ['meta[name="twitter:image:alt"]', "content", "Veracity Technologies - AI Automation and Managed Intelligence"],
        ['meta[name="twitter:title"]', "content", "Managed IT & Cybersecurity, Evolved | Veracity Technologies"],
        ['meta[name="twitter:description"]', "content", "Managed IT and cybersecurity delivered through AI, automation, and proactive intelligence. Minnesota businesses trust Veracity."],
      ];
      defaults.forEach(([selector, attr, value]) => {
        const el = document.querySelector(selector);
        if (el) el.setAttribute(attr, value);
      });
    };
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
