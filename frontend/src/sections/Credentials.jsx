import { Award, BookOpen, ShieldCheck, ExternalLink } from "lucide-react";

const credentials = [
  {
    icon: Award,
    title: "CRN MSP 500 2026",
    desc: "Named to the CRN Managed Service Provider 500 list, recognizing the top technology providers in North America.",
    url: "https://www.crn.com/rankings-and-lists/msp2026-details?c=384",
    linkText: "View on CRN",
  },
  {
    icon: ShieldCheck,
    title: "SOC 2 Compliant",
    desc: "Certified SOC 2 compliant, demonstrating our commitment to the highest standards of security, availability, and confidentiality.",
    url: "https://www.aicpa-cima.com/resources/download/soc-for-service-organizations-engagements-overview",
    linkText: "About SOC 2",
  },
  {
    icon: BookOpen,
    title: "Mastering AI for Business Success",
    desc: "Amazon bestselling book by Veracity Technologies leadership on implementing AI strategies that drive real business outcomes.",
    url: "https://www.veracitytech.com/mastering-ai",
    linkText: "Read more",
  },
  {
    icon: BookOpen,
    title: "Maximizing AI",
    desc: "Our second published work on advanced AI adoption, governance, and security for business leaders navigating the AI landscape.",
    url: "https://www.veracitytech.com/maximizing-ai",
    linkText: "Read more",
  },
];

export default function Credentials() {
  return (
    <section
      id="credentials"
      data-testid="credentials-section"
      aria-label="Veracity Technologies honors, awards, and published works"
      className="py-12 lg:py-18 bg-gradient-to-b from-[#0e1d30] to-[#0b1828] dark-cards"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative flex items-center justify-center mb-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
          <span className="relative bg-gradient-to-b from-[#0e1d30] to-[#0b1828] px-6 text-[#0077B3] text-xl font-bold uppercase tracking-[0.15em]">Honors &amp; Awards</span>
        </div>

        <div className="text-center mb-8">
          <h2
            data-testid="credentials-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Recognized. Certified. Published.
          </h2>
          <p className="text-[#c0cfe0] text-base max-w-2xl mx-auto">
            Industry awards, compliance certifications, and published thought leadership that set Veracity Technologies apart.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {credentials.map((cred, i) => (
            <a
              key={cred.title}
              href={cred.url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`credential-card-${i}`}
              className="border border-white/15 bg-white/[0.07] rounded-md p-6 text-center group block hover:border-[#0077B3] hover:bg-white/[0.1] transition-all"
            >
              <cred.icon className="w-8 h-8 text-[#0077B3] mx-auto mb-4 group-hover:text-white transition-colors" />
              <h3 className="text-white font-semibold text-sm mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
                {cred.title}
              </h3>
              <p className="text-[#c0cfe0] text-xs leading-relaxed mb-4">{cred.desc}</p>
              <span className="inline-flex items-center gap-1 text-[#0077B3] text-xs font-medium group-hover:text-white transition-colors">
                {cred.linkText} <ExternalLink className="w-3 h-3" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
