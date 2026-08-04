import { Clock, Users, Award, UserCheck, ShieldCheck, FileCheck, Bot, HeartPulse, HardHat } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { icon: Clock, value: "<5 Min", label: "Response Time" },
  { icon: Users, value: "98%", label: "Client Retention" },
  { icon: Award, value: "100+", label: "Years Combined Experience" },
  { icon: UserCheck, value: "Dedicated", label: "Account Managers" },
];

const credentials = [
  { icon: ShieldCheck, value: "SOC 2", label: "Expertise", link: "/resources/soc-2-compliance-guide-small-business" },
  { icon: FileCheck, value: "CMMC", label: "Expertise", link: "/resources/cmmc-compliance-guide-defense-contractors" },
  { icon: Bot, value: "AI+Automation", label: "Expertise", link: "/resources/how-ai-automation-are-transforming-small-businesses-in-minneapolis" },
  { icon: HeartPulse, value: "HIPAA", label: "Expertise", link: "/resources/hipaa-compliance-small-healthcare-practices" },
  { icon: FileCheck, value: "ISO 27001", label: "Expertise", link: "/resources/what-is-iso-27001" },
  { icon: HardHat, value: "OSHA", label: "Expertise", link: "/resources/what-is-osha-digital-recordkeeping-compliance" },
];

function IndicatorItem({ item, index, testidPrefix }) {
  const content = (
    <>
      <item.icon className={`w-4 h-4 text-[#0077B3] mx-auto mb-2 ${item.link ? "group-hover:text-white transition-colors" : ""}`} />
      <p className={`stat-number text-base sm:text-lg text-white ${item.link ? "group-hover:text-[#5cc0e8] transition-colors" : ""}`}>{item.value}</p>
      <p className="text-[#94a8be] text-[10px] uppercase tracking-wider mt-1 leading-tight">
        {item.label}{item.link && <span className="text-[#0077B3]"> · Learn more</span>}
      </p>
    </>
  );
  const className = `text-center animate-fade-in-up stagger-${(index % 6) + 1}`;
  const testId = `${testidPrefix}-${index}`;
  return item.link ? (
    <Link to={item.link} data-testid={testId} className={`${className} group`}>{content}</Link>
  ) : (
    <div data-testid={testId} className={className}>{content}</div>
  );
}

export default function TrustIndicators() {
  return (
    <section
      id="trust-indicators"
      data-testid="trust-indicators-section"
      aria-label="Why Twin Cities businesses trust Veracity Technologies"
      className="py-8 lg:py-10 bg-[#0f1d32] border-b border-white/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6 pb-6 border-b border-white/[0.06]">
          {stats.map((item, i) => <IndicatorItem key={item.label} item={item} index={i} testidPrefix="trust-indicator" />)}
        </div>
        <p className="text-center text-[#94a8be]/40 text-[10px] uppercase tracking-[0.15em] mb-5">Certified &amp; Compliant</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {credentials.map((item, i) => <IndicatorItem key={item.value} item={item} index={i} testidPrefix="trust-credential" />)}
        </div>
      </div>
    </section>
  );
}
