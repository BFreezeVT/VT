import { HardHat, Landmark, Factory, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const industries = [
  {
    icon: HardHat,
    title: "Construction",
    slug: "construction-it-support",
    desc: "Job site connectivity, BIM security, Procore and Sage integration, and rapid-response IT for teams that can't afford downtime on pour day.",
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
      className="py-24 lg:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="overline text-[#0077B3] mb-4 animate-fade-in-up">Industries We Serve</p>
          <h2
            data-testid="industries-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#003B71] mb-4 animate-fade-in-up stagger-1"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Deep expertise where compliance isn&rsquo;t optional.
          </h2>
          <p className="text-[#64748b] text-base max-w-2xl mx-auto animate-fade-in-up stagger-2">
            We don&rsquo;t do generic IT. Every engagement is built on sector-specific knowledge of the regulations, workflows, and threats your industry faces.
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
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-[#e2e8f0] bg-[#f8fafc] group-hover:border-[#0077B3] transition-colors">
                  <ind.icon className="w-6 h-6 text-[#0077B3]" />
                </div>
                <div>
                  <h3
                    className="text-[#003B71] font-semibold text-lg"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {ind.title}
                  </h3>
                </div>
              </div>
              <p className="text-[#64748b] text-sm leading-relaxed mb-5">{ind.desc}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {ind.highlights.map((h) => (
                  <span
                    key={h}
                    className="text-xs font-medium text-[#0077B3] border border-[#e2e8f0] bg-[#0077B3]/5 px-3 py-1"
                  >
                    {h}
                  </span>
                ))}
              </div>
              {ind.slug && (
                <Link
                  to={`/industries/${ind.slug}`}
                  data-testid={`industry-link-${ind.slug}`}
                  className="inline-flex items-center gap-1 text-[#0077B3] text-sm font-medium hover:text-[#003B71] transition-colors"
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
