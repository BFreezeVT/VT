import { useParams, Link } from "react-router-dom";
import { Phone, ChevronLeft, Shield, Landmark, HardHat, Factory, ShieldCheck } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useEffect, useMemo } from "react";
import industryData from "../../data/industryData";
import { allTestimonials } from "../../data/industryTestimonials";
import { useLeadSubmit } from "../../hooks/useLeadSubmit";
import { buildIndustryStructuredData } from "../../lib/industryStructuredData";
import IndustryHero from "./IndustryHero";
import IndustryChallenges from "./IndustryChallenges";
import IndustryComplianceSoftware from "./IndustryComplianceSoftware";
import IndustryDeepDive from "./IndustryDeepDive";
import IndustryAICTA from "./IndustryAICTA";
import IndustryTestimonials from "./IndustryTestimonials";
import IndustryFormSection from "./IndustryFormSection";

const iconMap = { Landmark, HardHat, Factory, ShieldCheck };

const industryOgImages = {
  "financial-it-support": "https://images.unsplash.com/photo-1758519289074-9de36003622b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBzZXJ2aWNlcyUyMG9mZmljZSUyMHByb2Zlc3Npb25hbHN8ZW58MHx8fHwxNzg2OTkxNTU5fDA&ixlib=rb-4.1.0&q=85",
  "construction-it-support": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwd29ya2Vyc3xlbnwwfHx8fDE3ODY5OTE1NTl8MA&ixlib=rb-4.1.0&q=85",
  "manufacturing-it-support": "https://images.unsplash.com/photo-1720036236697-018370867320?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwxfHxtYW51ZmFjdHVyaW5nJTIwZmFjdG9yeSUyMGZsb29yJTIwaW5kdXN0cmlhbHxlbnwwfHx8fDE3ODY5OTE1NTl8MA&ixlib=rb-4.1.0&q=85",
  "high-compliance-it-support": "https://images.unsplash.com/photo-1653566031535-bcf33e1c2893?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwY29tcGxpYW5jZSUyMHByb2Zlc3Npb25hbCUyMG1lZXRpbmd8ZW58MHx8fHwxNzg2OTkxNTU5fDA&ixlib=rb-4.1.0&q=85",
};

export default function IndustryPage() {
  const { industrySlug } = useParams();
  const industry = industryData.find((ind) => ind.slug === industrySlug);
  const { submitted, error, submitLead } = useLeadSubmit();
  const otherIndustries = useMemo(
    () => (industry ? industryData.filter((ind) => ind.slug !== industry.slug) : []),
    [industry]
  );

  useEffect(() => {
    if (industry) {
      document.title = industry.metaTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", industry.metaDescription);
      const canonical = document.querySelector('link[rel="canonical"]');
      const industryUrl = `https://www.veracitytechmn.com/industries/${industry.slug}`;
      if (canonical) canonical.setAttribute("href", industryUrl);
      const ogImage = industryOgImages[industry.slug] || "https://www.veracitytechmn.com/og-image.png";
      const ogTags = [
        ['meta[property="og:url"]', "content", industryUrl],
        ['meta[property="og:image"]', "content", ogImage],
        ['meta[property="og:image:alt"]', "content", industry.name],
        ['meta[property="og:title"]', "content", industry.metaTitle],
        ['meta[property="og:description"]', "content", industry.metaDescription],
        ['meta[name="twitter:url"]', "content", industryUrl],
        ['meta[name="twitter:image"]', "content", ogImage],
        ['meta[name="twitter:image:alt"]', "content", industry.name],
        ['meta[name="twitter:title"]', "content", industry.metaTitle],
        ['meta[name="twitter:description"]', "content", industry.metaDescription],
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
  }, [industry]);

  if (!industry) {
    return (
      <div className="min-h-screen bg-[#0f1d32] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "Outfit" }}>Page Not Found</h1>
          <Link to="/" className="text-[#0077B3] hover:text-white">Back to Home</Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[industry.icon] || Shield;
  const testimonials = industry.testimonialIndices.map((i) => allTestimonials[i]);
  const structuredData = buildIndustryStructuredData(industry);

  return (
    <div className="min-h-screen bg-[#0f1d32]" data-testid={`industry-page-${industry.slug}`}>
      {structuredData.map((schema) => (
        <script key={schema["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* Nav */}
      <nav className="bg-[#003B71]/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "Outfit" }}>
            VERACITY<span className="text-[#0077B3]"> TECHNOLOGIES</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" data-testid="industry-nav-home" className="text-[#94a8be] hover:text-white text-sm flex items-center gap-1">
              <ChevronLeft className="w-3 h-3" /> Home
            </Link>
            <a href="tel:9529417333" className="flex items-center gap-2 text-[#94a8be] hover:text-white text-sm">
              <Phone className="w-4 h-4" /> (952) 941-7333
            </a>
            <Button
              data-testid="industry-nav-cta"
              onClick={() => document.getElementById("industry-form")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-white text-[#1e6bb8] hover:bg-white/90 rounded-sm font-semibold text-sm px-5"
            >
              {industry.ctaText}
            </Button>
          </div>
        </div>
      </nav>

      <main role="main">
        <IndustryHero industry={industry} Icon={Icon} />

        <section data-testid="industry-about" className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <p data-testid="industry-description" className="text-[#94a8be] text-base leading-relaxed">
              {industry.description}
            </p>
          </div>
        </section>

        <IndustryChallenges industry={industry} />
        <IndustryComplianceSoftware industry={industry} />
        <IndustryDeepDive industry={industry} />
        <IndustryAICTA industry={industry} />
        <IndustryTestimonials industry={industry} testimonials={testimonials} />

        {/* Bottom BTA CTA */}
        <section data-testid="industry-bottom-bta" className="py-14 bg-[#0f1d32] text-center">
          <div className="max-w-2xl mx-auto px-6">
            <p className="text-[#94a8be] text-sm mb-4">Want the full picture beyond this audit?</p>
            <Link to="/business-technology-assessment" data-testid="industry-bottom-cta">
              <Button className="bg-[#0077B3] hover:bg-[#0077B3]/90 text-white rounded-sm font-semibold px-8 h-11">
                Start Your Business Technology Assessment
              </Button>
            </Link>
          </div>
        </section>

        <IndustryFormSection industry={industry} submitted={submitted} error={error} submitLead={submitLead} />

        {/* Other industries */}
        <section className="py-16 bg-[#0f1d32]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-[#94a8be] text-sm mb-4">We also specialize in:</p>
            <div className="flex justify-center gap-4 flex-wrap">
              {otherIndustries.map((ind) => (
                <Link
                  key={ind.slug}
                  to={`/industries/${ind.slug}`}
                  data-testid={`other-industry-${ind.slug}`}
                  className="text-sm text-[#0077B3] border border-white/10 hover:border-[#0077B3] px-5 py-2.5 transition-colors"
                >
                  {ind.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#003B71] border-t border-[#00325f] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#94a8be]/60 text-xs">&copy; {new Date().getFullYear()} Veracity Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-[#94a8be]">
            <a href="tel:9529417333" className="hover:text-white flex items-center gap-1"><Phone className="w-3 h-3" /> (952) 941-7333</a>
            <Link to="/" className="hover:text-white">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
