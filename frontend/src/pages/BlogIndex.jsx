import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Phone, Clock, ArrowRight, Tag } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const categoryColors = {
  "AI & Cybersecurity": "text-[#FF5722] border-[#FF5722]/30",
  "Compliance": "text-[#0077B3] border-[#0077B3]/30",
  "Construction": "text-[#0077B3] border-[#0077B3]/30",
  "Manufacturing": "text-[#0077B3] border-[#0077B3]/30",
  "Financial Services": "text-[#0077B3] border-[#0077B3]/30",
};

export default function BlogIndex() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Resources & Insights | Veracity Technologies";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Cybersecurity insights, compliance guides, and AI security resources for construction, financial services, and manufacturing from Veracity Technologies.");

    axios.get(`${API}/blog`)
      .then((res) => setPosts(res.data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));

    return () => { document.title = "Veracity Technologies | AI-Powered Cybersecurity & Managed IT"; };
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1d32]" data-testid="blog-index">
      <nav className="bg-[#003B71]/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "Outfit" }}>
            VERACITY<span className="text-[#0077B3]"> TECHNOLOGIES</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-[#94a8be] hover:text-white text-sm flex items-center gap-1">
              <ChevronLeft className="w-3 h-3" /> Home
            </Link>
            <a href="tel:9529417333" className="flex items-center gap-2 text-[#94a8be] hover:text-white text-sm">
              <Phone className="w-4 h-4" /> (952) 941-7333
            </a>
          </div>
        </div>
      </nav>

      <main role="main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Resources & Insights - Cybersecurity Intelligence",
          description: "Cybersecurity insights, compliance guides, and AI security resources for construction, financial services, and manufacturing from Veracity Technologies.",
          url: "https://www.veracitytech.com/resources",
          publisher: { "@type": "Organization", name: "Veracity Technologies" },
          inLanguage: "en-US",
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.veracitytech.com/" },
            { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.veracitytech.com/resources" },
          ],
        }) }} />
        <section className="py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <Link to="/" className="inline-flex items-center gap-1 text-[#0077B3] text-sm mb-6 hover:text-white transition-colors">
              <ChevronLeft className="w-3 h-3" /> Back to Home
            </Link>
            <p className="overline text-[#0077B3] mb-4">Resources &amp; Insights</p>
            <h1
              data-testid="blog-heading"
              className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6"
              style={{ fontFamily: "Outfit" }}
            >
              Cybersecurity Intelligence for Regulated Industries
            </h1>
            <p className="text-[#94a8be] text-base max-w-2xl mb-16">
              Practical guides, threat analysis, and compliance insights from the Veracity Technologies team.
            </p>

            {loading ? (
              <div className="text-[#94a8be] text-sm">Loading articles...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, i) => (
                  <Link
                    key={post.slug}
                    to={`/resources/${post.slug}`}
                    data-testid={`blog-card-${i}`}
                    className="grid-border-card p-6 group hover:border-[#0077B3] transition-colors block flex flex-col"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-[10px] uppercase tracking-wider border px-2 py-0.5 ${categoryColors[post.category] || "text-[#0077B3] border-white/10"}`}>
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-[#94a8be]/60 text-xs">
                        <Clock className="w-3 h-3" /> {post.read_time}
                      </span>
                    </div>
                    <h2
                      className="text-white font-bold text-lg mb-3 group-hover:text-[#0077B3] transition-colors leading-tight"
                      style={{ fontFamily: "Outfit" }}
                    >
                      {post.title}
                    </h2>
                    <p className="text-[#94a8be] text-sm leading-relaxed mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                      <span className="text-xs text-[#94a8be]/60">{post.published_date}</span>
                      <span className="text-[#0077B3] text-sm font-medium flex items-center gap-1 group-hover:text-white transition-colors">
                        Read <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-[#003B71] border-t border-[#00325f] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#94a8be]/60 text-xs">&copy; {new Date().getFullYear()} Veracity Technologies.</p>
          <div className="flex items-center gap-6 text-sm text-[#94a8be]">
            <Link to="/" className="hover:text-white">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
