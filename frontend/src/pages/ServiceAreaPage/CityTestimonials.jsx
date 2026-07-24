import { Link } from "react-router-dom";
import { Quote } from "lucide-react";

export default function CityTestimonials({ city, cityTestimonials, relatedIndustry, relatedAIPages, btaAnchors }) {
  return (
    <section data-testid="city-testimonials" aria-label={`Client testimonials from ${city.name} area`} className="py-20 bg-[#0f1d32]">
      <div className="max-w-7xl mx-auto px-6">
        <h2
          className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-12 text-center"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          What {city.name}-area clients say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cityTestimonials.map((t, i) => (
            <div key={t.company} data-testid={`city-testimonial-${i}`} className="grid-border-card p-6 flex flex-col">
              <Quote className="w-6 h-6 text-[#0077B3]/20 mb-3" />
              <p className="text-[#94a8be] text-sm leading-relaxed mb-4 flex-1 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="border-t border-white/10 pt-3 mt-auto">
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-[#94a8be] text-xs">{t.title}, {t.company}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Industry + AI + Business Technology Assessment cross-links */}
        <div className="mt-12 text-center">
          <p className="text-[#94a8be] text-sm mb-4">Explore our industry expertise:</p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Link to="/industries/construction-it-support" className="text-xs text-[#0077B3] border border-white/10 hover:border-[#0077B3] px-4 py-2 transition-colors">Construction IT</Link>
            <Link to="/industries/financial-it-support" className="text-xs text-[#0077B3] border border-white/10 hover:border-[#0077B3] px-4 py-2 transition-colors">Financial Services</Link>
            <Link to="/industries/manufacturing-it-support" className="text-xs text-[#0077B3] border border-white/10 hover:border-[#0077B3] px-4 py-2 transition-colors">Manufacturing</Link>
            <Link to="/industries/high-compliance-it-support" className="text-xs text-[#0077B3] border border-white/10 hover:border-[#0077B3] px-4 py-2 transition-colors">High-Compliance</Link>
          </div>
          {relatedIndustry && relatedAIPages.length > 0 && (
            <>
              <p className="text-[#94a8be] text-sm mb-4">AI readiness resources for {city.name} organizations:</p>
              <div data-testid="city-seo-links" className="flex flex-wrap justify-center gap-3 mb-8">
                <Link to={`/industries/${relatedIndustry.slug}`} data-testid="city-related-industry-link" className="text-xs text-[#94a8be] border border-white/10 hover:border-[#0077B3] hover:text-white px-4 py-2 transition-colors">
                  IT for {relatedIndustry.name} in {city.name}
                </Link>
                {relatedAIPages.map((p, i) => (
                  <Link key={p.slug} to={`/${p.slug}`} data-testid={`city-related-ai-link-${i}`} className="text-xs text-[#94a8be] border border-white/10 hover:border-[#0077B3] hover:text-white px-4 py-2 transition-colors">
                    {p.name}
                  </Link>
                ))}
              </div>
            </>
          )}
          <p className="text-[#94a8be] text-sm mb-4">Find out where {city.name} businesses stand today:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {btaAnchors.map((anchor, i) => (
              <Link key={anchor} to="/business-technology-assessment" data-testid={`city-bta-link-${i}`} className="text-xs font-semibold text-white bg-[#0077B3] hover:bg-[#005f8f] px-4 py-2 transition-colors">
                {anchor}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
