import { Link } from "react-router-dom";
import { ChevronLeft, ArrowRight, Monitor, Shield, RefreshCw, Lightbulb, FileCheck } from "lucide-react";
import { Button } from "../../components/ui/button";

const iconMap = { Monitor, Shield, RefreshCw, Lightbulb, FileCheck };

export default function ServiceHero({ svc }) {
  const Icon = iconMap[svc.icon] || Shield;
  return (
    <section data-testid="service-page-hero" aria-label={svc.headline} className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-1 text-[#0077B3] text-sm mb-6 hover:text-white transition-colors">
          <ChevronLeft className="w-3 h-3" /> Back to Home
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Icon className="w-5 h-5 text-[#0077B3]" />
              <p className="overline text-[#0077B3]">{svc.name}</p>
            </div>
            <h1 data-testid="service-page-headline" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white mb-6" style={{ fontFamily: "Outfit" }}>
              {svc.headline}
            </h1>
            <p data-testid="service-page-subhead" className="text-base md:text-lg text-[#94a8be] leading-relaxed mb-8 max-w-2xl">
              {svc.subhead}
            </p>
            <Link to="/business-technology-assessment" data-testid="service-page-hero-cta">
              <Button className="bg-white text-[#1e6bb8] hover:bg-white/90 rounded-sm font-bold text-base px-8 h-12">
                {svc.ctaText} <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid-border-card p-8 text-center">
            <p className="stat-number text-4xl sm:text-5xl text-white mb-2">{svc.heroStat.value}</p>
            <p className="text-sm text-[#94a8be]">{svc.heroStat.label}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
