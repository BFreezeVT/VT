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
    <section id="compliance" data-testid="compliance-section" aria-label="Compliance and risk management" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06] bg-cover bg-center" style={{ backgroundImage: `url(${TECH_BG})` }} />
      <div className="absolute inset-0 bg-[#0f2340]/60" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start mb-16">
          <div className="lg:col-span-2">
            <p className="overline text-[#0077B3] mb-4 animate-fade-in-up">Compliance &amp; Risk</p>
            <h2 data-testid="compliance-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 animate-fade-in-up stagger-1" style={{ fontFamily: "Outfit" }}>
              Stay compliant. Stay protected.
            </h2>
            <p className="text-[#b0c4d8] text-base max-w-2xl animate-fade-in-up stagger-2">
              From federal contracts to payment processing, we help you meet every requirement and stay ahead of emerging threats.
            </p>
          </div>
          <div className="animate-fade-in-up stagger-2 flex items-center justify-start lg:justify-start">
            <img data-testid="compliance-logo" src={LOGO_FULL} alt="Veracity Technologies - Rely On Us" className="w-full max-w-[320px] h-auto brightness-125" loading="lazy" />
          </div>
        </div>

        {/* Open list layout — no card boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8 border-t border-[#0d4a8a]/40 pt-12">
          {complianceItems.map((item, i) => (
            <div key={item.title} data-testid={`compliance-card-${i}`} className={`flex items-start gap-4 animate-fade-in-up stagger-${i + 3}`}>
              <item.icon className="w-5 h-5 text-[#0077B3] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-semibold text-sm mb-1" style={{ fontFamily: "Outfit" }}>{item.title}</h3>
                <p className="text-[#b0c4d8] text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
