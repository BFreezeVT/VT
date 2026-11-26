import { stringifyJsonLd } from "@/lib/jsonLd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, TrendingUp, Award, HeartHandshake, Mail, Phone } from "lucide-react";
import { Button } from "../../components/ui/button";
import { buildBreadcrumbSchema, buildWebPageSchema } from "./careersSchemas";
import CareersNav from "./CareersNav";
import CareersFooter from "./CareersFooter";
import Breadcrumbs from "../../components/Breadcrumbs";

// Roles that make up the Veracity team today, from the team list Blake provided
// 2026-11-24. These are the kinds of roles on the team, not open positions.
// No specific roles are posted on this page.
const TEAM_ROLES = [
  "Support Services Technician",
  "Technical Alignment Manager",
  "Project Manager",
  "Managed Services Sales and Account Executive",
  "Sales Administrator",
  "Centralized Services",
  "Marketing",
];

const WHY_VERACITY = [
  {
    icon: Users,
    title: "A Team That Makes the Company",
    text: "Veracity strongly believes that a company is only as good as its team members. We hire highly qualified applicants for challenging, yet fulfilling positions, and we invest in the people who do the work.",
  },
  {
    icon: TrendingUp,
    title: "Career Advancement",
    text: "Become a part of the Veracity Technologies family to enjoy competitive compensation packages, career advancement opportunities, and an exceptional work atmosphere.",
  },
  {
    icon: Award,
    title: "Recognized as a Great Place to Work",
    text: "Veracity has been named one of the Best Places to Work in IT by Computerworld, and has earned the MSP 501 Award as a top managed service provider for eight consecutive years.",
  },
  {
    icon: HeartHandshake,
    title: "Work That Matters to Local Businesses",
    text: "Since 1989, our team has helped Twin Cities businesses in financial services, construction, manufacturing, and high-compliance industries keep their technology secure, compliant, and running. The work you do here keeps real local businesses running.",
  },
];

export default function Careers() {
  useEffect(() => {
    document.title = "Careers | Veracity Technologies";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Build your career at Veracity Technologies, a SOC 2 certified MSP in Minnetonka, MN. Competitive compensation, career advancement, and an exceptional work atmosphere for Twin Cities technology professionals.");
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://www.veracitytechmn.com/careers");
    return () => {
      document.title = "Veracity Technologies | AI-Powered Cybersecurity & Managed IT";
      if (metaDesc) metaDesc.setAttribute("content", "Managed IT & cybersecurity for Minnesota businesses, powered by AI and automation. SOC 2 compliant, CMMC registered. Free assessment available.");
      if (canonical) canonical.setAttribute("href", "https://www.veracitytechmn.com/");
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1d32]" data-testid="careers-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(buildBreadcrumbSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(buildWebPageSchema()) }} />

      <CareersNav />

      <main role="main">
        <section data-testid="careers-hero" className="py-24 lg:py-28">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="flex justify-center">
              <Breadcrumbs items={[{ label: "Careers" }]} />
            </div>
            <p className="overline text-[#0077B3] mb-4">Careers at Veracity Technologies</p>
            <h1 data-testid="careers-headline" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white mb-6" style={{ fontFamily: "Outfit" }}>
              We Are Looking for the Best and Brightest Technology Minds
            </h1>
            <p className="text-base md:text-lg text-[#94a8be] leading-relaxed mb-10 max-w-2xl mx-auto">
              Do you have what it takes to join the Veracity Technologies family? We are a SOC 2 certified managed IT and cybersecurity provider in Minnetonka, Minnesota, serving small and midsize businesses across the Twin Cities since 1989.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border-t border-white/10 pt-8 max-w-2xl mx-auto">
              <div data-testid="careers-metric-0" className="text-center px-4">
                <p className="stat-number text-4xl text-white">35+</p>
                <p className="text-xs text-[#94a8be] mt-1">Years in Business</p>
              </div>
              <div data-testid="careers-metric-1" className="text-center px-4 border-l border-white/10">
                <p className="stat-number text-4xl text-white">98%</p>
                <p className="text-xs text-[#94a8be] mt-1">Client Retention Rate</p>
              </div>
              <div data-testid="careers-metric-2" className="text-center px-4 border-l border-white/10">
                <p className="stat-number text-4xl text-[#0077B3]">5.0</p>
                <p className="text-xs text-[#94a8be] mt-1">Stars on Clutch</p>
              </div>
              <div data-testid="careers-metric-3" className="text-center px-4 border-l border-white/10">
                <p className="stat-number text-4xl text-white">24/7</p>
                <p className="text-xs text-[#94a8be] mt-1">Monitoring and Support</p>
              </div>
            </div>
          </div>
        </section>

        <section data-testid="careers-why" className="py-20 bg-[#0a1628]">
          <div className="max-w-6xl mx-auto px-6">
            <p className="overline text-[#0077B3] mb-4 text-center">Why Work at Veracity</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center" style={{ fontFamily: "Outfit" }}>
              A Company Only as Good as Its Team
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {WHY_VERACITY.map((item) => (
                <div key={item.title} data-testid="careers-why-item" className="bg-[#0f1d32] border border-white/10 rounded-sm p-6">
                  <item.icon className="w-8 h-8 text-[#0077B3] mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "Outfit" }}>{item.title}</h3>
                  <p className="text-sm text-[#94a8be] leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section data-testid="careers-roles" className="py-20 bg-[#0f1d32]">
          <div className="max-w-6xl mx-auto px-6">
            <p className="overline text-[#0077B3] mb-4 text-center">Roles on Our Team</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center" style={{ fontFamily: "Outfit" }}>
              The Kinds of Roles That Make Up Veracity
            </h2>
            <p className="text-base text-[#94a8be] leading-relaxed mb-12 max-w-2xl mx-auto text-center">
              Our team covers support, technical alignment, project management, sales, and centralized services. These are the roles our people hold today, not a list of open positions.
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {TEAM_ROLES.map((role) => (
                <span key={role} data-testid="careers-role" className="bg-[#0a1628] border border-white/10 rounded-sm px-4 py-2 text-sm text-[#94a8be]">
                  {role}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section data-testid="careers-openings" className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0f1d32] mb-4" style={{ fontFamily: "Outfit" }}>
              Available Opportunities
            </h2>
            <p className="text-[#3a5068] text-base mb-8 max-w-xl mx-auto">
              We do not have specific roles posted on this page right now. We are always interested in hearing from talented technology professionals in the Twin Cities who want to do challenging, fulfilling work for local businesses. Introduce yourself and tell us what you do best.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:info@veracitytechmn.com" data-testid="careers-email-cta">
                <Button className="bg-[#003B71] hover:bg-[#002a52] text-white rounded-sm font-semibold px-8 h-12">
                  <Mail className="w-4 h-4 mr-2" /> Email info@veracitytechmn.com
                </Button>
              </a>
              <a href="tel:9529417333" className="flex items-center gap-2 text-[#003B71] hover:text-[#002a52] text-sm font-semibold">
                <Phone className="w-4 h-4" /> (952) 941-7333
              </a>
            </div>
            <p className="text-[#4a5e78] text-xs mt-6">
              Veracity Technologies, 5929 Baker Rd, Suite 420, Minnetonka, MN 55345
            </p>
            <p className="text-[#4a5e78] text-xs mt-3">
              Want to see the team you would be joining? <Link to="/testimonials" className="text-[#0077B3] hover:text-[#00a0e4] font-semibold">Read what our clients say about us</Link>.
            </p>
          </div>
        </section>
      </main>

      <CareersFooter />
    </div>
  );
}
