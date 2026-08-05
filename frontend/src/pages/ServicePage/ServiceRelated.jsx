import { Link } from "react-router-dom";
import coreServicesData from "../../data/coreServicesData";
import aiPagesData from "../../data/aiPagesData";

export default function ServiceRelated({ svc }) {
  const otherServices = coreServicesData.filter((s) => svc.relatedServiceSlugs.includes(s.slug));
  const relatedAi = svc.relatedAiSlug ? aiPagesData.find((p) => p.slug === svc.relatedAiSlug) : null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-[#3a5068] text-sm mb-4 text-center">Related services:</p>
        <div className="flex justify-center gap-3 flex-wrap mb-8">
          {otherServices.map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`} data-testid={`related-service-${s.slug}`} className="text-sm text-[#0077B3] border border-[#d0dcea] hover:border-[#0077B3] px-5 py-2.5 transition-colors">
              {s.name}
            </Link>
          ))}
          {relatedAi && (
            <Link key={relatedAi.slug} to={`/${relatedAi.slug}`} data-testid={`related-service-ai-${relatedAi.slug}`} className="text-sm text-[#0077B3] border border-[#d0dcea] hover:border-[#0077B3] px-5 py-2.5 transition-colors">
              {relatedAi.name}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
