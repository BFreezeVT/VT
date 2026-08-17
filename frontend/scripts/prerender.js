/* Post-build static prerendering for SEO (fixes soft-404 / wrong canonical on raw HTML fetch) */
const fs = require("fs");
const path = require("path");
const http = require("http");
const https = require("https");
const puppeteer = require("puppeteer-core");

const BUILD_DIR = path.join(__dirname, "..", "build");
const SRC_DATA_DIR = path.join(__dirname, "..", "src", "data");
const PORT = 5055;

function findChromePath() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;
  const candidates = ["/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/bin/google-chrome-stable"];
  return candidates.find((p) => fs.existsSync(p)) || null;
}

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

async function getBlogSlugs(backendUrl) {
  const client = backendUrl.startsWith("https:") ? https : http;
  return new Promise((resolve, reject) => {
    client
      .get(`${backendUrl}/api/blog`, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const posts = JSON.parse(data);
            resolve(posts.map((p) => p.slug));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on("error", reject);
  });
}

function startStaticServer() {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    const filePath = path.join(BUILD_DIR, urlPath);
    const isAsset = /\.[a-zA-Z0-9]+$/.test(urlPath) && !urlPath.endsWith(".html");
    if (isAsset && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      const types = { ".js": "application/javascript", ".css": "text/css", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".json": "application/json", ".ico": "image/x-icon", ".webp": "image/webp", ".woff2": "font/woff2" };
      res.setHeader("Content-Type", types[ext] || "application/octet-stream");
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.setHeader("Content-Type", "text/html");
      fs.createReadStream(path.join(BUILD_DIR, "index.html")).pipe(res);
    }
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

async function main() {
  const chromePath = findChromePath();
  if (!chromePath) {
    console.warn("Prerender: no Chrome binary found, skipping SEO prerendering (SPA build is unaffected).");
    return;
  }

  const backendUrl = readEnvVar("REACT_APP_BACKEND_URL");
  if (!backendUrl) {
    console.warn("Prerender: REACT_APP_BACKEND_URL not found, skipping SEO prerendering.");
    return;
  }

  const staticRoutes = [
    "/", "/service-areas", "/business-technology-assessment", "/resources",
    "/cyber-risk-scorecard", "/ai-roi-preview", "/human-risk-simulation", "/client-success",
  ];
  const citySlugs = extractSlugs("cityData.js").map((s) => `/service-areas/${s}`);
  const industrySlugs = extractSlugs("industryData.js").map((s) => `/industries/${s}`);
  const serviceSlugs = extractSlugs("coreServicesData.js").map((s) => `/services/${s}`);
  const aiSlugs = extractSlugs("aiPagesData.js").map((s) => `/${s}`);
  const blogSlugs = (await getBlogSlugs(backendUrl)).map((s) => `/resources/${s}`);

  const allRoutes = [...staticRoutes, ...citySlugs, ...industrySlugs, ...serviceSlugs, ...aiSlugs, ...blogSlugs];
  console.log(`Prerendering ${allRoutes.length} routes...`);

  const server = await startStaticServer();
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  let success = 0;
  const failed = [];

  for (const route of allRoutes) {
    try {
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle0", timeout: 30000 });
      await new Promise((r) => setTimeout(r, 400));
      const html = await page.content();

      let outPath;
      if (route === "/") {
        outPath = path.join(BUILD_DIR, "index.html");
      } else {
        outPath = path.join(BUILD_DIR, route, "index.html");
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
      }
      fs.writeFileSync(outPath, html);
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
