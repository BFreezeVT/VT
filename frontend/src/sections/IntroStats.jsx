import { Brain, ShieldAlert, DollarSign, AlertTriangle, ExternalLink, X, ChevronDown } from "lucide-react";
import { useState } from "react";

const HACKER_IMG = "https://images.unsplash.com/photo-1619121951749-4f4ddb5027dd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxoYWNrZXIlMjBjeWJlcnNlY3VyaXR5JTIwdGhyZWF0JTIwZGFya3xlbnwwfHx8Ymx1ZXwxNzc2NDUwODg1fDA&ixlib=rb-4.1.0&q=85";

const stats = [
  {
    icon: Brain,
    value: "83",
    suffix: "%",
    accentColor: "text-[#0077B3]",
    label: "of organizations lack automated AI security controls",
    source: { title: "Kiteworks AI Security Gap Report 2025", url: "https://www.kiteworks.com/cybersecurity-risk-management/ai-security-gap-2025-organizations-flying-blind/", excerpt: "83% of organizations have no automated DLP controls to block sensitive data from leaking into public AI tools." },
  },
  {
    icon: ShieldAlert,
    value: "59",
    suffix: "%",
    accentColor: "text-[#FF5722]",
    label: "of confirmed incidents are identity-driven attacks",
    source: { title: "eSentire Annual Threat Report 2026", url: "https://olytac.com/account-compromise-surge-in-2026-why-stolen-credentials-now-dominate-corporate-cyber-threats-and-how-to-fight-back/", excerpt: "Identity-driven threats reached 59% of confirmed incidents by early 2025, up 156% since 2023. Account compromise via stolen credentials surged 389% YoY." },
  },
  {
    icon: DollarSign,
    value: "$5.56",
    suffix: "M",
    accentColor: "text-[#0077B3]",
    label: "average data breach cost in financial services (2025)",
    source: { title: "IBM Cost of a Data Breach Report 2025", url: "https://www.ibm.com/reports/data-breach", excerpt: "Financial services: $5.56M avg breach cost in 2025, behind healthcare ($7.42M). U.S. breaches averaged a record $10.22M." },
  },
  {
    icon: AlertTriangle,
    value: "#1",
    suffix: "",
    accentColor: "text-[#FF5722]",
    label: "most-attacked: manufacturing (4th year)",
    source: { title: "Industrial Cyber / Global Ransomware Report 2025", url: "https://industrialcyber.co/reports/global-ransomware-attacks-rose-32-in-2025-as-manufacturers-emerged-as-top-target/", excerpt: "Manufacturing represents 29% of all published ransomware victims globally in 2025, with a 56% YoY increase." },
    expandable: true,
  },
];

const topAttackedIndustries = [
  { rank: 1, name: "Manufacturing", pct: "29%", note: "56% YoY increase — 4th consecutive year at #1" },
  { rank: 2, name: "Finance & Insurance", pct: "18%", note: "$5.56M avg breach cost — SEC/FINRA pressure" },
  { rank: 3, name: "Professional Services", pct: "15%", note: "Law firms, consultancies, MSPs targeted" },
  { rank: 4, name: "Construction", pct: "12%", note: "24% YoY increase — wire fraud epidemic" },
  { rank: 5, name: "Healthcare", pct: "8%", note: "Highest cost per breach ($7.42M)" },
];

function SourcePopup({ source, onClose }) {
  return (
    <div className="absolute z-30 bottom-full left-0 right-0 mb-2 animate-fade-in" data-testid="source-popup">
      <div className="bg-white border border-[#1a8fd4] p-4 shadow-lg shadow-[#0077B3]/10">
        <div className="flex items-start justify-between gap-3 mb-2">
          <p className="text-white text-sm font-semibold" style={{ fontFamily: "Outfit" }}>{source.title}</p>
          <button onClick={onClose} className="text-[#a0b4c8] hover:text-white flex-shrink-0"><X className="w-4 h-4" /></button>
        </div>
        <p className="text-[#a0b4c8] text-xs leading-relaxed mb-3">{source.excerpt}</p>
        <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#0077B3] text-xs font-medium hover:text-white transition-colors">
          View full report <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

export default function IntroStats() {
  const [activeSource, setActiveSource] = useState(null);
  const [showRanking, setShowRanking] = useState(false);

  return (
    <section id="intro-stats" data-testid="intro-stats-section" aria-label="Cybersecurity threat statistics" className="py-24 lg:py-32 bg-[#0c1a2e]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Threat image */}
          <div className="relative animate-fade-in-up order-2 lg:order-1">
            <div className="relative overflow-hidden border border-[#FF5722]/20">
              <img data-testid="threat-image" src={HACKER_IMG} alt="Cybersecurity threat actor" className="w-full h-auto object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#112240] via-[#112240]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-[#FF5722] text-xs uppercase tracking-wider font-semibold mb-1">Active Threat</p>
                <p className="text-white text-sm font-medium">Attackers are targeting your industry right now. Is your team ready?</p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <p className="overline text-[#FF5722] mb-4 animate-fade-in-up">Why This Matters</p>
            <h2 data-testid="intro-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-6 animate-fade-in-up stagger-1" style={{ fontFamily: "Outfit" }}>
              Cyberattacks aren&rsquo;t slowing down. Most defenses are.
            </h2>
            <p data-testid="intro-description" className="text-[#a0b4c8] text-base leading-relaxed animate-fade-in-up stagger-2 mb-8">
              AI-powered attacks are outpacing traditional security tools. Ransomware victims surged 58% in 2025, credential theft is up 389%, and shadow AI usage is leaking sensitive data daily.
            </p>
            <div className="border-l-2 border-[#FF5722] pl-5 animate-fade-in-up stagger-3">
              <p className="text-[#FF5722] text-xs font-semibold uppercase tracking-wider mb-2">The Reality</p>
              <p className="text-[#a0b4c8] text-sm leading-relaxed">
                Global ransomware attacks rose <span className="text-white font-semibold">32% in 2025</span>. Average ransom: <span className="text-white font-semibold">$2.3 million</span>. 90% of organizations are unprepared for AI-augmented threats.
              </p>
              <a href="https://deepstrike.io/blog/ransomware-statistics-2025" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#0077B3] text-[10px] mt-2 hover:text-white transition-colors">
                Source: DeepStrike 2025 <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Stats — open layout with dividers, no boxes */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border-t border-[#1e3a56]/50">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                data-testid={`stat-card-${i}`}
                className={`relative pt-8 pb-6 ${i < 3 ? "border-r border-[#1e3a56]/30 hidden lg:block" : ""} ${i < 2 ? "max-lg:border-r max-lg:border-[#1e3a56]/30" : ""} px-6 first:pl-0 last:pr-0 animate-fade-in-up stagger-${i + 3}`}
                style={{ minWidth: 0 }}
              >
                {activeSource === i && <SourcePopup source={stat.source} onClose={() => setActiveSource(null)} />}
                <Icon className={`w-4 h-4 ${stat.accentColor} mb-3`} />
                <p className="stat-number text-4xl sm:text-5xl text-white">
                  {stat.value}<span className={stat.accentColor}>{stat.suffix}</span>
                </p>
                <p className="text-xs text-[#a0b4c8] mt-2 mb-3 leading-relaxed">{stat.label}</p>
                <button
                  data-testid={`stat-source-${i}`}
                  onClick={() => setActiveSource(activeSource === i ? null : i)}
                  className="inline-flex items-center gap-1 text-[#0077B3] text-[10px] font-medium hover:text-white transition-colors"
                >
                  View source <ExternalLink className="w-2.5 h-2.5" />
                </button>
                {stat.expandable && (
                  <button data-testid="expand-ranking" onClick={() => setShowRanking(!showRanking)} className="flex items-center gap-1 text-[#0077B3] text-[10px] font-medium hover:text-white transition-colors mt-1">
                    See top 5 <ChevronDown className={`w-2.5 h-2.5 transition-transform ${showRanking ? "rotate-180" : ""}`} />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Top 5 expanded — open layout */}
        {showRanking && (
          <div data-testid="top-5-ranking" className="mt-8 pt-8 border-t border-[#1e3a56]/50 animate-fade-in">
            <p className="text-white text-sm font-semibold mb-6" style={{ fontFamily: "Outfit" }}>Top 5 Most-Attacked Industries (2025)</p>
            <div className="space-y-4">
              {topAttackedIndustries.map((ind) => (
                <div key={ind.rank} className="flex items-center gap-4">
                  <span className={`stat-number text-lg w-8 ${ind.rank === 1 ? "text-[#FF5722]" : "text-[#a0b4c8]"}`}>#{ind.rank}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white text-sm font-medium">{ind.name}</span>
                      <span className="text-[#0077B3] text-sm font-semibold">{ind.pct}</span>
                    </div>
                    <div className="w-full bg-white h-1"><div className={`h-1 ${ind.rank === 1 ? "bg-[#FF5722]" : "bg-[#0077B3]"}`} style={{ width: ind.pct }} /></div>
                    <p className="text-[#a0b4c8] text-[10px] mt-1">{ind.note}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="https://industrialcyber.co/reports/global-ransomware-attacks-rose-32-in-2025-as-manufacturers-emerged-as-top-target/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#0077B3] text-[10px] mt-4 hover:text-white transition-colors">
              Source: Industrial Cyber 2025 <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
