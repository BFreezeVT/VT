import { useParams, Link } from "react-router-dom";
import { Phone, ChevronLeft, Shield, Landmark, HardHat, Factory, ShieldCheck } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useEffect } from "react";
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

export default function IndustryPage() {
  const { industrySlug } = useParams();
  const industry = industryData.find((ind) => ind.slug === industrySlug);
  const { submitted, error, submitLead } = useLeadSubmit();

  useEffect(() => {
    if (industry) {
      document.title = industry.metaTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", industry.metaDescription);
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute("href", `https://www.veracitytechmn.com/industries/${industry.slug}`);
    }
    return () => {
      document.title = "Veracity Technologies | AI-Powered Cybersecurity & Managed IT";
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
              {industryData.filter((ind) => ind.slug !== industry.slug).map((ind) => (
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
