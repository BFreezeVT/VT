import { Quote } from "lucide-react";

const CASE_IMG = "https://images.pexels.com/photos/36574302/pexels-photo-36574302.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

export default function CaseStudy() {
  return (
    <section
      id="case-study"
      data-testid="case-study-section"
      className="py-24 lg:py-32 bg-[#020812]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="animate-fade-in-up stagger-1">
            <div className="relative overflow-hidden border border-[#003B71]">
              <img
                data-testid="case-study-image"
                src={CASE_IMG}
                alt="Construction team collaborating"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020812]/50 to-transparent" />
            </div>
          </div>

          {/* Testimonial */}
          <div className="animate-fade-in-up stagger-2">
            <p className="overline text-[#0077B3] mb-4">Case Study</p>
            <h2
              data-testid="case-study-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-8"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              From constant downtime to zero disruption.
            </h2>

            <div className="grid-border-card p-8 relative">
              <Quote className="w-8 h-8 text-[#0077B3]/30 absolute top-6 right-6" />
              <p
                data-testid="case-study-quote"
                className="text-[#A0B6CD] text-base leading-relaxed mb-6 italic"
              >
                &ldquo;Before Veracity, we were dealing with weekly outages and a ransomware scare that 
                nearly shut down a $12M project. Within 90 days of partnering with their team, every 
                lingering IT issue was resolved. We haven&rsquo;t had a single minute of unplanned 
                downtime in over a year. They speak our language and they deliver.&rdquo;
              </p>
              <div className="border-t border-[#003B71] pt-4">
                <p data-testid="case-study-author" className="text-white font-semibold text-sm">Mike Henderson</p>
                <p className="text-[#A0B6CD] text-sm">VP of Operations, Twin Cities General Contractors</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div data-testid="case-study-metric-0" className="text-center">
                <p className="stat-number text-2xl sm:text-3xl text-white">0</p>
                <p className="text-xs text-[#A0B6CD] mt-1">Minutes Downtime</p>
              </div>
              <div data-testid="case-study-metric-1" className="text-center">
                <p className="stat-number text-2xl sm:text-3xl text-white">90</p>
                <p className="text-xs text-[#A0B6CD] mt-1">Day Turnaround</p>
              </div>
              <div data-testid="case-study-metric-2" className="text-center">
                <p className="stat-number text-2xl sm:text-3xl text-[#0077B3]">100%</p>
                <p className="text-xs text-[#A0B6CD] mt-1">Issues Resolved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
