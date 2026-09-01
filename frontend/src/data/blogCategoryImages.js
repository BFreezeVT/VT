// Category-level hero/thumbnail images for blog posts (149 articles, 9 categories).
// Reuses existing Core Service / AI page hero images where the topic already matches,
// to avoid generating redundant image assets.
const blogCategoryImages = {
  "Managed IT": "/images/managed-it-services-hero.webp",
  "Cybersecurity": "/images/cybersecurity-services-hero.webp",
  "Business Continuity": "/images/business-continuity-hero.webp",
  "Compliance": "/images/compliance-services-hero.webp",
  "AI & Automation": "/images/ai-automation-consulting-hero.webp",
  "AI & Cybersecurity": "/images/ai-security-assessment-hero.webp",
  "Construction": "/images/construction-category-hero.webp",
  "Financial Services": "/images/financial-services-category-hero.webp",
  "Manufacturing": "/images/manufacturing-category-hero.webp",
};

export const DEFAULT_BLOG_IMAGE = blogCategoryImages["Cybersecurity"];

export function getBlogCategoryImage(category) {
  return blogCategoryImages[category] || DEFAULT_BLOG_IMAGE;
}

export default blogCategoryImages;
