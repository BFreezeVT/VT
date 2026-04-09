import { TrendingUp, ShieldAlert, DollarSign, AlertTriangle } from "lucide-react";

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
          Every industry is a target. Most aren&rsquo;t ready.
        </h2>
        <p
          data-testid="intro-description"
          className="text-[#A0B6CD] text-base leading-relaxed max-w-2xl mb-16 animate-fade-in-up stagger-2"
        >
          From job sites to trading floors to factory lines, the shift to cloud tools, remote 
          access, and connected systems has outpaced security. Ransomware, phishing, and credential 
          theft are costing firms millions in downtime, fines, and lost trust.
        </p>

        {/* Bento stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            data-testid="stat-card-ransomware"
            className="grid-border-card p-8 animate-fade-in-up stagger-3"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 flex items-center justify-center bg-[#FF5722]/10 border border-[#FF5722]/30">
                <TrendingUp className="w-5 h-5 text-[#FF5722]" />
              </div>
              <p className="text-xs text-[#A0B6CD] uppercase tracking-wider">Construction</p>
            </div>
            <p className="stat-number text-5xl sm:text-6xl text-white">
              41<span className="text-[#FF5722]">%</span>
            </p>
            <p className="text-sm text-[#A0B6CD] mt-3">rise in ransomware attacks targeting construction firms</p>
          </div>

          <div
            data-testid="stat-card-credentials"
            className="grid-border-card p-8 animate-fade-in-up stagger-4"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 flex items-center justify-center bg-[#0077B3]/10 border border-[#0077B3]/30">
                <ShieldAlert className="w-5 h-5 text-[#0077B3]" />
              </div>
              <p className="text-xs text-[#A0B6CD] uppercase tracking-wider">All Industries</p>
            </div>
            <p className="stat-number text-5xl sm:text-6xl text-white">
              75<span className="text-[#0077B3]">%</span>
            </p>
            <p className="text-sm text-[#A0B6CD] mt-3">of security alerts stem from stolen or compromised credentials</p>
          </div>

          <div
            data-testid="stat-card-financial"
            className="grid-border-card p-8 animate-fade-in-up stagger-5"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 flex items-center justify-center bg-[#0077B3]/10 border border-[#0077B3]/30">
                <DollarSign className="w-5 h-5 text-[#0077B3]" />
              </div>
              <p className="text-xs text-[#A0B6CD] uppercase tracking-wider">Financial</p>
            </div>
            <p className="stat-number text-5xl sm:text-6xl text-white">
              $4.9<span className="text-[#0077B3]">M</span>
            </p>
            <p className="text-sm text-[#A0B6CD] mt-3">average cost of a data breach in financial services</p>
          </div>

          <div
            data-testid="stat-card-manufacturing"
            className="grid-border-card p-8 animate-fade-in-up stagger-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 flex items-center justify-center bg-[#FF5722]/10 border border-[#FF5722]/30">
                <AlertTriangle className="w-5 h-5 text-[#FF5722]" />
              </div>
              <p className="text-xs text-[#A0B6CD] uppercase tracking-wider">Manufacturing</p>
            </div>
            <p className="stat-number text-5xl sm:text-6xl text-white">
              #1<span className="text-[#FF5722]"></span>
            </p>
            <p className="text-sm text-[#A0B6CD] mt-3">most-attacked industry by ransomware for 3 consecutive years</p>
          </div>
        </div>
      </div>
    </section>
  );
}
