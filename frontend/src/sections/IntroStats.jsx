import { Brain, ShieldAlert, DollarSign, AlertTriangle } from "lucide-react";

const HACKER_IMG = "https://images.unsplash.com/photo-1619121951749-4f4ddb5027dd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxoYWNrZXIlMjBjeWJlcnNlY3VyaXR5JTIwdGhyZWF0JTIwZGFya3xlbnwwfHx8Ymx1ZXwxNzc2NDUwODg1fDA&ixlib=rb-4.1.0&q=85";

export default function IntroStats() {
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
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <div data-testid="stat-card-ai" className="grid-border-card p-6 animate-fade-in-up stagger-3">
            <Brain className="w-5 h-5 text-[#0077B3] mb-4" />
            <p className="stat-number text-4xl sm:text-5xl text-white">78<span className="text-[#0077B3]">%</span></p>
            <p className="text-xs text-[#b0c4d8] mt-2">of organizations have no AI security policy</p>
          </div>
          <div data-testid="stat-card-credentials" className="grid-border-card p-6 animate-fade-in-up stagger-4">
            <ShieldAlert className="w-5 h-5 text-[#FF5722] mb-4" />
            <p className="stat-number text-4xl sm:text-5xl text-white">75<span className="text-[#FF5722]">%</span></p>
            <p className="text-xs text-[#b0c4d8] mt-2">of alerts stem from compromised credentials</p>
          </div>
          <div data-testid="stat-card-financial" className="grid-border-card p-6 animate-fade-in-up stagger-5">
            <DollarSign className="w-5 h-5 text-[#0077B3] mb-4" />
            <p className="stat-number text-4xl sm:text-5xl text-white">$4.9<span className="text-[#0077B3]">M</span></p>
            <p className="text-xs text-[#b0c4d8] mt-2">average data breach cost in financial services</p>
          </div>
          <div data-testid="stat-card-manufacturing" className="grid-border-card p-6 animate-fade-in-up stagger-6">
            <AlertTriangle className="w-5 h-5 text-[#FF5722] mb-4" />
            <p className="stat-number text-4xl sm:text-5xl text-white">#1</p>
            <p className="text-xs text-[#b0c4d8] mt-2">most-attacked industry: manufacturing (3 yrs running)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
