import { stringifyJsonLd } from "@/lib/jsonLd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ChevronLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import Breadcrumbs from "../../components/Breadcrumbs";
import HubSpotForm from "../../components/HubSpotForm";

const CONTACT_FORM_ID = "bf8e1dfe-fdde-49cf-a04f-04eba9e63e92";
const PAGE_URL = "https://www.veracitytechmn.com/contact";
const PAGE_TITLE = "Contact Us | Veracity Technologies";
const PAGE_DESC =
  "Contact Veracity Technologies in Minnetonka, MN. Call (952) 941-7333, email info@veracitytechmn.com, or send a message. Managed IT and cybersecurity for Twin Cities businesses.";

function ContactUsNav() {
  return (
    <nav className="bg-[#003B71]/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "Outfit" }}>
          VERACITY<span className="text-[#0077B3]"> TECHNOLOGIES</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" data-testid="contact-nav-home" className="text-[#94a8be] hover:text-white text-sm flex items-center gap-1">
            <ChevronLeft className="w-3 h-3" /> Home
          </Link>
          <a href="tel:9529417333" className="flex items-center gap-2 text-[#94a8be] hover:text-white text-sm">
            <Phone className="w-4 h-4" /> (952) 941-7333
          </a>
          <Link to="/business-technology-assessment" data-testid="contact-nav-cta">
            <Button className="bg-white text-[#1e6bb8] hover:bg-white/90 rounded-sm font-semibold text-sm px-5">
              Get Your Free Assessment
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function ContactUsFooter() {
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

export default function ContactUs() {
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
      { "@type": "ListItem", position: 2, name: "Contact Us", item: PAGE_URL },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0f1d32]" data-testid="contact-us-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(breadcrumbSchema) }} />

      <ContactUsNav />

      <main role="main">
        <section data-testid="contact-us-hero" className="py-24 lg:py-28">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="flex justify-center">
              <Breadcrumbs items={[{ label: "Contact Us" }]} />
            </div>
            <p className="overline text-[#0077B3] mb-4">Contact Us</p>
            <h1
              data-testid="contact-us-headline"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white mb-6"
              style={{ fontFamily: "Outfit" }}
            >
              Talk to a Real Person
            </h1>
            <p className="text-base md:text-lg text-[#94a8be] leading-relaxed mb-10 max-w-2xl mx-auto">
              Questions about managed IT, cybersecurity, or compliance? Send a message or reach us directly. A member of our team will get back to you.
            </p>
          </div>
        </section>

        <section className="pb-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid sm:grid-cols-3 gap-4 mb-12">
              <a
                href="tel:9529417333"
                data-testid="contact-phone-card"
                className="bg-[#0a1628] border border-white/10 rounded-lg p-6 hover:border-[#0077B3]/50 transition-colors"
              >
                <Phone className="w-6 h-6 text-[#0077B3] mb-3" />
                <p className="text-white font-semibold mb-1">Call us</p>
                <p className="text-[#94a8be] text-sm">(952) 941-7333</p>
              </a>
              <a
                href="mailto:info@veracitytechmn.com"
                data-testid="contact-email-card"
                className="bg-[#0a1628] border border-white/10 rounded-lg p-6 hover:border-[#0077B3]/50 transition-colors"
              >
                <Mail className="w-6 h-6 text-[#0077B3] mb-3" />
                <p className="text-white font-semibold mb-1">Email us</p>
                <p className="text-[#94a8be] text-sm">info@veracitytechmn.com</p>
              </a>
              <div data-testid="contact-address-card" className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
                <MapPin className="w-6 h-6 text-[#0077B3] mb-3" />
                <p className="text-white font-semibold mb-1">Visit us</p>
                <p className="text-[#94a8be] text-sm">5929 Baker Rd Suite 420, Minnetonka, MN 55345</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 sm:p-8">
              <HubSpotForm formId={CONTACT_FORM_ID} testId="contact-us-hubspot-form" />
            </div>
          </div>
        </section>
      </main>

      <ContactUsFooter />
    </div>
  );
}
