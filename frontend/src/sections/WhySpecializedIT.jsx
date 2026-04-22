import { Wifi, Lock, Users, Zap } from "lucide-react";

const TABLET_IMG = "https://images.unsplash.com/photo-1714575600356-6635434699f8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDB8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwbWFuYWdlciUyMHRhYmxldHxlbnwwfHx8fDE3NzU3NDQxMzR8MA&ixlib=rb-4.1.0&q=85";
const BREACH_IMG = "https://images.unsplash.com/photo-1623018035782-b269248df916?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYnJlYWNoJTIwcmFuc29td2FyZSUyMHNjcmVlbiUyMHdhcm5pbmd8ZW58MHx8fHwxNzc2NDUwODkxfDA&ixlib=rb-4.1.0&q=85";

const reasons = [
  {
    icon: Wifi,
    title: "Field & Site Connectivity",
    desc: "Ruggedized networking for job sites, branch offices, and factory floors — keeping every device and team online across distributed operations.",
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
    desc: "15-minute SLA for critical issues. A downed system on production day — whether it's a pour, a trade, or a manufacturing run — costs more than anywhere else.",
  },
];

export default function WhySpecializedIT() {
  return (
    <section
      id="why-it"
      data-testid="why-specialized-section"
      aria-label="Why regulated industries need specialized IT support"
      className="py-24 lg:py-32 bg-[#0f2340]/40"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image stack */}
          <div className="animate-fade-in-up stagger-1 order-2 lg:order-1 space-y-4">
            <div className="relative overflow-hidden border border-[#0d4a8a]">
              <img
                data-testid="why-it-image"
                src={TABLET_IMG}
                alt="Professional managing operations on tablet"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/60 to-transparent" />
            </div>
            <div className="relative overflow-hidden border border-[#FF5722]/20">
              <img
                data-testid="why-it-breach-image"
                src={BREACH_IMG}
                alt="Ransomware warning message on compromised system"
                className="w-full h-32 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/80 to-transparent flex items-center px-5">
                <p className="text-[#FF5722] text-sm font-semibold">This is what a ransomware attack looks like. We stop it before it starts.</p>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2">
            <p className="overline text-[#0077B3] mb-4 animate-fade-in-up">Why Specialized IT</p>
            <h2
              data-testid="why-it-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-6 animate-fade-in-up stagger-1"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Generic tech support can&rsquo;t keep up with regulated, operational industries.
            </h2>
            <p className="text-[#b0c4d8] text-base leading-relaxed mb-4 animate-fade-in-up stagger-2">
              Your operations move fast, your teams are distributed, and your data is mission-critical. 
              You need IT partners who understand your industry&rsquo;s tools, compliance requirements, and pace — not just the server room.
            </p>
            <p className="text-[#b0c4d8]/70 text-sm leading-relaxed mb-10 animate-fade-in-up stagger-2">
              Veracity Technologies offer industry-specialized IT and cybersecurity for construction, financial services, manufacturing, and high-compliance organizations in the Minneapolis-St. Paul region and beyond.
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
                    <p className="text-[#b0c4d8] text-sm leading-relaxed">{r.desc}</p>
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
