import { Link } from "react-router-dom";
import { ChevronLeft, Phone } from "lucide-react";

export default function BlogPostNav() {
  return (
    <nav className="bg-[#003B71]/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "Outfit" }}>
          VERACITY<span className="text-[#0077B3]"> TECHNOLOGIES</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/resources" className="text-[#94a8be] hover:text-white text-sm flex items-center gap-1">
            <ChevronLeft className="w-3 h-3" /> All Articles
          </Link>
          <a href="tel:9529417333" className="flex items-center gap-2 text-[#94a8be] hover:text-white text-sm">
            <Phone className="w-4 h-4" /> (952) 941-7333
          </a>
        </div>
      </div>
    </nav>
  );
}
