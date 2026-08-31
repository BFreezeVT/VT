/* Generates public/sitemap.xml from the same route sources prerender.js uses,
   so every indexable page (including all blog posts) always ends up in the sitemap. */
const fs = require("fs");
const path = require("path");
const http = require("http");
const https = require("https");

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const BUILD_DIR = path.join(__dirname, "..", "build");
const SRC_DATA_DIR = path.join(__dirname, "..", "src", "data");
const DOMAIN = "https://www.veracitytechmn.com";

function readEnvVar(name) {
  const envPath = path.join(__dirname, "..", ".env");
  const content = fs.readFileSync(envPath, "utf8");
  const match = content.split("\n").find((l) => l.startsWith(`${name}=`));
  return match ? match.split("=").slice(1).join("=").trim() : null;
}

function extractSlugs(fileName) {
  const content = fs.readFileSync(path.join(SRC_DATA_DIR, fileName), "utf8");
  const matches = [...content.matchAll(/^\s+slug:\s*"([^"]+)"/gm)];
  return matches.map((m) => m[1]);
}

async function getBlogPosts(backendUrl) {
  const client = backendUrl.startsWith("https:") ? https : http;
  return new Promise((resolve, reject) => {
    client
      .get(`${backendUrl}/api/blog`, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on("error", reject);
  });
}

// Fixed lastmod/changefreq/priority for non-blog routes (only bump a date here
// when that page's real content changes - do not auto-set to "today" on every build).
const STATIC_META = {
  "/": { lastmod: "2025-12-01", changefreq: "weekly", priority: "1.0" },
  "/service-areas": { lastmod: "2025-12-01", changefreq: "weekly", priority: "0.9" },
  "/business-technology-assessment": { lastmod: "2026-02-01", changefreq: "weekly", priority: "1.0" },
  "/resources": { lastmod: "2025-12-01", changefreq: "weekly", priority: "0.8" },
  "/cyber-risk-scorecard": { lastmod: "2025-12-01", changefreq: "monthly", priority: "0.9" },
  "/ai-roi-preview": { lastmod: "2026-02-01", changefreq: "monthly", priority: "0.9" },
  "/human-risk-simulation": { lastmod: "2026-02-05", changefreq: "monthly", priority: "0.9" },
  "/client-success": { lastmod: "2026-02-05", changefreq: "monthly", priority: "0.8" },
};

const INDUSTRY_META = { lastmod: "2025-12-01", changefreq: "monthly", priority: "0.9" };
const SERVICE_META = { lastmod: "2026-02-05", changefreq: "monthly", priority: "0.9" };
const CITY_META = { lastmod: "2025-12-01", changefreq: "monthly", priority: "0.8" };
const AI_PRIORITY_OVERRIDES = {
  "ai-readiness-assessment": "0.9",
  "ai-governance": "0.9",
  "ai-risk-assessment": "0.9",
  "ai-security-assessment": "0.9",
  "microsoft-copilot-readiness": "0.9",
  "ai-roi-preview": "0.9",
};
const AI_META_DEFAULT = { lastmod: "2026-02-01", changefreq: "monthly", priority: "0.8" };
const BLOG_META = { changefreq: "monthly", priority: "0.7" };

function urlEntry(loc, meta) {
  return `    <url>\n        <loc>${loc}</loc>\n        <lastmod>${meta.lastmod}</lastmod>\n        <changefreq>${meta.changefreq}</changefreq>\n        <priority>${meta.priority}</priority>\n    </url>`;
}

async function main() {
  const backendUrl = readEnvVar("REACT_APP_BACKEND_URL");
  if (!backendUrl) {
    console.warn("Sitemap: REACT_APP_BACKEND_URL not found, skipping sitemap generation.");
    return;
  }

  const entries = [];

  Object.entries(STATIC_META).forEach(([route, meta]) => {
    entries.push(urlEntry(`${DOMAIN}${route}`, meta));
  });

  extractSlugs("cityData.js").forEach((slug) => {
    entries.push(urlEntry(`${DOMAIN}/service-areas/${slug}`, CITY_META));
  });

  extractSlugs("industryData.js").forEach((slug) => {
    entries.push(urlEntry(`${DOMAIN}/industries/${slug}`, INDUSTRY_META));
  });

  extractSlugs("coreServicesData.js").forEach((slug) => {
    entries.push(urlEntry(`${DOMAIN}/services/${slug}`, SERVICE_META));
  });

  extractSlugs("aiPagesData.js").forEach((slug) => {
    const priority = AI_PRIORITY_OVERRIDES[slug] || AI_META_DEFAULT.priority;
    entries.push(urlEntry(`${DOMAIN}/${slug}`, { ...AI_META_DEFAULT, priority }));
  });

  const posts = await getBlogPosts(backendUrl);
  posts.forEach((post) => {
    entries.push(urlEntry(`${DOMAIN}/resources/${post.slug}`, { ...BLOG_META, lastmod: post.published_date }));
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n${entries.join("\n")}\n</urlset>\n`;

  fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), xml);
  if (fs.existsSync(BUILD_DIR)) {
    fs.writeFileSync(path.join(BUILD_DIR, "sitemap.xml"), xml);
  }
  console.log(`Sitemap generated with ${entries.length} URLs.`);
}

main().catch((err) => {
  console.error("Sitemap generation failed:", err.message);
});
