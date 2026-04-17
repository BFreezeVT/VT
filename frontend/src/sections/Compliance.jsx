import { Shield, FileCheck, HardHat, CreditCard, Server } from "lucide-react";

const TECH_BG = "https://static.prod-images.emergentagent.com/jobs/a4251189-ed5f-43ed-b8ac-224a99473a6d/images/135a01eaf279db78834b25ee533b6a592fa900f14e025322226c4102d084a5db.png";
const LOCK_IMG = "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbG9jayUyMGN5YmVyc2VjdXJpdHklMjBwcm90ZWN0aW9uJTIwc2hpZWxkfGVufDB8fHx8MTc3NjQ1MDkxM3ww&ixlib=rb-4.1.0&q=85";

const complianceItems = [
  {
    icon: Shield,
    title: "CMMC Compliance",
    desc: "Meet Cybersecurity Maturity Model Certification requirements for DoD-connected construction contracts.",
  },
  {
    icon: FileCheck,
    title: "ISO 27001",
    desc: "Information security management aligned with international standards to protect project data and IP.",
  },
  {
    icon: HardHat,
    title: "OSHA Requirements",
    desc: "Digital record-keeping and safety system compliance that keeps your firm audit-ready.",
  },
  {
    icon: CreditCard,
    title: "Payment Fraud Prevention",
    desc: "Email authentication protocols and financial controls to stop wire fraud and invoice manipulation.",
  },
  {
    icon: Server,
    title: "BMS/IACS Security",
    desc: "Protect building management and industrial control systems from increasingly sophisticated attacks.",
  },
];

export default function Compliance() {
  return (
    <section
      id="compliance"
      data-testid="compliance-section"
      aria-label="Compliance and risk management for CMMC, ISO 27001, OSHA, PCI-DSS, and more"
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.06] bg-cover bg-center"
        style={{ backgroundImage: `url(${TECH_BG})` }}
      />
      <div className="absolute inset-0 bg-[#001A33]/60" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center mb-16">
          <div className="lg:col-span-2">
            <p className="overline text-[#0077B3] mb-4 animate-fade-in-up">Compliance &amp; Risk</p>
            <h2
              data-testid="compliance-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 animate-fade-in-up stagger-1"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Stay compliant. Stay protected.
            </h2>
            <p className="text-[#A0B6CD] text-base max-w-2xl animate-fade-in-up stagger-2">
              From federal contracts to payment processing, we help you meet every requirement and stay ahead of emerging threats.
            </p>
          </div>
          <div className="animate-fade-in-up stagger-2">
            <div className="relative overflow-hidden border border-[#003B71]">
              <img
                data-testid="compliance-image"
                src={LOCK_IMG}
                alt="Physical security padlock representing cybersecurity protection and compliance"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020812]/60 to-transparent" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {complianceItems.map((item, i) => (
            <div
              key={item.title}
              data-testid={`compliance-card-${i}`}
              className={`grid-border-card p-6 group animate-fade-in-up stagger-${i + 3}`}
            >
              <div className="w-10 h-10 flex items-center justify-center border border-[#003B71] bg-[#020812] mb-4 group-hover:border-[#0077B3] transition-colors">
                <item.icon className="w-5 h-5 text-[#0077B3]" />
              </div>
              <h3
                className="text-white font-semibold text-sm mb-2"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {item.title}
              </h3>
              <p className="text-[#A0B6CD] text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
