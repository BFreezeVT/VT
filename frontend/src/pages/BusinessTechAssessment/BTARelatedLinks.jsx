import { Link } from "react-router-dom";
import aiPagesData from "../../data/aiPagesData";
import industryData from "../../data/industryData";

export default function BTARelatedLinks() {
  return (
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
  );
}
