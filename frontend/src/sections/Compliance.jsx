import { Shield, FileCheck, HardHat, CreditCard, Server, ExternalLink } from "lucide-react";

const TECH_BG = "https://static.prod-images.emergentagent.com/jobs/a4251189-ed5f-43ed-b8ac-224a99473a6d/images/135a01eaf279db78834b25ee533b6a592fa900f14e025322226c4102d084a5db.png";
const LOGO_FULL = "https://customer-assets.emergentagent.com/job_jobsite-it-secure/artifacts/3n092vnp_1.png";

const complianceItems = [
  { icon: Shield, title: "CMMC Compliance", desc: "Cybersecurity Maturity Model Certification for DoD-connected contracts." },
  { icon: FileCheck, title: "ISO 27001", desc: "International information security management standards." },
  { icon: HardHat, title: "OSHA Requirements", desc: "Digital record-keeping and safety system compliance." },
  { icon: CreditCard, title: "Payment Fraud Prevention", desc: "Email authentication and financial controls against wire fraud." },
  { icon: Server, title: "BMS/IACS Security", desc: "Building management and industrial control system protection." },
];

export default function Compliance() {
  return (
    <section id="compliance" data-testid="compliance-section" aria-label="Compliance and risk management" className="py-12 lg:py-18 bg-transparent dark-cards relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06] bg-cover bg-center" style={{ backgroundImage: `url(${TECH_BG})` }} />
      <div className="absolute inset-0 bg-transparent/60" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-10 text-center">
            <div className="relative flex items-center justify-center mb-10"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div><span className="relative bg-[#0f1d32]/80 backdrop-blur-sm px-8 py-1.5 rounded text-[#5cc0e8] text-xl font-extrabold uppercase tracking-[0.15em]">Compliance & Governance</span></div>
            <h2 data-testid="compliance-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 animate-fade-in-up stagger-1" style={{ fontFamily: "Outfit" }}>
              Audit-ready. Always.
            </h2>
            <p className="text-[#c0cfe0] text-base max-w-2xl mx-auto animate-fade-in-up stagger-2">
              Compliance shouldn&rsquo;t be a scramble before an audit. We build it into your systems so you&rsquo;re continuously compliant - not periodically panicked.
            </p>
        </div>

        {/* 3 on top, 2 on bottom - centered */}
        <div className="border-t border-white/10 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {complianceItems.slice(0, 3).map((item, i) => (
              <div key={item.title} data-testid={`compliance-card-${i}`} className={`text-center animate-fade-in-up stagger-${i + 3}`}>
                <item.icon className="w-6 h-6 text-[#0077B3] mx-auto mb-3" />
                <h3 className="text-white font-semibold text-sm mb-1" style={{ fontFamily: "Outfit" }}>{item.title}</h3>
                <p className="text-[#c0cfe0] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {complianceItems.slice(3).map((item, i) => (
              <div key={item.title} data-testid={`compliance-card-${i + 3}`} className={`text-center animate-fade-in-up stagger-${i + 6}`}>
                <item.icon className="w-6 h-6 text-[#0077B3] mx-auto mb-3" />
                <h3 className="text-white font-semibold text-sm mb-1" style={{ fontFamily: "Outfit" }}>{item.title}</h3>
                <p className="text-[#c0cfe0] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
