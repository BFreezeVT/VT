import { Monitor, ShieldCheck, Layers, Headphones } from "lucide-react";

const SOC_IMG = "https://images.unsplash.com/photo-1698047682091-782b1e5c6536?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzV8MHwxfHNlYXJjaHwzfHxoYXBweSUyMGJ1c2luZXNzJTIwcHJvZmVzc2lvbmFsJTIwaGFuZHNoYWtlJTIwc2F0aXNmaWVkJTIwY2xpZW50JTIwbWVldGluZ3xlbnwwfHx8fDE3ODA5Nzc0Nzh8MA&ixlib=rb-4.1.0&q=85";

const approaches = [
  { icon: Monitor, title: "Proactive Network Monitoring", desc: "24/7 eyes on your infrastructure. We catch and resolve issues before they impact your timeline." },
  { icon: ShieldCheck, title: "MFA & Disaster Recovery", desc: "Multi-factor authentication across all access points plus tested disaster recovery plans that restore operations in hours." },
  { icon: Layers, title: "Industry Software Integration", desc: "Seamless integration with Procore, Sage, Bloomberg, SAP, and other tools your teams rely on daily." },
  { icon: Headphones, title: "24/7 Expert Support", desc: "Our team knows the difference between a submittal, a wire transfer, and a SCADA alert. Real expertise, around the clock." },
];

export default function OurApproach() {
  return (
    <section id="approach" data-testid="approach-section" aria-label="Our managed IT approach" className="py-12 lg:py-18 bg-gradient-to-b from-[#c8d6e5] to-[#5a7a98] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="relative flex items-center justify-center mb-8"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#90a4b8]"></div></div><span className="relative bg-gradient-to-b from-[#c8d6e5] to-[#5a7a98] px-6 text-[#003B71] text-xl font-bold uppercase tracking-[0.15em]">Our Approach</span></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left - content */}
          <div>
            <h2 data-testid="approach-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0f1d32] mb-6 animate-fade-in-up stagger-1" style={{ fontFamily: "Outfit, sans-serif" }}>
              Proactive protection built for operational industries.
            </h2>
            <p className="text-[#2a4058] text-base leading-relaxed mb-8 animate-fade-in-up stagger-2">
              We don&rsquo;t wait for things to break. Our managed IT approach keeps your operation running while eliminating the vulnerabilities that attackers exploit.
            </p>

            {/* Open list - no boxes */}
            <div className="space-y-8">
              {approaches.map((a, i) => (
                <div key={a.title} data-testid={`approach-card-${i}`} className={`flex items-start gap-5 animate-fade-in-up stagger-${i + 3}`}>
                  <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center border border-[#90a4b8] bg-white mt-0.5">
                    <a.icon className="w-5 h-5 text-[#0077B3]" />
                  </div>
                  <div>
                    <h3 className="text-[#0f1d32] font-semibold text-base mb-1.5" style={{ fontFamily: "Outfit" }}>{a.title}</h3>
                    <p className="text-[#2a4058] text-sm leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - SOC image */}
          <div className="animate-fade-in-up stagger-2 lg:sticky lg:top-24">
            <div className="relative overflow-hidden border border-[#90a4b8]">
              <img data-testid="soc-image" src={SOC_IMG} alt="Satisfied business client shaking hands with Veracity Technologies IT consultant" className="w-full h-auto object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#b8c8da]/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[#0077B3] text-xs uppercase tracking-wider font-semibold mb-1">Client Success</p>
                <p className="text-[#0f1d32] text-sm">Businesses partner with Veracity for peace of mind and results they can measure.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
