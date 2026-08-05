import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import industryData from "../../data/industryData";

export default function ServiceIndustryExamples({ svc }) {
  return (
    <section data-testid="service-page-industry-examples" className="py-20 bg-[#0f1d32]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="overline text-[#0077B3] mb-4">By Industry</p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-12" style={{ fontFamily: "Outfit" }}>
          How {svc.name} applies to your industry
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {svc.industryExamples.map((ex, i) => {
            const industry = industryData.find((ind) => ind.slug === ex.industrySlug);
            if (!industry) return null;
            return (
              <Link
                key={ex.industrySlug}
                to={`/industries/${ex.industrySlug}`}
                data-testid={`service-industry-example-${i}`}
                className="grid-border-card p-6 block hover:border-[#0077B3]/50 transition-colors group"
              >
                <p className="text-[#0077B3] text-xs uppercase tracking-wider font-semibold mb-2">{industry.name}</p>
                <p className="text-[#94a8be] text-sm leading-relaxed mb-3">{ex.example}</p>
                <span className="text-white text-xs font-semibold inline-flex items-center gap-1 group-hover:text-[#0077B3] transition-colors">
                  See {industry.name} solutions <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
