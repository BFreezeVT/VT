import { Quote } from "lucide-react";

const CASE_IMG = "https://images.pexels.com/photos/36574302/pexels-photo-36574302.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const testimonials = [
  {
    quote: "Before Veracity, we were dealing with weekly outages and a ransomware scare that nearly shut down a $12M project. Within 90 days, every lingering IT issue was resolved. We haven't had a single minute of unplanned downtime in over a year.",
    name: "Mike Henderson",
    title: "VP of Operations, Twin Cities General Contractors",
    industry: "Construction",
  },
  {
    quote: "When our previous provider couldn't meet SOC 2 requirements, Veracity had us audit-ready in 60 days. They understand financial compliance at a level we've never seen from an MSP. Our clients trust us more because of them.",
    name: "Sarah Chen",
    title: "Managing Director, Northland Capital Advisors",
    industry: "Financial Services",
  },
  {
    quote: "Veracity segmented our OT and IT networks, locked down our SCADA systems, and cut our incident response time by 80%. Our plant hasn't missed a production run due to IT since we partnered with them.",
    name: "James Kowalski",
    title: "Plant Manager, Precision Components MFG",
    industry: "Manufacturing",
  },
];

export default function CaseStudy() {
  return (
    <section
      id="case-study"
      data-testid="case-study-section"
      aria-label="Client testimonials and results from construction, financial services, and manufacturing firms"
      className="py-24 lg:py-32 bg-[#020812]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="overline text-[#0077B3] mb-4 animate-fade-in-up">Client Results</p>
          <h2
            data-testid="case-study-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 animate-fade-in-up stagger-1"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Trusted across industries. Proven in results.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              data-testid={`testimonial-card-${i}`}
              className={`grid-border-card p-8 relative flex flex-col animate-fade-in-up stagger-${i + 2}`}
            >
              <Quote className="w-7 h-7 text-[#0077B3]/20 mb-4" />
              <span className="overline text-[#0077B3] text-[10px] mb-3">{t.industry}</span>
              <p className="text-[#A0B6CD] text-sm leading-relaxed mb-6 flex-1 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="border-t border-[#003B71] pt-4 mt-auto">
                <p data-testid={`testimonial-author-${i}`} className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-[#A0B6CD] text-xs">{t.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div data-testid="case-study-metric-0" className="text-center grid-border-card p-5">
            <p className="stat-number text-3xl text-white">0</p>
            <p className="text-xs text-[#A0B6CD] mt-1">Minutes Unplanned Downtime</p>
          </div>
          <div data-testid="case-study-metric-1" className="text-center grid-border-card p-5">
            <p className="stat-number text-3xl text-white">60</p>
            <p className="text-xs text-[#A0B6CD] mt-1">Day Compliance Turnaround</p>
          </div>
          <div data-testid="case-study-metric-2" className="text-center grid-border-card p-5">
            <p className="stat-number text-3xl text-[#0077B3]">80%</p>
            <p className="text-xs text-[#A0B6CD] mt-1">Faster Incident Response</p>
          </div>
          <div data-testid="case-study-metric-3" className="text-center grid-border-card p-5">
            <p className="stat-number text-3xl text-white">100%</p>
            <p className="text-xs text-[#A0B6CD] mt-1">Issues Resolved</p>
          </div>
        </div>
      </div>
    </section>
  );
}
