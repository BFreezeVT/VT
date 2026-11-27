import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, ChevronLeft, CheckCircle2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { stringifyJsonLd } from "@/lib/jsonLd";
import { buildBreadcrumbSchema, buildWebPageSchema } from "./offerSchemas";

const HOME_TITLE = "Veracity Technologies | AI-Powered Cybersecurity & Managed IT";
const HOME_DESC = "Managed IT & cybersecurity for Minnesota businesses, powered by AI and automation. SOC 2 compliant, CMMC registered. Free assessment available.";
const HOME_CANONICAL = "https://www.veracitytechmn.com/";

function OfferNav() {
  return (
    <nav className="bg-[#003B71]/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "Outfit" }}>
          VERACITY<span className="text-[#0077B3]"> TECHNOLOGIES</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-[#94a8be] hover:text-white text-sm flex items-center gap-1">
            <ChevronLeft className="w-3 h-3" /> Home
          </Link>
          <a href="tel:9529417333" className="flex items-center gap-2 text-[#94a8be] hover:text-white text-sm">
            <Phone className="w-4 h-4" /> (952) 941-7333
          </a>
          <Link to="/business-technology-assessment">
            <Button className="bg-white text-[#1e6bb8] hover:bg-white/90 rounded-sm font-semibold text-sm px-5">
              Get Your Free Assessment
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function OfferFooter() {
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

function OfferCTA({ title, text, buttonText }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <CheckCircle2 className="w-10 h-10 text-[#0077B3] mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0f1d32] mb-4" style={{ fontFamily: "Outfit" }}>
          {title}
        </h2>
        <p className="text-[#3a5068] text-base mb-8 max-w-xl mx-auto">{text}</p>
        <Link to="/business-technology-assessment">
          <Button className="bg-[#003B71] hover:bg-[#002a52] text-white rounded-sm font-semibold px-8 h-12">
            {buttonText}
          </Button>
        </Link>
        <p className="text-[#4a5e78] text-xs mt-3">Or call (952) 941-7333</p>
      </div>
    </section>
  );
}

/**
 * Shared layout for the buyer offer pages ported from veracitytech.com.
 * Handles title, meta description, canonical, JSON-LD, slim nav, CTA, and footer.
 */
export default function OfferLayout({ title, description, slug, pageName, testId, cta, extraSchemas, children }) {
  useEffect(() => {
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", `https://www.veracitytechmn.com/${slug}`);
    return () => {
      document.title = HOME_TITLE;
      if (metaDesc) metaDesc.setAttribute("content", HOME_DESC);
      if (canonical) canonical.setAttribute("href", HOME_CANONICAL);
    };
  }, [title, description, slug]);

  return (
    <div className="min-h-screen bg-[#0f1d32]" data-testid={testId}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(buildWebPageSchema(title, description, slug)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(buildBreadcrumbSchema(pageName, slug)) }} />
      {(extraSchemas || []).map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(schema) }} />
      ))}

      <OfferNav />

      <main role="main">{children}</main>

      {cta ? <OfferCTA title={cta.title} text={cta.text} buttonText={cta.buttonText} /> : null}

      <OfferFooter />
    </div>
  );
}
