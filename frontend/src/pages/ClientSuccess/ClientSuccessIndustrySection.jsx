import { Quote, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ClientSuccessIndustrySection({ industryName, industrySlug, testimonials, bgClass }) {
  return (
    <section data-testid={`client-success-industry-${industrySlug || "general"}`} className={`py-16 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white" style={{ fontFamily: "Outfit" }}>
            {industryName}
          </h2>
          {industrySlug && (
            <Link
              to={`/industries/${industrySlug}`}
              data-testid={`client-success-industry-link-${industrySlug}`}
              className="text-sm text-[#0077B3] hover:text-white flex items-center gap-1 transition-colors"
            >
              See {industryName} solutions <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={t.company} data-testid={`client-success-testimonial-${industrySlug || "general"}-${i}`} className="grid-border-card p-6 flex flex-col">
              <Quote className="w-6 h-6 text-[#0077B3]/20 mb-3" />
              <p className="text-[#94a8be] text-sm leading-relaxed mb-4 flex-1 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="border-t border-white/10 pt-3 mt-auto">
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-[#94a8be] text-xs">{t.title}, {t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
