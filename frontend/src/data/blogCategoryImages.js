// Category-level hero/thumbnail images for blog posts (149 articles, 9 categories).
// Reuses existing Core Service / AI page hero images where the topic already matches,
// to avoid generating redundant image assets.
const blogCategoryImages = {
  "Managed IT": "/images/managed-it-services-hero-512.webp",
  "Cybersecurity": "/images/cybersecurity-services-hero-512.webp",
  "Business Continuity": "/images/business-continuity-hero-512.webp",
  "Compliance": "/images/compliance-services-hero-512.webp",
  "AI & Automation": "/images/ai-automation-consulting-hero-512.webp",
  "AI & Cybersecurity": "/images/ai-security-assessment-hero-512.webp",
  "Construction": "/images/construction-category-hero-512.webp",
  "Financial Services": "/images/financial-services-category-hero-512.webp",
  "Manufacturing": "/images/manufacturing-category-hero-512.webp",
};

export const DEFAULT_BLOG_IMAGE = blogCategoryImages["Cybersecurity"];

export function getBlogCategoryImage(category) {
  return blogCategoryImages[category] || DEFAULT_BLOG_IMAGE;
}

export default blogCategoryImages;
