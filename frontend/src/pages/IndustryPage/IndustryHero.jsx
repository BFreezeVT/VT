import Breadcrumbs from "../../components/Breadcrumbs";
import { Button } from "../../components/ui/button";

export default function IndustryHero({ industry, Icon }) {
  return (
    <section data-testid="industry-hero" aria-label={`${industry.name} IT and cybersecurity services`} className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumbs items={[{ label: "Industries", to: "/#industries" }, { label: industry.name }]} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Icon className="w-5 h-5 text-[#0077B3]" />
              <p className="overline text-[#0077B3]">{industry.name} IT &amp; Cybersecurity</p>
            </div>
            <h1
              data-testid="industry-headline"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white mb-6"
              style={{ fontFamily: "Outfit" }}
            >
              {industry.headline}
            </h1>
            <p data-testid="industry-subhead" className="text-base md:text-lg text-[#94a8be] leading-relaxed mb-8 max-w-2xl">
              {industry.subhead}
            </p>
            <Button
              data-testid="industry-hero-cta"
              onClick={() => document.getElementById("industry-form")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-white text-[#1e6bb8] hover:bg-white/90 rounded-sm font-bold text-base px-8 h-12"
            >
              {industry.ctaText}
            </Button>
          </div>
          <div className="grid-border-card p-8 text-center">
            <p className="stat-number text-5xl sm:text-6xl text-white mb-2">{industry.heroStat.value}</p>
            <p className="text-sm text-[#94a8be]">{industry.heroStat.label}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
