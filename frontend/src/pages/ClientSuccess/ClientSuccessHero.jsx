import { ChevronLeft, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function ClientSuccessHero() {
  return (
    <section data-testid="client-success-hero" className="py-24 lg:py-28">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <Link to="/" className="inline-flex items-center gap-1 text-[#0077B3] text-sm mb-6 hover:text-white transition-colors">
          <ChevronLeft className="w-3 h-3" /> Back to Home
        </Link>
        <p className="overline text-[#0077B3] mb-4">Client Success</p>
        <h1 data-testid="client-success-headline" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white mb-6" style={{ fontFamily: "Outfit" }}>
          Real Results, Real Minnesota Businesses
        </h1>
        <p className="text-base md:text-lg text-[#94a8be] leading-relaxed mb-10 max-w-2xl mx-auto">
          Financial services firms, manufacturers, construction companies, and organizations across the Twin Cities trust Veracity to keep their technology secure, compliant, and running - here's what they say about the partnership.
        </p>

        <div className="flex items-center justify-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-[#f59e0b] text-[#f59e0b]" />
          ))}
          <span className="text-[#f59e0b] text-sm font-semibold ml-2">4.9/5</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border-t border-white/10 pt-8 max-w-2xl mx-auto">
          <div data-testid="client-success-metric-0" className="text-center px-4">
            <p className="stat-number text-4xl text-white">60+</p>
            <p className="text-xs text-[#94a8be] mt-1">Active Clients</p>
          </div>
          <div data-testid="client-success-metric-1" className="text-center px-4 border-l border-white/10">
            <p className="stat-number text-4xl text-white">32</p>
            <p className="text-xs text-[#94a8be] mt-1">Years Longest Partnership</p>
          </div>
          <div data-testid="client-success-metric-2" className="text-center px-4 border-l border-white/10">
            <p className="stat-number text-4xl text-[#0077B3]">24/7</p>
            <p className="text-xs text-[#94a8be] mt-1">Support Availability</p>
          </div>
          <div data-testid="client-success-metric-3" className="text-center px-4 border-l border-white/10">
            <p className="stat-number text-4xl text-white">4.9</p>
            <p className="text-xs text-[#94a8be] mt-1">Average Client Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
