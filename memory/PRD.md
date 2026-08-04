# Veracity Technologies — B2B Marketing Website (veracitytechmn.com)

## Original Problem Statement
Build a highly optimized, conversion-focused B2B marketing website for Veracity Technologies,
positioning the company as an "AI-Driven Managed Intelligence Provider" (evolution of their
Managed IT/MSP services). Full SEO, AEO (Answer Engine Optimization), and GEO (Generative Engine
Optimization) required, with multi-city and industry-specific landing pages, interactive
assessments, and SMTP-integrated lead capture. Hosted on veracitytechmn.com to A/B test against
the live veracitytech.com.

Company: Veracity Technologies, Minnetonka, MN. Serves Minneapolis-St. Paul Twin Cities metro +
Central Minnesota. Industries: Financial Services/RIAs/Wealth Management, Construction,
Manufacturing, High-Compliance orgs. Primary conversion goal: qualified Business Technology
Assessment submissions / Strategy Discussions from 10-250 employee organizations.

## Architecture
- Frontend: React (CRA) + Tailwind + Shadcn UI, react-router-dom SPA
- Backend: FastAPI + Motor (async MongoDB)
- DB: MongoDB (`leads`, blog content in `blog_data.py`)
- `/app/frontend/src/sections/` — homepage modular sections
- `/app/frontend/src/pages/` — routed pages (ServiceAreaPage, IndustryPage, BlogIndex/Post,
  CyberRiskScorecard, BusinessTechAssessment, AIPage)
- `/app/frontend/src/data/` — cityData.js (45 cities), industryData.js (4 industries),
  aiPagesData.js (11 AI cluster pages)
- `/app/frontend/src/lib/contentLinks.js` — shared internal-linking helpers (anchor rotation,
  industry/AI page mapping) used by city pages, industry pages, blog posts
- `/app/frontend/src/components/TechMaturityTable.jsx` — shared GEO comparison table
- `/app/backend/server.py` — `/api/leads`, `/api/blog` endpoints + SMTP notification logic

## What's Been Implemented

### Session 1 (through Feb 2026, pre-fork)
- Homepage with 15+ sections, scroll-based gradient (useScrollGradient hook in App.js)
- 45 city landing pages (`/service-areas/:citySlug`), 4 industry pages
  (`/industries/:industrySlug`)
- 141 migrated blog posts (`/resources`, `/resources/:slug`) — excerpt-only content (P1 backlog)
- Cyber Risk Scorecard tool (`/cyber-risk-scorecard`) and Human Risk Simulation game (homepage)
- 190+ JSON-LD schema blocks, `llms.txt`, 71-URL sitemap targeting veracitytechmn.com
- 6 lead capture points wired to `/api/leads` + SMTP notifications to bmf.veracitytech@gmail.com
- GA4 tag `G-3B8WSZ3G58`

### Session 2 (Feb 2026 — this fork) — SEO/AEO/GEO content architecture update
Per user's detailed spec (update-in-place, not overhaul):
- **Homepage reorder**: Hero → new Trust Indicators strip → Business Technology Assessment
  (moved from position ~15 to position 3) → Core Services → ...rest unchanged → FAQ
- **Hero**: CTA order swapped — primary "Schedule a Strategy Discussion" (tel link), secondary
  "Take the Business Technology Assessment" (scroll); subheadline copy updated
- **New pillar page** `/business-technology-assessment`: 12 assessment areas, Technology
  Maturity comparison table, 8 AEO direct-answer boxes, embedded assessment tool, links to all
  AI cluster + industry pages. Central conversion hub, added to nav + footer.
- **New AI content cluster** (11 pages, scalable template `AIPage.jsx` + `aiPagesData.js`):
  `/ai-readiness-assessment`, `/ai-governance`, `/ai-risk-assessment`, `/ai-security-assessment`,
  `/microsoft-copilot-readiness`, `/ai-policy-development`, `/ai-data-governance`,
  `/shadow-ai-risk-assessment`, `/ai-automation-consulting`, `/ai-adoption-strategy`,
  `/responsible-ai-consulting` — each with AEO answer box, framework/checklist, FAQ schema,
  funnels to BTA. Routed via catch-all `/:aiSlug` (falls back to NotFound for invalid slugs).
- **Industry pages**: added mid-page "AI Readiness" CTA section (industry-specific AI page
  links) + bottom CTA, both → `/business-technology-assessment`. Added `aiLinks` field to
  `industryData.js` per industry.
- **City pages** (all 45, centrally implemented — no per-city data edits): new Technology
  Maturity comparison table section, contextual links block with rotating anchor text (3 BTA
  anchors + 1 relevant industry + 2 AI page links, deterministic via `contentLinks.js` hashing),
  2 extra FAQPage schema Q&As (AI readiness related)
- **Blog posts**: "Related Resources" block linking 1 service anchor + 1 industry + 1 AI page +
  BTA, computed per post via category mapping in `contentLinks.js`
- **OG image**: generated branded 1200x630 image (previously an empty placeholder), replaces
  `/og-image.png`
- **sitemap.xml / llms.txt**: updated with 12 new URLs and new BTA/AI cluster reference section
- Fixed a contrast regression introduced by moving TrustIndicators/FreeAuditOffer higher up the
  scroll gradient (gave both solid dark `#0f1d32` backgrounds instead of `bg-transparent`)
- Tested via `testing_agent_v4_fork` (iteration_13.json) — 100% pass, zero bugs found

### Session 3 (Feb 2026) — Code quality/security hardening pass
Third-party static analysis flagged 23 XSS/dangerouslySetInnerHTML instances, 17 React hook
dependency warnings, 44 array-index-key instances, silent error handling, missing useMemo, large
component sizes, and 26.7% backend type-hint coverage. After investigation, most findings were
false positives for this codebase's actual patterns/data-scale; applied only genuinely valid fixes:
- **XSS**: Installed DOMPurify. Sanitized the only 3 real content-rendering `dangerouslySetInnerHTML`
  calls (`BlogPost.jsx` `formatInline()`, whitelisted to `<strong>`/`<em>`). The other 20 flagged
  instances are JSON-LD `<script type="application/ld+json">` schema tags (static, developer-authored,
  inert to the browser) — intentionally left untouched since DOMPurify would corrupt valid JSON with
  zero security benefit.
- **Hook dependencies**: Reviewed all 7 flagged locations individually (`CyberGame.jsx`, `App.js`,
  `Navigation.jsx`, `HeroSection.jsx`, `BlogPost.jsx`, `BlogIndex.jsx`) — all were false positives
  (module-level constants, refs, or stable setState functions incorrectly flagged as missing deps).
  No changes made to avoid pure churn/risk.
- **Silent error handling**: Added `console.error`/`console.warn` logging to previously-silent
  `catch` blocks in `CyberGame.jsx` (lead submit, localStorage) and `CyberRiskScorecard.jsx`
  (booking, email report) — visibility only, no behavior change.
- **Array-index-keys**: Swapped `key={i}` → natural stable value where genuinely available and
  static-array risk was real (`FAQSection.jsx` → `faq.q`, `CoreServices.jsx` → feature text/`item.label`,
  `CaseStudy.jsx` → `t.company`, `ServiceAreaPage.jsx` → industry/neighborhood string,
  `CyberRiskScorecard.jsx` → `q.id`/rec text). Left decorative/already-correct instances (e.g. star
  ratings, city/blog lists already keyed by slug) untouched.
- **useMemo**: Skipped — flagged filter/map operations run on arrays of 4-45 items, not a real
  performance concern; would add complexity for zero benefit.
- **Component decomposition / backend full type-hint coverage**: Deferred as separate, larger
  initiatives — added safe additive return-type hints to all `server.py` route handlers (no logic
  change) but did not split the 5 large-but-working React components, given regression risk on a
  live production site without dedicated refactor testing budget.
- Tested via `testing_agent_v4_fork` (iteration_14.json) — 100% pass, zero regressions. New
  regression test file added: `/app/backend/tests/test_leads_blog_regression.py`

### Session 4 (Feb 2026) — Code quality hardening, round 2
Same static analysis tool re-scanned and surfaced additional array-index-key locations not
covered in round 1, plus repeated flags on items already resolved/assessed as false positives.
- **Array-index-keys**: Fixed 14 more instances with genuinely-available stable keys:
  `FreeAuditOffer.jsx` (6: category/option-text/item.label/gap.id/opp.id/cat.id),
  `ServiceAreaPage.jsx` (3 more: svc.title/t.company/anchor text), `IndustryPage.jsx`
  (4: ch.title/compliance string/software string/link.slug), `BusinessReality.jsx` (1: stat.label)
- **Backend complexity**: Extracted `send_lead_notification`'s email-body construction into 3 pure
  helper functions (`_resolve_lead_source`, `_build_lead_text_body`, `_build_lead_html_body`) —
  zero logic change, verified via live email-send test.
- **Re-confirmed false positives** (no change needed, doubly verified across 2 rounds): all 20
  JSON-LD `dangerouslySetInnerHTML` "XSS" flags (static SEO schema, not user content — the 3 real
  ones in BlogPost.jsx remain sanitized via DOMPurify from round 1); all hook-dependency flags
  including 2 new files this round (`EbookPopup.jsx`, `BusinessReality.jsx`) — confirmed using
  local variables/browser globals/refs, not real stale closures; `useMemo` flags — arrays are
  4-45 items, not a real perf concern.
- Tested via `testing_agent_v4_fork` (iteration_15.json) — 100% pass, zero regressions, zero
  React duplicate-key console warnings.
- **Open decision (asked user)**: whether to proceed with the repeatedly-flagged large component
  decomposition (CyberGame, CyberRiskScorecard, ServiceAreaPage, IndustryPage — 300-460 lines
  each) given real regression risk vs. a static-analysis line-count/complexity metric with no
  associated functional bug.

### Session 5 (Feb 2026) — Blog content migration completion + component refactor
- **Blog content migration COMPLETE**: All 131 blog posts in `blog_data.py` now have full
  substantive article content (1500-2700 chars each, `## Heading` markdown format matching
  existing style), replacing thin excerpts. Content for the final 52 posts (picked up from
  post 64/131 handoff point) tailored toward Financial Services, Commercial Construction, and
  Manufacturing decision-makers in Minneapolis-St. Paul, MN per user's explicit direction
  ("AEO/SEO/GEO searchability trumps tone"). Verified via Python script (0 missing, min content
  length 1584 chars, all unique slugs) + `testing_agent_v4` (iteration_16.json) — 100% pass.
- **Component decomposition** (previously deferred "open decision" from Session 4, user approved
  proceeding): split all 4 large flagged components into smaller sub-components with extracted
  data/lib files, with zero behavior/visual change:
  - `sections/CyberGame.jsx` (465 lines) → `sections/CyberGame/{index,GameIntro,GamePlaying,
    GameResults}.jsx` + `data/cyberGameData.js`
  - `pages/CyberRiskScorecard.jsx` (392 lines) → `pages/CyberRiskScorecard/{index,ScorecardHero,
    ScorecardQuiz,ScorecardResults}.jsx` + `data/cyberRiskScorecardData.js`
  - `pages/ServiceAreaPage.jsx` (502 lines) → `pages/ServiceAreaPage/{index,CityHero,CityAbout,
    CityServices,CityTestimonials,CityFormSection}.jsx` + `data/cityTestimonials.js` +
    `lib/cityStructuredData.js`
  - `pages/IndustryPage.jsx` (426 lines) → `pages/IndustryPage/{index,IndustryHero,
    IndustryChallenges,IndustryComplianceSoftware,IndustryAICTA,IndustryTestimonials,
    IndustryFormSection}.jsx` + `data/industryTestimonials.js` + `lib/industryStructuredData.js`
  - Reviewed all `useEffect`/`useCallback` hook dependency arrays codebase-wide — all complete,
    no missing-deps bugs found (no `eslint-disable` comments anywhere in the codebase either)
  - Tested via `testing_agent_v4` (iteration_17.json) — 100% pass, zero regressions across
    CyberGame flow, Scorecard flow, 3 city pages, all 4 industry pages, JSON-LD schema output
- **Perf fix** (flagged by testing agent as minor, pre-existing): `POST /api/leads` was
  synchronously sending SMTP email in the request handler (3-8s response latency on every lead
  form across the site). Moved to FastAPI `BackgroundTasks` — response now ~0.2s, email still
  sends reliably ~3s later in the background. Verified via curl timing + backend log confirmation.
- **Related Articles carousel** (user-requested enhancement): replaced the old static 3-post,
  no-category-logic "Related Articles" grid in `BlogPost.jsx` (which also had a broken
  `border-white/10/50` invalid Tailwind class) with a new `sections/RelatedArticlesCarousel.jsx`
  built on the existing shadcn/embla `Carousel` component. Prioritizes same-category articles
  first (falls back to other categories to fill up to 8 cards), dynamic "More on {Category}"
  heading, prev/next arrow navigation, responsive (1 card mobile / 2-3 desktop). Tested via
  `testing_agent_v4` (iteration_18.json) — 100% pass across 4 categories, zero bugs.

### Session 7 (Feb 2026) — Security audit fix batch
- **Full security audit** requested by user, all 3 findings fixed ("Fix everything"):
  - **MEDIUM**: Email/header injection risk — raw user-submitted form fields (company,
    situation description, etc.) were interpolated unescaped into the internal lead
    notification HTML email, letting a submitted form value inject markup into the email
    your staff opens. Fixed with `html.escape()` on every user-controlled field in
    `_build_lead_html_body()`, plus `_sanitize_header_value()` stripping CR/LF from the
    email Subject line (header injection prevention).
  - **MEDIUM**: No rate limiting on public `POST /api/leads` — added `check_lead_rate_limit()`
    dependency (5 submissions per IP per hour, tracked in a new `lead_submission_log`
    MongoDB collection with a TTL index auto-created on startup so it never grows unbounded).
    Uses `X-Forwarded-For` with fallback to `request.client.host`.
  - **LOW**: Removed unused, unauthenticated leftover `GET`/`POST /api/status` scaffolding
    endpoints and their `StatusCheck`/`StatusCheckCreate` models entirely (confirmed unused
    anywhere in the frontend before removal).
  - Tested via `testing_agent_v4` (iteration_21.json) — 100% pass (8/8 backend, 5/5 frontend
    smoke flows), test artifacts self-cleaned by testing agent.
  - Noted but NOT fixed (pre-existing, out of scope, non-blocking): an e-book download modal
    on the homepage can intermittently overlay/block interaction with lower sections
    including the Human Risk Simulation game — flagged for a future UX pass if desired.

### Session 8 (Feb 2026) — New AI ROI Calculator SEO landing page
- **New page `/ai-roi-preview`** (user-requested SEO landing page):
  - `pages/AIROIPreview/{index,ROICalculator,ROIContent}.jsx` — client-side only, no backend calls
  - Interactive sample calculator: Team Size slider (1-150, default 20) + Manual Hours per
    employee per week slider (1-25, default 8), using shadcn `Slider`. Live calc using
    transparent industry-average assumptions (avg $38/hr fully-loaded labor cost, 45% average
    automation efficiency gain, 52 weeks/year) → "Hours reclaimed / year" + "Estimated annual
    savings", both under an explicit "Sample Estimates" label + assumptions disclosure note.
  - Primary CTA "Get Your Personalized ROI & Readiness Report" → `/business-technology-assessment`
    (both mid-page and bottom-of-page)
  - ~400-word SEO section "The Business Case for Managed AI and IT ROI" (H2 + 4 H3s), includes
    keywords "Managed IT savings", "AI automation ROI", "Operational efficiency for small business"
  - `document.title` = "AI ROI Calculator for Businesses | Veracity AI" + cost-savings meta
    description, set/reset via `useEffect` matching existing page pattern
  - Added to desktop nav (`nav-roi-calculator`), mobile nav (`mobile-nav-roi-calculator`), footer
    (`footer-link-roi-calculator`), route in `App.js`, and `sitemap.xml`
  - Styled consistent with existing assessment/tool pages (dark `#0f1d32`, `#0077B3` accent,
    Outfit headings, `grid-border-card`)
  - Tested via `testing_agent_v4` (iteration_22.json) — 100% pass: sliders work via both keyboard
    and mouse drag, results recalculate live, CTAs/copy/meta tags exact match, nav/footer/sitemap
    regression clean, no console errors.

## Backlog / Next Tasks

### Session 6 (Feb 2026) — Code review + fixes, related articles carousel
- **Related Articles carousel** (user-requested): replaced static 3-post "Related Articles" grid
  in `BlogPost.jsx` with `sections/RelatedArticlesCarousel.jsx` (shadcn/embla Carousel),
  prioritizing same-category articles. Tested via `testing_agent_v4` (iteration_18.json) — 100%
  pass across 4 categories.
- **Production bug fix — Google Search Console VideoObject error**: user uploaded a GSC "Videos
  Issue" report flagging invalid `uploadDate` on a global `VideoObject` JSON-LD block in
  `frontend/public/index.html` (present on every page). Root cause: the VideoObject didn't
  describe real video content (contentUrl was just a YouTube channel link, no actual video
  exists on the site) — removed the block entirely rather than patching the date. Tested via
  `testing_agent_v4` (iteration_19.json) — 100% pass. **Requires redeploy to reach production.**
- **Full code review + fix batch** (user said "fix everything"):
  - **HIGH**: `GET /api/leads` and `GET /api/leads/count` had zero auth, exposing all captured
    lead PII to anyone. Secured with a simple `X-Admin-Key` header (APIKeyHeader +
    `hmac.compare_digest`), stored in `backend/.env` as `ADMIN_API_KEY`. `POST /api/leads`
    (public form submission) intentionally remains unauthenticated. User confirmed they only
    need Gmail email notifications for leads, not a dashboard — no login UI was built.
  - **MEDIUM**: added `timeout=10` to the SMTP connection; fixed CORS `allow_credentials` from
    `True` to `False` (app uses no cookies anywhere, so `*` + credentials was an invalid,
    ineffective combo); fixed all 4 lead-capture flows (city/industry forms, Cyber Risk
    Scorecard booking + email report, Human Risk Simulation game email form, Business
    Technology Assessment) that were showing a fake "success" state even when the backend save
    failed — now show a proper error banner and keep `submitted=false` on failure via a shared
    `error` state in `hooks/useLeadSubmit.js` and equivalent local state in the 3 other flows.
  - **MEDIUM (SEO/structured data)**: removed self-authored `aggregateRating`/`review` arrays
    from 2 JSON-LD blocks in `index.html` (Google disallows self-serving reviews — risk of a
    manual action); fixed `lib/cityStructuredData.js` which incorrectly claimed the same
    Minnetonka HQ street address physically exists in all 45 different cities with each city's
    own zip code — now uses the real single HQ address consistently, with city-specific
    lat/lng correctly nested under `areaServed.geo` instead of the top-level `geo` field.
  - **LOW**: fixed "36 cities" → "45 cities" copy inconsistency in `index.html`; replaced a
    biased `sort(() => Math.random() - 0.5)` shuffle in `CyberGame/index.jsx` with a proper
    Fisher-Yates shuffle; moved side effects (clearInterval, setState calls) out of the
    `setTimeLeft` functional updater into a separate `useEffect` watching `timeLeft === 0` to
    avoid a React state-update-in-updater anti-pattern.
  - Tested via `testing_agent_v4` (iteration_20.json) — 100% pass (9/9 backend pytest, all
    frontend success-path flows). New regression test file:
    `/app/backend/tests/test_leads_admin_security.py`. Cleaned up 17 TEST_-prefixed leads
    created during testing from the live `leads` collection afterward (45 real leads intact).

### Session 9 (Feb 2026) — Homepage stat dedup, SOC2/CMMC/AI explainer links, social proof ticker,
UX fix, ROI calculator analytics
- **Homepage stat de-duplication**: removed the duplicate "What sets us apart" 4-stat strip
  (Response Time/Client Retention/Years Combined Experience/Account Manager) from the bottom of
  `CoreServices.jsx` — these stats are already shown once in `TrustIndicators.jsx` near the top.
  Also deleted `sections/TrustStats.jsx` (unused dead code duplicating the same 4 stats).
- **SOC2/CMMC/AI+Automation explainer links**: the 3 "Expertise" badges in `TrustIndicators.jsx`
  (previously plain, non-clickable text) now link to plain-language explainer content with a
  visible "Learn more" hint: SOC 2 → `/resources/what-is-soc-2-compliance` (existing post, added
  an "In plain terms:" opening sentence), CMMC → `/resources/what-is-cmmc-compliance` (**new blog
  post created** in `blog_data.py`, same "What Is X?" plain-language format), AI+Automation →
  `/resources/how-ai-automation-are-transforming-small-businesses-in-minneapolis` (existing post).
  Also added a "What is CMMC?" link on the CMMC card in `Compliance.jsx`.
  - Fixed 2 pre-existing broken sitemap.xml entries (`soc-2-compliance-guide-small-business` and
    `cmmc-compliance-guide-defense-contractors` — blog slugs that never actually existed in
    `blog_data.py`) to point to the real, working URLs, plus added the AI automation post URL.
- **Social Proof Ticker** (previously deferred pending real numbers): rather than hardcode a
  number, added a new public, PII-free `GET /api/stats/assessments-completed` endpoint (counts
  `db.leads` where `source_page == "ai-business-assessment"`, no auth) and a ticker badge in
  `FreeAuditOffer.jsx`'s intro stage that only renders once the live count reaches 5+
  (`MIN_COUNT_TO_DISPLAY`) — always accurate, never a fake number, and will activate itself
  automatically once production traffic passes that threshold.
- **UX fix**: `EbookPopup.jsx`'s scroll-triggered popup now checks `getBoundingClientRect()` on
  `#cyber-game` before showing — it no longer appears while the Human Risk Simulation game
  section is anywhere in the viewport, resolving the previously-noted overlap with game buttons.
- **ROI Calculator analytics**: added GA4 events on `/ai-roi-preview` — `roi_calculator_adjust`
  (fires via Radix `onValueCommit` when either slider is released) and `roi_calculator_cta_click`
  (fires on both CTA buttons, includes current slider values + estimated savings).
- Tested via `testing_agent_v4` (iteration_23.json) — 100% backend (7/7 new pytest,
  `backend/tests/test_stats_and_blog.py`) and 100% frontend, zero bugs found.
- **Note**: "Search Console Check" (validating the earlier VideoObject fix) remains a user action
  in Google Search Console itself, not a dev task — no code change needed once redeployed.

## Key API Endpoints
- `POST /api/leads` — captures form data (incl. new BTA/city/industry/blog funnel sources),
  stores in Mongo, fires SMTP email
- `GET /api/leads`, `GET /api/blog`, `GET /api/blog/:slug`
- `GET /api/stats/assessments-completed` — public, PII-free count used by the homepage social
  proof ticker

## Credentials
See `/app/memory/test_credentials.md` — no auth on this app (public marketing site); SMTP
Gmail App Password lives in backend `.env`, not modified this session.
