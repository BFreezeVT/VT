import { Clock, Users, Award, UserCheck, ShieldCheck, FileCheck, Bot } from "lucide-react";

const indicators = [
  { icon: Clock, value: "<5 Min", label: "Response Time" },
  { icon: Users, value: "98%", label: "Client Retention" },
  { icon: Award, value: "100+", label: "Years Combined Experience" },
  { icon: UserCheck, value: "Dedicated", label: "Account Managers" },
  { icon: ShieldCheck, value: "SOC 2", label: "Expertise" },
  { icon: FileCheck, value: "CMMC", label: "Expertise" },
  { icon: Bot, value: "AI+Automation", label: "Expertise" },
];

export default function TrustIndicators() {
  return (
    <section
      id="trust-indicators"
      data-testid="trust-indicators-section"
      aria-label="Why Twin Cities businesses trust Veracity Technologies"
      className="py-8 lg:py-10 bg-[#0f1d32] border-b border-white/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6">
          {indicators.map((item, i) => (
            <div
              key={i}
              data-testid={`trust-indicator-${i}`}
              className={`text-center animate-fade-in-up stagger-${(i % 6) + 1}`}
            >
              <item.icon className="w-4 h-4 text-[#0077B3] mx-auto mb-2" />
              <p className="stat-number text-base sm:text-lg text-white">{item.value}</p>
              <p className="text-[#94a8be] text-[10px] uppercase tracking-wider mt-1 leading-tight">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
