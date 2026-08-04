import { Link } from "react-router-dom";
import { Phone, ChevronLeft, HelpCircle, LayoutGrid, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { useEffect } from "react";
import FreeAuditOffer from "../sections/FreeAuditOffer";
import TechMaturityTable from "../components/TechMaturityTable";
import aiPagesData from "../data/aiPagesData";
import industryData from "../data/industryData";

const assessmentAreas = [
  "Technology Infrastructure",
  "Managed IT Maturity",
  "Cybersecurity Readiness",
  "Compliance Readiness",
  "AI Readiness",
  "AI Governance",
  "AI Security",
  "AI Risk Management",
  "Microsoft Copilot Readiness",
  "Workflow Automation",
  "Business Continuity",
  "Strategic Technology Planning",
];

const answerBoxes = [
  { q: "What is AI Readiness?", a: "AI Readiness is the degree to which an organization's data, infrastructure, governance, and workforce are prepared to safely and effectively adopt artificial intelligence. It's assessed across five stages, from Unaware to Transformative.", link: "/ai-readiness-assessment", linkText: "See the AI Readiness Assessment" },
  { q: "What is AI Governance?", a: "AI Governance is the set of policies, controls, and oversight structures that ensure AI usage is secure, compliant, and accountable - covering approved tools, data handling rules, and monitoring.", link: "/ai-governance", linkText: "Explore AI Governance" },
  { q: "What is Shadow AI?", a: "Shadow AI is the use of AI tools by employees without IT approval or governance. 68% of employees use unauthorized AI tools, creating data leakage and compliance risk.", link: "/shadow-ai-risk-assessment", linkText: "Assess your Shadow AI risk" },
  { q: "How does an AI Readiness Assessment work?", a: "It evaluates data governance, infrastructure, existing AI usage, security controls, and policy maturity to produce a maturity score and prioritized roadmap - typically completed within 3-5 business days.", link: "/ai-readiness-assessment", linkText: "Start your AI Readiness Assessment" },
  { q: "How does a Business Technology Assessment work?", a: "You complete a structured online assessment covering 12 areas of technology, cybersecurity, compliance, and AI maturity. Veracity's team reviews your results and builds a prioritized roadmap in a strategy session.", link: null },
  { q: "Is Microsoft Copilot secure?", a: "Copilot's security depends on your underlying SharePoint and OneDrive permissions. Without a readiness review, it can surface files to people who technically have access but shouldn't.", link: "/microsoft-copilot-readiness", linkText: "Check your Copilot Readiness" },
  { q: "What AI policies should businesses have?", a: "At minimum: an approved AI tools list, a data classification policy, an acceptable use policy for AI content, an incident reporting process, and a periodic review cycle.", link: "/ai-policy-development", linkText: "Develop your AI Policy" },
  { q: "What technology risks should organizations evaluate?", a: "Cybersecurity exposure, compliance gaps, AI and Shadow AI risk, disaster recovery readiness, and manual workflow inefficiency are the five risk categories every organization should evaluate regularly.", link: "/ai-risk-assessment", linkText: "Get an AI Risk Assessment" },
];

export default function BusinessTechAssessment() {
  useEffect(() => {
    document.title = "Business Technology Assessment | Veracity Technologies";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Free Business Technology Assessment scoring technology infrastructure, cybersecurity, compliance, AI readiness, AI governance, and Microsoft Copilot readiness for Minneapolis-St. Paul businesses.");
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://www.veracitytechmn.com/business-technology-assessment");
    return () => { document.title = "Veracity Technologies | AI-Powered Cybersecurity & Managed IT"; };
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1d32]" data-testid="business-tech-assessment-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Business Technology Assessment",
        description: "A comprehensive assessment evaluating technology maturity, cybersecurity posture, compliance readiness, AI readiness, operational efficiency, automation opportunities, and business risk.",
        url: "https://www.veracitytechmn.com/business-technology-assessment",
        provider: { "@type": "Organization", name: "Veracity Technologies", telephone: "+1-952-941-7333" },
        areaServed: { "@type": "State", name: "Minnesota" },
        serviceType: "Business Technology Assessment",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.veracitytechmn.com/" },
          { "@type": "ListItem", position: 2, name: "Business Technology Assessment", item: "https://www.veracitytechmn.com/business-technology-assessment" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: answerBoxes.map((a) => ({ "@type": "Question", name: a.q, acceptedAnswer: { "@type": "Answer", text: a.a } })),
      }) }} />

      {/* Nav */}
      <nav className="bg-[#003B71]/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "Outfit" }}>
            VERACITY<span className="text-[#0077B3]"> TECHNOLOGIES</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" data-testid="bta-nav-home" className="text-[#94a8be] hover:text-white text-sm flex items-center gap-1">
              <ChevronLeft className="w-3 h-3" /> Home
            </Link>
            <a href="tel:9529417333" className="flex items-center gap-2 text-[#94a8be] hover:text-white text-sm">
              <Phone className="w-4 h-4" /> (952) 941-7333
            </a>
            <Button data-testid="bta-nav-cta" onClick={() => document.getElementById("audit")?.scrollIntoView({ behavior: "smooth" })} className="bg-white text-[#1e6bb8] hover:bg-white/90 rounded-sm font-semibold text-sm px-5">
              Start Assessment
            </Button>
          </div>
        </div>
      </nav>

      <main role="main">
        {/* Hero */}
        <section data-testid="bta-hero" aria-label="Business Technology Assessment" className="py-24 lg:py-28">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="overline text-[#0077B3] mb-4">The Central Authority Page</p>
            <h1 data-testid="bta-headline" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white mb-6" style={{ fontFamily: "Outfit" }}>
              How Mature Is Your Organization&rsquo;s Technology, Cybersecurity, Compliance, and AI Strategy?
            </h1>
            <p data-testid="bta-subhead" className="text-base md:text-lg text-[#94a8be] leading-relaxed max-w-3xl mx-auto mb-10">
              Receive a comprehensive assessment evaluating technology maturity, cybersecurity posture, compliance readiness, AI readiness, operational efficiency, automation opportunities, and business risk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button data-testid="bta-primary-cta" onClick={() => document.getElementById("audit")?.scrollIntoView({ behavior: "smooth" })} className="bg-[#0077B3] hover:bg-[#005f8f] text-white rounded-sm font-bold text-base px-8 h-12">
                Schedule a Business Technology Assessment
              </Button>
              <a href="tel:9529417333" data-testid="bta-secondary-cta" className="flex items-center justify-center gap-2 border border-white/25 hover:border-white/50 rounded-sm px-6 h-12 text-white text-sm font-semibold transition-all">
                <Phone className="w-4 h-4" /> Book a Strategy Session
              </a>
            </div>
          </div>
        </section>

        {/* Assessment Areas grid */}
        <section data-testid="bta-areas" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 justify-center mb-8">
              <LayoutGrid className="w-5 h-5 text-[#0077B3]" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0f1d32]" style={{ fontFamily: "Outfit" }}>12 Areas We Assess</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {assessmentAreas.map((area, i) => (
                <div key={area} data-testid={`bta-area-${i}`} className="border border-[#0077B3]/15 bg-[#0077B3]/5 rounded-md p-4 text-center">
                  <p className="text-[#0f1d32] text-sm font-semibold">{area}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Maturity comparison table (GEO) */}
        <section data-testid="bta-maturity" className="py-20 bg-[#0f1d32]">
          <div className="max-w-4xl mx-auto px-6">
            <TechMaturityTable title="The Technology Maturity Model" />
          </div>
        </section>

        {/* AEO Answer Boxes */}
        <section data-testid="bta-answer-boxes" className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <p className="overline text-[#0077B3] mb-4 text-center">Direct Answers</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0f1d32] mb-12 text-center" style={{ fontFamily: "Outfit" }}>
              Questions AI search engines ask about technology assessments
            </h2>
            <div className="space-y-8">
              {answerBoxes.map((a, i) => (
                <div key={a.q} data-testid={`bta-answer-${i}`} className="border-l-4 border-[#0077B3] pl-6">
                  <p className="text-[#0f1d32] font-bold text-lg mb-2 flex items-start gap-2" style={{ fontFamily: "Outfit" }}>
                    <HelpCircle className="w-4 h-4 text-[#0077B3] mt-1.5 flex-shrink-0" /> {a.q}
                  </p>
                  <p className="text-[#3a5068] text-base leading-relaxed pl-6">{a.a}</p>
                  {a.link && (
                    <Link to={a.link} className="inline-flex items-center gap-1 text-[#0077B3] text-sm font-medium mt-2 pl-6 hover:text-[#0f1d32] transition-colors">
                      {a.linkText} <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Embedded assessment tool */}
        <div className="bg-[#0f1d32]">
          <FreeAuditOffer />
        </div>

        {/* Cross-links: AI cluster + industries */}
        <section className="py-16 bg-[#0f1d32] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-[#94a8be] text-sm mb-4 text-center">Explore the AI Readiness content cluster:</p>
            <div className="flex justify-center gap-3 flex-wrap mb-10">
              {aiPagesData.map((p) => (
                <Link key={p.slug} to={`/${p.slug}`} data-testid={`bta-ai-link-${p.slug}`} className="text-xs text-[#0077B3] border border-white/10 hover:border-[#0077B3] px-4 py-2 transition-colors">
                  {p.name}
                </Link>
              ))}
            </div>
            <p className="text-[#94a8be] text-sm mb-4 text-center">Assessment by industry:</p>
            <div className="flex justify-center gap-3 flex-wrap">
              {industryData.map((ind) => (
                <Link key={ind.slug} to={`/industries/${ind.slug}`} data-testid={`bta-industry-link-${ind.slug}`} className="text-xs text-[#94a8be] border border-white/10 hover:border-[#0077B3] hover:text-white px-4 py-2 transition-colors">
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
