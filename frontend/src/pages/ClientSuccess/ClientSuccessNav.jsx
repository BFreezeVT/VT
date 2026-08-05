import { Link } from "react-router-dom";
import { Phone, ChevronLeft } from "lucide-react";
import { Button } from "../../components/ui/button";

export default function ClientSuccessNav() {
  return (
    <nav className="bg-[#003B71]/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "Outfit" }}>
          VERACITY<span className="text-[#0077B3]"> TECHNOLOGIES</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" data-testid="client-success-nav-home" className="text-[#94a8be] hover:text-white text-sm flex items-center gap-1">
            <ChevronLeft className="w-3 h-3" /> Home
          </Link>
          <a href="tel:9529417333" className="flex items-center gap-2 text-[#94a8be] hover:text-white text-sm">
            <Phone className="w-4 h-4" /> (952) 941-7333
          </a>
          <Link to="/business-technology-assessment" data-testid="client-success-nav-cta">
            <Button className="bg-white text-[#1e6bb8] hover:bg-white/90 rounded-sm font-semibold text-sm px-5">
              Get Your Free Assessment
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
