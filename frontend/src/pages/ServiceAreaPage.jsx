import { useParams, Link } from "react-router-dom";
import { Phone, MapPin, ArrowRight, Shield, Wifi, Clock, ChevronLeft, Building2, Quote } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import { useState } from "react";
import cityData from "../data/cityData";

const allTestimonials = [
  { name: "Cody Nuernberg", title: "President", company: "BLD Connection", quote: "Veracity Technologies has helped streamline our company's operations. Their proactive, responsive, and knowledgeable team minimizes downtime and ensures consistent operations." },
  { name: "Ryan Morris", title: "Vice President", company: "Fraser Morris", quote: "Their prompt response to issues and the expertise of the technical staff, who intimately understand our systems for complex projects, has been invaluable." },
  { name: "Lauren Holec", title: "Manager", company: "Athena Actuarial", quote: "Their exceptional responsiveness ensures our questions and issues are addressed within hours. What sets Veracity apart is their unique blend of large-scale expertise and small-firm collaboration." },
  { name: "Mike Schultz", title: "Owner", company: "Surface Solutions", quote: "Since partnering with Veracity Technologies, our productivity has soared thanks to their exceptional responsiveness and efficient handling of IT issues." },
  { name: "Kaitie Firm", title: "Operations & Special Project Manager", company: "Juut SalonSpa", quote: "Quick response time, efficient problem-solving, and seamless understanding of technology complexities have saved us time and headaches." },
  { name: "Dustin Benz", title: "President", company: "iSpace Environments", quote: "Working with Veracity Technologies has reshaped our IT landscape with tailored solutions prioritizing reliability and efficiency." },
  { name: "Matthew Pince", title: "Operations", company: "Pulse Products", quote: "The single biggest benefit has been their proactive approach, which gives us peace of mind and helps us avoid any potential downtime." },
  { name: "Jordan Sanford", title: "Vice President", company: "Prestige Global Meeting Source", quote: "Partnering with Veracity Technologies has transformed our organization by instilling immense confidence at all levels." },
  { name: "Linda Sobkowiak", title: "Director of Operations", company: "Stubbe and Associates", quote: "They not only provide technical support but also evaluate and mitigate risks specific to our industry and operations." },
  { name: "Mark Schulte", title: "President", company: "VIA Actuarial Solutions", quote: "Veracity Technologies has greatly transformed our IT landscape, ensuring a seamless transition to remote work and modernizing our infrastructure." },
  { name: "Shelley Rice", title: "Operations Manager", company: "Foreman and Airhart", quote: "Their ability to understand and cater to each client's unique working environment sets them apart." },
  { name: "Nadine Wikstrom", title: "Director of Operations", company: "SEIU Local 284", quote: "With over 12 years of partnership, Veracity's professionalism and commitment to tailored solutions have been unmatched." },
  { name: "Aaron Lindberg", title: "Chief Investment Officer", company: "Kingdom Legacy Advisors", quote: "Their expertise and personalized support ensure efficient operations without the hassle of managing multiple vendors." },
  { name: "Janet Johnson", title: "Legal Administrator", company: "Gregerson, Rosow, Johnson, and Nilan", quote: "Their deep understanding of our systems ensures they provide tailored advice without upselling. Their prompt responsiveness and personalized service distinguish them." },
  { name: "Jesse Hallstrom", title: "CFO", company: "Hempel Companies", quote: "They swiftly solve problems, ensuring smooth business continuity. Their transparent, fair pricing and dedicated client focus set them apart." },
  { name: "Gretchen Postula", title: "Managing Director", company: "North Sky Capital", quote: "Their quarterly business reviews strengthen our partnership, aligning technology with our business objectives." },
  { name: "Ellen Qureshi", title: "CCO", company: "Black Lake Investments", quote: "Their commitment to SOC reporting underscores their strong internal controls and operational oversight." },
  { name: "Robbin Stusse", title: "Operations Manager", company: "Edelmann and Associates", quote: "The comprehensive support for all our IT needs makes them feel like an extension of our own team." },
  { name: "Karen Engen", title: "President", company: "Practice Builders", quote: "Their ability to swiftly resolve issues ensures minimal disruption to our operations." },
  { name: "Bob Harris", title: "Controller", company: "Salon Only Sales", quote: "Their commitment to integrating innovative technologies and enhancing our network security has been transformative." },
];

export default function ServiceAreaPage() {
  const { citySlug } = useParams();
  const city = cityData.find((c) => c.slug === citySlug);
  const [submitted, setSubmitted] = useState(false);

  if (!city) {
    return (
      <div className="min-h-screen bg-[#020812] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Page Not Found</h1>
          <p className="text-[#A0B6CD] mb-8">This service area page doesn't exist.</p>
          <Link to="/" className="text-[#0077B3] hover:text-white transition-colors">Back to Home</Link>
        </div>
      </div>
    );
  }

  const cityTestimonials = city.testimonialIndices.map((i) => allTestimonials[i]).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#020812]" data-testid={`city-page-${city.slug}`}>
      {/* JSON-LD for this city */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: `Veracity Technologies - ${city.name} IT Support`,
            description: city.description,
            url: `https://www.veracitytech.com/service-areas/${city.slug}`,
            telephone: "+1-952-941-7333",
            email: "info@veracitytech.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: city.name,
              addressRegion: city.state,
              postalCode: city.zip,
              addressCountry: "US",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: city.lat,
              longitude: city.lng,
            },
            areaServed: {
              "@type": "City",
              name: city.name,
            },
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
              opens: "00:00",
              closes: "23:59",
            },
          }),
        }}
      />

      {/* Nav */}
      <nav className="bg-[#020812]/95 backdrop-blur-md border-b border-[#003B71] sticky top-0 z-50" data-testid="city-nav">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
            VERACITY<span className="text-[#0077B3]"> TECHNOLOGIES</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" data-testid="city-nav-home" className="text-[#A0B6CD] hover:text-white text-sm transition-colors flex items-center gap-1">
              <ChevronLeft className="w-3 h-3" /> Home
            </Link>
            <a href="tel:9529417333" className="flex items-center gap-2 text-[#A0B6CD] hover:text-white text-sm">
              <Phone className="w-4 h-4" /> (952) 941-7333
            </a>
            <Button
              data-testid="city-nav-cta"
              onClick={() => document.getElementById("city-form")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-white text-[#003B71] hover:bg-white/90 rounded-sm font-semibold text-sm px-5"
            >
              {city.ctaText}
            </Button>
          </div>
        </div>
      </nav>

      <main role="main">
        {/* Hero */}
        <section
          data-testid="city-hero"
          aria-label={`IT support services in ${city.name}, Minnesota`}
          className="py-24 lg:py-32"
        >
          <div className="max-w-7xl mx-auto px-6">
            <Link to="/" className="inline-flex items-center gap-1 text-[#0077B3] text-sm mb-6 hover:text-white transition-colors">
              <ChevronLeft className="w-3 h-3" /> All Service Areas
            </Link>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-[#0077B3]" />
              <p className="overline text-[#0077B3]">{city.name}, {city.state} {city.zip}</p>
            </div>
            <h1
              data-testid="city-headline"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white mb-6"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              {city.headline}
            </h1>
            <p data-testid="city-subhead" className="text-base md:text-lg text-[#A0B6CD] leading-relaxed max-w-3xl mb-10">
              {city.subhead}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                data-testid="city-hero-cta"
                onClick={() => document.getElementById("city-form")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-white text-[#003B71] hover:bg-white/90 rounded-sm font-bold text-base px-8 h-12"
              >
                {city.ctaText}
              </Button>
              <a href="tel:9529417333" className="flex items-center gap-2 text-[#A0B6CD] hover:text-white transition-colors text-sm h-12 px-4">
                <Phone className="w-4 h-4" /> Or call (952) 941-7333
              </a>
            </div>
          </div>
        </section>

        {/* About / Description */}
        <section data-testid="city-about" aria-label={`About IT services in ${city.name}`} className="py-20 bg-[#001A33]/40">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <p className="overline text-[#0077B3] mb-4">IT Support in {city.name}</p>
                <h2
                  data-testid="city-about-heading"
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-6"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  Why {city.name} businesses choose Veracity
                </h2>
                <p data-testid="city-description" className="text-[#A0B6CD] text-base leading-relaxed mb-8">
                  {city.description}
                </p>
                <div className="grid-border-card p-5 mb-6">
                  <p className="text-white text-sm font-semibold mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>
                    The Local Challenge
                  </p>
                  <p data-testid="city-challenge" className="text-[#A0B6CD] text-sm leading-relaxed">{city.localChallenge}</p>
                </div>
                <div className="grid-border-card p-5">
                  <p className="text-[#0077B3] text-sm font-semibold mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>
                    Did You Know?
                  </p>
                  <p data-testid="city-fact" className="text-[#A0B6CD] text-sm leading-relaxed">{city.localFact}</p>
                </div>
              </div>

              <div>
                <div className="grid-border-card p-6 mb-6">
                  <p className="overline text-[#A0B6CD] mb-4">Key Industries in {city.name}</p>
                  <div className="space-y-3">
                    {city.localIndustries.map((ind, i) => (
                      <div key={i} data-testid={`city-industry-${i}`} className="flex items-center gap-3">
                        <Building2 className="w-4 h-4 text-[#0077B3] flex-shrink-0" />
                        <span className="text-white text-sm">{ind}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid-border-card p-6">
                  <p className="overline text-[#A0B6CD] mb-4">Areas We Cover in {city.name}</p>
                  <div className="flex flex-wrap gap-2">
                    {city.neighborhoods.map((n, i) => (
                      <span
                        key={i}
                        data-testid={`city-neighborhood-${i}`}
                        className="text-xs font-medium text-[#0077B3] border border-[#003B71] bg-[#0077B3]/5 px-3 py-1.5"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services highlight */}
        <section data-testid="city-services" aria-label={`IT services offered in ${city.name}`} className="py-20 bg-[#020812]">
          <div className="max-w-7xl mx-auto px-6">
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-12 text-center"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              What we deliver in {city.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Shield, title: "Cybersecurity", desc: `Ransomware protection, phishing prevention, and 24/7 threat monitoring for ${city.name} businesses.` },
                { icon: Wifi, title: "Managed IT", desc: `Proactive network management, help desk, and on-site support throughout ${city.name}.` },
                { icon: Clock, title: "24/7 Support", desc: "Round-the-clock expert support with 15-minute critical response SLAs." },
                { icon: Building2, title: "Compliance", desc: `CMMC, SOC 2, HIPAA, and industry-specific compliance management for ${city.name} firms.` },
              ].map((svc, i) => (
                <div key={i} data-testid={`city-service-${i}`} className="grid-border-card p-6 group">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#003B71] bg-[#020812] mb-4 group-hover:border-[#0077B3] transition-colors">
                    <svc.icon className="w-5 h-5 text-[#0077B3]" />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>{svc.title}</h3>
                  <p className="text-[#A0B6CD] text-sm leading-relaxed">{svc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section data-testid="city-testimonials" aria-label={`Client testimonials from ${city.name} area`} className="py-20 bg-[#001A33]/30">
          <div className="max-w-7xl mx-auto px-6">
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-12 text-center"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              What {city.name}-area clients say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cityTestimonials.map((t, i) => (
                <div key={i} data-testid={`city-testimonial-${i}`} className="grid-border-card p-6 flex flex-col">
                  <Quote className="w-6 h-6 text-[#0077B3]/20 mb-3" />
                  <p className="text-[#A0B6CD] text-sm leading-relaxed mb-4 flex-1 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="border-t border-[#003B71] pt-3 mt-auto">
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-[#A0B6CD] text-xs">{t.title}, {t.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / Form */}
        <section id="city-form" data-testid="city-form-section" aria-label={`Schedule IT audit in ${city.name}`} className="py-20 bg-[#020812]">
          <div className="max-w-3xl mx-auto px-6">
            <div className="grid-border-card p-8 lg:p-10">
              {!submitted ? (
                <>
                  <h2
                    className="text-2xl font-bold text-white mb-2 text-center"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {city.ctaText}
                  </h2>
                  <p className="text-[#A0B6CD] text-sm mb-8 text-center">
                    Get a comprehensive, non-invasive review of your {city.name} business&rsquo;s IT and cybersecurity posture.
                  </p>
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="company" className="text-white text-sm font-medium mb-1.5 block">Company Name</label>
                      <Input data-testid="city-form-company" id="company" placeholder="Your company" className="bg-black/20 border-[#003B71] text-white placeholder:text-[#A0B6CD]/50 focus:border-[#0077B3] rounded-sm h-11" required />
                    </div>
                    <div>
                      <label htmlFor="name" className="text-white text-sm font-medium mb-1.5 block">Your Name</label>
                      <Input data-testid="city-form-name" id="name" placeholder="Full name" className="bg-black/20 border-[#003B71] text-white placeholder:text-[#A0B6CD]/50 focus:border-[#0077B3] rounded-sm h-11" required />
                    </div>
                    <div>
                      <label htmlFor="phone" className="text-white text-sm font-medium mb-1.5 block">Phone</label>
                      <Input data-testid="city-form-phone" id="phone" type="tel" placeholder="(555) 123-4567" className="bg-black/20 border-[#003B71] text-white placeholder:text-[#A0B6CD]/50 focus:border-[#0077B3] rounded-sm h-11" required />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-white text-sm font-medium mb-1.5 block">Email</label>
                      <Input data-testid="city-form-email" id="email" type="email" placeholder="you@company.com" className="bg-black/20 border-[#003B71] text-white placeholder:text-[#A0B6CD]/50 focus:border-[#0077B3] rounded-sm h-11" required />
                    </div>
                    <div className="sm:col-span-2">
                      <Button data-testid="city-form-submit" type="submit" className="w-full bg-[#0077B3] hover:bg-[#0077B3]/90 text-white rounded-sm font-semibold h-12 text-base">
                        {city.ctaText}
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                <div data-testid="city-form-success" className="text-center py-6">
                  <Shield className="w-12 h-12 text-[#0077B3] mx-auto mb-4" />
                  <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>Thank you!</h3>
                  <p className="text-[#A0B6CD] text-sm">We'll reach out within one business day to schedule your {city.name} IT audit.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Other cities */}
        <section data-testid="city-other-areas" aria-label="Other service areas" className="py-16 bg-[#001A33]/20">
          <div className="max-w-7xl mx-auto px-6">
            <h2
              className="text-xl font-bold text-white mb-8 text-center"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              We also serve
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {cityData
                .filter((c) => c.slug !== city.slug)
                .map((c) => (
                  <Link
                    key={c.slug}
                    to={`/service-areas/${c.slug}`}
                    data-testid={`other-city-${c.slug}`}
                    className="text-xs font-medium text-[#A0B6CD] border border-[#003B71] bg-[#001A33] hover:border-[#0077B3] hover:text-white px-4 py-2 transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#020812] border-t border-[#003B71] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#A0B6CD]/60 text-xs">
            &copy; {new Date().getFullYear()} Veracity Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-[#A0B6CD]">
            <a href="tel:9529417333" className="hover:text-white transition-colors flex items-center gap-1">
              <Phone className="w-3 h-3" /> (952) 941-7333
            </a>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
