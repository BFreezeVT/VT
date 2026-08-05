// Category-level hero/thumbnail images for blog posts (149 articles, 9 categories).
// Reuses existing Core Service / AI page hero images where the topic already matches,
// to avoid generating redundant image assets.
const blogCategoryImages = {
  "Managed IT": "https://static.prod-images.emergentagent.com/jobs/a66d851c-ab3d-4669-9a37-bc99f9119744/images/e286d3d96ac98a33da866747e535d260888f3ebd6e8538adae4826c3446856b5.jpeg",
  "Cybersecurity": "https://static.prod-images.emergentagent.com/jobs/a66d851c-ab3d-4669-9a37-bc99f9119744/images/d4ee5cdd93aa76872cfcf07dfd003a14267f3baeaa5679f58603643bf21ea202.jpeg",
  "Business Continuity": "https://static.prod-images.emergentagent.com/jobs/a66d851c-ab3d-4669-9a37-bc99f9119744/images/f770fb42d34834c745293725207e5d0246dfdf6c3699b537eb97ffaeeeb3e39d.jpeg",
  "Compliance": "https://static.prod-images.emergentagent.com/jobs/a66d851c-ab3d-4669-9a37-bc99f9119744/images/bb4a55ab99581f1c8e27c075c041eb9b2378af6035ccbc804575d8d900405565.jpeg",
  "AI & Automation": "https://static.prod-images.emergentagent.com/jobs/a66d851c-ab3d-4669-9a37-bc99f9119744/images/31a3a63151bd11ce4b58082656ebe23de61b419c29d7cafc75dddbee595ee6f7.jpeg",
  "AI & Cybersecurity": "https://static.prod-images.emergentagent.com/jobs/a66d851c-ab3d-4669-9a37-bc99f9119744/images/bb221130289cfc915943539c05cdc2b5125606a7c24df45ee904c0439c5086a8.jpeg",
  "Construction": "https://static.prod-images.emergentagent.com/jobs/a66d851c-ab3d-4669-9a37-bc99f9119744/images/658e7142998829b55f5daf6ff31102b1c8d10c949746192d7549cc28cbe8cbf1.jpeg",
  "Financial Services": "https://static.prod-images.emergentagent.com/jobs/a66d851c-ab3d-4669-9a37-bc99f9119744/images/5b7a070d954f77c924b7c0398e9b112fd3fb6d904525311d476af6cea50a864c.jpeg",
  "Manufacturing": "https://static.prod-images.emergentagent.com/jobs/a66d851c-ab3d-4669-9a37-bc99f9119744/images/3b68f606e7ec76da71804194d867c07ff772c9b4dfba0062fbbb6ad546494c50.jpeg",
};

export const DEFAULT_BLOG_IMAGE = blogCategoryImages["Cybersecurity"];

export function getBlogCategoryImage(category) {
  return blogCategoryImages[category] || DEFAULT_BLOG_IMAGE;
}

export default blogCategoryImages;
