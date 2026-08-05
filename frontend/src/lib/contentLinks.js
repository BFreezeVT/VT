// Shared internal-linking helpers used across city pages, industry pages, and blog posts
// to funnel authority toward the Business Technology Assessment and AI content cluster.

export const assessmentAnchors = [
  "Business Technology Assessment",
  "Technology Maturity Assessment",
  "Strategic Technology Assessment",
  "Technology Planning Assessment",
  "Technology Risk Assessment",
  "Business Technology Review",
  "Cybersecurity Readiness Assessment",
  "Microsoft Copilot Readiness Assessment",
  "AI Readiness Assessment",
  "AI Maturity Assessment",
  "AI Governance Assessment",
  "Technology Health Assessment",
];

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function anchorFor(seed, offset = 0) {
  const n = typeof seed === "number" ? seed : hashString(String(seed));
  return assessmentAnchors[(n + offset) % assessmentAnchors.length];
}

export const industrySlugs = [
  "financial-it-support",
  "construction-it-support",
  "manufacturing-it-support",
  "high-compliance-it-support",
];

const industryKeywordMap = [
  { slug: "financial-it-support", keywords: ["financ", "wealth", "bank", "advisory", "insurance", "investment"] },
  { slug: "construction-it-support", keywords: ["construction"] },
  { slug: "manufacturing-it-support", keywords: ["manufactur"] },
  { slug: "high-compliance-it-support", keywords: ["government", "healthcare", "medical", "legal", "compliance", "education"] },
];

export function industryForCity(city) {
  const text = (city.localIndustries || []).join(" ").toLowerCase();
  const match = industryKeywordMap.find(({ keywords }) => keywords.some((kw) => text.includes(kw)));
  return match ? match.slug : industrySlugs[hashString(city.slug) % industrySlugs.length];
}

export const aiPageSlugMeta = [
  { slug: "ai-readiness-assessment", name: "AI Readiness Assessment" },
  { slug: "ai-governance", name: "AI Governance" },
  { slug: "ai-risk-assessment", name: "AI Risk Assessment" },
  { slug: "ai-security-assessment", name: "AI Security Assessment" },
  { slug: "microsoft-copilot-readiness", name: "Microsoft Copilot Readiness" },
  { slug: "ai-policy-development", name: "AI Policy Development" },
  { slug: "ai-data-governance", name: "AI Data Governance" },
  { slug: "shadow-ai-risk-assessment", name: "Shadow AI Risk Assessment" },
  { slug: "ai-automation-consulting", name: "AI Automation Consulting" },
  { slug: "ai-adoption-strategy", name: "AI Adoption Strategy" },
  { slug: "responsible-ai-consulting", name: "Responsible AI Consulting" },
];

export function aiPagesFor(seed, count = 2) {
  const start = typeof seed === "number" ? seed : hashString(String(seed));
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(aiPageSlugMeta[(start + i) % aiPageSlugMeta.length]);
  }
  return result;
}

// Category (blog) -> {industry slug, ai page slug} mapping, with deterministic
// rotation for categories that don't map to a single industry.
const categoryIndustryMap = {
  "Financial Services": "financial-it-support",
  "Manufacturing": "manufacturing-it-support",
  "Compliance": "high-compliance-it-support",
};
const categoryAIMap = {
  "Financial Services": "ai-governance",
  "Manufacturing": "ai-security-assessment",
  "Compliance": "ai-risk-assessment",
  "Cybersecurity": "ai-security-assessment",
  "Business Continuity": "shadow-ai-risk-assessment",
  "Managed IT": "ai-readiness-assessment",
  "AI & Automation": "ai-adoption-strategy",
};

export function getBlogRelatedLinks(category, slug) {
  const seed = hashString(slug || category || "post");
  const industrySlug = categoryIndustryMap[category] || industrySlugs[seed % industrySlugs.length];
  const aiSlug = categoryAIMap[category] || aiPageSlugMeta[seed % aiPageSlugMeta.length].slug;
  const aiEntry = aiPageSlugMeta.find((a) => a.slug === aiSlug) || aiPageSlugMeta[0];
  return { industrySlug, aiSlug: aiEntry.slug, aiName: aiEntry.name };
}
