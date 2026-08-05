// JSON-LD structured data builders for a blog post page.
import { getBlogCategoryImage } from "../../data/blogCategoryImages";

export function buildArticleSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: getBlogCategoryImage(post.category),
    author: { "@type": "Organization", name: "Veracity Technologies", url: "https://www.veracitytechmn.com" },
    publisher: { "@type": "Organization", name: "Veracity Technologies", url: "https://www.veracitytechmn.com" },
    datePublished: post.published_date,
    dateModified: post.published_date,
    mainEntityOfPage: `https://www.veracitytechmn.com/resources/${post.slug}`,
    url: `https://www.veracitytechmn.com/resources/${post.slug}`,
    inLanguage: "en-US",
    articleSection: post.category,
    keywords: post.category,
  };
}

export function buildBreadcrumbSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.veracitytechmn.com/" },
      { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.veracitytechmn.com/resources" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://www.veracitytechmn.com/resources/${post.slug}` },
    ],
  };
}
