import { Monitor, ShieldCheck, Layers, Headphones } from "lucide-react";

const SERVER_IMG = "https://images.unsplash.com/photo-1680992044138-ce4864c2b962?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjd8MHwxfHNlYXJjaHwzfHxzZXJ2ZXIlMjByb29tJTIwc2VjdXJlJTIwdGVjaHxlbnwwfHx8fDE3NzU3NDQxMzR8MA&ixlib=rb-4.1.0&q=85";
const SOC_IMG = "https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMG1vbml0b3JpbmclMjBkYXNoYm9hcmQlMjBzY3JlZW5zJTIwZGFyayUyMHJvb218ZW58MHx8fHwxNzc2NDUwOTA0fDA&ixlib=rb-4.1.0&q=85";

const approaches = [
  {
    icon: Monitor,
    title: "Proactive Network Monitoring",
    desc: "24/7 eyes on your infrastructure. We catch and resolve issues before they impact your project timeline.",
  },
  {
    icon: ShieldCheck,
    title: "MFA & Disaster Recovery",
    desc: "Multi-factor authentication across all access points plus tested disaster recovery plans that restore operations in hours, not days.",
  },
  {
    icon: Layers,
    title: "Industry Software Integration",
    desc: "Seamless integration with Procore, Sage, Bloomberg, SAP, and other industry-specific tools your teams rely on daily.",
  },
  {
    icon: Headphones,
    title: "24/7 Expert Support",
    desc: "Our team knows the difference between a submittal, a wire transfer, and a SCADA alert. Real industry IT expertise, around the clock.",
  },
];

export default function OurApproach() {
  return (
    <section
      id="approach"
      data-testid="approach-section"
      aria-label="Our managed IT approach including proactive monitoring, MFA, disaster recovery, and 24/7 support"
      className="py-24 lg:py-32 bg-[#020812] relative overflow-hidden"
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.04] bg-cover bg-center"
        style={{ backgroundImage: `url(${SERVER_IMG})` }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="overline text-[#0077B3] mb-4 animate-fade-in-up">Our Approach</p>
            <h2
              data-testid="approach-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 animate-fade-in-up stagger-1"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Proactive protection built for operational industries.
            </h2>
            <p className="text-[#A0B6CD] text-base max-w-2xl animate-fade-in-up stagger-2">
              We don&rsquo;t wait for things to break. Our managed IT approach keeps your operation running while eliminating the vulnerabilities that attackers exploit — whether you&rsquo;re on a job site, a trading floor, or a production line.
            </p>
          </div>
          <div className="animate-fade-in-up stagger-2">
            <div className="relative overflow-hidden border border-[#003B71]">
              <img
                data-testid="soc-image"
                src={SOC_IMG}
                alt="Security Operations Center analyst monitoring threat dashboards 24/7"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020812]/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[#0077B3] text-xs uppercase tracking-wider font-semibold mb-1">24/7 Monitoring</p>
                <p className="text-white text-sm">Our SOC team watches your infrastructure around the clock.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {approaches.map((a, i) => (
            <div
              key={a.title}
              data-testid={`approach-card-${i}`}
              className={`grid-border-card p-8 group animate-fade-in-up stagger-${i + 3}`}
            >
              <div className="w-12 h-12 flex items-center justify-center border border-[#003B71] bg-[#020812] mb-6 group-hover:border-[#0077B3] transition-colors">
                <a.icon className="w-6 h-6 text-[#0077B3]" />
              </div>
              <h3
                className="text-white font-semibold text-lg mb-3"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {a.title}
              </h3>
              <p className="text-[#A0B6CD] text-sm leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
