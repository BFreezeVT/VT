import { stringifyJsonLd } from "@/lib/jsonLd";
import { useEffect } from "react";
import { buildOrganizationSchema, buildBreadcrumbSchema, buildWebPageSchema } from "./aboutUsSchemas";
import AboutUsNav from "./AboutUsNav";
import AboutUsHero from "./AboutUsHero";
import AboutUsStory from "./AboutUsStory";
import AboutUsWhyChoose from "./AboutUsWhyChoose";
import AboutUsServices from "./AboutUsServices";
import AboutUsTeam from "./AboutUsTeam";
import AboutUsTestimonials from "./AboutUsTestimonials";
import AboutUsCTA from "./AboutUsCTA";
import AboutUsFooter from "./AboutUsFooter";

export default function AboutUs() {
  useEffect(() => {
    document.title = "About Us | Veracity Technologies";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Meet Veracity Technologies, a SOC 2 certified MSP in Minnetonka, MN. Since 1989, we have helped Twin Cities SMBs in financial services, construction, manufacturing, and high-compliance industries secure and simplify their technology.");
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://www.veracitytechmn.com/about");
    return () => {
      document.title = "Veracity Technologies | AI-Powered Cybersecurity & Managed IT";
      if (metaDesc) metaDesc.setAttribute("content", "Managed IT & cybersecurity for Minnesota businesses, powered by AI and automation. SOC 2 compliant, CMMC registered. Free assessment available.");
      if (canonical) canonical.setAttribute("href", "https://www.veracitytechmn.com/");
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1d32]" data-testid="about-us-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(buildOrganizationSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(buildBreadcrumbSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(buildWebPageSchema()) }} />

      <AboutUsNav />

      <main role="main">
        <AboutUsHero />
        <AboutUsStory />
        <AboutUsWhyChoose />
        <AboutUsServices />
        <AboutUsTeam />
        <AboutUsTestimonials />
        <AboutUsCTA />
      </main>

      <AboutUsFooter />
    </div>
  );
}
