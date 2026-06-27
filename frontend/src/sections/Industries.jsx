import { HardHat, Landmark, Factory, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const industries = [
  {
    icon: HardHat,
    title: "Construction",
    slug: "construction-it-support",
    desc: "Job site connectivity, BIM security, Procore and Sage integration, and rapid-response IT for teams that can&rsquo;t afford downtime on pour day.",
    highlights: ["Job Site Networking", "BIM & Cloud Security", "Procore / Sage Support"],
  },
  {
    icon: Landmark,
    title: "Financial Services",
    slug: "financial-it-support",
    desc: "SOC 2, PCI-DSS, and SEC/FINRA-aligned cybersecurity for banks, RIAs, and fintech firms where a single breach means regulatory action.",
    highlights: ["SOC 2 & PCI-DSS", "SEC / FINRA Compliance", "Encrypted Data at Rest & Transit"],
  },
  {
    icon: Factory,
    title: "Manufacturing",
    slug: "manufacturing-it-support",
    desc: "OT/IT convergence security, SCADA protection, and network segmentation for plants where connected machinery meets legacy systems.",
    highlights: ["OT / ICS Security", "SCADA Protection", "Network Segmentation"],
  },
  {
    icon: ShieldCheck,
    title: "High-Compliance Industries",
    slug: "high-compliance-it-support",
    desc: "CMMC, HIPAA, ITAR, and NIST 800-171 expertise for defense contractors, healthcare orgs, and government suppliers with zero tolerance for gaps.",
    highlights: ["CMMC / NIST 800-171", "HIPAA & ITAR", "Audit-Ready Documentation"],
  },
];

export default function Industries() {
  return (
    <section
      id="industries"
      data-testid="industries-section"
      aria-label="Industries served: construction, financial services, manufacturing, and high-compliance"
      className="py-12 lg:py-18 bg-transparent dark-cards relative overflow-hidden"
    >
      <img src="https://customer-assets.emergentagent.com/job_jobsite-it-secure/artifacts/yo1g9lv0_2.png" alt="" aria-hidden="true" className="absolute left-12 bottom-12 w-44 h-44 object-contain opacity-[0.03] brightness-200 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="relative flex items-center justify-center mb-10"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/15"></div></div><span className="relative bg-[#0f1d32]/80 backdrop-blur-sm px-8 py-1.5 rounded text-[#5cc0e8] text-xl font-extrabold uppercase tracking-[0.15em]">Who We Serve</span></div>
          <h2
            data-testid="industries-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 animate-fade-in-up stagger-1"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Built for industries where downtime costs more than dollars.
          </h2>
          <p className="text-[#c0cfe0] text-base max-w-2xl mx-auto animate-fade-in-up stagger-2">
            We don&rsquo;t do generic. Every engagement is engineered for the specific regulations, workflows, and operational realities of your industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {industries.map((ind, i) => (
            <div
              key={ind.title}
              data-testid={`industry-card-${i}`}
              className={`grid-border-card p-8 group animate-fade-in-up stagger-${i + 3}`}
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-white/10 bg-white/5 group-hover:border-[#0077B3] transition-colors">
                  <ind.icon className="w-6 h-6 text-[#0077B3]" />
                </div>
                <div>
                  <h3
                    className="text-white font-semibold text-lg"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {ind.title}
                  </h3>
                </div>
              </div>
              <p className="text-[#c0cfe0] text-sm leading-relaxed mb-5">{ind.desc}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {ind.highlights.map((h) => (
                  <span
                    key={h}
                    className="text-xs font-medium text-[#0077B3] border border-white/10 bg-[#0077B3]/5 px-3 py-1"
                  >
                    {h}
                  </span>
                ))}
              </div>
              {ind.slug && (
                <Link
                  to={`/industries/${ind.slug}`}
                  data-testid={`industry-link-${ind.slug}`}
                  className="inline-flex items-center gap-1 text-[#0077B3] text-sm font-medium hover:text-white transition-colors"
                >
                  Learn more <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
