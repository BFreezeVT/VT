/* Post-build asset-reference normalizer + first-paint loader (Chrome-free, always runs at deploy).
 *
 * Why this exists:
 * The prerendered snapshots in public/**index.html are committed with a hardcoded, content-
 * hashed bundle reference (e.g. /static/js/main.a0b0307f.js). Every deploy's own `craco build`
 * produces a FRESH content hash (e.g. main.d2f3d2e7.js). The deploy image has no Chrome, so
 * postbuild's prerender.js self-skips and never re-renders/normalizes those refs. Result (seen
 * in production):
 *   - homepage: TWO main.js tags (committed template tag + webpack-injected tag), both 200,
 *     so the React app double-mounts.
 *   - sub-routes: served verbatim with the STALE committed hash, i.e. running an OLD bundle
 *     that only still 200s because old assets linger on the CDN - and breaks the moment they
 *     are purged, plus loads mismatched lazy chunks.
 *
 * This script reads the CURRENT build's real asset hashes from asset-manifest.json and rewrites
 * every build/**index.html to reference exactly one correct main.js + main.css. No browser
 * needed, so it runs reliably in the deploy environment regardless of Chrome availability. It is
 * idempotent and safe to run after prerender.js (which, when Chrome IS present, already produces
 * the same result).
 *
 * First-paint loader (added 2026-11-23):
 * The app uses ReactDOM.createRoot, so until main.js downloads, parses and mounts, the page
 * shows whatever the HTML carries. The prerendered content is styled by main.css, which is
 * render-blocking, so on a slow connection a visitor sees a blank dark screen with no sign
 * anything is happening. That reads as a broken page. This script also injects a small
 * self-contained loading overlay into every build/**index.html: inline styles only (it does
 * not wait for main.css), shown the instant the HTML parses, and removed automatically when
 * React mounts because it lives inside #root, which createRoot clears. If React has still not
 * mounted after 20 seconds, the loader text changes to a refresh hint instead of spinning
 * forever. Idempotent: files that already carry the loader are left alone.
 *
 * Per-page canonical (added 2026-11-23):
 * Every prerendered snapshot was committed with the homepage canonical
 * (https://www.veracitytechmn.com/), because the template hardcodes it and the client-side
 * script that fixes it only runs in a browser. A crawler that reads the static HTML (Screaming
 * Frog, Google's first pass) sees every landing page canonicalizing to the homepage, so it
 * treats every page as a duplicate of the homepage and marks it non-indexable. This script
 * rewrites the canonical in each build/**index.html to that page's own URL, derived from the
 * file's path and matching the sitemap format (homepage with a trailing slash, sub-pages
 * without). Idempotent: a file whose canonical is already correct is left alone.
 */
const fs = require("fs");
const path = require("path");

const BUILD_DIR = path.join(__dirname, "..", "build");

const LOADER_STYLE = `<style>#vt-loader{position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;background:#020812;color:#fff;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;text-align:center}#vt-loader .vt-spinner{width:44px;height:44px;border-radius:50%;border:4px solid rgba(255,255,255,.2);border-top-color:#0077B3;animation:vt-spin 1s linear infinite}@keyframes vt-spin{to{transform:rotate(360deg)}}#vt-loader .vt-title{font-size:20px;font-weight:700;letter-spacing:.02em}#vt-loader .vt-sub{font-size:14px;color:#9fb3c8}</style>`;
const LOADER_SCRIPT = `<script>setTimeout(function(){var s=document.getElementById("vt-loader-sub");if(s){s.textContent="This is taking longer than usual. Please refresh the page.";}},20000);</script>`;
const LOADER_DIV = `<div id="vt-loader"><div class="vt-spinner"></div><div class="vt-title">Veracity Technologies</div><div class="vt-sub" id="vt-loader-sub">Loading...</div></div>`;

function main() {
  const manifestPath = path.join(BUILD_DIR, "asset-manifest.json");
  if (!fs.existsSync(manifestPath)) {
    console.warn("fix-asset-refs: no build/asset-manifest.json found, skipping.");
    return;
  }
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const mainJs = manifest.files["main.js"];
  const mainCss = manifest.files["main.css"];
  if (!mainJs || !mainCss) {
    console.warn("fix-asset-refs: main.js/main.css missing from manifest, skipping.");
    return;
  }

  const ASSET_TAG_RE = /<script[^>]*\ssrc="[^"]*\/main\.[a-f0-9]+\.js"[^>]*><\/script>|<link[^>]*\shref="[^"]*\/main\.[a-f0-9]+\.css"[^>]*>/g;
  const canonicalTags = `<script defer="defer" src="${mainJs}"></script><link href="${mainCss}" rel="stylesheet">`;
  const CANONICAL_RE = /(<link[^>]*rel="canonical"[^>]*href=")[^"]*(")/;

  let fixed = 0;
  let loaderAdded = 0;
  let canonicalFixed = 0;
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name === "index.html") {
        let html = fs.readFileSync(full, "utf8");
        const original = html;
        const hasCanonical = html.includes(`src="${mainJs}"`) && html.includes(`href="${mainCss}"`);
        if (!hasCanonical) {
          const stripped = html.replace(ASSET_TAG_RE, "");
          if (stripped !== html) {
            html = stripped.replace("</head>", `${canonicalTags}</head>`);
          }
        }
        if (!html.includes('id="vt-loader"')) {
          const rootIdx = html.indexOf('<div id="root">');
          if (rootIdx !== -1) {
            const insertAt = rootIdx + '<div id="root">'.length;
            html = html.slice(0, insertAt) + LOADER_DIV + html.slice(insertAt);
            html = html.replace("</head>", `${LOADER_STYLE}${LOADER_SCRIPT}</head>`);
            loaderAdded++;
          }
        }
        const relDir = path.relative(BUILD_DIR, path.dirname(full)).split(path.sep).join("/");
        const pagePath = relDir === "" ? "/" : `/${relDir}`;
        const canonicalUrl = `https://www.veracitytechmn.com${pagePath === "/" ? "/" : pagePath}`;
        if (CANONICAL_RE.test(html)) {
          const rewritten = html.replace(CANONICAL_RE, `$1${canonicalUrl}$2`);
          if (rewritten !== html) {
            html = rewritten;
            canonicalFixed++;
          }
        } else if (html.includes("</head>")) {
          html = html.replace("</head>", `<link rel="canonical" href="${canonicalUrl}"></head>`);
          canonicalFixed++;
        }
        if (html !== original) {
          fs.writeFileSync(full, html);
          fixed++;
        }
      }
    }
  };
  walk(BUILD_DIR);

  console.log(`fix-asset-refs: normalized ${fixed} HTML files to ${mainJs} + ${mainCss}; loader injected into ${loaderAdded} files; canonical corrected on ${canonicalFixed} files.`);
}

main();
