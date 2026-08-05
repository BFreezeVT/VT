import { Monitor, Shield, RefreshCw, Lightbulb, FileCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";


const services = [
  {
    icon: Monitor,
    title: "Managed IT Services",
    outcome: "Improved productivity, system visibility, and operational efficiency.",
    features: ["24/7 monitoring and help desk", "Dedicated account manager", "Proactive issue prevention", "Under 5-minute response time", "AI-enhanced automation"],
    link: "/services/managed-it-services",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    outcome: "Risk reduction, operational resilience, and threat prevention.",
    features: ["Endpoint detection and response", "Email security and phishing prevention", "Zero-trust access architecture", "AI-powered threat detection", "Security awareness training"],
    link: "/services/cybersecurity-services",
  },
  {
    icon: RefreshCw,
    title: "Disaster Recovery",
    outcome: "Business continuity, tested backups, and rapid recovery.",
    features: ["Automated backup verification", "Tested recovery procedures", "Cloud and hybrid recovery", "Ransomware recovery planning", "Recovery time under 4 hours"],
    link: "/services/disaster-recovery-business-continuity",
  },
  {
    icon: Lightbulb,
    title: "IT Consulting & vCIO",
    outcome: "Strategic technology planning aligned to business goals.",
    features: ["Quarterly business reviews", "Technology roadmapping", "Budget planning and optimization", "Vendor management", "AI readiness assessments"],
    link: "/services/it-consulting-vcio",
  },
  {
    icon: FileCheck,
    title: "Compliance Services",
    outcome: "Reducing exposure while supporting growth.",
    features: ["SOC 2 Type I & II", "CMMC / NIST 800-171", "HIPAA / PCI-DSS", "Audit preparation and evidence", "Continuous compliance monitoring"],
    link: "/services/compliance-services",
  },
];

export default function CoreServices() {
  return (
    <section
      id="core-services"
      data-testid="core-services-section"
      aria-label="Managed IT services, cybersecurity, disaster recovery, IT consulting, and compliance services in Minneapolis"
      className="py-14 lg:py-20 bg-transparent relative overflow-hidden"
    >
      <img src="https://customer-assets.emergentagent.com/job_jobsite-it-secure/artifacts/yo1g9lv0_2.png" alt="" aria-hidden="true" className="absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] object-contain opacity-[0.03] brightness-200 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="relative flex items-center justify-center mb-10">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
          <span className="relative bg-[#0f1d32]/80 backdrop-blur-sm px-8 py-1.5 rounded text-[#5cc0e8] text-xl font-extrabold uppercase tracking-[0.15em]">Our Services</span>
        </div>

        <div className="text-center mb-12">
          <h2
            data-testid="services-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4"
            style={{ fontFamily: "Outfit" }}
          >
            Managed IT &amp; Cybersecurity Services
          </h2>
          <p className="text-[#94a8be] text-base max-w-2xl mx-auto">
            The core services your business depends on - delivered with AI-enhanced automation, proactive monitoring, and dedicated expertise.
          </p>
        </div>

        {/* Services grid - 3 top, 2 bottom centered */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {services.slice(0, 3).map((svc, i) => (
            <Link
              key={svc.title}
              to={svc.link}
              data-testid={`core-service-${i}`}
              className="group p-6 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:border-[#0077B3]/40 hover:bg-[#0077B3]/[0.03] transition-all duration-300 hover:-translate-y-1 block"
            >
              <svc.icon className="w-8 h-8 text-[#0077B3] mb-4" />
              <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: "Outfit" }}>{svc.title}</h3>
              <p className="text-[#0077B3] text-sm font-medium mb-4">{svc.outcome}</p>
              <ul className="space-y-2 mb-4">
                {svc.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[#94a8be] text-xs">
                    <span className="text-[#0077B3] mt-0.5 flex-shrink-0">&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
              <span className="text-[#0077B3] text-xs font-semibold inline-flex items-center gap-1 group-hover:text-white transition-colors">
                Learn more <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-10">
          {services.slice(3).map((svc, i) => (
            <Link
              key={svc.title}
              to={svc.link}
              data-testid={`core-service-${i + 3}`}
              className="group p-6 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:border-[#0077B3]/40 hover:bg-[#0077B3]/[0.03] transition-all duration-300 hover:-translate-y-1 block"
            >
              <svc.icon className="w-8 h-8 text-[#0077B3] mb-4" />
              <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: "Outfit" }}>{svc.title}</h3>
              <p className="text-[#0077B3] text-sm font-medium mb-4">{svc.outcome}</p>
              <ul className="space-y-2 mb-4">
                {svc.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[#94a8be] text-xs">
                    <span className="text-[#0077B3] mt-0.5 flex-shrink-0">&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
              <span className="text-[#0077B3] text-xs font-semibold inline-flex items-center gap-1 group-hover:text-white transition-colors">
                Learn more <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
