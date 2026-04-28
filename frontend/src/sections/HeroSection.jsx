import { Phone, ArrowDown } from "lucide-react";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";

const HERO_BG = "https://images.unsplash.com/photo-1604011237320-8e0506614fdf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwyfHxjeWJlcnNlY3VyaXR5JTIwQUklMjB0ZWNobm9sb2d5JTIwZGFyayUyMGFic3RyYWN0fGVufDB8fHxibHVlfDE3NzYyODM4NDJ8MA&ixlib=rb-4.1.0&q=85";

const rotatingWords = ["Cybersecurity", "AI Integration", "Compliance", "IT Infrastructure"];

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
            <p className="overline text-[#0077B3]">
              AI-Powered Managed IT &amp; Cybersecurity
            </p>
          </div>

          <h1
            data-testid="hero-headline"
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-white mb-8 animate-fade-in-up stagger-2"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Your Business Runs on Technology.
            <br />
            <span className="text-[#0077B3]">We Make Sure It&rsquo;s</span>
            <br />
            <span
              data-testid="rotating-word"
              className={`text-white transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}
            >
              {rotatingWords[wordIndex]}.
            </span>
          </h1>

          <p
            data-testid="hero-subhead"
            className="text-base md:text-lg text-[#d0dce8] leading-relaxed mb-10 max-w-2xl animate-fade-in-up stagger-3"
          >
            AI-driven threat detection. Industry-specialized compliance. 24/7 expert support.
            We protect and power businesses across construction, financial services, manufacturing, 
            and high-compliance industries.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-in-up stagger-4">
            <Button
              data-testid="hero-cta-button"
              onClick={() => scrollTo("audit")}
              className="bg-white text-[#1e6bb8] hover:bg-white/90 rounded-sm font-bold text-base px-8 h-12 animate-pulse-glow"
            >
              Get Your Free Security Audit
            </Button>
            <a
              data-testid="hero-phone-link"
              href="tel:9529417333"
              className="flex items-center gap-2 text-[#d0dce8] hover:text-white transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              Or call (952) 941-7333
            </a>
          </div>

          {/* Trust badges inline */}
          <div className="mt-14 flex flex-wrap items-center gap-6 animate-fade-in-up stagger-5">
            {["SOC 2 Compliant", "CMMC Registered", "24/7 AI Monitoring", "CRN MSP 500"].map((badge) => (
              <span key={badge} className="text-[10px] uppercase tracking-[0.15em] text-[#d0dce8]/60 border border-[#1e6bb8]/50 px-3 py-1.5">
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <button
            data-testid="scroll-indicator"
            onClick={() => scrollTo("intro-stats")}
            className="text-[#d0dce8] hover:text-white transition-colors"
            aria-label="Scroll down"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
