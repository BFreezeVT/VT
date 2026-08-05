import { ArrowDown, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

const HERO_BG = "https://static.prod-images.emergentagent.com/jobs/a66d851c-ab3d-4669-9a37-bc99f9119744/images/2f29bcce375d4712b5aa01938a4096d1602abc943eee9db99360a5fcce4fb3c8.jpeg";

const rotatingWords = ["AI-Driven", "Automated", "Intelligent", "Optimized"];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % rotatingWords.length);
        setFade(true);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      data-testid="hero-section"
      aria-label="Veracity Technologies - AI-Driven Managed Intelligence"
      className="relative min-h-screen flex items-center justify-start overflow-hidden"
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1220]/95 via-[#0f1d32]/75 to-[#0f1d32]/50" />

      {/* Animated grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #0077B3 1px, transparent 0)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 w-full">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-8 animate-fade-in-up stagger-1">
            <div className="w-2 h-2 rounded-full bg-[#0077B3] animate-pulse" />
            <p className="text-base sm:text-lg font-bold uppercase tracking-[0.15em] text-[#00a0e4]">
              The Modern MSP for Organizations Ready to Move Beyond Reactive IT
            </p>
          </div>

          <h1
            data-testid="hero-headline"
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-white mb-8 animate-fade-in-up stagger-2 drop-shadow-lg"
            style={{ fontFamily: "Outfit, sans-serif", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
          >
            Managed IT &amp; Cybersecurity
            <br />
            <span className="text-[#0077B3]">Built for the AI + Automation World.</span>
          </h1>

          <p
            data-testid="hero-subhead"
            className="text-base md:text-lg text-white/85 leading-relaxed mb-10 max-w-2xl animate-fade-in-up stagger-3"
          >
            Helping organizations reduce risk, improve visibility, strengthen cybersecurity, leverage AI responsibly, modernize operations, and make smarter technology decisions.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-in-up stagger-4">
            <a
              data-testid="hero-cta-button"
              href="tel:9529417333"
              className="bg-[#0077B3] text-white hover:bg-[#005f8f] rounded-sm font-bold text-base px-8 h-12 animate-pulse-glow inline-flex items-center justify-center"
            >
              Schedule a Strategy Discussion
            </a>
            <button
              data-testid="hero-secondary-cta"
              onClick={() => scrollTo("audit")}
              className="flex items-center gap-2 border border-white/25 hover:border-white/50 rounded-sm px-6 h-12 text-white text-sm font-semibold transition-all"
            >
              Take the Business Technology Assessment
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-14 flex flex-wrap items-center gap-4 animate-fade-in-up stagger-5">
            {[
              { label: "Managed IT Services" },
              { label: "Cybersecurity" },
              { label: "SOC 2 Type I" },
              { label: "HIPAA Compliant" },
              { label: "CRN MSP 500" },
              { label: "AI + Automation" },
            ].map((badge) => (
              <span key={badge.label} className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-white/90 border border-white/30 bg-white/10 px-3 py-2 rounded">
                <ShieldCheck className="w-3 h-3 text-[#0077B3]" />
                {badge.label}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <button
            data-testid="scroll-indicator"
            onClick={() => scrollTo("intro-stats")}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Scroll down"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
