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
- ~~Reduce main JS bundle size / route-level code-splitting~~ - DONE Session 56 (React.lazy +
  Suspense, ~400KB -> ~296KB gzipped main bundle).
- ~~Convert/compress the HeroSection background image~~ - DONE Session 56 (777KB JPEG -> 62KB
  self-hosted WebP).
- Re-run Lighthouse on production after redeploy to confirm the LCP/TBT improvement from the two
  fixes above (baseline was Performance 39/100, LCP 13.9s, TBT 940ms).
- Investigate `server-response-time` (TTFB ~815ms) - partially hosting/Cloudflare-layer, worth a
  look once the redirect-chain fix above is in place (fewer hops changes the TTFB baseline too).
- Other page templates (Service/Industry/AI/City hero images) not yet audited for size/format -
  only the homepage `HeroSection` image was in scope this round.

## P2 - Blog content backlog (148 posts, spot-checked 10 in Aug 2026 audit)
- **Content depth**: the 129 "extended" posts average ~300-350 words vs. 400-1300+ words on the
  19 original cornerstone posts. Consider a scalable remediation (e.g. batch-expand the highest
  search-intent posts first) rather than editing all 129 individually.
- ~~7 slugs contain literal periods~~ - DONE Session 56 (renamed + legacy redirect map + static
  stubs, same pattern as the Session 49 city-URL-shortening project).

## Previously deferred (from earlier sessions, still open)
- Service Page hero visuals variety / an industry comparison tool (mentioned in earlier sessions,
  no user follow-up yet).
- `EbookPopup`/other minor pre-existing "Unexpected token <" SPA-nav console error (seen across
  iterations 49, 50, 52) - cosmetic/non-blocking, needs a dedicated investigation session.
