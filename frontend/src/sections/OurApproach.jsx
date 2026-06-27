import { Monitor, ShieldCheck, Layers, Headphones } from "lucide-react";

const SOC_IMG = "https://images.unsplash.com/photo-1698047682091-782b1e5c6536?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzV8MHwxfHNlYXJjaHwzfHxoYXBweSUyMGJ1c2luZXNzJTIwcHJvZmVzc2lvbmFsJTIwaGFuZHNoYWtlJTIwc2F0aXNmaWVkJTIwY2xpZW50JTIwbWVldGluZ3xlbnwwfHx8fDE3ODA5Nzc0Nzh8MA&ixlib=rb-4.1.0&q=85";

const approaches = [
  { icon: Monitor, title: "Continuous Visibility", desc: "24/7 AI-powered monitoring across your entire environment. We see problems forming and resolve them before they impact your operations." },
  { icon: ShieldCheck, title: "Automated Risk Reduction", desc: "Multi-factor authentication, intelligent access controls, and tested disaster recovery - automated, not manual." },
  { icon: Layers, title: "System Integration", desc: "We connect your tools - Procore, Sage, Bloomberg, SAP, and more - into a unified, intelligent ecosystem that shares data and reduces friction." },
  { icon: Headphones, title: "On-Demand Expert Support", desc: "When automation handles 90% of the work, your team only needs us for the 10% that matters. And we&rsquo;re there in minutes." },
];

export default function OurApproach() {
  return (
    <section id="approach" data-testid="approach-section" aria-label="How Veracity delivers operational intelligence" className="py-12 lg:py-18 bg-transparent relative overflow-hidden">
      <img src="https://customer-assets.emergentagent.com/job_jobsite-it-secure/artifacts/yo1g9lv0_2.png" alt="" aria-hidden="true" className="absolute -right-24 -bottom-20 w-[550px] h-[550px] object-contain opacity-[0.035] brightness-200 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="relative flex items-center justify-center mb-8"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/15"></div></div><span className="relative bg-[#0f1d32]/80 backdrop-blur-sm px-8 py-1.5 rounded text-[#5cc0e8] text-xl font-extrabold uppercase tracking-[0.15em]">How We Deliver</span></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left - content */}
          <div>
            <h2 data-testid="approach-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 animate-fade-in-up stagger-1" style={{ fontFamily: "Outfit, sans-serif" }}>
              Proactive systems that run your business forward.
            </h2>
            <p className="text-[#dce6f0] text-base leading-relaxed mb-8 animate-fade-in-up stagger-2">
              We don&rsquo;t wait for things to break. We build intelligent infrastructure that monitors, adapts, and resolves - so your team focuses on growth, not firefighting.
            </p>

            {/* Open list - no boxes */}
            <div className="space-y-8">
              {approaches.map((a, i) => (
                <div key={a.title} data-testid={`approach-card-${i}`} className={`flex items-start gap-5 animate-fade-in-up stagger-${i + 3}`}>
                  <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center border border-[#90a4b8] bg-white mt-0.5">
                    <a.icon className="w-5 h-5 text-[#0077B3]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base mb-1.5" style={{ fontFamily: "Outfit" }}>{a.title}</h3>
                    <p className="text-[#dce6f0] text-sm leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - SOC image */}
          <div className="animate-fade-in-up stagger-2 lg:sticky lg:top-24">
            <div className="relative overflow-hidden border border-[#90a4b8]">
              <img data-testid="soc-image" src={SOC_IMG} alt="Satisfied business client shaking hands with Veracity Technologies IT consultant" className="w-full h-auto object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4a6a88]/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[#0077B3] text-xs uppercase tracking-wider font-semibold mb-1">Client Success</p>
                <p className="text-white text-sm">Businesses that partner with Veracity run smarter, react faster, and scale with confidence.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
