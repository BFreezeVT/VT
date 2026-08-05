import { Link } from "react-router-dom";
import industryData from "../../data/industryData";

export default function AIPageRelated({ otherPages }) {
  return (
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
  );
}
