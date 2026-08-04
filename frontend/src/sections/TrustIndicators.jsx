import { Clock, Users, Award, UserCheck, ShieldCheck, FileCheck, Bot } from "lucide-react";
import { Link } from "react-router-dom";

const indicators = [
  { icon: Clock, value: "<5 Min", label: "Response Time" },
  { icon: Users, value: "98%", label: "Client Retention" },
  { icon: Award, value: "100+", label: "Years Combined Experience" },
  { icon: UserCheck, value: "Dedicated", label: "Account Managers" },
  { icon: ShieldCheck, value: "SOC 2", label: "Expertise", link: "/resources/what-is-soc-2-compliance" },
  { icon: FileCheck, value: "CMMC", label: "Expertise", link: "/resources/what-is-cmmc-compliance" },
  { icon: Bot, value: "AI+Automation", label: "Expertise", link: "/resources/how-ai-automation-are-transforming-small-businesses-in-minneapolis" },
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
          {indicators.map((item, i) => {
            const content = (
              <>
                <item.icon className={`w-4 h-4 text-[#0077B3] mx-auto mb-2 ${item.link ? "group-hover:text-white transition-colors" : ""}`} />
                <p className={`stat-number text-base sm:text-lg text-white ${item.link ? "group-hover:text-[#5cc0e8] transition-colors" : ""}`}>{item.value}</p>
                <p className="text-[#94a8be] text-[10px] uppercase tracking-wider mt-1 leading-tight">
                  {item.label}{item.link && <span className="text-[#0077B3]"> · Learn more</span>}
                </p>
              </>
            );
            return item.link ? (
              <Link
                key={i}
                to={item.link}
                data-testid={`trust-indicator-${i}`}
                className={`text-center animate-fade-in-up stagger-${(i % 6) + 1} group`}
              >
                {content}
              </Link>
            ) : (
              <div
                key={i}
                data-testid={`trust-indicator-${i}`}
                className={`text-center animate-fade-in-up stagger-${(i % 6) + 1}`}
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
