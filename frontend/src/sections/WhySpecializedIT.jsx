import { Wifi, Lock, Users, Zap } from "lucide-react";

const MAIN_IMG = "https://images.pexels.com/photos/6804586/pexels-photo-6804586.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const TEAM_IMG = "https://images.pexels.com/photos/5380582/pexels-photo-5380582.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const reasons = [
  {
    icon: Wifi,
    title: "Field & Site Connectivity",
    desc: "Ruggedized networking for job sites, branch offices, and factory floors - keeping every device and team online across distributed operations.",
  },
  {
    icon: Lock,
    title: "Secure Remote Access",
    desc: "Zero-trust frameworks and VPN solutions so remote teams, vendors, and clients collaborate without exposing sensitive data or financial systems.",
  },
  {
    icon: Users,
    title: "Vendor & Partner Coordination",
    desc: "Role-based integrations between your core systems, client portals, and third-party platforms with audit-ready access controls.",
  },
  {
    icon: Zap,
    title: "Rapid Response SLAs",
    desc: "15-minute SLA for critical issues. A downed system on production day - whether it&rsquo;s a pour, a trade, or a manufacturing run - costs more than anywhere else.",
  },
];

export default function WhySpecializedIT() {
  return (
    <section
      id="why-it"
      data-testid="why-specialized-section"
      aria-label="Why regulated industries need specialized IT support"
      className="py-12 lg:py-18 bg-gradient-to-b from-[#182d48] to-[#142840] dark-cards"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative flex items-center justify-center mb-8"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div><span className="relative bg-[#0f1d32] px-8 py-1 rounded-sm text-[#0077B3] text-xl font-extrabold uppercase tracking-[0.15em]">Why Specialized IT</span></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image stack */}
          <div className="animate-fade-in-up stagger-1 order-2 lg:order-1">
            <div className="relative overflow-hidden border border-white/10">
              <img
                data-testid="why-it-image"
                src={MAIN_IMG}
                alt="IT specialist handling network cables in a secure server room"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#112240]/60 to-transparent" />
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2">
            <h2
              data-testid="why-it-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 animate-fade-in-up stagger-1"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Generic tech support can&rsquo;t keep up with regulated, operational industries.
            </h2>
            <p className="text-[#c0cfe0] text-base leading-relaxed mb-4 animate-fade-in-up stagger-2">
              Your operations move fast, your teams are distributed, and your data is mission-critical. 
              You need IT partners who understand your industry&rsquo;s tools, compliance requirements, and pace - not just the server room.
            </p>
            <p className="text-[#c0cfe0]/70 text-sm leading-relaxed mb-10 animate-fade-in-up stagger-2">
              Veracity Technologies offers industry-specialized IT and cybersecurity for construction, financial services, manufacturing, and high-compliance organizations in the Minneapolis-St. Paul region and beyond.
            </p>

            <div className="space-y-6">
              {reasons.map((r, i) => (
                <div
                  key={r.title}
                  data-testid={`why-reason-${i}`}
                  className={`flex items-start gap-4 animate-fade-in-up stagger-${i + 3}`}
                >
                  <r.icon className="w-5 h-5 text-[#0077B3] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>
                      {r.title}
                    </h3>
                    <p className="text-[#c0cfe0] text-sm leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
