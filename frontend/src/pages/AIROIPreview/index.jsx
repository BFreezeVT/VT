import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, ChevronLeft, ArrowRight, CheckCircle2, Calculator } from "lucide-react";
import { Button } from "../../components/ui/button";
import ROICalculator from "./ROICalculator";
import ROIContent from "./ROIContent";

export default function AIROIPreview() {
  const [teamSize, setTeamSize] = useState(20);
  const [manualHours, setManualHours] = useState(8);

  useEffect(() => {
    document.title = "AI ROI Calculator for Businesses | Veracity AI";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Calculate how much time and money your business could save with managed AI and IT automation. Try the free AI ROI calculator, then get your personalized ROI and readiness report from Veracity Technologies.");
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://www.veracitytechmn.com/ai-roi-preview");
    return () => { document.title = "Veracity Technologies | AI-Powered Cybersecurity & Managed IT"; };
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1d32]" data-testid="ai-roi-preview-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "AI ROI Calculator",
        description: "Free interactive calculator estimating potential time and cost savings from managed AI and IT automation for small and mid-sized businesses.",
        url: "https://www.veracitytechmn.com/ai-roi-preview",
        applicationCategory: "BusinessApplication",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        provider: { "@type": "Organization", name: "Veracity Technologies", telephone: "+1-952-941-7333" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.veracitytechmn.com/" },
          { "@type": "ListItem", position: 2, name: "AI ROI Calculator", item: "https://www.veracitytechmn.com/ai-roi-preview" },
        ],
      }) }} />

      {/* Nav */}
      <nav className="bg-[#003B71]/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "Outfit" }}>
            VERACITY<span className="text-[#0077B3]"> TECHNOLOGIES</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" data-testid="roi-nav-home" className="text-[#94a8be] hover:text-white text-sm flex items-center gap-1">
              <ChevronLeft className="w-3 h-3" /> Home
            </Link>
            <a href="tel:9529417333" className="flex items-center gap-2 text-[#94a8be] hover:text-white text-sm">
              <Phone className="w-4 h-4" /> (952) 941-7333
            </a>
            <Link to="/business-technology-assessment" data-testid="roi-nav-cta">
              <Button className="bg-white text-[#1e6bb8] hover:bg-white/90 rounded-sm font-semibold text-sm px-5">
                Start Assessment
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main role="main">
        {/* Hero */}
        <section data-testid="roi-hero" aria-label="AI ROI Calculator" className="py-20 lg:py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calculator className="w-5 h-5 text-[#0077B3]" />
              <p className="overline text-[#0077B3]">Free Tool</p>
            </div>
            <h1 data-testid="roi-headline" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white mb-6" style={{ fontFamily: "Outfit" }}>
              What Could Managed AI and IT Automation Save Your Business?
            </h1>
            <p data-testid="roi-subhead" className="text-base md:text-lg text-[#94a8be] leading-relaxed max-w-2xl mx-auto">
              Slide to your team size and manual workload below to see a sample estimate of the hours and dollars managed AI and IT automation could reclaim every year.
            </p>
          </div>
        </section>

        <ROICalculator teamSize={teamSize} setTeamSize={setTeamSize} manualHours={manualHours} setManualHours={setManualHours} />

        <ROIContent />

        {/* Bottom CTA */}
        <section data-testid="roi-bottom-cta" className="py-20 bg-[#0f1d32] border-t border-white/10">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <CheckCircle2 className="w-10 h-10 text-[#0077B3] mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={{ fontFamily: "Outfit" }}>
              Ready for a number built on your actual numbers?
            </h2>
            <p className="text-[#94a8be] text-base mb-8 max-w-xl mx-auto">
              The Business Technology Assessment scores your organization&rsquo;s AI readiness, automation maturity, cybersecurity, and compliance - and turns this sample estimate into a personalized ROI and readiness report.
            </p>
            <Link to="/business-technology-assessment" data-testid="roi-bottom-cta-btn" onClick={() => { if (window.gtag) window.gtag("event", "roi_calculator_cta_click", { event_category: "ai_roi_calculator", cta_position: "bottom_page", team_size: teamSize, manual_hours: manualHours }); }}>
              <Button className="bg-[#0077B3] hover:bg-[#005f8f] text-white rounded-sm font-bold text-base px-8 h-12">
                Get Your Personalized ROI & Readiness Report <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <p className="text-[#94a8be]/60 text-xs mt-3">Or call (952) 941-7333</p>
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
