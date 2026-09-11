# Roadmap / Backlog — Veracity Technologies Website

See `/app/memory/PRD.md` for architecture, `/app/memory/CHANGELOG.md` for full session history.

## Security
- ~~SEC-001: POST /api/reports/email could relay an attacker-chosen PDF from the site's trusted
  SMTP mailbox to ANY arbitrary email address~~ - FIXED Session 59. POST /api/leads now returns
  a per-lead unguessable `report_token`; POST /api/reports/email requires `lead_id` +
  `report_token` + `recipient_email`, validated via hmac.compare_digest + recipient-email match +
  3h window + atomic single-use consumption. Verified: 8/8 backend edge-case tests (iteration_56)
  + all 3 real UI "email me the report" flows (Assessment, Blog checklist, Cyber Risk Scorecard -
  iteration_57), all passing. `backend/tests/test_reports_email.py` rewritten to match the new
  contract (13/13 passing).

## Structured data
- ~~Add Service schema to all 45 service-area (city) pages~~ - DONE Session 57 (LocalBusiness +
  Service + BreadcrumbList + FAQPage, 4 schemas per city page now).


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
- ~~Reduce main JS bundle size / route-level code-splitting~~ - DONE Session 56.
- ~~Convert/compress the HeroSection background image~~ - DONE Session 56.
- ~~Optimize all other sitewide images (logo, service/AI/blog-category hero images, client-success
  graphic) + enable lazy loading~~ - DONE Session 57 (18 externally-hosted images self-hosted as
  WebP, ~90% size reduction; loading="lazy" added to 15 previously-missing decorative images; nav
  logos correctly kept eager).
- Re-run Lighthouse on production after redeploy to confirm the LCP/TBT improvement from all the
  fixes above (baseline was Performance 39/100, LCP 13.9s, TBT 940ms).
- Investigate `server-response-time` (TTFB ~815ms) - partially hosting/Cloudflare-layer, worth a
  look once the redirect-chain fix above is in place (fewer hops changes the TTFB baseline too).
- Static asset transport compression (gzip/brotli) confirmed already handled by Cloudflare in
  production (verified via `curl -I` showing `content-encoding: gzip`) - no code-level action
  needed. Noted: the hashed JS bundle filename (e.g. `main.<hash>.js`) is served with only
  `max-age=60` cache-control - could be cached far longer (1 year) since the filename changes on
  every content change; this is hosting/platform config, not in this repo's control.

## P1 - Social share polish
- Widen the remaining 3 category-only OG images (construction, financial-services, manufacturing)
  from square 1024x1024 to 1200x630, matching the 16 already done in Session 58 - only needed if
  category/blog-index pages ever emit their own og:image (currently blog posts use these images
  too, already widened where shared).

## P2 - Blog content backlog (148 posts total)
- **Content depth**: 20 of 129 thin posts expanded to 900-1900 words in Session 58 (batch 1 -
  most recently published). **109 thin posts remain** - continue in batches of ~20, same process
  (gpt-5.4-mini via Emergent LLM key, `backend/scripts/expand_blog_batch1.py` pattern, verify via
  diff only intended entries change, rebuild+prerender+testing_agent after each batch).
- ~~7 slugs contain literal periods~~ - DONE Session 56 (renamed + legacy redirect map + static
  stubs, same pattern as the Session 49 city-URL-shortening project).

## P2 - Code quality (style-only, no functional bugs, deferred by user decision Session 60)
- Automated code-quality scan flagged: 34 useEffect/useCallback missing-dependency warnings, 12
  high-complexity functions, 49 long functions (`BlogIndex()`, `BlogPost()`, `ChecklistDownload()`,
  etc.), 44 inline object/array props causing extra re-renders, low backend type-hint coverage.
  All "critical" items in the same report (hardcoded secret, 28x XSS via
  `dangerouslySetInnerHTML`, undefined `pdf_bytes` variable, 16x `is`-vs-`==`) were verified
  false positives against the actual code (JSON-LD script injection + DOMPurify-sanitized
  content, PEP8-correct `is None`, guaranteed-defined var) - no action needed there.
  User decided to skip the style-only refactor for now (real regression risk on a live site,
  no functional bug behind any of it) - revisit only as a specific, scoped request if desired.

## Previously deferred (from earlier sessions, still open)
- Service Page hero visuals variety / an industry comparison tool (mentioned in earlier sessions,
  no user follow-up yet).
- ~~`EbookPopup`/other minor pre-existing "Unexpected token <" SPA-nav console error~~ - ROOT
  CAUSED & FIXED Session 62 (see CHANGELOG - was never "cosmetic", it was a `prerender.js` race
  condition causing Soft 404s in Google Search Console).

## SEO indexing (new, Session 62)
- **Domain age**: `veracitytechmn.com` registered 2026-07-15 (~2 months old, confirmed via RDAP)
  vs. `veracitytech.com`'s 19-year history. New-domain trust ramp-up (3-6mo+) is the primary,
  expected explanation for low current organic traffic - not a technical defect.
- ~~Prerender race condition causing empty `<div id="root">` snapshots on a subset of routes
  (Soft 404s in GSC)~~ - FIXED Session 62, see CHANGELOG.
- **Follow-up needed once redeployed**: re-check GSC's "Duplicate, Google chose different
  canonical than user" (38 pages) and "Soft 404" (3 pages) counts after Google re-crawls the
  fixed build - expect both to drop significantly since near-identical raw HTML across pages
  (the likely duplicate-canonical trigger) is now resolved. Also re-submit sitemap.xml in GSC to
  prompt a faster re-crawl.
- **User's own action item**: add a cross-link from `veracitytech.com` (19yr domain, real
  traffic) to `veracitytechmn.com` with the UTM-tagged URL provided in-conversation, to start
  driving some real visitors while organic ramps up. Outside this codebase (separate site).
