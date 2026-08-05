import { Phone } from "lucide-react";
import { Button } from "../../components/ui/button";

export default function BTAHero() {
  return (
    <section data-testid="bta-hero" aria-label="Business Technology Assessment" className="py-24 lg:py-28">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="overline text-[#0077B3] mb-4">The Central Authority Page</p>
        <h1 data-testid="bta-headline" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white mb-6" style={{ fontFamily: "Outfit" }}>
          How Mature Is Your Organization&rsquo;s Technology, Cybersecurity, Compliance, and AI Strategy?
        </h1>
        <p data-testid="bta-subhead" className="text-base md:text-lg text-[#94a8be] leading-relaxed max-w-3xl mx-auto mb-10">
          Receive a comprehensive assessment evaluating technology maturity, cybersecurity posture, compliance readiness, AI readiness, operational efficiency, automation opportunities, and business risk.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button data-testid="bta-primary-cta" onClick={() => document.getElementById("audit")?.scrollIntoView({ behavior: "smooth" })} className="bg-[#0077B3] hover:bg-[#005f8f] text-white rounded-sm font-bold text-base px-8 h-12">
            Schedule a Business Technology Assessment
          </Button>
          <a href="tel:9529417333" data-testid="bta-secondary-cta" className="flex items-center justify-center gap-2 border border-white/25 hover:border-white/50 rounded-sm px-6 h-12 text-white text-sm font-semibold transition-all">
            <Phone className="w-4 h-4" /> Book a Strategy Session
          </a>
        </div>
      </div>
    </section>
  );
}
