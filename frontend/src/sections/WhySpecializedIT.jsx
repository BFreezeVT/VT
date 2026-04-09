import { Wifi, Lock, Users, Zap } from "lucide-react";

const TABLET_IMG = "https://images.unsplash.com/photo-1714575600356-6635434699f8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDB8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwbWFuYWdlciUyMHRhYmxldHxlbnwwfHx8fDE3NzU3NDQxMzR8MA&ixlib=rb-4.1.0&q=85";

const reasons = [
  {
    icon: Wifi,
    title: "Job Site Connectivity",
    desc: "Ruggedized networking that keeps every trailer, crane cam, and field tablet online across sprawling sites.",
  },
  {
    icon: Lock,
    title: "Secure Remote Access",
    desc: "VPN and zero-trust frameworks so PMs, subs, and owners collaborate without exposing blueprints or bids.",
  },
  {
    icon: Users,
    title: "Vendor Coordination",
    desc: "Managed integrations between your GC systems, sub portals, and owner dashboards with role-based controls.",
  },
  {
    icon: Zap,
    title: "Rapid Response",
    desc: "15-minute SLA for critical issues because a downed server on pour day costs more than IT downtime elsewhere.",
  },
];

export default function WhySpecializedIT() {
  return (
    <section
      id="why-it"
      data-testid="why-specialized-section"
      className="py-24 lg:py-32 bg-[#001A33]/40"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="animate-fade-in-up stagger-1 order-2 lg:order-1">
            <div className="relative overflow-hidden border border-[#003B71]">
              <img
                data-testid="why-it-image"
                src={TABLET_IMG}
                alt="Construction manager using tablet on site"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020812]/60 to-transparent" />
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
              Generic tech support can&rsquo;t keep up with construction&rsquo;s pace.
            </h2>
            <p className="text-[#A0B6CD] text-base leading-relaxed mb-10 animate-fade-in-up stagger-2">
              Your projects move fast, your teams are mobile, and your data is mission-critical. 
              You need IT that understands the job site, not just the server room.
            </p>

            <div className="space-y-6">
              {reasons.map((r, i) => (
                <div
                  key={r.title}
                  data-testid={`why-reason-${i}`}
                  className={`flex items-start gap-4 animate-fade-in-up stagger-${i + 3}`}
                >
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-[#003B71] bg-[#001A33]">
                    <r.icon className="w-5 h-5 text-[#0077B3]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>
                      {r.title}
                    </h3>
                    <p className="text-[#A0B6CD] text-sm leading-relaxed">{r.desc}</p>
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
