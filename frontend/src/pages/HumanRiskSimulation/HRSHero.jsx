import { ArrowRight, ShieldAlert } from "lucide-react";
import { Button } from "../../components/ui/button";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function HRSHero({ data }) {
  return (
    <section data-testid="hrs-hero" aria-label={data.headline} className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumbs items={[{ label: "Human Risk Simulation" }]} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <ShieldAlert className="w-5 h-5 text-[#0077B3]" />
              <p className="overline text-[#0077B3]">{data.name}</p>
            </div>
            <h1 data-testid="hrs-headline" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white mb-6" style={{ fontFamily: "Outfit" }}>
              {data.headline}
            </h1>
            <p data-testid="hrs-subhead" className="text-base md:text-lg text-[#94a8be] leading-relaxed mb-8 max-w-2xl">
              {data.subhead}
            </p>
            <button data-testid="hrs-hero-cta" onClick={() => document.getElementById("hrs-simulation")?.scrollIntoView({ behavior: "smooth" })}>
              <Button className="bg-white text-[#1e6bb8] hover:bg-white/90 rounded-sm font-bold text-base px-8 h-12">
                {data.ctaText} <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </button>
          </div>
          <div className="grid-border-card p-8 text-center">
            <p className="stat-number text-4xl sm:text-5xl text-white mb-2">{data.heroStat.value}</p>
            <p className="text-sm text-[#94a8be]">{data.heroStat.label}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
