import { useParams, Link } from "react-router-dom";
import { Phone, ChevronLeft, Shield, Wifi, Clock, Building2, Quote, CheckCircle, Landmark, HardHat, Factory } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useState, useEffect } from "react";
import industryData from "../data/industryData";
import { useLeadSubmit } from "../hooks/useLeadSubmit";

const iconMap = { Landmark, HardHat, Factory };

const allTestimonials = [
  { name: "Cody Nuernberg", title: "President", company: "BLD Connection", quote: "Veracity Technologies has helped streamline our company's operations. Their proactive, responsive, and knowledgeable team minimizes downtime and ensures consistent operations." },
  { name: "Ryan Morris", title: "Vice President", company: "Fraser Morris", quote: "Their prompt response to issues and the expertise of the technical staff, who intimately understand our systems for complex projects, has been invaluable." },
  { name: "Lauren Holec", title: "Manager", company: "Athena Actuarial", quote: "Their exceptional responsiveness ensures our questions and issues are addressed within hours." },
  { name: "Mike Schultz", title: "Owner", company: "Surface Solutions", quote: "Since partnering with Veracity Technologies, our productivity has soared." },
  { name: "Kaitie Firm", title: "Operations Manager", company: "Juut SalonSpa", quote: "Quick response time, efficient problem-solving, and seamless understanding of technology complexities." },
  { name: "Dustin Benz", title: "President", company: "iSpace Environments", quote: "Working with Veracity Technologies has reshaped our IT landscape with tailored solutions." },
  { name: "Matthew Pince", title: "Operations", company: "Pulse Products", quote: "Their proactive approach gives us peace of mind and helps us avoid any potential downtime." },
  { name: "Jordan Sanford", title: "Vice President", company: "Prestige Global", quote: "Partnering with Veracity Technologies has transformed our organization." },
  { name: "Linda Sobkowiak", title: "Director of Operations", company: "Stubbe and Associates", quote: "They evaluate and mitigate risks specific to our industry and operations." },
  { name: "Mark Schulte", title: "President", company: "VIA Actuarial Solutions", quote: "Veracity Technologies has greatly transformed our IT landscape." },
  { name: "Shelley Rice", title: "Operations Manager", company: "Foreman and Airhart", quote: "Their ability to understand and cater to each client's unique working environment sets them apart." },
  { name: "Nadine Wikstrom", title: "Director of Operations", company: "SEIU Local 284", quote: "With over 12 years of partnership, Veracity's commitment to tailored solutions has been unmatched." },
  { name: "Aaron Lindberg", title: "Chief Investment Officer", company: "Kingdom Legacy Advisors", quote: "Their expertise and personalized support ensure efficient operations without managing multiple vendors." },
  { name: "Janet Johnson", title: "Legal Administrator", company: "Gregerson Rosow", quote: "Their deep understanding of our systems ensures tailored advice. Prompt responsiveness distinguishes them." },
  { name: "Jesse Hallstrom", title: "CFO", company: "Hempel Companies", quote: "They swiftly solve problems, ensuring smooth business continuity." },
  { name: "Gretchen Postula", title: "Managing Director", company: "North Sky Capital", quote: "Their quarterly business reviews align technology with our business objectives." },
  { name: "Ellen Qureshi", title: "CCO", company: "Black Lake Investments", quote: "Their commitment to SOC reporting underscores strong internal controls." },
  { name: "Robbin Stusse", title: "Operations Manager", company: "Edelmann and Associates", quote: "Comprehensive support for all our IT needs makes them feel like an extension of our team." },
];

export default function IndustryPage() {
  const { industrySlug } = useParams();
  const industry = industryData.find((ind) => ind.slug === industrySlug);
  const { submitted, submitting, submitLead } = useLeadSubmit();

  useEffect(() => {
    if (industry) {
      document.title = industry.metaTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", industry.metaDescription);
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute("href", `https://www.veracitytech.com/industries/${industry.slug}`);
    }
    return () => {
      document.title = "Veracity Technologies | AI-Powered Cybersecurity & Managed IT";
    };
  }, [industry]);

  if (!industry) {
    return (
      <div className="min-h-screen bg-[#020812] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "Outfit" }}>Page Not Found</h1>
          <Link to="/" className="text-[#0077B3] hover:text-white">Back to Home</Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[industry.icon] || Shield;
  const testimonials = industry.testimonialIndices.map((i) => allTestimonials[i]);

  return (
    <div className="min-h-screen bg-[#020812]" data-testid={`industry-page-${industry.slug}`}>
      {/* Page-specific SEO schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: `${industry.name} IT & Cybersecurity Services`,
            description: industry.description,
            url: `https://www.veracitytech.com/industries/${industry.slug}`,
            provider: {
              "@type": "Organization",
              name: "Veracity Technologies",
              telephone: "+1-952-941-7333",
            },
            areaServed: { "@type": "State", name: "Minnesota" },
            serviceType: `${industry.name} Managed IT & Cybersecurity`,
          }),
        }}
      />

      {/* Nav */}
      <nav className="bg-[#020812]/95 backdrop-blur-md border-b border-[#003B71] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "Outfit" }}>
            VERACITY<span className="text-[#0077B3]"> TECHNOLOGIES</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" data-testid="industry-nav-home" className="text-[#A0B6CD] hover:text-white text-sm flex items-center gap-1">
              <ChevronLeft className="w-3 h-3" /> Home
            </Link>
            <a href="tel:9529417333" className="flex items-center gap-2 text-[#A0B6CD] hover:text-white text-sm">
              <Phone className="w-4 h-4" /> (952) 941-7333
            </a>
            <Button
              data-testid="industry-nav-cta"
              onClick={() => document.getElementById("industry-form")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-white text-[#003B71] hover:bg-white/90 rounded-sm font-semibold text-sm px-5"
            >
              {industry.ctaText}
            </Button>
          </div>
        </div>
      </nav>

      <main role="main">
        {/* Hero */}
        <section data-testid="industry-hero" aria-label={`${industry.name} IT and cybersecurity services`} className="py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <Link to="/" className="inline-flex items-center gap-1 text-[#0077B3] text-sm mb-6 hover:text-white transition-colors">
              <ChevronLeft className="w-3 h-3" /> Back to Home
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-5 h-5 text-[#0077B3]" />
                  <p className="overline text-[#0077B3]">{industry.name} IT &amp; Cybersecurity</p>
                </div>
                <h1
                  data-testid="industry-headline"
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white mb-6"
                  style={{ fontFamily: "Outfit" }}
                >
                  {industry.headline}
                </h1>
                <p data-testid="industry-subhead" className="text-base md:text-lg text-[#A0B6CD] leading-relaxed mb-8 max-w-2xl">
                  {industry.subhead}
                </p>
                <Button
                  data-testid="industry-hero-cta"
                  onClick={() => document.getElementById("industry-form")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-white text-[#003B71] hover:bg-white/90 rounded-sm font-bold text-base px-8 h-12"
                >
                  {industry.ctaText}
                </Button>
              </div>
              <div className="grid-border-card p-8 text-center">
                <p className="stat-number text-5xl sm:text-6xl text-white mb-2">{industry.heroStat.value}</p>
                <p className="text-sm text-[#A0B6CD]">{industry.heroStat.label}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Description */}
        <section data-testid="industry-about" className="py-20 bg-[#001A33]/40">
          <div className="max-w-4xl mx-auto px-6">
            <p data-testid="industry-description" className="text-[#A0B6CD] text-base leading-relaxed">
              {industry.description}
            </p>
          </div>
        </section>

        {/* Challenges */}
        <section data-testid="industry-challenges" aria-label={`${industry.name} cybersecurity challenges`} className="py-20 bg-[#020812]">
          <div className="max-w-7xl mx-auto px-6">
            <p className="overline text-[#FF5722] mb-4">The Challenges</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-12" style={{ fontFamily: "Outfit" }}>
              What keeps {industry.name.toLowerCase()} leaders up at night
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {industry.challenges.map((ch, i) => (
                <div key={i} data-testid={`industry-challenge-${i}`} className="grid-border-card p-6 group">
                  <h3 className="text-white font-semibold text-base mb-3" style={{ fontFamily: "Outfit" }}>{ch.title}</h3>
                  <p className="text-[#A0B6CD] text-sm leading-relaxed">{ch.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance + Software */}
        <section data-testid="industry-compliance" className="py-20 bg-[#001A33]/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <p className="overline text-[#0077B3] mb-4">Compliance Frameworks</p>
                <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "Outfit" }}>
                  Regulations we manage for {industry.name.toLowerCase()}
                </h2>
                <div className="space-y-3">
                  {industry.compliance.map((c, i) => (
                    <div key={i} data-testid={`industry-compliance-${i}`} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-[#0077B3] flex-shrink-0" />
                      <span className="text-white text-sm">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="overline text-[#0077B3] mb-4">Software We Support</p>
                <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "Outfit" }}>
                  Tools your teams rely on daily
                </h2>
                <div className="flex flex-wrap gap-2">
                  {industry.software.map((s, i) => (
                    <span key={i} data-testid={`industry-software-${i}`} className="text-xs font-medium text-[#0077B3] border border-[#003B71] bg-[#0077B3]/5 px-3 py-1.5">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section data-testid="industry-testimonials" className="py-20 bg-[#020812]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-white mb-10 text-center" style={{ fontFamily: "Outfit" }}>
              Trusted by {industry.name.toLowerCase()} professionals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div key={i} data-testid={`industry-testimonial-${i}`} className="grid-border-card p-6 flex flex-col">
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

        {/* Form */}
        <section id="industry-form" data-testid="industry-form-section" className="py-20 bg-[#001A33]/40">
          <div className="max-w-3xl mx-auto px-6">
            <div className="grid-border-card p-8 lg:p-10">
              {!submitted ? (
                <>
                  <h2 className="text-2xl font-bold text-white mb-2 text-center" style={{ fontFamily: "Outfit" }}>
                    {industry.ctaText}
                  </h2>
                  <p className="text-[#A0B6CD] text-sm mb-8 text-center">
                    Non-invasive. Confidential. Tailored to {industry.name.toLowerCase()}.
                  </p>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const fd = new FormData(e.target);
                    submitLead({
                      company: fd.get("company"),
                      name: fd.get("name"),
                      phone: fd.get("phone"),
                      email: fd.get("email"),
                      source_page: "industry",
                      source_industry: industry.name,
                    });
                  }} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="company" className="text-white text-sm font-medium mb-1.5 block">Company</label>
                      <Input data-testid="industry-form-company" id="company" name="company" placeholder="Your company" className="bg-black/20 border-[#003B71] text-white placeholder:text-[#A0B6CD]/50 focus:border-[#0077B3] rounded-sm h-11" required />
                    </div>
                    <div>
                      <label htmlFor="name" className="text-white text-sm font-medium mb-1.5 block">Name</label>
                      <Input data-testid="industry-form-name" id="name" name="name" placeholder="Full name" className="bg-black/20 border-[#003B71] text-white placeholder:text-[#A0B6CD]/50 focus:border-[#0077B3] rounded-sm h-11" required />
                    </div>
                    <div>
                      <label htmlFor="phone" className="text-white text-sm font-medium mb-1.5 block">Phone</label>
                      <Input data-testid="industry-form-phone" id="phone" name="phone" type="tel" placeholder="(555) 123-4567" className="bg-black/20 border-[#003B71] text-white placeholder:text-[#A0B6CD]/50 focus:border-[#0077B3] rounded-sm h-11" required />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-white text-sm font-medium mb-1.5 block">Email</label>
                      <Input data-testid="industry-form-email" id="email" name="email" type="email" placeholder="you@company.com" className="bg-black/20 border-[#003B71] text-white placeholder:text-[#A0B6CD]/50 focus:border-[#0077B3] rounded-sm h-11" required />
                    </div>
                    <div className="sm:col-span-2">
                      <Button data-testid="industry-form-submit" type="submit" className="w-full bg-[#0077B3] hover:bg-[#0077B3]/90 text-white rounded-sm font-semibold h-12">
                        {industry.ctaText}
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                <div data-testid="industry-form-success" className="text-center py-6">
                  <Shield className="w-12 h-12 text-[#0077B3] mx-auto mb-4" />
                  <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: "Outfit" }}>Thank you!</h3>
                  <p className="text-[#A0B6CD] text-sm">We'll reach out within one business day to schedule your {industry.name.toLowerCase()} security audit.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Other industries */}
        <section className="py-16 bg-[#020812]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-[#A0B6CD] text-sm mb-4">We also specialize in:</p>
            <div className="flex justify-center gap-4 flex-wrap">
              {industryData.filter((ind) => ind.slug !== industry.slug).map((ind) => (
                <Link
                  key={ind.slug}
                  to={`/industries/${ind.slug}`}
                  data-testid={`other-industry-${ind.slug}`}
                  className="text-sm text-[#0077B3] border border-[#003B71] hover:border-[#0077B3] px-5 py-2.5 transition-colors"
                >
                  {ind.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#020812] border-t border-[#003B71] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#A0B6CD]/60 text-xs">&copy; {new Date().getFullYear()} Veracity Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-[#A0B6CD]">
            <a href="tel:9529417333" className="hover:text-white flex items-center gap-1"><Phone className="w-3 h-3" /> (952) 941-7333</a>
            <Link to="/" className="hover:text-white">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
