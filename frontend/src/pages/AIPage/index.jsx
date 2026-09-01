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
      const pageUrl = `https://www.veracitytechmn.com/${page.slug}`;
      if (canonical) canonical.setAttribute("href", pageUrl);
      const ogImageUrl = `https://www.veracitytechmn.com${page.heroImage.replace(".webp", "-og.jpg")}`;
      const ogTags = [
        ['meta[property="og:url"]', "content", pageUrl],
        ['meta[property="og:image"]', "content", ogImageUrl],
        ['meta[property="og:image:alt"]', "content", page.name],
        ['meta[property="og:title"]', "content", page.metaTitle],
        ['meta[property="og:description"]', "content", page.metaDescription],
        ['meta[name="twitter:url"]', "content", pageUrl],
        ['meta[name="twitter:image"]', "content", ogImageUrl],
        ['meta[name="twitter:image:alt"]', "content", page.name],
        ['meta[name="twitter:title"]', "content", page.metaTitle],
        ['meta[name="twitter:description"]', "content", page.metaDescription],
      ];
      ogTags.forEach(([selector, attr, value]) => {
        const el = document.querySelector(selector);
        if (el) el.setAttribute(attr, value);
      });
    }
    return () => {
      document.title = "Veracity Technologies | AI-Powered Cybersecurity & Managed IT";
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute("href", "https://www.veracitytechmn.com/");
      const defaults = [
        ['meta[property="og:url"]', "content", "https://www.veracitytechmn.com/"],
        ['meta[property="og:image"]', "content", "https://www.veracitytechmn.com/og-image.jpg"],
        ['meta[property="og:image:alt"]', "content", "Veracity Technologies - AI Automation and Managed Intelligence"],
        ['meta[property="og:title"]', "content", "Managed IT & Cybersecurity Built for AI + Automation | Veracity Technologies"],
        ['meta[property="og:description"]', "content", "Managed IT and cybersecurity for Minnesota businesses, delivered through AI, automation, and proactive intelligence. Free business technology assessment."],
        ['meta[name="twitter:url"]', "content", "https://www.veracitytechmn.com/"],
        ['meta[name="twitter:image"]', "content", "https://www.veracitytechmn.com/og-image.jpg"],
        ['meta[name="twitter:image:alt"]', "content", "Veracity Technologies - AI Automation and Managed Intelligence"],
        ['meta[name="twitter:title"]', "content", "Managed IT & Cybersecurity, Evolved | Veracity Technologies"],
        ['meta[name="twitter:description"]', "content", "Managed IT and cybersecurity delivered through AI, automation, and proactive intelligence. Minnesota businesses trust Veracity."],
      ];
      defaults.forEach(([selector, attr, value]) => {
        const el = document.querySelector(selector);
        if (el) el.setAttribute(attr, value);
      });
    };
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
