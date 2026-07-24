import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

export default function IndustryAICTA({ industry }) {
  return (
    <section data-testid="industry-ai-cta" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="overline text-[#0077B3] mb-4">AI Readiness for {industry.name}</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0f1d32] mb-6" style={{ fontFamily: "Outfit" }}>
          See how {industry.name.toLowerCase()} firms are scoring on AI readiness
        </h2>
        <div className="flex justify-center gap-3 flex-wrap mb-8">
          {industry.aiLinks.map((link, i) => (
            <Link key={link.slug} to={`/${link.slug}`} data-testid={`industry-ai-link-${i}`} className="text-sm text-[#0077B3] border border-[#0077B3]/30 hover:bg-[#0077B3]/5 px-4 py-2 transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
        <Link to="/business-technology-assessment" data-testid="industry-mid-cta">
          <Button className="bg-[#003B71] hover:bg-[#002a52] text-white rounded-sm font-semibold px-8 h-11">
            Take the Business Technology Assessment
          </Button>
        </Link>
      </div>
    </section>
  );
}
