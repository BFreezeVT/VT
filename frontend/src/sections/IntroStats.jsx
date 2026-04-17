import { Brain, ShieldAlert, DollarSign, AlertTriangle, ExternalLink, X, ChevronDown } from "lucide-react";
import { useState } from "react";

const HACKER_IMG = "https://images.unsplash.com/photo-1619121951749-4f4ddb5027dd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxoYWNrZXIlMjBjeWJlcnNlY3VyaXR5JTIwdGhyZWF0JTIwZGFya3xlbnwwfHx8Ymx1ZXwxNzc2NDUwODg1fDA&ixlib=rb-4.1.0&q=85";

const stats = [
  {
    icon: Brain,
    value: "78",
    suffix: "%",
    accentColor: "text-[#0077B3]",
    label: "of organizations have no AI security policy",
    source: {
      title: "ISACA State of AI 2024 Report",
      url: "https://www.isaca.org/resources/reports/the-promise-and-reality-of-ai",
      excerpt: "ISACA's global survey found that 78% of organizations have not implemented any formal AI governance or security policies despite widespread adoption.",
    },
  },
  {
    icon: ShieldAlert,
    value: "75",
    suffix: "%",
    accentColor: "text-[#FF5722]",
    label: "of alerts stem from compromised credentials",
    source: {
      title: "IBM X-Force Threat Intelligence Index 2024",
      url: "https://www.ibm.com/reports/threat-intelligence",
      excerpt: "IBM's annual threat report found that credential-based attacks accounted for 75% of initial access vectors, making stolen credentials the #1 attack method.",
    },
  },
  {
    icon: DollarSign,
    value: "$4.9",
    suffix: "M",
    accentColor: "text-[#0077B3]",
    label: "average data breach cost in financial services",
    source: {
      title: "IBM Cost of a Data Breach Report 2024",
      url: "https://www.ibm.com/reports/data-breach",
      excerpt: "Financial services experienced the 2nd highest average breach cost at $4.88M, behind only healthcare ($9.77M). Costs include detection, notification, lost business, and response.",
    },
  },
  {
    icon: AlertTriangle,
    value: "#1",
    suffix: "",
    accentColor: "text-[#FF5722]",
    label: "most-attacked industry: manufacturing (3 yrs running)",
    source: {
      title: "IBM X-Force Threat Intelligence Index 2024",
      url: "https://www.ibm.com/reports/threat-intelligence",
      excerpt: "Manufacturing has been the most-targeted industry for ransomware for three consecutive years, surpassing financial services and healthcare.",
    },
    expandable: true,
  },
];

const topAttackedIndustries = [
  { rank: 1, name: "Manufacturing", pct: "25.7%", note: "3rd consecutive year at #1" },
  { rank: 2, name: "Finance & Insurance", pct: "18.2%", note: "Wire fraud + credential theft" },
  { rank: 3, name: "Professional Services", pct: "15.4%", note: "Law firms, consultancies, MSPs" },
  { rank: 4, name: "Energy & Utilities", pct: "11.1%", note: "Critical infrastructure targets" },
  { rank: 5, name: "Healthcare", pct: "6.3%", note: "Highest cost per breach ($9.77M)" },
];

function SourcePopup({ source, onClose }) {
  return (
    <div className="absolute z-30 bottom-full left-0 right-0 mb-2 animate-fade-in" data-testid="source-popup">
      <div className="bg-[#0a1628] border border-[#1a8fd4] p-4 shadow-lg shadow-[#0077B3]/10">
        <div className="flex items-start justify-between gap-3 mb-2">
          <p className="text-white text-sm font-semibold" style={{ fontFamily: "Outfit" }}>{source.title}</p>
          <button onClick={onClose} className="text-[#b0c4d8] hover:text-white flex-shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[#b0c4d8] text-xs leading-relaxed mb-3">{source.excerpt}</p>
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[#0077B3] text-xs font-medium hover:text-white transition-colors"
        >
          View source <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

export default function IntroStats() {
  const [activeSource, setActiveSource] = useState(null);
  const [showRanking, setShowRanking] = useState(false);

  return (
    <section
      id="intro-stats"
      data-testid="intro-stats-section"
      aria-label="Cybersecurity threat statistics across industries"
      className="py-24 lg:py-32 bg-[#0a1628]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Threat image */}
          <div className="relative animate-fade-in-up order-2 lg:order-1">
            <div className="relative overflow-hidden border border-[#FF5722]/20">
              <img
                data-testid="threat-image"
                src={HACKER_IMG}
                alt="Hooded figure representing cybersecurity threat actors targeting businesses"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-[#FF5722] text-xs uppercase tracking-wider font-semibold mb-1">Active Threat</p>
                <p className="text-white text-sm font-medium">Attackers are targeting your industry right now. Is your team ready?</p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <p className="overline text-[#FF5722] mb-4 animate-fade-in-up">Why This Matters</p>
            <h2
              data-testid="intro-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-6 animate-fade-in-up stagger-1"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Cyberattacks aren&rsquo;t slowing down. Most defenses are.
            </h2>
            <p
              data-testid="intro-description"
              className="text-[#b0c4d8] text-base leading-relaxed animate-fade-in-up stagger-2 mb-8"
            >
              AI-powered attacks are outpacing traditional security tools. Ransomware, credential theft, 
              and shadow AI usage are costing organizations millions — while most firms still rely on 
              reactive, generic IT support.
            </p>
            <div className="grid-border-card p-5 border-[#FF5722]/20 animate-fade-in-up stagger-3">
              <p className="text-[#FF5722] text-xs font-semibold uppercase tracking-wider mb-2">The Reality</p>
              <p className="text-[#b0c4d8] text-sm leading-relaxed">
                The average time to detect a breach is <span className="text-white font-semibold">194 days</span>. The average time to contain it is another <span className="text-white font-semibold">69 days</span>. 
                That&rsquo;s nearly 9 months of exposure. Our AI monitoring detects threats in <span className="text-[#0077B3] font-semibold">minutes</span>.
              </p>
              <a
                href="https://www.ibm.com/reports/data-breach"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#0077B3] text-[10px] mt-2 hover:text-white transition-colors"
              >
                Source: IBM Cost of a Data Breach 2024 <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                data-testid={`stat-card-${i}`}
                className={`grid-border-card p-6 relative animate-fade-in-up stagger-${i + 3}`}
              >
                {activeSource === i && <SourcePopup source={stat.source} onClose={() => setActiveSource(null)} />}
                <Icon className={`w-5 h-5 ${stat.accentColor} mb-4`} />
                <p className="stat-number text-4xl sm:text-5xl text-white">
                  {stat.value}<span className={stat.accentColor}>{stat.suffix}</span>
                </p>
                <p className="text-xs text-[#b0c4d8] mt-2 mb-3">{stat.label}</p>

                {/* Source link */}
                <button
                  data-testid={`stat-source-${i}`}
                  onClick={() => setActiveSource(activeSource === i ? null : i)}
                  className="inline-flex items-center gap-1 text-[#0077B3] text-[10px] font-medium hover:text-white transition-colors"
                >
                  View source <ExternalLink className="w-2.5 h-2.5" />
                </button>

                {/* Expandable ranking for #1 */}
                {stat.expandable && (
                  <button
                    data-testid="expand-ranking"
                    onClick={() => setShowRanking(!showRanking)}
                    className="flex items-center gap-1 text-[#0077B3] text-[10px] font-medium hover:text-white transition-colors mt-1"
                  >
                    See top 5 industries <ChevronDown className={`w-2.5 h-2.5 transition-transform ${showRanking ? "rotate-180" : ""}`} />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Expanded top 5 ranking */}
        {showRanking && (
          <div data-testid="top-5-ranking" className="mt-6 grid-border-card p-6 animate-fade-in">
            <p className="text-white text-sm font-semibold mb-4" style={{ fontFamily: "Outfit" }}>
              Top 5 Most-Attacked Industries by Ransomware (2024)
            </p>
            <div className="space-y-3">
              {topAttackedIndustries.map((ind) => (
                <div key={ind.rank} className="flex items-center gap-4">
                  <span className={`stat-number text-lg w-8 ${ind.rank === 1 ? "text-[#FF5722]" : "text-white"}`}>
                    #{ind.rank}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white text-sm font-medium">{ind.name}</span>
                      <span className="text-[#0077B3] text-sm font-semibold">{ind.pct}</span>
                    </div>
                    <div className="w-full bg-[#0a1628] h-1.5">
                      <div
                        className={`h-1.5 transition-all duration-700 ${ind.rank === 1 ? "bg-[#FF5722]" : "bg-[#0077B3]"}`}
                        style={{ width: ind.pct }}
                      />
                    </div>
                    <p className="text-[#b0c4d8] text-[10px] mt-1">{ind.note}</p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="https://www.ibm.com/reports/threat-intelligence"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#0077B3] text-[10px] mt-4 hover:text-white transition-colors"
            >
              Source: IBM X-Force Threat Intelligence Index 2024 <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
