/* Post-build asset-reference normalizer (Chrome-free, always runs at deploy).
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
 */
const fs = require("fs");
const path = require("path");

const BUILD_DIR = path.join(__dirname, "..", "build");

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

  let fixed = 0;
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name === "index.html") {
        const html = fs.readFileSync(full, "utf8");
        const stripped = html.replace(ASSET_TAG_RE, "");
        if (stripped === html) continue; // no bundle tag (shouldn't happen for a real page)
        const normalized = stripped.replace("</head>", `${canonicalTags}</head>`);
        if (normalized !== html) {
          fs.writeFileSync(full, normalized);
          fixed++;
        }
      }
    }
  };
  walk(BUILD_DIR);

  console.log(`fix-asset-refs: normalized ${fixed} HTML files to ${mainJs} + ${mainCss}.`);
}

main();
