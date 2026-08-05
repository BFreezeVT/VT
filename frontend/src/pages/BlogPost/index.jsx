import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Clock, CalendarDays } from "lucide-react";
import { Button } from "../../components/ui/button";
import axios from "axios";
import RelatedArticlesCarousel from "../../sections/RelatedArticlesCarousel";
import Breadcrumbs from "../../components/Breadcrumbs";
import { getBlogCategoryImage } from "../../data/blogCategoryImages";
import { renderContent } from "./blogContentRenderer";
import { buildArticleSchema, buildBreadcrumbSchema } from "./blogPostSchemas";
import BlogPostNav from "./BlogPostNav";
import BlogPostFooter from "./BlogPostFooter";
import BlogRelatedResources from "./BlogRelatedResources";

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

      const categoryImage = getBlogCategoryImage(postRes.data.category);
      const ogTags = [
        ['meta[property="og:image"]', "content", categoryImage],
        ['meta[property="og:image:alt"]', "content", `${postRes.data.title} - ${postRes.data.category}`],
        ['meta[property="og:title"]', "content", postRes.data.title],
        ['meta[property="og:description"]', "content", postRes.data.excerpt],
        ['meta[name="twitter:image"]', "content", categoryImage],
        ['meta[name="twitter:image:alt"]', "content", `${postRes.data.title} - ${postRes.data.category}`],
        ['meta[name="twitter:title"]', "content", postRes.data.title],
        ['meta[name="twitter:description"]', "content", postRes.data.excerpt],
      ];
      ogTags.forEach(([selector, attr, value]) => {
        const el = document.querySelector(selector);
        if (el) el.setAttribute(attr, value);
      });

      setAllPosts(allRes.data);
    }).catch(() => setPost(null))
      .finally(() => setLoading(false));

    return () => {
      document.title = "Veracity Technologies | AI-Powered Cybersecurity & Managed IT";
      const defaults = [
        ['meta[property="og:image"]', "content", "https://www.veracitytechmn.com/og-image.png"],
        ['meta[property="og:image:alt"]', "content", "Veracity Technologies - AI Automation and Managed Intelligence"],
        ['meta[property="og:title"]', "content", "Managed IT & Cybersecurity Built for AI + Automation | Veracity Technologies"],
        ['meta[name="twitter:image"]', "content", "https://www.veracitytechmn.com/og-image.png"],
        ['meta[name="twitter:image:alt"]', "content", "Veracity Technologies - AI Automation and Managed Intelligence"],
      ];
      defaults.forEach(([selector, attr, value]) => {
        const el = document.querySelector(selector);
        if (el) el.setAttribute(attr, value);
      });
    };
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

  return (
    <div className="min-h-screen bg-[#0f1d32]" data-testid={`blog-post-${post.slug}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildArticleSchema(post)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(post)) }} />

      <BlogPostNav />

      <main role="main">
        <article className="py-20 lg:py-28" aria-label={post.title}>
          <div className="max-w-3xl mx-auto px-6">
            <Breadcrumbs items={[{ label: "Resources", to: "/resources" }, { label: post.title }]} />

            <img
              src={getBlogCategoryImage(post.category)}
              alt={`${post.category} illustration`}
              data-testid="blog-post-hero-image"
              className="w-full h-52 sm:h-64 object-contain bg-[#0a1220] rounded-sm mb-8"
              loading="lazy"
            />

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

            <BlogRelatedResources post={post} />

            {/* Related Articles - carousel, prioritizing same category */}
            <RelatedArticlesCarousel currentSlug={post.slug} category={post.category} allPosts={allPosts} />

            {/* Visible last updated */}
            <p className="mt-10 text-[#94a8be]/40 text-xs flex items-center gap-1">
              <CalendarDays className="w-3 h-3" /> Published {post.published_date} &middot; Last reviewed December 2025
            </p>
          </div>
        </article>
      </main>

      <BlogPostFooter />
    </div>
  );
}
