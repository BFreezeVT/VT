import { Link } from "react-router-dom";
import { MapPin, Phone, ArrowRight, ChevronLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import cityData from "../data/cityData";

export default function ServiceAreasIndex() {
  return (
    <div className="min-h-screen bg-[#f4f7fa]" data-testid="service-areas-index">
      {/* Nav */}
      <nav className="bg-[#003B71]/95 backdrop-blur-md border-b border-[#dfe6ee] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-[#1a2b42] font-bold text-xl tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
            VERACITY<span className="text-[#0077B3]"> TECHNOLOGIES</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" data-testid="areas-nav-home" className="text-[#4a5e78] hover:text-[#1a2b42] text-sm transition-colors flex items-center gap-1">
              <ChevronLeft className="w-3 h-3" /> Home
            </Link>
            <a href="tel:9529417333" className="flex items-center gap-2 text-[#4a5e78] hover:text-[#1a2b42] text-sm">
              <Phone className="w-4 h-4" /> (952) 941-7333
            </a>
          </div>
        </div>
      </nav>

      <main role="main">
        {/* Hero */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "IT Support Service Areas - Minneapolis-St. Paul Metro",
          description: "Veracity Technologies provides managed IT services and cybersecurity across 45 cities in the Minneapolis-St. Paul metro and Central Minnesota.",
          url: "https://www.veracitytech.com/service-areas",
          publisher: { "@type": "Organization", name: "Veracity Technologies" },
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.veracitytech.com/" },
            { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://www.veracitytech.com/service-areas" },
          ],
        }) }} />
        <section className="py-24 lg:py-32" aria-label="Service areas overview">
          <div className="max-w-7xl mx-auto px-6">
            <Link to="/" className="inline-flex items-center gap-1 text-[#0077B3] text-sm mb-6 hover:text-[#1a2b42] transition-colors">
              <ChevronLeft className="w-3 h-3" /> Back to Home
            </Link>
            <p className="overline text-[#0077B3] mb-4">Service Areas</p>
            <h1
              data-testid="areas-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-[#1a2b42] mb-6"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              IT Support Across the Twin Cities Metro
            </h1>
            <p className="text-base md:text-lg text-[#4a5e78] leading-relaxed max-w-3xl mb-4">
              We provide managed IT services and cybersecurity to {cityData.length} communities across the Minneapolis-St. Paul metro area. 
              Each city page below features localized content specific to the industries, challenges, and opportunities in that community.
            </p>
            <p className="text-sm text-[#4a5e78]/60">Headquartered at 5929 Baker Rd, Suite 420, Minnetonka, MN 55345</p>
          </div>
        </section>

        {/* City Grid */}
        <section className="pb-24 lg:pb-32" aria-label="All service area cities">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cityData.map((city, i) => (
                <Link
                  key={city.slug}
                  to={`/service-areas/${city.slug}`}
                  data-testid={`area-card-${city.slug}`}
                  className="grid-border-card p-6 group hover:border-[#0077B3] transition-colors block"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-[#0077B3]" />
                    <span className="overline text-[#0077B3] text-[10px]">{city.state} {city.zip}</span>
                  </div>
                  <h2
                    className="text-[#1a2b42] font-bold text-lg mb-2 group-hover:text-[#0077B3] transition-colors"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    IT Support in {city.name}
                  </h2>
                  <p className="text-[#4a5e78] text-sm leading-relaxed mb-4 line-clamp-2">
                    {city.subhead}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {city.localIndustries.slice(0, 3).map((ind, j) => (
                      <span key={j} className="text-[10px] text-[#0077B3] border border-[#dfe6ee] px-2 py-0.5">
                        {ind}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[#0077B3] text-sm font-medium group-hover:text-[#1a2b42] transition-colors">
                    View {city.name} page <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#003B71] border-t border-[#00325f] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#4a5e78]/60 text-xs">
            &copy; {new Date().getFullYear()} Veracity Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-[#4a5e78]">
            <a href="tel:9529417333" className="hover:text-[#1a2b42] transition-colors flex items-center gap-1">
              <Phone className="w-3 h-3" /> (952) 941-7333
            </a>
            <Link to="/" className="hover:text-[#1a2b42] transition-colors">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
