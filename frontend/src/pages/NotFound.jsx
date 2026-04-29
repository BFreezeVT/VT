import { Link } from "react-router-dom";
import { ShieldAlert, Phone, ChevronLeft } from "lucide-react";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f1d32] flex flex-col" data-testid="not-found-page">
      <nav className="bg-[#003B71]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "Outfit" }}>
            VERACITY<span className="text-[#0077B3]"> TECHNOLOGIES</span>
          </Link>
          <a href="tel:9529417333" className="flex items-center gap-2 text-[#94a8be] hover:text-white text-sm">
            <Phone className="w-4 h-4" /> (952) 941-7333
          </a>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <div className="w-16 h-16 mx-auto flex items-center justify-center bg-[#FF5722]/10 border border-[#FF5722]/30 mb-6">
            <ShieldAlert className="w-8 h-8 text-[#FF5722]" />
          </div>
          <p className="stat-number text-6xl text-white mb-4">404</p>
          <h1 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "Outfit" }}>
            Page Not Found
          </h1>
          <p className="text-[#94a8be] text-sm mb-8">
            This page doesn&rsquo;t exist or may have been moved. Let&rsquo;s get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button className="bg-white text-[#1e6bb8] hover:bg-white/90 rounded-sm font-semibold px-6 h-11">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back to Home
              </Button>
            </Link>
            <Link to="/service-areas">
              <Button className="bg-transparent border border-white/10 hover:border-[#0077B3] text-white rounded-sm font-semibold px-6 h-11">
                Service Areas
              </Button>
            </Link>
            <Link to="/resources">
              <Button className="bg-transparent border border-white/10 hover:border-[#0077B3] text-white rounded-sm font-semibold px-6 h-11">
                Resources
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[#94a8be]/60 text-xs">&copy; {new Date().getFullYear()} Veracity Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
