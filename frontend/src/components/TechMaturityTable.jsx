import { Check, Minus } from "lucide-react";

const levels = [
  {
    name: "Reactive IT",
    subtitle: "Fix-it-when-broken",
    monitoring: false,
    aiGovernance: false,
    compliance: false,
    automation: false,
    desc: "IT support only when something fails. No proactive monitoring, no AI governance, and compliance gaps are discovered during audits - not before.",
  },
  {
    name: "Managed IT",
    subtitle: "Proactive but manual",
    monitoring: true,
    aiGovernance: false,
    compliance: "partial",
    automation: false,
    desc: "24/7 monitoring and help desk support, but AI usage is ungoverned and most workflows remain manual and disconnected.",
  },
  {
    name: "Secure & Compliant",
    subtitle: "Audit-ready, still manual",
    monitoring: true,
    aiGovernance: "partial",
    compliance: true,
    automation: "partial",
    desc: "Strong cybersecurity and compliance posture, with some automation, but AI adoption still lacks formal governance and policy.",
  },
  {
    name: "AI-Driven Managed Intelligence",
    subtitle: "Where Veracity clients land",
    monitoring: true,
    aiGovernance: true,
    compliance: true,
    automation: true,
    desc: "AI and automation strengthen security, compliance, and operations simultaneously - with governance, monitoring, and measurable outcomes.",
  },
];

function Cell({ value }) {
  if (value === true) return <Check className="w-4 h-4 text-[#10b981] mx-auto" />;
  if (value === "partial") return <span className="text-[#f59e0b] text-xs font-semibold">Partial</span>;
  return <Minus className="w-4 h-4 text-white/20 mx-auto" />;
}

export default function TechMaturityTable({ title = "Where Does Your Organization Stand?" }) {
  return (
    <div data-testid="tech-maturity-table" className="overflow-x-auto">
      <h3 className="text-white font-bold text-lg mb-6" style={{ fontFamily: "Outfit" }}>{title}</h3>
      <table className="w-full text-sm min-w-[600px]">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left text-[#94a8be] text-xs uppercase tracking-wider font-semibold py-3 pr-4">Maturity Level</th>
            <th className="text-center text-[#94a8be] text-xs uppercase tracking-wider font-semibold py-3 px-3">24/7 Monitoring</th>
            <th className="text-center text-[#94a8be] text-xs uppercase tracking-wider font-semibold py-3 px-3">AI Governance</th>
            <th className="text-center text-[#94a8be] text-xs uppercase tracking-wider font-semibold py-3 px-3">Compliance-Ready</th>
            <th className="text-center text-[#94a8be] text-xs uppercase tracking-wider font-semibold py-3 px-3">Automation</th>
          </tr>
        </thead>
        <tbody>
          {levels.map((lvl, i) => (
            <tr key={lvl.name} data-testid={`maturity-row-${i}`} className={`border-b border-white/5 ${i === levels.length - 1 ? "bg-[#0077B3]/5" : ""}`}>
              <td className="py-4 pr-4">
                <p className="text-white font-semibold">{lvl.name}</p>
                <p className="text-[#94a8be] text-xs mt-0.5">{lvl.subtitle}</p>
              </td>
              <td className="text-center py-4 px-3"><Cell value={lvl.monitoring} /></td>
              <td className="text-center py-4 px-3"><Cell value={lvl.aiGovernance} /></td>
              <td className="text-center py-4 px-3"><Cell value={lvl.compliance} /></td>
              <td className="text-center py-4 px-3"><Cell value={lvl.automation} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[#94a8be] text-xs mt-4">{levels[levels.length - 1].desc}</p>
    </div>
  );
}
