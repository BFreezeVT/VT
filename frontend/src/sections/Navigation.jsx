import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav
      data-testid="navigation"
      role="navigation"
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#020812]/95 backdrop-blur-md border-b border-[#003B71]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          data-testid="nav-logo"
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-2.5"
        >
          <img src="https://customer-assets.emergentagent.com/job_jobsite-it-secure/artifacts/yo1g9lv0_2.png" alt="Veracity Technologies" className="w-8 h-8 object-contain" />
          <span className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
            VERACITY<span className="text-[#0077B3]"> TECHNOLOGIES</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <button data-testid="nav-ai" onClick={() => scrollTo("ai-service")} className="text-[#A0B6CD] hover:text-white text-sm transition-colors">AI</button>
          <button data-testid="nav-approach" onClick={() => scrollTo("approach")} className="text-[#A0B6CD] hover:text-white text-sm transition-colors">Approach</button>
          <button data-testid="nav-industries" onClick={() => scrollTo("industries")} className="text-[#A0B6CD] hover:text-white text-sm transition-colors">Industries</button>
          <button data-testid="nav-compliance" onClick={() => scrollTo("compliance")} className="text-[#A0B6CD] hover:text-white text-sm transition-colors">Compliance</button>
          <button data-testid="nav-faq" onClick={() => scrollTo("faq")} className="text-[#A0B6CD] hover:text-white text-sm transition-colors">FAQ</button>
          <a data-testid="nav-phone" href="tel:9529417333" className="flex items-center gap-2 text-[#A0B6CD] hover:text-white text-sm transition-colors">
            <Phone className="w-4 h-4" />
            (952) 941-7333
          </a>
          <Button
            data-testid="nav-cta"
            onClick={() => scrollTo("audit")}
            className="bg-white text-[#003B71] hover:bg-white/90 rounded-sm font-semibold text-sm px-5"
          >
            Schedule Audit
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          data-testid="mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div data-testid="mobile-menu" className="md:hidden bg-[#020812]/98 backdrop-blur-md border-t border-[#003B71] px-6 py-6 space-y-4 animate-fade-in">
          <button data-testid="mobile-nav-why" onClick={() => scrollTo("why-it")} className="block text-[#A0B6CD] hover:text-white text-sm">Why Us</button>
          <button data-testid="mobile-nav-approach" onClick={() => scrollTo("approach")} className="block text-[#A0B6CD] hover:text-white text-sm">Approach</button>
          <button data-testid="mobile-nav-industries" onClick={() => scrollTo("industries")} className="block text-[#A0B6CD] hover:text-white text-sm">Industries</button>
          <button data-testid="mobile-nav-ai" onClick={() => scrollTo("ai-service")} className="block text-[#A0B6CD] hover:text-white text-sm">AI</button>
          <button data-testid="mobile-nav-compliance" onClick={() => scrollTo("compliance")} className="block text-[#A0B6CD] hover:text-white text-sm">Compliance</button>
          <button data-testid="mobile-nav-faq" onClick={() => scrollTo("faq")} className="block text-[#A0B6CD] hover:text-white text-sm">FAQ</button>
          <a href="tel:9529417333" className="flex items-center gap-2 text-[#A0B6CD] hover:text-white text-sm">
            <Phone className="w-4 h-4" /> (952) 941-7333
          </a>
          <Button
            data-testid="mobile-nav-cta"
            onClick={() => scrollTo("audit")}
            className="w-full bg-white text-[#003B71] hover:bg-white/90 rounded-sm font-semibold"
          >
            Schedule Audit
          </Button>
        </div>
      )}
    </nav>
  );
}
