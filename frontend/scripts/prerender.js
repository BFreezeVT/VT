/* Post-build static prerendering for SEO (fixes soft-404 / wrong canonical on raw HTML fetch) */
const fs = require("fs");
const path = require("path");
const os = require("os");
const http = require("http");
const { spawnSync } = require("child_process");
const puppeteer = require("puppeteer-core");

// @sparticuz/chromium bundles a Chromium binary for serverless build images
// (Vercel has no system Chrome). It is only used when no system Chrome exists.
// The package is ESM, so require() returns a namespace object; the Chromium
// class lives on `.default`. v153 exposes executablePath() and args as statics
// on that class (no headless/defaultViewport properties in this version).
let sparticuzChromium = null;
try {
  const mod = require("@sparticuz/chromium");
  sparticuzChromium = mod && mod.default ? mod.default : mod;
} catch (e) {
  sparticuzChromium = null;
}

const BUILD_DIR = path.join(__dirname, "..", "build");
const PUBLIC_DIR = path.join(__dirname, "..", "public");
const SRC_DATA_DIR = path.join(__dirname, "..", "src", "data");
const PORT = 5055;

// The title in public/index.html. Every page starts with this title until its
// page component updates it client-side.
const TEMPLATE_TITLE = "Managed IT & Cybersecurity | Veracity Technologies";

function findChromePath() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;
  const candidates = ["/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/bin/google-chrome-stable"];
  return candidates.find((p) => fs.existsSync(p)) || null;
}

// Resolve the puppeteer launch options. Prefer a system Chrome when one exists
// (local runs); otherwise fall back to the @sparticuz/chromium binary bundled
// for serverless build images. Returns null when no Chrome is available.
async function getLaunchOptions() {
  const systemChrome = findChromePath();
  if (systemChrome) {
    return {
      executablePath: systemChrome,
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    };
  }
  if (sparticuzChromium && typeof sparticuzChromium.executablePath === "function") {
    try {
      const executablePath = await sparticuzChromium.executablePath();
      return {
        executablePath,
        headless: true,
        args: sparticuzChromium.args,
      };
    } catch (e) {
      console.warn("Prerender: @sparticuz/chromium binary unavailable:", e.message);
      return null;
    }
  }
  return null;
}

// Blog post slugs live in code (backend/blog_data.py and backend/server.py),
// the same source the API serves. Read them from the repository instead of
// fetching /api/blog, so prerendering does not depend on any environment
// variable or network access at build time.
const BACKEND_DIR = path.join(__dirname, "..", "..", "backend");

function getBlogSlugsFromRepo() {
  const slugs = [];
  for (const fileName of ["blog_data.py", "server.py"]) {
    const content = fs.readFileSync(path.join(BACKEND_DIR, fileName), "utf8");
    for (const m of content.matchAll(/"slug":\s*"([^"]+)"/g)) {
      slugs.push(m[1]);
    }
  }
  return [...new Set(slugs)];
}

// Hermetic blog API for prerendering. The BlogPost and BlogIndex pages fetch
// post data from the live backend API at render time
// (${REACT_APP_BACKEND_URL}/api/blog...). The prerender static server does
// not proxy /api, so during a build those fetches go to the absolute backend
// URL, which is unreachable or too slow from the build container, and the
// routes fail (no snapshot is written). Load the same data from the repo
// instead (frontend/scripts/export_blog_data.py parses backend/blog_data.py
// and backend/server.py with Python ast, never importing server.py) and
// serve it to the page via Puppeteer request interception, so no live
// backend is needed at build time. Returns the post array, or null when the
// export fails; the caller then falls back to the live backend, exactly as
// before, so this change cannot make a build worse than today.
function loadBlogData() {
  const outFile = path.join(os.tmpdir(), `veracity-blog-data-${process.pid}.json`);
  try {
    const result = spawnSync(
      "python3",
      [path.join(__dirname, "export_blog_data.py"), outFile],
      { encoding: "utf8", timeout: 60000 }
    );
    if (result.status !== 0) {
      const detail = (result.stderr || "").trim() || (result.error && result.error.message) || "unknown error";
      console.warn(`Prerender: blog data export failed (${detail}); blog API calls will use the live backend.`);
      return null;
    }
    const data = JSON.parse(fs.readFileSync(outFile, "utf8"));
    if (!Array.isArray(data) || data.length === 0) {
      console.warn("Prerender: blog data export returned no posts; blog API calls will use the live backend.");
      return null;
    }
    return data;
  } catch (e) {
    console.warn(`Prerender: could not load blog data (${e.message}); blog API calls will use the live backend.`);
    return null;
  } finally {
    try {
      fs.unlinkSync(outFile);
    } catch (e) {
      // Temporary file cleanup is best-effort.
    }
  }
}

// Serve /api/blog, /api/blog/<slug>, and /api/blog/<slug>/related from the
// repo data, mirroring the backend shapes exactly (see backend/server.py
// get_blog_posts, get_blog_post, get_related_blog_posts): the list and the
// related payloads carry every field except `content`; the single-post
// payload carries the full post. Related posts are the same-category posts
// first, then the newest others, capped at 8 (limit query param clamped
// 1-12, same as the backend). The in-page fetch URL is the absolute backend
// URL in production builds, and a relative "undefined/api/..." URL when
// REACT_APP_BACKEND_URL is unset, so match the /api/blog path segment
// wherever it appears in the request path rather than assuming an origin.
async function stubBlogApi(page) {
  const blogData = loadBlogData();
  if (!blogData) return;
  const postsBySlug = new Map(blogData.map((post) => [post.slug, post]));
  const stripContent = (post) => {
    const { content, ...rest } = post;
    return rest;
  };
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    let url;
    try {
      url = new URL(req.url());
    } catch (e) {
      req.continue();
      return;
    }
    const match = url.pathname.match(/(?:^|\/)api\/blog(?:\/([^/]+)(\/related)?)?\/?$/);
    if (!match) {
      req.continue();
      return;
    }
    const slug = match[1];
    const isRelated = Boolean(match[2]);
    let status = 200;
    let body;
    if (!slug) {
      body = blogData.map(stripContent);
    } else if (isRelated) {
      const current = postsBySlug.get(slug);
      if (!current) {
        status = 404;
        body = { detail: "Post not found" };
      } else {
        const limit = Math.max(1, Math.min(parseInt(url.searchParams.get("limit") || "8", 10) || 8, 12));
        const sameCategory = blogData.filter((post) => post.slug !== slug && post.category === current.category);
        const otherCategory = blogData.filter((post) => post.slug !== slug && post.category !== current.category);
        body = [...sameCategory, ...otherCategory].slice(0, limit).map(stripContent);
      }
    } else {
      const post = postsBySlug.get(slug);
      if (!post) {
        status = 404;
        body = { detail: "Post not found" };
      } else {
        body = post;
      }
    }
    req.respond({
      status,
      contentType: "application/json",
      headers: { "access-control-allow-origin": "*" },
      body: JSON.stringify(body),
    });
  });
  console.log(`Prerender: serving /api/blog from repo data (${blogData.length} posts).`);
}

function extractSlugs(fileName) {
  const content = fs.readFileSync(path.join(SRC_DATA_DIR, fileName), "utf8");
  const matches = [...content.matchAll(/^\s+slug:\s*"([^"]+)"/gm)];
  return matches.map((m) => m[1]);
}

function startStaticServer() {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    const filePath = path.join(BUILD_DIR, urlPath);
    const isAsset = /\.[a-zA-Z0-9]+$/.test(urlPath) && !urlPath.endsWith(".html");
    const serveFile = (fp, contentType) => {
      const stream = fs.createReadStream(fp);
      stream.on("error", () => {
        if (!res.headersSent) res.writeHead(404);
        res.end();
      });
      res.setHeader("Content-Type", contentType);
      stream.pipe(res);
    };
    if (isAsset && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      const types = { ".js": "application/javascript", ".css": "text/css", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".json": "application/json", ".ico": "image/x-icon", ".webp": "image/webp", ".woff2": "font/woff2" };
      serveFile(filePath, types[ext] || "application/octet-stream");
    } else {
      serveFile(path.join(BUILD_DIR, "index.html"), "text/html");
    }
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

async function main() {
  const launchOptions = await getLaunchOptions();
  if (!launchOptions) {
    console.warn("Prerender: no Chrome binary found, skipping SEO prerendering (SPA build is unaffected).");
    return;
  }

  const staticRoutes = [
    "/", "/service-areas", "/business-technology-assessment", "/resources",
    "/cyber-risk-scorecard", "/ai-roi-preview", "/human-risk-simulation", "/client-success",
    "/about",
    "/privacy-policy", "/careers", "/testimonials",
  ];
  const citySlugs = extractSlugs("cityData.js").map((s) => `/service-areas/${s}`);
  const industrySlugs = extractSlugs("industryData.js").map((s) => `/industries/${s}`);
  const serviceSlugs = extractSlugs("coreServicesData.js").map((s) => `/services/${s}`);
  const aiSlugs = extractSlugs("aiPagesData.js").map((s) => `/${s}`);
  const blogSlugs = getBlogSlugsFromRepo().map((s) => `/resources/${s}`);

  const allRoutes = [...staticRoutes, ...citySlugs, ...industrySlugs, ...serviceSlugs, ...aiSlugs, ...blogSlugs];
  console.log(`Prerendering ${allRoutes.length} routes...`);

  // The bundle filenames are content-hashed and change on every build. public/index.html
  // is BOTH the webpack build template (input) AND, for "/", the file we write the final
  // prerendered snapshot back into (output) - see below. If we ever wrote the captured
  // <script>/<link> tags back verbatim, the NEXT build's webpack run would inject a fresh
  // tag into a template that already contains the previous run's tag (html-webpack-plugin
  // appends rather than replaces), silently accumulating duplicate/stale bundle references
  // across repeated builds. Read the current build's true asset paths from CRA's own
  // manifest and always normalize to exactly one correct <script>/<link> pair.
  const manifest = JSON.parse(fs.readFileSync(path.join(BUILD_DIR, "asset-manifest.json"), "utf8"));
  const mainJs = manifest.files["main.js"];
  const mainCss = manifest.files["main.css"];
  const ASSET_TAG_RE = /<script[^>]*\ssrc="[^"]*\/main\.[a-f0-9]+\.js"[^>]*><\/script>|<link[^>]*\shref="[^"]*\/main\.[a-f0-9]+\.css"[^>]*>/g;

  function stripAssetTags(html) {
    return html.replace(ASSET_TAG_RE, "");
  }

  function normalizeAssetTags(html) {
    const canonicalTags = `<script defer="defer" src="${mainJs}"></script><link href="${mainCss}" rel="stylesheet">`;
    return stripAssetTags(html).replace("</head>", `${canonicalTags}</head>`);
  }

  const server = await startStaticServer();
  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();
  // Serve the blog API from repo data so blog routes and the /resources hub
  // prerender without a live backend. Falls back to the live API when the
  // export fails (see loadBlogData).
  await stubBlogApi(page);

  let success = 0;
  const failed = [];

  for (const route of allRoutes) {
    try {
      // Race guard: under load, React occasionally hasn't finished mounting into #root by
      // the time we capture page.content(), even after networkidle0 + a settle delay - this
      // silently produces an empty shell that still counts as "success" (the root cause of
      // long-standing intermittent soft-404s on a handful of routes). Retry with a longer
      // settle time rather than ever saving that empty shell as a real prerendered snapshot.
      let html;
      let mounted = false;
      let attempt = 0;
      do {
        await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle0", timeout: 30000 });
        await new Promise((r) => setTimeout(r, 400 + attempt * 800));
        mounted = await page.evaluate(() => document.getElementById("root")?.children.length > 0);
        if (mounted) {
          // Title guard: the page title is set client-side by a page-component
          // useEffect, which can run after React mounts (especially on
          // lazy-loaded pages). Capturing immediately after mount saves the
          // template title instead of the page's own title. Wait for the title
          // to change from the template title before capturing. The homepage
          // keeps the template title by design, so skip the wait there.
          if (route !== "/") {
            try {
              await page.waitForFunction(
                (templateTitle) => document.title !== templateTitle,
                { timeout: 5000 },
                TEMPLATE_TITLE
              );
            } catch (e) {
              console.warn(`Prerender: title did not update from template for ${route}, capturing as-is.`);
            }
          }
          html = await page.content();
        }
        attempt++;
      } while (!mounted && attempt < 3);

      if (!mounted) {
        throw new Error("React never mounted into #root after 3 attempts");
      }

      // Content guard: a page that failed to load its data renders a not-found
      // state (for example a blog post whose API fetch failed renders
      // "Article Not Found"). Saving that as the snapshot would be worse than
      // keeping the previous snapshot, so treat it as a failure and do not
      // save it. The route is reported in the FAILED list.
      const isNotFound = await page.evaluate(() => {
        const h1 = document.querySelector("h1");
        return h1 ? /not found/i.test(h1.textContent || "") : false;
      });
      if (isNotFound) {
        throw new Error("Page rendered a not-found state (its data did not load)");
      }

      html = normalizeAssetTags(html);

      if (route === "/") {
        // build/index.html is the homepage actually served for THIS build -> keep exactly one
        // current-hash bundle tag (the normalized html).
        fs.writeFileSync(path.join(BUILD_DIR, "index.html"), html);

        // public/index.html is ALSO html-webpack-plugin's TEMPLATE for the next build. If it
        // carries ANY <script>/<link> bundle tag, the next `craco build` injects a second
        // (current-hash) tag ON TOP of this (now stale-hash) one, so the deployed homepage ends
        // up with TWO main.*.js tags - both resolving 200, double-mounting the React app
        // (confirmed in production). The deploy image has no Chrome, so postbuild prerender does
        // NOT run there to re-normalize. Fix at the source: strip ALL bundle tags from the
        // committed template and let webpack inject exactly one correct tag at build time.
        // (Sub-route files below are copied verbatim, never used as a template, so they keep
        // their single normalized tag.)
        fs.writeFileSync(path.join(PUBLIC_DIR, "index.html"), stripAssetTags(html));
      } else {
        const buildOutPath = path.join(BUILD_DIR, route, "index.html");
        fs.mkdirSync(path.dirname(buildOutPath), { recursive: true });
        fs.writeFileSync(buildOutPath, html);

        // Also write into public/ (source-controlled) so plain `yarn build` on any
        // environment - even without a Chrome binary at build time - still serves the
        // correct prerendered HTML for this route, since CRA copies public/ verbatim.
        const publicOutPath = path.join(PUBLIC_DIR, route, "index.html");
        fs.mkdirSync(path.dirname(publicOutPath), { recursive: true });
        fs.writeFileSync(publicOutPath, html);
      }
      success++;
    } catch (err) {
      failed.push({ route, error: err.message });
    }
  }

  await browser.close();
  server.close();

  console.log(`Prerendered ${success}/${allRoutes.length} routes successfully.`);
  if (failed.length) {
    console.log(`FAILED (${failed.length}):`);
    failed.forEach((f) => console.log(`  ${f.route} - ${f.error}`));
  }
}

main().catch((err) => {
  console.error("Prerender script failed (SPA build is still valid, SEO enhancement skipped):", err.message);
});
