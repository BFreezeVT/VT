import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

export default function ScorecardFooter() {
  return (
    <footer className="bg-white border-t border-[#e2e8f0] py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[#94a3b8] text-xs">&copy; {new Date().getFullYear()} Veracity Technologies. All rights reserved.</p>
        <div className="flex items-center gap-6 text-sm text-[#4a5e78]">
          <a href="tel:9529417333" className="hover:text-[#003B71] flex items-center gap-1"><Phone className="w-3 h-3" /> (952) 941-7333</a>
          <Link to="/" className="hover:text-[#003B71]">Home</Link>
        </div>
      </div>
    </footer>
  );
}
