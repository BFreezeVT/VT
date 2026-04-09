import { TrendingUp, ShieldAlert } from "lucide-react";

export default function IntroStats() {
  return (
    <section
      id="intro-stats"
      data-testid="intro-stats-section"
      className="py-24 lg:py-32 bg-[#020812]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <p className="overline text-[#0077B3] mb-4 animate-fade-in-up">The Threat Is Real</p>
        <h2
          data-testid="intro-heading"
          className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-6 max-w-3xl animate-fade-in-up stagger-1"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Construction&rsquo;s digital transformation is outpacing its defenses.
        </h2>
        <p
          data-testid="intro-description"
          className="text-[#A0B6CD] text-base leading-relaxed max-w-2xl mb-16 animate-fade-in-up stagger-2"
        >
          Your firm relies on cloud tools, BIM, and remote teams to keep projects on track. 
          But that same connectivity exposes you to ransomware, phishing, and costly downtime 
          that can halt an entire build.
        </p>

        {/* Bento stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            data-testid="stat-card-ransomware"
            className="grid-border-card p-8 lg:p-10 animate-fade-in-up stagger-3"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 flex items-center justify-center bg-[#FF5722]/10 border border-[#FF5722]/30">
                <TrendingUp className="w-6 h-6 text-[#FF5722]" />
              </div>
              <div>
                <p className="overline text-[#A0B6CD] mb-2">Year-Over-Year</p>
                <p className="text-sm text-[#A0B6CD]">Construction Ransomware Attacks</p>
              </div>
            </div>
            <p className="stat-number text-5xl sm:text-6xl lg:text-7xl text-white">
              41<span className="text-[#FF5722]">%</span>
            </p>
            <p className="text-sm text-[#A0B6CD] mt-3">increase in targeted ransomware attacks on construction firms</p>
          </div>

          <div
            data-testid="stat-card-credentials"
            className="grid-border-card p-8 lg:p-10 animate-fade-in-up stagger-4"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 flex items-center justify-center bg-[#0077B3]/10 border border-[#0077B3]/30">
                <ShieldAlert className="w-6 h-6 text-[#0077B3]" />
              </div>
              <div>
                <p className="overline text-[#A0B6CD] mb-2">Alert Composition</p>
                <p className="text-sm text-[#A0B6CD]">Credential Exposure Incidents</p>
              </div>
            </div>
            <p className="stat-number text-5xl sm:text-6xl lg:text-7xl text-white">
              75<span className="text-[#0077B3]">%</span>
            </p>
            <p className="text-sm text-[#A0B6CD] mt-3">of security alerts stem from stolen or compromised credentials</p>
          </div>
        </div>
      </div>
    </section>
  );
}
