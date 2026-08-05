import { Link } from "react-router-dom";
import { getBlogRelatedLinks } from "../../lib/contentLinks";
import industryData from "../../data/industryData";

// Related Resources - funnels to service, industry, AI page, and Business Technology Assessment
export default function BlogRelatedResources({ post }) {
  const { industrySlug, aiSlug, aiName, serviceSlug, serviceName } = getBlogRelatedLinks(post.category, post.slug);
  const industry = industryData.find((ind) => ind.slug === industrySlug);

  return (
    <div data-testid="blog-related-resources" className="mt-10 border-t border-white/10 pt-8">
      <p className="text-[#94a8be] text-xs uppercase tracking-wider mb-4">Related Resources</p>
      <div className="flex flex-wrap gap-3">
        <Link to={`/services/${serviceSlug}`} data-testid="blog-related-service" className="text-xs text-[#0077B3] border border-white/10 hover:border-[#0077B3] px-4 py-2 transition-colors">{serviceName}</Link>
        {industry && (
          <Link to={`/industries/${industry.slug}`} data-testid="blog-related-industry" className="text-xs text-[#0077B3] border border-white/10 hover:border-[#0077B3] px-4 py-2 transition-colors">{industry.name} IT Support</Link>
        )}
        <Link to={`/${aiSlug}`} data-testid="blog-related-ai" className="text-xs text-[#0077B3] border border-white/10 hover:border-[#0077B3] px-4 py-2 transition-colors">{aiName}</Link>
        <Link to="/business-technology-assessment" data-testid="blog-related-bta" className="text-xs font-semibold text-white bg-[#0077B3] hover:bg-[#005f8f] px-4 py-2 transition-colors">Business Technology Assessment</Link>
      </div>
    </div>
  );
}
