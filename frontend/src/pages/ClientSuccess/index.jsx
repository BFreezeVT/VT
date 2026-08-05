import { useEffect } from "react";
import { allTestimonials } from "../../data/industryTestimonials";
import industryData from "../../data/industryData";
import { buildBreadcrumbSchema, buildWebPageSchema } from "./clientSuccessSchemas";
import ClientSuccessNav from "./ClientSuccessNav";
import ClientSuccessHero from "./ClientSuccessHero";
import ClientSuccessIndustrySection from "./ClientSuccessIndustrySection";
import ClientSuccessCTA from "./ClientSuccessCTA";
import ClientSuccessFooter from "./ClientSuccessFooter";

const FEATURED_INDUSTRY_SLUGS = ["financial-it-support", "manufacturing-it-support", "construction-it-support"];

export default function ClientSuccess() {
  useEffect(() => {
    document.title = "Client Success Stories | Veracity Technologies";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Real client success stories from financial services, manufacturing, and construction companies partnered with Veracity Technologies for managed IT and cybersecurity.");
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://www.veracitytechmn.com/client-success");
    return () => { document.title = "Veracity Technologies | AI-Powered Cybersecurity & Managed IT"; };
  }, []);

  const featuredIndustries = FEATURED_INDUSTRY_SLUGS.map((slug) => industryData.find((ind) => ind.slug === slug)).filter(Boolean);
  const usedIndices = new Set(featuredIndustries.flatMap((ind) => ind.testimonialIndices));
  const generalTestimonials = allTestimonials.filter((_, i) => !usedIndices.has(i));

  return (
    <div className="min-h-screen bg-[#0f1d32]" data-testid="client-success-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebPageSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema()) }} />

      <ClientSuccessNav />

      <main role="main">
        <ClientSuccessHero />

        {featuredIndustries.map((ind, i) => (
          <ClientSuccessIndustrySection
            key={ind.slug}
            industryName={ind.name}
            industrySlug={ind.slug}
            testimonials={ind.testimonialIndices.map((idx) => allTestimonials[idx])}
            bgClass={i % 2 === 0 ? "bg-[#0f1d32]" : "bg-[#0a1628]"}
          />
        ))}

        <ClientSuccessIndustrySection
          industryName="General MSP Success Stories"
          industrySlug={null}
          testimonials={generalTestimonials}
          bgClass="bg-[#0a1628]"
        />

        <ClientSuccessCTA />
      </main>

      <ClientSuccessFooter />
    </div>
  );
}
