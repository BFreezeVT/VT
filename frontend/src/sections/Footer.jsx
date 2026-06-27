import { Phone, Mail, MapPin, Linkedin, Youtube, Facebook } from "lucide-react";
import { Separator } from "../components/ui/separator";
import { Link } from "react-router-dom";

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      data-testid="footer"
      role="contentinfo"
      aria-label="Veracity Technologies contact information, credentials, and affiliations"
      className="bg-[#020812] border-t border-white/5 pt-16 pb-8"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="max-w-[300px] overflow-hidden mb-1" style={{ marginBottom: "-8px" }}>
              <img
                src="https://customer-assets.emergentagent.com/job_jobsite-it-secure/artifacts/3n092vnp_1.png"
                alt="Veracity Technologies - Rely On Us"
                className="w-full h-auto object-contain brightness-125 scale-110"
                style={{ marginTop: "-10%", marginBottom: "-15%" }}
                data-testid="footer-logo"
              />
            </div>
            <div className="flex items-center justify-center gap-4 mt-3 max-w-[300px]">
              <a
                data-testid="footer-linkedin"
                href="https://www.linkedin.com/company/veracity-technologies/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Veracity Technologies on LinkedIn"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-[#0077B3] text-white hover:bg-[#003B71] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                data-testid="footer-youtube"
                href="https://www.youtube.com/@VeracityTechnologies"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Veracity Technologies on YouTube"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-[#FF0000] text-white hover:bg-[#cc0000] transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                data-testid="footer-facebook"
                href="https://www.facebook.com/veracitytech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Veracity Technologies on Facebook"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-[#1877F2] text-white hover:bg-[#0d65d9] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="overline text-[#94a8be] mb-4">Navigate</p>
            <div className="space-y-2">
              <button data-testid="footer-link-why" onClick={() => scrollTo("why-it")} className="block text-[#94a8be] hover:text-white text-sm transition-colors">Why Specialized IT</button>
              <button data-testid="footer-link-approach" onClick={() => scrollTo("approach")} className="block text-[#94a8be] hover:text-white text-sm transition-colors">Our Approach</button>
              <button data-testid="footer-link-industries" onClick={() => scrollTo("industries")} className="block text-[#94a8be] hover:text-white text-sm transition-colors">Industries</button>
              <button data-testid="footer-link-ai" onClick={() => scrollTo("ai-service")} className="block text-[#94a8be] hover:text-white text-sm transition-colors">AI as a Service</button>
              <button data-testid="footer-link-compliance" onClick={() => scrollTo("compliance")} className="block text-[#94a8be] hover:text-white text-sm transition-colors">Compliance</button>
              <button data-testid="footer-link-faq" onClick={() => scrollTo("faq")} className="block text-[#94a8be] hover:text-white text-sm transition-colors">FAQ</button>
              <button data-testid="footer-link-audit" onClick={() => scrollTo("audit")} className="block text-[#0077B3] hover:text-white text-sm transition-colors font-medium">Free Audit</button>
              <Link data-testid="footer-link-areas" to="/service-areas" className="block text-[#94a8be] hover:text-white text-sm transition-colors mt-1">Service Areas</Link>
              <Link data-testid="footer-link-resources" to="/resources" className="block text-[#94a8be] hover:text-white text-sm transition-colors">Resources</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="overline text-[#94a8be] mb-4">Contact</p>
            <div className="space-y-3">
              <a
                data-testid="footer-phone"
                href="tel:9529417333"
                className="flex items-center gap-2 text-[#94a8be] hover:text-white text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-[#0077B3]" />
                (952) 941-7333
              </a>
              <a
                data-testid="footer-email"
                href="mailto:info@veracitytech.com"
                className="flex items-center gap-2 text-[#94a8be] hover:text-white text-sm transition-colors"
              >
                <Mail className="w-4 h-4 text-[#0077B3]" />
                info@veracitytech.com
              </a>
              <div className="flex items-start gap-2 text-[#94a8be] text-sm">
                <MapPin className="w-4 h-4 text-[#0077B3] mt-0.5 flex-shrink-0" />
                <span>Minneapolis-St. Paul, MN</span>
              </div>
            </div>
          </div>

          {/* Affiliations */}
          <div>
            <p className="overline text-[#94a8be] mb-4">Credentials</p>
            <div className="space-y-2 text-sm text-[#94a8be]">
              <p data-testid="footer-credential-0">CMMC Registered Provider</p>
              <p data-testid="footer-credential-1">ISO 27001 Aligned</p>
              <p data-testid="footer-credential-2">CompTIA Security+ Certified</p>
            </div>
            <Separator className="my-4 bg-[#1e6bb8]" />
            <p className="overline text-[#94a8be] mb-2">Affiliations</p>
            <div className="space-y-1 text-sm text-[#94a8be]">
              <p data-testid="footer-affiliation-agc">AGC of America</p>
              <p data-testid="footer-affiliation-abc">ABC (Associated Builders and Contractors)</p>
            </div>
          </div>
        </div>

        <Separator className="bg-[#1e6bb8] mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p data-testid="footer-copyright" className="text-[#94a8be]/60 text-xs">
            &copy; {new Date().getFullYear()} Veracity Technologies. All rights reserved. &middot; Last updated December 2025
          </p>
          <div className="flex items-center gap-4 text-xs text-[#94a8be]/60">
            <button data-testid="footer-privacy" className="hover:text-white transition-colors">Privacy Policy</button>
            <button data-testid="footer-terms" className="hover:text-white transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
