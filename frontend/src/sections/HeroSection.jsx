import { Phone, ArrowDown, ShieldCheck } from "lucide-react";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";

const HERO_BG = "https://images.unsplash.com/photo-1604011237320-8e0506614fdf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwyfHxjeWJlcnNlY3VyaXR5JTIwQUklMjB0ZWNobm9sb2d5JTIwZGFyayUyMGFic3RyYWN0fGVufDB8fHxibHVlfDE3NzYyODM4NDJ8MA&ixlib=rb-4.1.0&q=85";

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
      aria-label="Veracity Technologies - AI-Powered Cybersecurity and Managed IT"
      className="relative min-h-screen flex items-center justify-start overflow-hidden"
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      <div className="absolute inset-0 bg-[#112240]/85" />

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
              AI-Driven Managed Intelligence
            </p>
          </div>

          <h1
            data-testid="hero-headline"
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-white mb-8 animate-fade-in-up stagger-2 drop-shadow-lg"
            style={{ fontFamily: "Outfit, sans-serif", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
          >
            Your business should run smarter, safer, and
            <br />
            <span className="text-[#0077B3]">with less manual drag.</span>
          </h1>

          <p
            data-testid="hero-subhead"
            className="text-base md:text-lg text-white/85 leading-relaxed mb-10 max-w-2xl animate-fade-in-up stagger-3"
          >
            Veracity helps businesses use AI, automation, and intelligent systems to reduce operational risk, improve visibility, and eliminate inefficiency.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-in-up stagger-4">
            <Button
              data-testid="hero-cta-button"
              onClick={() => scrollTo("audit")}
              className="bg-[#0077B3] text-white hover:bg-[#005f8f] rounded-sm font-bold text-base px-8 h-12 animate-pulse-glow"
            >
              Start Your AI Business Intelligence Assessment
            </Button>
            <a
              data-testid="hero-phone-link"
              href="tel:9529417333"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              Or call (952) 941-7333
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-14 flex flex-wrap items-center gap-4 animate-fade-in-up stagger-5">
            {[
              { label: "AI Governance Certified" },
              { label: "SOC 2 Type I" },
              { label: "HIPAA Compliant" },
              { label: "CRN MSP 500" },
              { label: "ISO 27001" },
              { label: "Amazon Bestselling Authors" },
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
