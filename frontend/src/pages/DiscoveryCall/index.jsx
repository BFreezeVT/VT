import { stringifyJsonLd } from "@/lib/jsonLd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, ChevronLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import Breadcrumbs from "../../components/Breadcrumbs";
import HubSpotForm from "../../components/HubSpotForm";

const DISCOVERY_FORM_ID = "8ec4ccdb-2282-4bde-a039-5fac32ca2ef7";
const PAGE_URL = "https://www.veracitytechmn.com/discovery-call";
const PAGE_TITLE = "Book a Free Discovery Call | Veracity Technologies";
const PAGE_DESC =
  "Book a free discovery call with Veracity Technologies. A short conversation about your IT, cybersecurity, and compliance needs, with no obligation.";

function DiscoveryCallNav() {
  return (
    <nav className="bg-[#003B71]/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "Outfit" }}>
          VERACITY<span className="text-[#0077B3]"> TECHNOLOGIES</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" data-testid="discovery-nav-home" className="text-[#94a8be] hover:text-white text-sm flex items-center gap-1">
            <ChevronLeft className="w-3 h-3" /> Home
          </Link>
          <a href="tel:9529417333" className="flex items-center gap-2 text-[#94a8be] hover:text-white text-sm">
            <Phone className="w-4 h-4" /> (952) 941-7333
          </a>
          <Link to="/business-technology-assessment" data-testid="discovery-nav-cta">
            <Button className="bg-white text-[#1e6bb8] hover:bg-white/90 rounded-sm font-semibold text-sm px-5">
              Get Your Free Assessment
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function DiscoveryCallFooter() {
  return (
    <footer className="bg-[#003B71] border-t border-[#00325f] py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[#94a8be]/60 text-xs">&copy; {new Date().getFullYear()} Veracity Technologies. All rights reserved.</p>
        <div className="flex items-center gap-6 text-sm text-[#94a8be]">
          <a href="tel:9529417333" className="hover:text-white flex items-center gap-1">
            <Phone className="w-3 h-3" /> (952) 941-7333
          </a>
          <Link to="/" className="hover:text-white">
            Home
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default function DiscoveryCall() {
  useEffect(() => {
    document.title = PAGE_TITLE;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", PAGE_DESC);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", PAGE_URL);
    return () => {
      document.title = "Veracity Technologies | AI-Powered Cybersecurity & Managed IT";
      if (metaDesc)
        metaDesc.setAttribute(
          "content",
          "Managed IT & cybersecurity for Minnesota businesses, powered by AI and automation. SOC 2 compliant, CMMC registered. Free assessment available."
        );
      if (canonical) canonical.setAttribute("href", "https://www.veracitytechmn.com/");
    };
  }, []);

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: PAGE_TITLE,
    description: PAGE_DESC,
    url: PAGE_URL,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.veracitytechmn.com/" },
      { "@type": "ListItem", position: 2, name: "Discovery Call", item: PAGE_URL },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0f1d32]" data-testid="discovery-call-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(breadcrumbSchema) }} />

      <DiscoveryCallNav />

      <main role="main">
        <section data-testid="discovery-call-hero" className="py-24 lg:py-28">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="flex justify-center">
              <Breadcrumbs items={[{ label: "Discovery Call" }]} />
            </div>
            <p className="overline text-[#0077B3] mb-4">Discovery Call</p>
            <h1
              data-testid="discovery-call-headline"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white mb-6"
              style={{ fontFamily: "Outfit" }}
            >
              Book Your Free Discovery Call
            </h1>
            <p className="text-base md:text-lg text-[#94a8be] leading-relaxed mb-10 max-w-2xl mx-auto">
              A short, no-pressure conversation about your technology, security, and compliance needs. Pick a time that works for you and we will take it from there.
            </p>
          </div>
        </section>

        <section className="pb-20">
          <div className="max-w-3xl mx-auto px-6">
            <div className="bg-white rounded-lg p-6 sm:p-8">
              <HubSpotForm formId={DISCOVERY_FORM_ID} testId="discovery-call-hubspot-form" />
            </div>
            <p className="text-center text-[#94a8be] text-sm mt-6">
              Prefer to talk now? Call us at{" "}
              <a href="tel:9529417333" className="text-white hover:text-[#0077B3] transition-colors">
                (952) 941-7333
              </a>
              .
            </p>
          </div>
        </section>
      </main>

      <DiscoveryCallFooter />
    </div>
  );
}
