import { stringifyJsonLd } from "@/lib/jsonLd";
import { useEffect } from "react";
import { Star } from "lucide-react";
import { ALL_TESTIMONIALS } from "./testimonialsData";
import { buildBreadcrumbSchema, buildWebPageSchema } from "./testimonialsSchemas";
import TestimonialsNav from "./TestimonialsNav";
import TestimonialsFooter from "./TestimonialsFooter";
import TestimonialsCTA from "./TestimonialsCTA";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function Testimonials() {
  useEffect(() => {
    document.title = "Testimonials | Veracity Technologies";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "What Minnesota businesses say about Veracity Technologies. Read 20 client testimonials from financial services, construction, manufacturing, and high-compliance firms across the Twin Cities.");
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://www.veracitytechmn.com/testimonials");
    return () => {
      document.title = "Veracity Technologies | AI-Powered Cybersecurity & Managed IT";
      if (metaDesc) metaDesc.setAttribute("content", "Managed IT & cybersecurity for Minnesota businesses, powered by AI and automation. SOC 2 compliant, CMMC registered. Free assessment available.");
      if (canonical) canonical.setAttribute("href", "https://www.veracitytechmn.com/");
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1d32]" data-testid="testimonials-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(buildBreadcrumbSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(buildWebPageSchema()) }} />

      <TestimonialsNav />

      <main role="main">
        <section data-testid="testimonials-hero" className="py-24 lg:py-28">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="flex justify-center">
              <Breadcrumbs items={[{ label: "Testimonials" }]} />
            </div>
            <p className="overline text-[#0077B3] mb-4">Client Testimonials</p>
            <h1 data-testid="testimonials-headline" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white mb-6" style={{ fontFamily: "Outfit" }}>
              What Our Clients Are Saying About Our Services
            </h1>
            <p className="text-base md:text-lg text-[#94a8be] leading-relaxed mb-10 max-w-2xl mx-auto">
              Veracity Technologies holds a 5.0 star rating on Clutch across verified client reviews. Here is what clients from financial services, construction, manufacturing, and high-compliance firms across the Twin Cities say in their own words.
            </p>
            <div className="grid grid-cols-2 gap-0 border-t border-white/10 pt-8 max-w-2xl mx-auto">
              <div data-testid="testimonials-metric-0" className="text-center px-4">
                <p className="stat-number text-4xl text-white">20</p>
                <p className="text-xs text-[#94a8be] mt-1">Client Testimonials</p>
              </div>
              <div data-testid="testimonials-metric-1" className="text-center px-4 border-l border-white/10">
                <p className="stat-number text-4xl text-[#0077B3]">5.0</p>
                <p className="text-xs text-[#94a8be] mt-1">Stars on Clutch</p>
              </div>
            </div>
          </div>
        </section>

        <section data-testid="testimonials-list" className="py-20 bg-[#0a1628]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-6">
              {ALL_TESTIMONIALS.map((t) => (
                <figure key={`${t.name}-${t.company}`} data-testid="testimonial" className="bg-[#0f1d32] border border-white/10 rounded-sm p-6 flex flex-col">
                  <div className="flex items-center gap-1 mb-3" aria-label="5 out of 5 stars">
                    <Star className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                    <Star className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                    <Star className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                    <Star className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                    <Star className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                  </div>
                  <h2 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "Outfit" }}>{t.headline}</h2>
                  <blockquote className="text-sm text-[#94a8be] leading-relaxed flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-[#94a8be]">{t.title}, {t.company}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <TestimonialsCTA />
      </main>

      <TestimonialsFooter />
    </div>
  );
}
