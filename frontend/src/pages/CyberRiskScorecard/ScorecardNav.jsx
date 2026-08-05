import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

export default function ScorecardNav() {
  return (
    <nav className="bg-[#003B71]/95 backdrop-blur-md border-b border-[#003B71] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="https://customer-assets.emergentagent.com/job_jobsite-it-secure/artifacts/yo1g9lv0_2.png" alt="Veracity" className="w-14 h-14 object-contain brightness-200 drop-shadow-[0_0_8px_rgba(0,119,179,0.4)]" />
          <span className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "Outfit" }}>VERACITY<span className="text-[#0077B3]"> TECHNOLOGIES</span></span>
        </Link>
        <a href="tel:9529417333" className="hidden sm:flex items-center gap-2 text-white/80 hover:text-white text-sm"><Phone className="w-4 h-4" /> (952) 941-7333</a>
      </div>
    </nav>
  );
}
