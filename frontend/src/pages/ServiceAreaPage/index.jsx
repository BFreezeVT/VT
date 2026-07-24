import { useParams, Link } from "react-router-dom";
import { Phone, ChevronLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useEffect } from "react";
import cityData from "../../data/cityData";
import industryData from "../../data/industryData";
import { allTestimonials } from "../../data/cityTestimonials";
import { useLeadSubmit } from "../../hooks/useLeadSubmit";
import { anchorFor, industryForCity, aiPagesFor } from "../../lib/contentLinks";
import { buildCityStructuredData } from "../../lib/cityStructuredData";
import CityHero from "./CityHero";
import CityAbout from "./CityAbout";
import CityServices from "./CityServices";
import CityTestimonials from "./CityTestimonials";
import CityFormSection from "./CityFormSection";

export default function ServiceAreaPage() {
  const { citySlug } = useParams();
  const city = cityData.find((c) => c.slug === citySlug);
  const { submitted, submitLead } = useLeadSubmit();

  useEffect(() => {
    if (city) {
      document.title = `IT Support in ${city.name}, MN | Veracity Technologies`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", `Managed IT services and cybersecurity in ${city.name}, Minnesota. ${city.subhead} Call (952) 941-7333 for a free audit.`);
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute("href", `https://www.veracitytechmn.com/service-areas/${city.slug}`);
    }
    return () => {
      document.title = "Veracity Technologies | AI-Powered Cybersecurity & Managed IT";
    };
  }, [city]);

  if (!city) {
    return (
      <div className="min-h-screen bg-[#0f1d32] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Page Not Found</h1>
          <p className="text-[#94a8be] mb-8">This service area page doesn&rsquo;t exist.</p>
          <Link to="/" className="text-[#0077B3] hover:text-white transition-colors">Back to Home</Link>
        </div>
      </div>
    );
  }

  const cityTestimonials = city.testimonialIndices.map((i) => allTestimonials[i]).slice(0, 3);
  const relatedIndustrySlug = industryForCity(city);
  const relatedIndustry = industryData.find((ind) => ind.slug === relatedIndustrySlug);
  const relatedAIPages = aiPagesFor(city.slug, 2);
  const btaAnchors = [anchorFor(city.slug, 0), anchorFor(city.slug, 1), anchorFor(city.slug, 2)];
  const structuredData = buildCityStructuredData(city);

  return (
    <div className="min-h-screen bg-[#0f1d32]" data-testid={`city-page-${city.slug}`}>
      {structuredData.map((schema) => (
        <script key={schema["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* Nav */}
      <nav className="bg-[#003B71]/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50" data-testid="city-nav">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
            VERACITY<span className="text-[#0077B3]"> TECHNOLOGIES</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" data-testid="city-nav-home" className="text-[#94a8be] hover:text-white text-sm transition-colors flex items-center gap-1">
              <ChevronLeft className="w-3 h-3" /> Home
            </Link>
            <a href="tel:9529417333" className="flex items-center gap-2 text-[#94a8be] hover:text-white text-sm">
              <Phone className="w-4 h-4" /> (952) 941-7333
            </a>
            <Button
              data-testid="city-nav-cta"
              onClick={() => document.getElementById("city-form")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-white text-[#1e6bb8] hover:bg-white/90 rounded-sm font-semibold text-sm px-5"
            >
              {city.ctaText}
            </Button>
          </div>
        </div>
      </nav>

      <main role="main">
        <CityHero city={city} />
        <CityAbout city={city} />
        <CityServices city={city} />
        <CityTestimonials
          city={city} cityTestimonials={cityTestimonials} relatedIndustry={relatedIndustry}
          relatedAIPages={relatedAIPages} btaAnchors={btaAnchors}
        />
        <CityFormSection city={city} submitted={submitted} submitLead={submitLead} />

        {/* Other cities */}
        <section data-testid="city-other-areas" aria-label="Other service areas" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2
              className="text-xl font-bold text-white mb-8 text-center"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              We also serve
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {cityData
                .filter((c) => c.slug !== city.slug)
                .map((c) => (
                  <Link
                    key={c.slug}
                    to={`/service-areas/${c.slug}`}
                    data-testid={`other-city-${c.slug}`}
                    className="text-xs font-medium text-[#94a8be] border border-white/10 bg-white hover:border-[#0077B3] hover:text-white px-4 py-2 transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#003B71] border-t border-[#00325f] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#94a8be]/60 text-xs">
            &copy; {new Date().getFullYear()} Veracity Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-[#94a8be]">
            <a href="tel:9529417333" className="hover:text-white transition-colors flex items-center gap-1">
              <Phone className="w-3 h-3" /> (952) 941-7333
            </a>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
