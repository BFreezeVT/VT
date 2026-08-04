import { useParams, Link } from "react-router-dom";
import { Phone, ChevronLeft, CheckCircle2, HelpCircle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import { useEffect } from "react";
import aiPagesData from "../data/aiPagesData";
import industryData from "../data/industryData";
import NotFound from "./NotFound";

export default function AIPage() {
  const { aiSlug } = useParams();
  const page = aiPagesData.find((p) => p.slug === aiSlug);

  useEffect(() => {
    if (page) {
      document.title = page.metaTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", page.metaDescription);
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute("href", `https://www.veracitytechmn.com/${page.slug}`);
    }
    return () => { document.title = "Veracity Technologies | AI-Powered Cybersecurity & Managed IT"; };
  }, [page]);

  if (!page) {
    return <NotFound />;
  }

  const otherPages = aiPagesData.filter((p) => p.slug !== page.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0f1d32]" data-testid={`ai-page-${page.slug}`}>
      {/* Service schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: page.name,
        description: page.metaDescription,
        url: `https://www.veracitytechmn.com/${page.slug}`,
        provider: { "@type": "Organization", name: "Veracity Technologies", telephone: "+1-952-941-7333" },
        areaServed: { "@type": "State", name: "Minnesota" },
        serviceType: page.name,
      }) }} />
      {/* BreadcrumbList */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.veracitytechmn.com/" },
          { "@type": "ListItem", position: 2, name: "Business Technology Assessment", item: "https://www.veracitytechmn.com/business-technology-assessment" },
          { "@type": "ListItem", position: 3, name: page.name, item: `https://www.veracitytechmn.com/${page.slug}` },
        ],
      }) }} />
      {/* FAQPage schema (AEO) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: page.answerBoxQ, acceptedAnswer: { "@type": "Answer", text: page.answerBoxA } },
          ...page.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        ],
      }) }} />

      {/* Nav */}
      <nav className="bg-[#003B71]/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "Outfit" }}>
            VERACITY<span className="text-[#0077B3]"> TECHNOLOGIES</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" data-testid="ai-page-nav-home" className="text-[#94a8be] hover:text-white text-sm flex items-center gap-1">
              <ChevronLeft className="w-3 h-3" /> Home
            </Link>
            <a href="tel:9529417333" className="flex items-center gap-2 text-[#94a8be] hover:text-white text-sm">
              <Phone className="w-4 h-4" /> (952) 941-7333
            </a>
            <Link to="/business-technology-assessment" data-testid="ai-page-nav-cta">
              <Button className="bg-white text-[#1e6bb8] hover:bg-white/90 rounded-sm font-semibold text-sm px-5">
                {page.ctaText}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main role="main">
        {/* Hero */}
        <section data-testid="ai-page-hero" aria-label={page.headline} className="py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <Link to="/" className="inline-flex items-center gap-1 text-[#0077B3] text-sm mb-6 hover:text-white transition-colors">
              <ChevronLeft className="w-3 h-3" /> Back to Home
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-5 h-5 text-[#0077B3]" />
                  <p className="overline text-[#0077B3]">{page.name}</p>
                </div>
                <h1 data-testid="ai-page-headline" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white mb-6" style={{ fontFamily: "Outfit" }}>
                  {page.headline}
                </h1>
                <p data-testid="ai-page-subhead" className="text-base md:text-lg text-[#94a8be] leading-relaxed mb-8 max-w-2xl">
                  {page.subhead}
                </p>
                <Link to="/business-technology-assessment" data-testid="ai-page-hero-cta">
                  <Button className="bg-white text-[#1e6bb8] hover:bg-white/90 rounded-sm font-bold text-base px-8 h-12">
                    {page.ctaText} <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="grid-border-card p-8 text-center">
                <p className="stat-number text-4xl sm:text-5xl text-white mb-2">{page.heroStat.value}</p>
                <p className="text-sm text-[#94a8be]">{page.heroStat.label}</p>
              </div>
            </div>
          </div>
        </section>

        {/* AEO Direct Answer Box */}
        <section data-testid="ai-page-answer-box" className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="border-l-4 border-[#0077B3] pl-6">
              <p className="overline text-[#0077B3] mb-3">{page.answerBoxQ}</p>
              <p data-testid="ai-page-answer-text" className="text-[#1a3050] text-lg leading-relaxed font-medium">{page.answerBoxA}</p>
            </div>
            <p className="text-[#3a5068] text-base leading-relaxed mt-8">{page.description}</p>
          </div>
        </section>

        {/* Framework / Checklist */}
        <section data-testid="ai-page-framework" className="py-20 bg-[#0f1d32]">
          <div className="max-w-7xl mx-auto px-6">
            <p className="overline text-[#0077B3] mb-4">Framework</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-12" style={{ fontFamily: "Outfit" }}>
              {page.frameworkTitle}
            </h2>
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${page.frameworkItems.length > 4 ? "lg:grid-cols-5" : "lg:grid-cols-4"} gap-6`}>
              {page.frameworkItems.map((item, i) => (
                <div key={item.title} data-testid={`ai-framework-item-${i}`} className="grid-border-card p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="stat-number text-lg text-[#0077B3]">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="text-white font-semibold text-sm" style={{ fontFamily: "Outfit" }}>{item.title}</h3>
                  </div>
                  <p className="text-[#94a8be] text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section data-testid="ai-page-faq" className="py-20 bg-[#0f1d32]">
          <div className="max-w-3xl mx-auto px-6">
            <p className="overline text-[#0077B3] mb-4 text-center">FAQ</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-10 text-center" style={{ fontFamily: "Outfit" }}>
              Common questions about {page.name.toLowerCase()}
            </h2>
            <div className="space-y-6">
              {page.faqs.map((f, i) => (
                <div key={f.q} data-testid={`ai-page-faq-${i}`} className="border-b border-white/10 pb-6">
                  <p className="text-white font-semibold text-base mb-2 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-[#0077B3] mt-0.5 flex-shrink-0" /> {f.q}
                  </p>
                  <p className="text-[#94a8be] text-sm leading-relaxed pl-6">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA -> funnel to Business Technology Assessment */}
        <section data-testid="ai-page-cta" className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <CheckCircle2 className="w-10 h-10 text-[#0077B3] mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0f1d32] mb-4" style={{ fontFamily: "Outfit" }}>
              See where {page.name.toLowerCase()} fits in your overall technology maturity
            </h2>
            <p className="text-[#3a5068] text-base mb-8 max-w-xl mx-auto">
              The Business Technology Assessment scores your organization across AI readiness, cybersecurity, compliance, and automation maturity - and shows exactly where to start.
            </p>
            <Link to="/business-technology-assessment" data-testid="ai-page-bottom-cta">
              <Button className="bg-[#003B71] hover:bg-[#002a52] text-white rounded-sm font-semibold px-8 h-12">
                Start Your Business Technology Assessment
              </Button>
            </Link>
            <p className="text-[#4a5e78] text-xs mt-3">Or call (952) 941-7333</p>
          </div>
        </section>

        {/* Related AI pages + industries */}
        <section className="py-16 bg-[#0f1d32]">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-[#94a8be] text-sm mb-4 text-center">Related AI solutions:</p>
            <div className="flex justify-center gap-3 flex-wrap mb-10">
              {otherPages.map((p) => (
                <Link key={p.slug} to={`/${p.slug}`} data-testid={`related-ai-${p.slug}`} className="text-sm text-[#0077B3] border border-white/10 hover:border-[#0077B3] px-5 py-2.5 transition-colors">
                  {p.name}
                </Link>
              ))}
            </div>
            <p className="text-[#94a8be] text-sm mb-4 text-center">Explore by industry:</p>
            <div className="flex justify-center gap-3 flex-wrap">
              {industryData.map((ind) => (
                <Link key={ind.slug} to={`/industries/${ind.slug}`} data-testid={`related-industry-${ind.slug}`} className="text-sm text-[#94a8be] border border-white/10 hover:border-[#0077B3] hover:text-white px-5 py-2.5 transition-colors">
                  {ind.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#003B71] border-t border-[#00325f] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#94a8be]/60 text-xs">&copy; {new Date().getFullYear()} Veracity Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-[#94a8be]">
            <a href="tel:9529417333" className="hover:text-white flex items-center gap-1"><Phone className="w-3 h-3" /> (952) 941-7333</a>
            <Link to="/" className="hover:text-white">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
