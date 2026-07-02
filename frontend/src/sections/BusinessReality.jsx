import { useState, useEffect, useRef } from "react";
import { Shield, Eye, Zap, ExternalLink, ArrowRight, Phone } from "lucide-react";
import { Button } from "../components/ui/button";

function useCountUp(target, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!startOnView) { setCount(target); return; }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnView, started, target]);

  useEffect(() => {
    if (!started) return;
    const isDecimal = String(target).includes(".");
    const numTarget = parseFloat(String(target).replace(/[^0-9.]/g, ""));
    if (isNaN(numTarget)) { setCount(target); return; }
    const steps = 60;
    const increment = numTarget / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, numTarget);
      setCount(isDecimal ? current.toFixed(2) : Math.round(current));
      if (step >= steps) { setCount(isDecimal ? numTarget.toFixed(2) : numTarget); clearInterval(timer); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

function StatCard({ stat, prefix = "", suffix = "", label, description, source, sourceUrl, sourceOrg, sourceYear, delay = 0 }) {
  const { count, ref } = useCountUp(stat, 2000);
  return (
    <div
      ref={ref}
      className="group p-6 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:border-[#0077B3]/40 hover:bg-[#0077B3]/[0.03] transition-all duration-300 hover:-translate-y-1"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="stat-number text-3xl sm:text-4xl text-white mb-2">
        {prefix}{typeof stat === "number" ? count : stat}{suffix}
      </p>
      <p className="text-white font-semibold text-sm mb-2">{label}</p>
      <p className="text-white/65 text-xs leading-relaxed mb-4">{description}</p>
      <div className="border-t border-white/[0.06] pt-3">
        <p className="text-white/70 text-[10px] font-semibold uppercase tracking-wider mb-0.5">{sourceOrg}</p>
        <p className="text-white/55 text-[10px] mb-1.5">{source} {sourceYear && `(${sourceYear})`}</p>
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[#0077B3] text-[10px] font-medium hover:text-[#00a0e4] transition-colors"
        >
          View Source <ArrowRight className="w-2.5 h-2.5" />
        </a>
      </div>
    </div>
  );
}

const columns = [
  {
    icon: Shield,
    title: "Reduce Risk",
    color: "#ef4444",
    stats: [
      { stat: 10.22, prefix: "$", suffix: "M", label: "Average Cost of a U.S. Data Breach", description: "The average cost of a U.S. data breach reached $10.22 million.", sourceOrg: "IBM", source: "Cost of a Data Breach Report", sourceYear: "2025", sourceUrl: "https://www.ibm.com/reports/data-breach" },
      { stat: 78, suffix: "%", label: "Of Breaches Involve Unauthorized Access", description: "Most breaches occur because someone gains access they should not have.", sourceOrg: "Flashpoint", source: "Global Threat Report", sourceYear: "2025", sourceUrl: "https://www.csoonline.com/article/4032035/ransomware-up-179-credential-theft-up-800-2025s-cyber-onslaught-intensifies.html" },
      { stat: "1.8B", label: "Credentials Stolen in First Half of 2025", description: "Identity has become the primary attack surface for modern organizations.", sourceOrg: "Flashpoint", source: "Midyear Threat Report", sourceYear: "2025", sourceUrl: "https://www.asisonline.org/security-management-magazine/latest-news/today-in-security/2025/august/flashpoint-midyear-report-2025/" },
    ],
  },
  {
    icon: Eye,
    title: "Improve Visibility",
    color: "#f59e0b",
    stats: [
      { stat: 81, suffix: "%", label: "Of Employees Use Unapproved AI Tools", description: "AI adoption is occurring faster than governance.", sourceOrg: "UpGuard", source: "State of Shadow AI Report", sourceYear: "2025", sourceUrl: "https://www.upguard.com/resources/the-state-of-shadow-ai" },
      { stat: 68, suffix: "%", label: "Of Employees Use Personal AI Accounts at Work", description: "Many organizations have little visibility into how AI is being used internally.", sourceOrg: "Menlo Security", source: "2025 AI Report", sourceYear: "2025", sourceUrl: "https://www.menlosecurity.com/press-releases/menlo-securitys-2025-report-uncovers-68-surge-in-shadow-generative-ai-usage-in-the-modern-enterprise" },
      { stat: 670, prefix: "$", suffix: "K", label: "Additional Cost from Shadow AI Incidents", description: "Unmanaged AI usage increases both security and compliance exposure.", sourceOrg: "IBM", source: "Cost of a Data Breach Research", sourceYear: "2025", sourceUrl: "https://deepstrike.io/blog/compromised-credential-statistics-2025" },
    ],
  },
  {
    icon: Zap,
    title: "Increase Efficiency",
    color: "#10b981",
    stats: [
      { stat: 74, suffix: "%", label: "Of Employees Say Automation Helps Them Work Faster", description: "Automation is quickly becoming a competitive necessity.", sourceOrg: "Vena Solutions", source: "Automation Statistics", sourceYear: "2025", sourceUrl: "https://www.venasolutions.com/blog/automation-statistics" },
      { stat: 77, suffix: "%", label: "Reduction in Workflow Cycle Times", description: "Automated workflows significantly accelerate business operations.", sourceOrg: "PS Global Consulting", source: "Workflow Automation Trends", sourceYear: "2025", sourceUrl: "https://psglobalconsulting.com/blog/2025-workflow-automation-trends-key-statistics-and-insights-for-success" },
      { stat: "60-95%", label: "Reduction in Repetitive Administrative Tasks", description: "Automation allows teams to focus on higher-value work.", sourceOrg: "PS Global Consulting", source: "Workflow Automation Trends", sourceYear: "2025", sourceUrl: "https://psglobalconsulting.com/blog/2025-workflow-automation-trends-key-statistics-and-insights-for-success" },
    ],
  },
];

export default function BusinessReality() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="business-reality"
      data-testid="business-reality-section"
      aria-label="The business reality of AI, automation, and cyber risk with sourced statistics"
      className="py-16 lg:py-24 bg-transparent relative overflow-hidden"
    >
      <img src="https://customer-assets.emergentagent.com/job_jobsite-it-secure/artifacts/yo1g9lv0_2.png" alt="" aria-hidden="true" className="absolute -left-20 top-1/3 w-[500px] h-[500px] object-contain opacity-[0.025] brightness-200 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0077B3] mb-4">Research-Backed Insights</p>
          <h2
            data-testid="business-reality-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6"
            style={{ fontFamily: "Outfit" }}
          >
            The Business Reality of AI, Automation &amp; Cyber Risk
          </h2>
          <p className="text-white/75 text-base max-w-3xl mx-auto leading-relaxed">
            The organizations that thrive over the next decade will be the ones that reduce risk, improve visibility, and automate intelligently. The data is clear.
          </p>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {columns.map((col, ci) => (
            <div key={col.title}>
              {/* Column header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg" style={{ backgroundColor: `${col.color}15`, border: `1px solid ${col.color}30` }}>
                  <col.icon className="w-5 h-5" style={{ color: col.color }} />
                </div>
                <h3 className="text-white font-bold text-lg" style={{ fontFamily: "Outfit" }}>{col.title}</h3>
              </div>

              {/* Stat cards */}
              <div className="space-y-4">
                {col.stats.map((stat, si) => (
                  <StatCard
                    key={si}
                    stat={stat.stat}
                    prefix={stat.prefix || ""}
                    suffix={stat.suffix || ""}
                    label={stat.label}
                    description={stat.description}
                    source={stat.source}
                    sourceUrl={stat.sourceUrl}
                    delay={ci * 100 + si * 50}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-white font-bold text-2xl sm:text-3xl mb-3" style={{ fontFamily: "Outfit" }}>
            See How Your Organization Compares
          </h3>
          <p className="text-white/70 text-sm mb-8">
            Assess your organization&rsquo;s technology maturity, cybersecurity posture, operational efficiency, and AI readiness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              data-testid="reality-cta-assess"
              onClick={() => scrollTo("audit")}
              className="bg-[#0077B3] hover:bg-[#005f8f] text-white rounded-md font-semibold px-8 h-12"
            >
              Start Your Business Technology Assessment <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <a href="tel:9529417333">
              <Button
                data-testid="reality-cta-call"
                className="bg-transparent border border-white/15 hover:border-[#0077B3] text-white rounded-md font-semibold px-8 h-12"
              >
                <Phone className="w-4 h-4 mr-2" /> Schedule a Strategy Discussion
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
