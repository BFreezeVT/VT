import { Phone, ArrowDown } from "lucide-react";
import { Button } from "../components/ui/button";

const HERO_BG = "https://static.prod-images.emergentagent.com/jobs/a4251189-ed5f-43ed-b8ac-224a99473a6d/images/755e40885bf612d0a90f9e7d5acb7000d6297c9bf69e34da7d49ec1541dea8ff.png";

export default function HeroSection() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-start overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      <div className="absolute inset-0 hero-overlay" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 w-full">
        <div className="max-w-3xl">
          <p className="overline text-[#0077B3] mb-6 animate-fade-in-up stagger-1">
            Managed IT &amp; Cybersecurity
          </p>
          <h1
            data-testid="hero-headline"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white mb-6 animate-fade-in-up stagger-2"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Stop Downtime Before It Stops Your Business.
          </h1>
          <p
            data-testid="hero-subhead"
            className="text-base md:text-lg text-[#A0B6CD] leading-relaxed mb-10 max-w-2xl animate-fade-in-up stagger-3"
          >
            Industry-specialized IT and cybersecurity for construction, financial services, manufacturing, and high-compliance organizations. Your crews stay connected, your data stays safe, and your operations stay on schedule.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-in-up stagger-4">
            <Button
              data-testid="hero-cta-button"
              onClick={() => scrollTo("audit")}
              className="bg-white text-[#003B71] hover:bg-white/90 rounded-sm font-bold text-base px-8 h-12 animate-pulse-glow"
            >
              Schedule Your Free Audit
            </Button>
            <a
              data-testid="hero-phone-link"
              href="tel:9529417333"
              className="flex items-center gap-2 text-[#A0B6CD] hover:text-white transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              Or call (952) 941-7333
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <button
            data-testid="scroll-indicator"
            onClick={() => scrollTo("intro-stats")}
            className="text-[#A0B6CD] hover:text-white transition-colors"
            aria-label="Scroll down"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
