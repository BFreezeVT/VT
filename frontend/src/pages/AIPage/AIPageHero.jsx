import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function AIPageHero({ page }) {
  return (
    <section data-testid="ai-page-hero" aria-label={page.headline} className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumbs items={[{ label: "Business Technology Assessment", to: "/business-technology-assessment" }, { label: page.name }]} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-[#0077B3]" />
              <p className="overline text-[#0077B3]">{page.name}</p>
            </div>
            <h1 data-testid="ai-page-headline" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white mb-6" style={{ fontFamily: "Outfit" }}>
              {page.headline}
            </h1>
            <p data-testid="ai-page-subhead" className="text-base md:text-lg text-[#94a8be] leading-relaxed mb-8 max-w-2xl">
              {page.subhead}
            </p>
            <Link to="/business-technology-assessment" data-testid="ai-page-hero-cta">
              <Button className="bg-white text-[#1e6bb8] hover:bg-white/90 rounded-sm font-bold text-base px-8 h-12">
                {page.ctaText} <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid-border-card overflow-hidden">
            <img
              src={page.heroImage}
              alt={`${page.name} illustration`}
              data-testid="ai-page-hero-image"
              className="w-full h-48 sm:h-56 object-cover"
              loading="lazy"
            />
            <div className="p-8 text-center border-t border-white/10">
              <p className="stat-number text-4xl sm:text-5xl text-white mb-2">{page.heroStat.value}</p>
              <p className="text-sm text-[#94a8be]">{page.heroStat.label}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
