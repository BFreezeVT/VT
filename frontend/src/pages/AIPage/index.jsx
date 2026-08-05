import { useParams } from "react-router-dom";
import { useEffect } from "react";
import aiPagesData from "../../data/aiPagesData";
import NotFound from "../NotFound";
import { buildServiceSchema, buildBreadcrumbSchema, buildFaqSchema } from "./aiPageSchemas";
import AIPageNav from "./AIPageNav";
import AIPageHero from "./AIPageHero";
import AIPageAnswerBox from "./AIPageAnswerBox";
import AIPageFramework from "./AIPageFramework";
import AIPageFAQ from "./AIPageFAQ";
import AIPageCTA from "./AIPageCTA";
import AIPageRelated from "./AIPageRelated";
import AIPageFooter from "./AIPageFooter";

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceSchema(page)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(page)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(page)) }} />

      <AIPageNav page={page} />

      <main role="main">
        <AIPageHero page={page} />
        <AIPageAnswerBox page={page} />
        <AIPageFramework page={page} />
        <AIPageFAQ page={page} />
        <AIPageCTA page={page} />
        <AIPageRelated otherPages={otherPages} />
      </main>

      <AIPageFooter />
    </div>
  );
}
