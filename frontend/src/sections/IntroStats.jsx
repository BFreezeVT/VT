import { Brain, ShieldAlert, DollarSign, AlertTriangle } from "lucide-react";

export default function IntroStats() {
  return (
    <section
      id="intro-stats"
      data-testid="intro-stats-section"
      aria-label="Cybersecurity threat statistics across industries"
      className="py-24 lg:py-32 bg-[#020812]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left text */}
          <div className="lg:col-span-2">
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
              className="text-[#A0B6CD] text-base leading-relaxed animate-fade-in-up stagger-2"
            >
              AI-powered attacks are outpacing traditional security tools. Ransomware, credential theft, 
              and shadow AI usage are costing organizations millions — while most firms still rely on 
              reactive, generic IT support.
            </p>
          </div>

          {/* Right - stat cards */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-5">
            <div data-testid="stat-card-ai" className="grid-border-card p-6 animate-fade-in-up stagger-3">
              <Brain className="w-5 h-5 text-[#0077B3] mb-4" />
              <p className="stat-number text-4xl sm:text-5xl text-white">78<span className="text-[#0077B3]">%</span></p>
              <p className="text-xs text-[#A0B6CD] mt-2">of organizations have no AI security policy</p>
            </div>
            <div data-testid="stat-card-credentials" className="grid-border-card p-6 animate-fade-in-up stagger-4">
              <ShieldAlert className="w-5 h-5 text-[#FF5722] mb-4" />
              <p className="stat-number text-4xl sm:text-5xl text-white">75<span className="text-[#FF5722]">%</span></p>
              <p className="text-xs text-[#A0B6CD] mt-2">of alerts stem from compromised credentials</p>
            </div>
            <div data-testid="stat-card-financial" className="grid-border-card p-6 animate-fade-in-up stagger-5">
              <DollarSign className="w-5 h-5 text-[#0077B3] mb-4" />
              <p className="stat-number text-4xl sm:text-5xl text-white">$4.9<span className="text-[#0077B3]">M</span></p>
              <p className="text-xs text-[#A0B6CD] mt-2">average data breach cost in financial services</p>
            </div>
            <div data-testid="stat-card-manufacturing" className="grid-border-card p-6 animate-fade-in-up stagger-6">
              <AlertTriangle className="w-5 h-5 text-[#FF5722] mb-4" />
              <p className="stat-number text-4xl sm:text-5xl text-white">#1</p>
              <p className="text-xs text-[#A0B6CD] mt-2">most-attacked industry: manufacturing (3 yrs running)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
