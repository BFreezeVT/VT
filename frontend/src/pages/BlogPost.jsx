import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Phone, Clock, Tag, ArrowRight, CalendarDays } from "lucide-react";
import { Button } from "../components/ui/button";
import axios from "axios";
import DOMPurify from "dompurify";
import { getBlogRelatedLinks } from "../lib/contentLinks";
import industryData from "../data/industryData";
import RelatedArticlesCarousel from "../sections/RelatedArticlesCarousel";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(`${API}/blog/${slug}`),
      axios.get(`${API}/blog`),
    ]).then(([postRes, allRes]) => {
      setPost(postRes.data);
      document.title = `${postRes.data.title} | Veracity Technologies`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", postRes.data.excerpt);
      setAllPosts(allRes.data);
    }).catch(() => setPost(null))
      .finally(() => setLoading(false));

    return () => { document.title = "Veracity Technologies | AI-Powered Cybersecurity & Managed IT"; };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1d32] flex items-center justify-center">
        <p className="text-[#94a8be]">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0f1d32] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "Outfit" }}>Article Not Found</h1>
          <Link to="/resources" className="text-[#0077B3] hover:text-white">Back to Resources</Link>
        </div>
      </div>
    );
  }

  // Convert markdown-like content to JSX
  const renderContent = (text) => {
    return text.split("\n\n").map((block, i) => {
      if (block.startsWith("## ")) {
        return (
          <h2 key={i} className="text-xl sm:text-2xl font-bold text-white mt-10 mb-4" style={{ fontFamily: "Outfit" }}>
            {block.replace("## ", "")}
          </h2>
        );
      }
      if (block.startsWith("### ")) {
        return (
          <h3 key={i} className="text-lg font-semibold text-white mt-8 mb-3" style={{ fontFamily: "Outfit" }}>
            {block.replace("### ", "")}
          </h3>
        );
      }
      if (block.startsWith("- ")) {
        const items = block.split("\n").filter(l => l.startsWith("- "));
        return (
          <ul key={i} className="space-y-2 my-4 ml-4">
            {items.map((item, j) => (
              <li key={j} className="text-[#94a8be] text-base leading-relaxed flex items-start gap-2">
                <span className="text-[#0077B3] mt-1.5 flex-shrink-0">&#8226;</span>
                <span dangerouslySetInnerHTML={{ __html: formatInline(item.replace("- ", "")) }} />
              </li>
            ))}
          </ul>
        );
      }
      if (block.match(/^\d+\./)) {
        const items = block.split("\n").filter(l => l.match(/^\d+\./));
        return (
          <ol key={i} className="space-y-2 my-4 ml-4 list-decimal list-inside">
            {items.map((item, j) => (
              <li key={j} className="text-[#94a8be] text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(item.replace(/^\d+\.\s*/, "")) }} />
            ))}
          </ol>
        );
      }
      if (block.startsWith("*") && block.endsWith("*") && !block.startsWith("**")) {
        return (
          <p key={i} className="text-[#0077B3] text-base italic my-6 border-l-2 border-[#0077B3] pl-4">
            {block.replace(/^\*|\*$/g, "")}
          </p>
        );
      }
      return (
        <p key={i} className="text-[#94a8be] text-base leading-relaxed my-4" dangerouslySetInnerHTML={{ __html: formatInline(block) }} />
      );
    });
  };

  const formatInline = (text) => {
    const html = text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>');
    return DOMPurify.sanitize(html, { ALLOWED_TAGS: ["strong", "em"], ALLOWED_ATTR: ["class"] });
  };

  return (
    <div className="min-h-screen bg-[#0f1d32]" data-testid={`blog-post-${post.slug}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            author: { "@type": "Organization", name: "Veracity Technologies", url: "https://www.veracitytechmn.com" },
            publisher: { "@type": "Organization", name: "Veracity Technologies", url: "https://www.veracitytechmn.com" },
            datePublished: post.published_date,
            dateModified: post.published_date,
            mainEntityOfPage: `https://www.veracitytechmn.com/resources/${post.slug}`,
            url: `https://www.veracitytechmn.com/resources/${post.slug}`,
            inLanguage: "en-US",
            articleSection: post.category,
            keywords: post.category,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.veracitytechmn.com/" },
              { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.veracitytechmn.com/resources" },
              { "@type": "ListItem", position: 3, name: post.title, item: `https://www.veracitytechmn.com/resources/${post.slug}` },
            ],
          }),
        }}
      />

      <nav className="bg-[#003B71]/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "Outfit" }}>
            VERACITY<span className="text-[#0077B3]"> TECHNOLOGIES</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/resources" className="text-[#94a8be] hover:text-white text-sm flex items-center gap-1">
              <ChevronLeft className="w-3 h-3" /> All Articles
            </Link>
            <a href="tel:9529417333" className="flex items-center gap-2 text-[#94a8be] hover:text-white text-sm">
              <Phone className="w-4 h-4" /> (952) 941-7333
            </a>
          </div>
        </div>
      </nav>

      <main role="main">
        <article className="py-20 lg:py-28" aria-label={post.title}>
          <div className="max-w-3xl mx-auto px-6">
            <Link to="/resources" className="inline-flex items-center gap-1 text-[#0077B3] text-sm mb-8 hover:text-white transition-colors">
              <ChevronLeft className="w-3 h-3" /> All Articles
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] uppercase tracking-wider text-[#0077B3] border border-[#0077B3]/30 px-2 py-0.5">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-[#94a8be]/60 text-xs">
                <Clock className="w-3 h-3" /> {post.read_time}
              </span>
              <span className="text-[#94a8be]/60 text-xs">{post.published_date}</span>
            </div>

            <h1
              data-testid="blog-post-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-8"
              style={{ fontFamily: "Outfit" }}
            >
              {post.title}
            </h1>

            <p className="text-[#0077B3] text-lg leading-relaxed mb-10 border-l-2 border-[#0077B3] pl-5">
              {post.excerpt}
            </p>

            <div data-testid="blog-post-content" className="prose-custom">
              {renderContent(post.content)}
            </div>

            {/* CTA */}
            <div className="mt-16 grid-border-card p-8 text-center">
              <h3 className="text-white font-bold text-xl mb-3" style={{ fontFamily: "Outfit" }}>
                Ready to strengthen your security posture?
              </h3>
              <p className="text-[#94a8be] text-sm mb-6">
                Schedule a free technology and cyber risk audit with our team.
              </p>
              <Link to="/#audit">
                <Button className="bg-[#0077B3] hover:bg-[#0077B3]/90 text-white rounded-sm font-semibold px-8 h-11">
                  Get Your Free Audit
                </Button>
              </Link>
            </div>

            {/* Related Resources - funnels to service, industry, AI page, and Business Technology Assessment */}
            {(() => {
              const { industrySlug, aiSlug, aiName } = getBlogRelatedLinks(post.category, post.slug);
              const industry = industryData.find((ind) => ind.slug === industrySlug);
              return (
                <div data-testid="blog-related-resources" className="mt-10 border-t border-white/10 pt-8">
                  <p className="text-[#94a8be] text-xs uppercase tracking-wider mb-4">Related Resources</p>
                  <div className="flex flex-wrap gap-3">
                    <Link to="/#core-services" data-testid="blog-related-service" className="text-xs text-[#0077B3] border border-white/10 hover:border-[#0077B3] px-4 py-2 transition-colors">Managed IT & Cybersecurity Services</Link>
                    {industry && (
                      <Link to={`/industries/${industry.slug}`} data-testid="blog-related-industry" className="text-xs text-[#0077B3] border border-white/10 hover:border-[#0077B3] px-4 py-2 transition-colors">{industry.name} IT Support</Link>
                    )}
                    <Link to={`/${aiSlug}`} data-testid="blog-related-ai" className="text-xs text-[#0077B3] border border-white/10 hover:border-[#0077B3] px-4 py-2 transition-colors">{aiName}</Link>
                    <Link to="/business-technology-assessment" data-testid="blog-related-bta" className="text-xs font-semibold text-white bg-[#0077B3] hover:bg-[#005f8f] px-4 py-2 transition-colors">Business Technology Assessment</Link>
                  </div>
                </div>
              );
            })()}

            {/* Related Articles - carousel, prioritizing same category */}
            <RelatedArticlesCarousel currentSlug={post.slug} category={post.category} allPosts={allPosts} />

            {/* Visible last updated */}
            <p className="mt-10 text-[#94a8be]/40 text-xs flex items-center gap-1">
              <CalendarDays className="w-3 h-3" /> Published {post.published_date} &middot; Last reviewed December 2025
            </p>
          </div>
        </article>
      </main>

      <footer className="bg-[#003B71] border-t border-[#00325f] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#94a8be]/60 text-xs">&copy; {new Date().getFullYear()} Veracity Technologies.</p>
          <div className="flex items-center gap-6 text-sm text-[#94a8be]">
            <Link to="/resources" className="hover:text-white">Resources</Link>
            <Link to="/" className="hover:text-white">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
