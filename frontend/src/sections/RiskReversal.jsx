import { Heart, ShieldAlert } from "lucide-react";

const STRESSED_IMG = "https://images.unsplash.com/photo-1758520144705-b39e11ff32e3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwyfHxzdHJlc3NlZCUyMGJ1c2luZXNzJTIwcGVyc29uJTIwY29tcHV0ZXIlMjBwcm9ibGVtJTIwb2ZmaWNlfGVufDB8fHx8MTc3NjQ1MDkyMHww&ixlib=rb-4.1.0&q=85";

export default function RiskReversal() {
  return (
    <section
      id="risk-reversal"
      data-testid="risk-reversal-section"
      aria-label="Satisfaction guarantee - $100 charity donation if audit doesn't find 3 actionable improvements"
      className="py-20 lg:py-24 bg-[#e9eff6]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Image - emotional trigger */}
          <div className="animate-fade-in-up">
            <div className="relative overflow-hidden border border-[#FF5722]/20">
              <img
                data-testid="risk-image"
                src={STRESSED_IMG}
                alt="Business professional stressed after discovering a cybersecurity breach"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#112240] via-[#112240]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="w-4 h-4 text-[#FF5722]" />
                  <p className="text-[#FF5722] text-xs uppercase tracking-wider font-semibold">Don&rsquo;t let this be you</p>
                </div>
                <p className="text-[#1a2b42] text-sm">The average breach costs 9 months of exposure and millions in damages. Prevention costs a fraction.</p>
              </div>
            </div>
          </div>

          {/* Guarantee card */}
          <div className="animate-fade-in-up stagger-1">
            <div className="grid-border-card p-10 relative">
              <img
                src="https://customer-assets.emergentagent.com/job_jobsite-it-secure/artifacts/yo1g9lv0_2.png"
                alt="Veracity Technologies"
                className="w-10 h-10 object-contain absolute top-6 right-6 opacity-30"
              />
              <div className="w-14 h-14 flex items-center justify-center bg-[#FF5722]/10 border border-[#FF5722]/30 mb-6">
                <Heart className="w-7 h-7 text-[#FF5722]" />
              </div>
              <h2
                data-testid="guarantee-heading"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1a2b42] mb-4"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Our Guarantee
              </h2>
              <p
                data-testid="guarantee-text"
                className="text-[#4a5e78] text-base leading-relaxed"
              >
                If you don&rsquo;t find at least <span className="text-[#1a2b42] font-semibold">three actionable improvements</span> from 
                our audit, we&rsquo;ll donate <span className="text-[#0077B3] font-bold">$100</span> to your favorite industry charity. 
                That&rsquo;s how confident we are in the value we deliver.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
