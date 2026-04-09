import { Heart } from "lucide-react";

export default function RiskReversal() {
  return (
    <section
      id="risk-reversal"
      data-testid="risk-reversal-section"
      aria-label="Satisfaction guarantee - $100 charity donation if audit doesn't find 3 actionable improvements"
      className="py-20 lg:py-24 bg-[#020812]"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="grid-border-card p-10 lg:p-14 relative animate-fade-in-up">
          <div className="w-14 h-14 mx-auto flex items-center justify-center bg-[#FF5722]/10 border border-[#FF5722]/30 mb-6">
            <Heart className="w-7 h-7 text-[#FF5722]" />
          </div>
          <h2
            data-testid="guarantee-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Our Guarantee
          </h2>
          <p
            data-testid="guarantee-text"
            className="text-[#A0B6CD] text-base leading-relaxed max-w-2xl mx-auto"
          >
            If you don&rsquo;t find at least <span className="text-white font-semibold">three actionable improvements</span> from 
            our audit, we&rsquo;ll donate <span className="text-[#0077B3] font-bold">$100</span> to your favorite industry charity. 
            That&rsquo;s how confident we are in the value we deliver.
          </p>
        </div>
      </div>
    </section>
  );
}
