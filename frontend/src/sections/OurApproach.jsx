import { Monitor, ShieldCheck, Layers, Headphones } from "lucide-react";

const SOC_IMG = "https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMG1vbml0b3JpbmclMjBkYXNoYm9hcmQlMjBzY3JlZW5zJTIwZGFyayUyMHJvb218ZW58MHx8fHwxNzc2NDUwOTA0fDA&ixlib=rb-4.1.0&q=85";

const approaches = [
  { icon: Monitor, title: "Proactive Network Monitoring", desc: "24/7 eyes on your infrastructure. We catch and resolve issues before they impact your timeline." },
  { icon: ShieldCheck, title: "MFA & Disaster Recovery", desc: "Multi-factor authentication across all access points plus tested disaster recovery plans that restore operations in hours." },
  { icon: Layers, title: "Industry Software Integration", desc: "Seamless integration with Procore, Sage, Bloomberg, SAP, and other tools your teams rely on daily." },
  { icon: Headphones, title: "24/7 Expert Support", desc: "Our team knows the difference between a submittal, a wire transfer, and a SCADA alert. Real expertise, around the clock." },
];

export default function OurApproach() {
  return (
    <section id="approach" data-testid="approach-section" aria-label="Our managed IT approach" className="py-24 lg:py-32 bg-[#1a3352] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — content */}
          <div>
            <p className="overline text-[#0077B3] mb-4 animate-fade-in-up">Our Approach</p>
            <h2 data-testid="approach-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-6 animate-fade-in-up stagger-1" style={{ fontFamily: "Outfit, sans-serif" }}>
              Proactive protection built for operational industries.
            </h2>
            <p className="text-[#a0b4c8] text-base leading-relaxed mb-12 animate-fade-in-up stagger-2">
              We don&rsquo;t wait for things to break. Our managed IT approach keeps your operation running while eliminating the vulnerabilities that attackers exploit.
            </p>

            {/* Open list — no boxes */}
            <div className="space-y-8">
              {approaches.map((a, i) => (
                <div key={a.title} data-testid={`approach-card-${i}`} className={`flex items-start gap-5 animate-fade-in-up stagger-${i + 3}`}>
                  <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center border border-[#2a4a68] bg-white mt-0.5">
                    <a.icon className="w-5 h-5 text-[#0077B3]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base mb-1.5" style={{ fontFamily: "Outfit" }}>{a.title}</h3>
                    <p className="text-[#a0b4c8] text-sm leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — SOC image */}
          <div className="animate-fade-in-up stagger-2 lg:sticky lg:top-24">
            <div className="relative overflow-hidden border border-[#2a4a68]">
              <img data-testid="soc-image" src={SOC_IMG} alt="Security Operations Center analyst monitoring threat dashboards 24/7" className="w-full h-auto object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#112240]/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[#0077B3] text-xs uppercase tracking-wider font-semibold mb-1">24/7 Monitoring</p>
                <p className="text-white text-sm">Our SOC team watches your infrastructure around the clock.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
