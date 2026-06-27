import { Wifi, Lock, Users, Zap } from "lucide-react";

const MAIN_IMG = "https://images.pexels.com/photos/6804586/pexels-photo-6804586.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const TEAM_IMG = "https://images.pexels.com/photos/5380582/pexels-photo-5380582.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const reasons = [
  {
    icon: Wifi,
    title: "Anywhere Connectivity",
    desc: "Reliable, secure networking for every location - job sites, branch offices, factory floors, and remote teams. No dead zones, no excuses.",
  },
  {
    icon: Lock,
    title: "Zero-Trust Access",
    desc: "Every user, device, and connection is verified continuously. Your data stays protected whether your team is in the office or on the road.",
  },
  {
    icon: Users,
    title: "Unified Vendor Ecosystem",
    desc: "We integrate your tools, vendors, and partners into one governed platform - with role-based access controls and full audit visibility.",
  },
  {
    icon: Zap,
    title: "Response in Minutes, Not Days",
    desc: "15-minute SLA for critical issues. When automation handles the routine, our experts are free to solve the problems that actually matter.",
  },
];

export default function WhySpecializedIT() {
  return (
    <section
      id="why-it"
      data-testid="why-specialized-section"
      aria-label="Why businesses choose Veracity for operational intelligence"
      className="py-12 lg:py-18 bg-transparent dark-cards relative overflow-hidden"
    >
      <img src="https://customer-assets.emergentagent.com/job_jobsite-it-secure/artifacts/yo1g9lv0_2.png" alt="" aria-hidden="true" className="absolute -right-16 -top-16 w-[500px] h-[500px] object-contain opacity-[0.035] brightness-200 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative flex items-center justify-center mb-8"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div><span className="relative bg-[#0f1d32]/80 backdrop-blur-sm px-8 py-1.5 rounded text-[#5cc0e8] text-xl font-extrabold uppercase tracking-[0.15em]">Why Veracity</span></div>
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
              Generic providers manage tickets. We manage outcomes.
            </h2>
            <p className="text-[#c0cfe0] text-base leading-relaxed mb-4 animate-fade-in-up stagger-2">
              Your operations move fast, your teams are distributed, and your data is mission-critical. You need a partner who understands your business - not just your server room.
            </p>
            <p className="text-[#c0cfe0]/70 text-sm leading-relaxed mb-10 animate-fade-in-up stagger-2">
              Veracity Technologies offers industry-specialized AI, automation, and intelligent systems for construction, financial services, manufacturing, and high-compliance organizations in the Minneapolis-St. Paul region and beyond.
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
