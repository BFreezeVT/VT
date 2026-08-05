import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

export default function HRSFooter() {
  return (
    <footer className="bg-[#003B71] border-t border-[#00325f] py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[#94a8be]/60 text-xs">&copy; {new Date().getFullYear()} Veracity Technologies. All rights reserved.</p>
        <div className="flex items-center gap-6 text-sm text-[#94a8be]">
          <a href="tel:9529417333" className="hover:text-white flex items-center gap-1"><Phone className="w-3 h-3" /> (952) 941-7333</a>
          <Link to="/" className="hover:text-white">Home</Link>
        </div>
      </div>
    </footer>
  );
}
