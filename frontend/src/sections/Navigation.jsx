import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

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
        scrolled ? "bg-white/95 backdrop-blur-md border-b border-[#d0dcea] shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          data-testid="nav-logo"
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-2.5"
        >
          <img src="https://customer-assets.emergentagent.com/job_jobsite-it-secure/artifacts/yo1g9lv0_2.png" alt="Veracity Technologies" className="w-14 h-14 object-contain brightness-200 drop-shadow-[0_0_8px_rgba(0,119,179,0.4)]" />
          <span className={`font-extrabold text-xl tracking-tight transition-colors duration-300 ${scrolled ? "text-[#0a1220]" : "text-white"}`} style={{ fontFamily: "Outfit, sans-serif" }}>
            VERACITY<span className="text-[#0077B3]"> TECHNOLOGIES</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <button data-testid="nav-ai" onClick={() => scrollTo("ai-service")} className={`text-sm font-semibold transition-colors ml-4 ${scrolled ? "text-[#0a1220] hover:text-[#0077B3]" : "text-white/90 hover:text-white"}`}>Automation</button>
          <button data-testid="nav-approach" onClick={() => scrollTo("approach")} className={`text-sm font-semibold transition-colors ${scrolled ? "text-[#0a1220] hover:text-[#0077B3]" : "text-white/90 hover:text-white"}`}>How We Deliver</button>
          <button data-testid="nav-industries" onClick={() => scrollTo("industries")} className={`text-sm font-semibold transition-colors ${scrolled ? "text-[#0a1220] hover:text-[#0077B3]" : "text-white/90 hover:text-white"}`}>Who We Serve</button>
          <button data-testid="nav-compliance" onClick={() => scrollTo("compliance")} className={`text-sm font-semibold transition-colors ${scrolled ? "text-[#0a1220] hover:text-[#0077B3]" : "text-white/90 hover:text-white"}`}>Governance</button>
          <button data-testid="nav-faq" onClick={() => scrollTo("faq")} className={`text-sm font-semibold transition-colors ${scrolled ? "text-[#0a1220] hover:text-[#0077B3]" : "text-white/90 hover:text-white"}`}>FAQ</button>
          <Link to="/cyber-risk-scorecard" data-testid="nav-scorecard" className="text-[#0077B3] hover:text-[#00a0e4] text-sm font-semibold transition-colors">Risk Score</Link>
          <a data-testid="nav-phone" href="tel:9529417333" className={`flex items-center gap-2 text-sm transition-colors ${scrolled ? "text-[#0a1220] hover:text-[#0077B3]" : "text-white/80 hover:text-white"}`}>
            <Phone className="w-4 h-4" />
            (952) 941-7333
          </a>
          <Button
            data-testid="nav-cta"
            onClick={() => scrollTo("audit")}
            className="bg-[#0077B3] text-white hover:bg-[#005f8f] rounded-sm font-semibold text-sm px-5"
          >
            Schedule Audit
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          data-testid="mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden transition-colors ${scrolled ? "text-[#0a1220]" : "text-white"}`}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div data-testid="mobile-menu" className="md:hidden bg-[#003B71]/98 backdrop-blur-md border-t border-[#003B71] px-6 py-6 space-y-4 animate-fade-in">
          <button data-testid="mobile-nav-why" onClick={() => scrollTo("why-it")} className="block text-[#0a1220] hover:text-[#0077B3] text-sm">Why Us</button>
          <button data-testid="mobile-nav-approach" onClick={() => scrollTo("approach")} className="block text-[#0a1220] hover:text-[#0077B3] text-sm">How We Deliver</button>
          <button data-testid="mobile-nav-industries" onClick={() => scrollTo("industries")} className="block text-[#0a1220] hover:text-[#0077B3] text-sm">Who We Serve</button>
          <button data-testid="mobile-nav-ai" onClick={() => scrollTo("ai-service")} className="block text-[#0a1220] hover:text-[#0077B3] text-sm">Automation</button>
          <button data-testid="mobile-nav-compliance" onClick={() => scrollTo("compliance")} className="block text-[#0a1220] hover:text-[#0077B3] text-sm">Governance</button>
          <button data-testid="mobile-nav-faq" onClick={() => scrollTo("faq")} className="block text-[#0a1220] hover:text-[#0077B3] text-sm">FAQ</button>
          <a href="tel:9529417333" className="flex items-center gap-2 text-[#0a1220] hover:text-[#0077B3] text-sm">
            <Phone className="w-4 h-4" /> (952) 941-7333
          </a>
          <Button
            data-testid="mobile-nav-cta"
            onClick={() => scrollTo("audit")}
            className="w-full bg-[#0077B3] text-white hover:bg-[#005f8f] rounded-sm font-semibold"
          >
            Schedule Audit
          </Button>
        </div>
      )}
    </nav>
  );
}
