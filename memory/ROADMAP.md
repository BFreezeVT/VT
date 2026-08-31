# Roadmap / Backlog — Veracity Technologies Website

See `/app/memory/PRD.md` for architecture, `/app/memory/CHANGELOG.md` for full session history.

## P0 - External / requires user action (not fixable from this codebase)
- **Cloudflare: fix `http://veracitytechmn.com` 2-hop redirect chain.** Currently
  `301 http-non-www -> https-non-www` then `308 https-non-www -> https-www`. Needs a single
  Cloudflare redirect rule sending both `http://veracitytechmn.com/*` and
  `https://veracitytechmn.com/*` directly to `https://www.veracitytechmn.com/$1` in one hop.
- **Cloudflare: legacy long-form city URLs still return HTTP 200, not a true 301.** The Bulk
  Redirect list (`/app/memory/cloudflare_city_redirects.csv`) uploaded in a prior session is not
  firing at the edge - app-level static-stub fallback (meta refresh + `noindex`) is currently
  masking this, but search engines should see a real 301. Needs the user's Cloudflare dashboard
  investigation (rule binding to the redirect list, the previously-seen "hostname does not belong
  to your account" Trace error).
- Monitor Google Search Console over the next few weeks to confirm the Googlebot 403 (previously
  reported, no longer reproducing as of Aug 2026 retest) stays resolved.

## P1 - Core Web Vitals (Lighthouse-identified, Aug 2026 audit)
- **Reduce main JS bundle size / add route-level code-splitting** (`React.lazy` + `Suspense` for
  page routes). Current ~400KB single bundle is the dominant driver of the 81% "Load Delay"
  portion of LCP under mobile CPU throttling (measured LCP 13.9s, TBT 940ms on production).
- **Convert/compress the HeroSection background image** (`sections/HeroSection.jsx`, `HERO_BG`,
  currently a 777KB unoptimized JPEG) to WebP/AVIF with responsive sizes - Lighthouse flagged
  ~3.4s + ~2.4s of combined savings opportunity across "next-gen formats" + "efficiently encode
  images".
- Investigate `server-response-time` (TTFB ~815ms) - partially hosting/Cloudflare-layer, worth a
  look once the redirect-chain fix above is in place (fewer hops changes the TTFB baseline too).

## P2 - Blog content backlog (148 posts, spot-checked 10 in Aug 2026 audit)
- **Content depth**: the 129 "extended" posts average ~300-350 words vs. 400-1300+ words on the
  19 original cornerstone posts. Consider a scalable remediation (e.g. batch-expand the highest
  search-intent posts first) rather than editing all 129 individually.
- **7 slugs contain literal periods** from unsanitized title-to-slug conversion (e.g.
  `co-managed-vs.fully-managed-it-which-model-fits-your-business-best`,
  `managed-it-vs.it-compliance-services-whats-the-difference-and-do-you-need-both`,
  `managed-ai-vs.diy-ai-why-letting-employees-figure-it-out-is-costing-you-more-than-you-think`,
  `chatgpt-vs.microsoft-copilot-vs.private-ai-which-is-right-for-your-minneapolis-business`,
  `ai-tools-are-everywhere.heres-how-to-use-them-without-making-a-mess`,
  `cyber-incident-in-st.paul-prompts-statewide-emergency`,
  `the-average-data-breach-now-costs-4.88-million-how-much-would-it-cost-you`). Valid URL
  characters, not a hard crawl error, but non-standard hygiene. If fixed, needs a slug-rename +
  redirect map (same pattern as the Session 49 city-URL-shortening project), not a same-session
  edit, since these may already be indexed.

## Previously deferred (from earlier sessions, still open)
- Service Page hero visuals variety / an industry comparison tool (mentioned in earlier sessions,
  no user follow-up yet).
- `EbookPopup`/other minor pre-existing "Unexpected token <" SPA-nav console error (seen across
  iterations 49, 50, 52) - cosmetic/non-blocking, needs a dedicated investigation session.
