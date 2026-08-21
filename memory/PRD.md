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

### Session 29 (Feb 2026) - Category-level blog hero images + per-post social/SEO metadata
- User requested a cost-conscious alternative to generating a unique hero image for all 147 blog posts ("do category
  level version then lets be done. make sure meta tags are imbedded within the images as well obviously" - interpreted
  as category-level reusable images + per-post social/SEO metadata pointing to them, since browser image files don't
  literally carry HTML meta tags).
- Generated 9 category-level hero images (`image_generation_tool`), reusing on-brand dark-navy/cyan tech illustrations
  matching the site's existing established visual style, mapped 1:1 to all 9 categories used across the 147 published
  posts (verified zero gaps via live `/api/blog` check): Managed IT, Cybersecurity, Business Continuity, Compliance,
  AI & Automation, AI & Cybersecurity, Construction, Financial Services, Manufacturing.
  - New `data/blogCategoryImages.js` - `getBlogCategoryImage(category)` with a `DEFAULT_BLOG_IMAGE` safety fallback.
  - `pages/BlogIndex.jsx` - every resource card now shows its category image (`data-testid="blog-card-image-{i}"`).
  - `pages/BlogPost/index.jsx` - visible article hero image (`data-testid="blog-post-hero-image"`, `object-contain`
    on a dark bg so the square illustration isn't cropped in the wide hero slot); dynamic `og:image`/`og:image:alt`/
    `og:title`/`og:description`/`twitter:image`/`twitter:title`/`twitter:description` set on load via
    `document.querySelector` + `setAttribute` (no react-helmet in this codebase), reset back to site-wide defaults
    on unmount.
  - `pages/BlogPost/blogPostSchemas.js` - Article JSON-LD `image` field now uses the category image.
- **Known limitation (flagged to user, accepted as-is)**: metadata is set client-side via JS, which works for browsers
  and JS-aware crawlers but a non-JS social bot could still see the generic site-wide default image/title from
  `index.html` on first fetch. True guaranteed coverage for every crawler would need server-side rendering/prerendering
  - out of scope for this session, user chose to proceed without it (option A).
- Tested via `testing_agent_v4` (iteration_38.json) - 100% pass, zero bugs. Verified: all 9 category filters render
  correct images with zero broken images, search/filter/empty-state no regression, 3 article pages across different
  categories render hero images correctly, JSON-LD Article `image` field correct, and (critically) metadata
  cleanup-on-unmount correctly reverts to site defaults on real SPA navigation (verified via actual Link click, not
  `page.goto()` which bypasses React cleanup and gives a false signal).
  - One cosmetic-only finding fixed: the hardcoded `og:title` fallback string in the unmount cleanup didn't exactly
    match `index.html`'s real site-wide default - aligned to `"Managed IT & Cybersecurity Built for AI + Automation |
    Veracity Technologies"` for brand consistency across pages.
- **This completes the category-level image request. Requires a Preview -> Production redeploy to go live.**

### Session 30 (Feb 2026) - Social share buttons on article pages
- New `pages/BlogPost/ShareButtons.jsx` - a "Share" row (LinkedIn + X + Email icon buttons) rendered right after the
  excerpt/before the article content on every resource article page. LinkedIn opens `linkedin.com/sharing/share-offsite`,
  X opens `twitter.com/intent/tweet` (pre-filled with the article title), both with the canonical production article
  URL in a new tab; Email opens a pre-filled `mailto:` link (subject = article title, body = title + canonical URL) -
  all one-click, no backend call. `data-testid="share-linkedin-button"` / `"share-twitter-button"` / `"share-email-button"`,
  verified rendering + correctly-encoded URLs via screenshot (self-tested, small additive change - no new state/API surface).

### Session 31 (Feb 2026) - Security audit + fixes (SEC-001 mail-relay binding, SEC-002 documentation)
- **Full security audit requested by user** (`security_audit_agent`) on the current Preview deployment. Verdict:
  CONDITIONAL PASS - NEEDS ATTENTION, 2 MEDIUM findings (no criticals/highs). Core controls (admin-key auth, HTML
  escaping, header-injection sanitization, DOMPurify, CORS/no-cookies, no hardcoded secrets) all reconfirmed intact.
- **[MEDIUM] Fixed - SEC-001, `/api/reports/email` usable as an open mail relay to arbitrary recipients**: the
  endpoint let any anonymous caller send an email (with an attacker-chosen PDF attachment) from Veracity's trusted
  Gmail mailbox to ANY recipient, with no check that the recipient was the actual requester - a brand-abuse/phishing-
  distribution vector. Fixed with a new `_recipient_has_recent_lead()` check: `recipient_email` must now match a
  lead genuinely captured via `POST /api/leads` within the last 30 minutes (matches the real UI flow in both
  `FreeAuditOffer.jsx` and `useScorecardFlow.js`, which always submit a lead with the same email immediately before
  the "Email Report" button becomes reachable) - returns 403 otherwise. Verified live: unbound recipient -> 403;
  recipient with a matching just-created lead -> 200/success. Updated `test_reports_email.py` with 2 new regression
  tests (`TestEmailReportRecipientBinding`) plus a class-scoped rate-limit-reset fixture (existing tests needed a
  matching lead created first, and the added test volume required per-test quota isolation to avoid self-contaminating
  the file's own deliberate 429-exhaustion tests) - full suite 68/68 passing.
- **[MEDIUM] Investigated - SEC-002, spoofable `X-Forwarded-For` per-IP rate limit**: live-tested by sending
  requests with attacker-forged `X-Forwarded-For` values - confirmed the header is passed through completely
  unverified, AND (further finding beyond the audit) even the "clean" no-spoof header chain on this Preview hosting
  architecture contains only static platform-infrastructure IPs, not the real visitor's IP, at any position - so
  per-IP identification is not a reliable signal on this platform at the application-code level (an infra-level
  constraint, not fixable by repositioning which XFF index is trusted). Documented this honestly in code comments;
  the tamper-proof site-wide global cap (200/hr leads, 50/hr reports) remains the real backstop, and the SEC-001 fix
  above substantially reduces the practical impact of exhausting it (recipient-binding means abuse now always leaves
  a traceable lead record, closing the "anonymous, zero-cost" mail-relay angle even if the per-IP gate is bypassed).
- **[P3, deferred, no change made]**: CORS wildcard (already accepted low-risk since `allow_credentials=False`, per
  Session 16 precedent); unused `pyjwt`/`passlib`/`python-jose`/`pandas` in `requirements.txt` (confirmed zero imports
  anywhere in the codebase, genuine dead weight/supply-chain surface, but removing deps carries its own regression
  risk for a P3/hardening-only finding - deferred to a dedicated cleanup pass if desired, not fixed this session).
- Verified via direct curl testing + full backend pytest suite (68/68 passing) - not a full `testing_agent_v4` pass,
  this was a backend-only security fix with no frontend surface. Test leads/rate-limit data cleaned from Mongo after.

### Session 32 (Feb 2026) - Unused dependency cleanup (from Session 31 security audit)
- Removed 5 confirmed-unused packages from `backend/requirements.txt`: `pyjwt`, `passlib`, `python-jose` (flagged
  directly by the security audit as dead supply-chain weight - no auth/JWT system exists in this app), plus `pandas`
  and `numpy` (also zero direct imports anywhere in the codebase, confirmed via `grep`, and only present as pandas's
  own transitive dependency). Uninstalled all 5 from the venv and removed their lines from requirements.txt.
- Verified: full backend pytest suite still 68/68 passing, backend restarts clean, live `/api/` and `/api/blog`
  health checks return 200. No code changes needed elsewhere (nothing in the codebase imported any of these 5).

### Session 33 (Feb 2026) - Code review + fixes (report-email window, meta cleanup, exception chaining)
- **Full functional code review requested by user** (`code_review_agent`) on the Preview deployment, focused on
  recently-unreviewed features (category blog images/OG tags, ShareButtons, SEC-001 recipient-binding fix). Verdict:
  READY WITH FIXES, 2 MEDIUM (LIKELY) findings + 3 LOW.
- **[MEDIUM] Fixed - report-email recipient-binding window too tight for slow readers**: the SEC-001 fix (Session 31)
  bound `/api/reports/email`'s recipient to a lead captured in the last 30 minutes, but a visitor who leaves the
  Assessment/Scorecard results screen open longer than that before clicking "Email Report" would get an incorrect
  403. Widened `REPORT_EMAIL_LEAD_WINDOW_SECONDS` from 1800s (30 min) to 10800s (3 hours) - the check's purpose is
  proving a genuine prior lead capture happened, not enforcing a tight time boundary, so a generous window carries
  no meaningful security downside. Chose this over re-submitting a fresh lead at email-click time (which would have
  double-counted the GA4 `generate_lead` conversion event and sent the business a duplicate internal notification
  email every time a user re-requested their report - worse side effects than the bug itself). Added 2 new boundary
  tests using directly-inserted backdated lead records (`test_recipient_with_lead_2_hours_old_still_passes_binding_check`,
  `test_recipient_with_lead_4_hours_old_rejected_403`) plus per-test rate-limit-quota isolation on that test class.
- **[MEDIUM] Re-confirmed, not changed - per-post OG/Twitter meta tags invisible to non-JS social crawlers**: the
  reviewer independently re-surfaced the same limitation already disclosed to and accepted by the user when the
  category-image feature shipped (Session 29) - this is a CRA/no-SSR architectural constraint, not a quick fix.
  Not touched this session; flagged again below for the user's awareness in case they want the lightweight
  bot-user-agent-detection middleware option now that a dedicated review has called it out a second time.
- **[LOW] Fixed**: `BlogPost/index.jsx` unmount cleanup was resetting `og:image`/`og:title`/`twitter:image` but not
  `og:description`/`twitter:title`/`twitter:description` (also mutated on load) - now resets the full matching set
  back to `index.html`'s real site-wide defaults, plus the meta description tag. `server.py`'s two bare
  `raise HTTPException(...)` inside `except` blocks now use `from e` for proper exception chaining/traceability.
- **[LOW, deferred]**: minor lint hygiene (unsorted imports in test files, long lines in blog content strings) -
  cosmetic only, no behavior impact, not touched.
- Verified via full backend pytest suite (70/70 passing) + live curl re-test of the widened-window fix + a smoke
  screenshot of an article page. Test leads (including directly-inserted backdated test records) cleaned from Mongo.

### Session 34 (Feb 2026) - Deployment readiness check
- Ran `deployment_agent` health check ahead of a Production redeploy. Result: PASS with 2 non-blocking warnings.
- **Fixed**: added a root-level `@app.get("/health")` directly on the FastAPI `app` instance (outside the `/api`
  router) in `backend/server.py` - the existing `/api/health` remains unchanged, but some deployment-platform
  liveness/readiness probes target `/health` directly without the `/api` prefix. Verified both `/health` and
  `/api/health` return 200 locally; full backend suite re-confirmed 70/70 passing after the change.
- **Investigated, no change needed**: the agent twice reported "no .gitignore exists, secrets at risk of being
  committed" - verified false via direct file inspection: `/app/.gitignore` (144 lines) already excludes `.env`,
  `.env.*`, and `memory/test_credentials.md` at the repo root (patterns apply at any depth, so `backend/.env` and
  `frontend/.env` are already covered). This appears to be a blind spot in the scanning tool, not an actual gap -
  no action taken since the protection was already correctly in place.
- **Deployment status: READY.** Redeploy Preview -> Production to pick up the `/health` fix (and all prior
  unshipped sessions since the last deploy - category blog images, share buttons, SEC-001 recipient-binding fix,
  dependency cleanup, code-review fixes).

### Session 35 (Feb 2026) - Real favicon (was a generic placeholder)
- User asked what's needed to get "the logo icon" showing in the upper-left (browser tab favicon). The site's
  navbar logo was already real (the "V" pinwheel mark, uploaded asset), but `public/favicon.svg` was still a
  generic placeholder (a plain navy square with a text "V") never replaced with the real brand mark - nothing
  needed from the user, the real logo image already existed.
- Generated a full favicon set directly from the existing navbar logo asset: trimmed transparent padding, re-
  centered on a square canvas, produced `favicon.ico` (16/32/48 multi-res), `favicon-16x16.png`, `favicon-32x32.png`,
  `favicon-192x192.png`, `favicon-512x512.png` (transparent bg), and `apple-touch-icon.png` (180x180, composited
  onto the brand's dark navy `#020812` background since iOS renders transparent PNG icons as black). Removed the
  old placeholder `favicon.svg`. Updated `index.html` `<link rel="icon">`/`apple-touch-icon` tags and
  `manifest.json`'s `icons` array to reference the new files.
- Verified via curl: all new favicon/manifest files serve 200 with correct content-types; homepage screenshot
  confirms no regression to page rendering (favicon itself lives in browser tab chrome, not visible in
  screenshots, but file-serving + markup wiring confirmed correct).

### Session 36 (Feb 2026) - New resource post: "Cybersecurity Predictions for 2027"
- User supplied full ready-to-publish article content (a "2027 threat outlook" piece based on Field Effect's
  2026 report - identity-based attacks, trusted-tool abuse, AI-powered attacks, edge infrastructure, Zero Trust).
  Published it as a new post in `backend/blog_data.py` (`BLOG_POSTS_EXTENDED`), matching the exact schema/markdown
  conventions used by all 147 existing posts: slug `cybersecurity-predictions-2027`, category `Cybersecurity`
  (existing category, already has a mapped hero image, zero gaps), used the user's suggested SEO meta title as the
  post's title/H1, their suggested meta description as the excerpt (auto-feeds page meta description + OG tags),
  `##` headings, `- ` bullet lists, and a closing italic soft-CTA line (existing hardcoded "Get Your Free Audit" CTA
  card already appears after every post's content - no duplicate CTA needed in the body). Removed the raw
  `[fieldeffect.com]`-style inline citation brackets from the user's draft for a clean, professional final read
  (no other published post has this pattern) - kept the "Field Effect's 2026 Cyber Threat Outlook" attribution
  inline in prose instead.
- Total posts: 147 -> 148. Added the new URL to `sitemap.xml` and one new Q&A entry to `llms.txt` for AEO/GEO
  discoverability, matching precedent from prior new-post sessions.
- Verified: post loads via `/api/blog/cybersecurity-predictions-2027` (200), total count via `/api/blog` = 148,
  full article page screenshot confirms hero image/breadcrumbs/title/excerpt/share buttons/content render
  correctly, Resources index shows "Showing 148 of 148 articles". Full backend suite re-confirmed 70/70 passing
  (no test hardcodes the old 147 count).

### Session 37 (Feb 2026) - Checklist download lead magnet (on the new 2027 predictions post)
- Built a gated "checklist" lead magnet for the new `/resources/cybersecurity-predictions-2027` post per the user's
  request: form (company/name/phone/email) -> creates a real lead via `POST /api/leads` -> unlocks an instant
  client-side branded PDF download + an "Email me a copy" option (reuses the existing `/api/reports/email` +
  SEC-001 recipient-binding, since the lead was just created).
  - New `data/blogChecklists.js` - `getChecklistForPost(slug)` config lookup, returns `null` for every other post
    (feature is scoped to this one post only, per the user's request - not a generic multi-post system).
  - New `lib/generateChecklistPDF.js` - reuses the existing shared `lib/pdfReportHelpers.js` (same branded-PDF
    building blocks already used by the Assessment/Scorecard reports) - one-page checklist, 4 sections (Identity &
    Access, Social Engineering & Trusted Tools, Infrastructure & Patch Management, Zero Trust Readiness), ~15 items
    consolidated from the article's own action-item bullet lists.
  - New `pages/BlogPost/ChecklistDownload.jsx` - mirrors the exact proven form pattern from `sections/FreeAuditOffer.jsx`
    (uncontrolled `<Input>` + `FormData` + `useLeadSubmit()` hook). Rendered conditionally in `pages/BlogPost/index.jsx`
    right after the article content, only when `getChecklistForPost(post.slug)` returns a config.
- Investigated a suspected bug (lead never appeared in Mongo when tested via my own quick screenshot-automation
  script, despite an identical curl payload working) - escalated to `testing_agent_v4` for a definitive, network-
  verified test. **Verdict: NOT a real bug** - their properly-instrumented Playwright test confirmed the POST
  request fires correctly and the lead persists 2/2 times; root cause was a quirk isolated to my own ad-hoc script
  tool (confirmed independently afterward via a `page.on("request")` listener showing zero requests dispatched by
  my script's interaction pattern specifically - not present in the real component).
- Applied one low-priority improvement flagged by the testing agent: surface a visible error message
  (`data-testid="checklist-form-error"`) if lead submission genuinely fails, instead of silently unlocking the
  download UI regardless of outcome (previously matched `FreeAuditOffer.jsx`'s existing gap - fixed here via a
  `useEffect` reacting to the hook's `submitted`/`error` state rather than an unreliable post-await stale-closure
  check). Re-verified compiles cleanly and full backend suite still 70/70 passing (no backend changes this session).

### Session 38 (Feb 2026) - Code Quality Report remediation (mostly false positives, 5 real low-risk fixes)
- User submitted a new Code Quality Report covering: 28 `dangerouslySetInnerHTML` "XSS" flags, a backend
  `pdf_bytes` "undefined variable" flag (`server.py:325`), 27 React hook dependency warnings, long-function/
  complexity flags on `useScorecardFlow.js`/`BlogIndex.jsx`/`ChecklistDownload.jsx`, 2 array-index-key flags,
  and 3 missing-`useMemo` flags. Investigated every single finding against the real code before changing
  anything; user approved the resulting scoped plan (fix only genuinely real, low-risk items; skip broad
  refactors of working revenue-critical flows).
- **Verified FALSE POSITIVE - backend `pdf_bytes`**: `_decode_and_validate_report_pdf()` (server.py:316-325)
  defines `pdf_bytes` inside a `try` block; the `except` branch raises `HTTPException` before any use, so it
  can never be read undefined. No change made.
- **Verified FALSE POSITIVE - all 28 `dangerouslySetInnerHTML` instances**: 25 are static `<script
  type="application/ld+json">` SEO schema tags built from `JSON.stringify()` of developer-authored data
  (industry/city/blog/service page configs), not user input or HTML rendering. The remaining 3 (in
  `blogContentRenderer.jsx`) already run through `formatInline()` -> `DOMPurify.sanitize(html, { ALLOWED_TAGS:
  ["strong","em"] })` before rendering - confirmed already safe. No change made (re-confirms Session 3/4/19
  findings on the same recurring scanner pattern).
- **Verified FALSE POSITIVE - all "27" hook dependency warnings**: manually audited every single
  `useEffect`/`useCallback`/`useMemo` in the entire frontend codebase (23 total, all of `sections/`, `pages/`,
  `hooks/`) - every dependency array was already complete and correct (module constants, refs, and stable
  setters correctly omitted; all changing values correctly included, including deliberately-over-included
  ones like `currentIndex` in `CyberGame/index.jsx` to force a per-question timer reset). `yarn build` also
  shows zero ESLint hook warnings. No changes made.
- **Fixed - 2 array-index-key instances**: `CaseStudy.jsx` and `ClientSuccessHero.jsx`'s decorative 5-star
  rating rows (`[...Array(5)].map((_, i) => <Star key={i} />)`) replaced with 5 hardcoded `<Star />` elements
  each - removes the index-key pattern entirely rather than substituting a different index-based key.
- **Fixed - 3 useMemo additions**: `IndustryPage/index.jsx` (`otherIndustries`) and `ServiceAreaPage/index.jsx`
  (`otherCities`) now memoize their "other X" footer-link filter, declared *before* the early not-found return
  and guarded with a ternary (`industry ? ... : []`) to stay rules-of-hooks compliant; `CyberGame/GameIntro.jsx`
  now memoizes `earnedBadges` (`BADGES.filter(...)`) keyed on `stored.badges`.
- **Explicitly skipped per user approval**: broad complexity/long-function refactors of `useScorecardFlow.js`,
  `BlogIndex.jsx`, `ChecklistDownload.jsx` - working, tested, revenue-critical flows with no functional benefit
  to a line-count-driven rewrite.
- Verified: `yarn build` compiles clean with zero ESLint warnings/errors (first attempt caught a real
  rules-of-hooks violation from the useMemo placement, fixed immediately, confirmed clean on rebuild); full
  backend pytest suite 70/70 passing. Tested via `testing_agent_v4` (iteration_10.json) - 100% backend/100%
  frontend, zero regressions, zero console errors, zero React key/hook warnings across homepage carousel,
  `/client-success`, an industry page, a service area page, cyber game intro, and resources/blog. One TEST_QA
  lead created during testing cleaned from Mongo afterward.

### Session 39 (Feb 2026) - Fixed Search Console "Alternate page with proper canonical tag" indexing issue
- User received a Google Search Console email flagging 19 pages (all `/resources/*` blog posts + resources
  index) as not indexed due to "Alternate page with proper canonical tag". Requested the specific affected
  URLs from the user, then traced root cause in code (not a www vs non-www issue, despite the example URLs
  mixing both domain variants).
- **Root cause confirmed**: `public/index.html` has a static site-wide `<link rel="canonical"
  href="https://www.veracitytechmn.com/">` (pointing at the homepage). Every other page type
  (Service/Industry/AI/City/Assessment/etc.) overrides this via a `useEffect` that sets the correct
  page-specific canonical on mount and resets it back to the homepage on unmount - but `pages/BlogPost/index.jsx`
  and `pages/BlogIndex.jsx` never did this. Every one of the 148 blog posts (`/resources/:slug`) and the
  `/resources` index itself was telling Google "the canonical/real version of this page is the homepage",
  so Google correctly excluded them from its index per the canonical tag - exactly matching the reported issue.
- **Fixed**: added the same canonical-set/reset pattern already used elsewhere to `BlogPost/index.jsx`
  (-> `https://www.veracitytechmn.com/resources/{slug}`) and `BlogIndex.jsx` (-> `.../resources`).
- **Found + fixed the same gap on 2 more pages** (not in the reported 19, but same root cause, proactively
  fixed for consistency): `CyberRiskScorecard` (`useScorecardFlow.js` had title/meta but no canonical -> now
  sets `.../cyber-risk-scorecard`) and `ServiceAreasIndex.jsx` (`/service-areas` had ZERO dynamic
  title/meta/canonical at all before this fix - now sets all three -> `.../service-areas`).
- Verified via direct DOM inspection (Playwright script reading the live `<link rel="canonical">` href) on
  all 4 fixed routes plus confirming it correctly resets to the homepage URL on navigating away - 5/5 correct.
  `yarn build` compiles clean, full backend suite still 70/70 (no backend changes this session).
- **Requires a Preview -> Production redeploy to take effect**, then the user should use Search Console's
  "Validate Fix" button on the issue (or manually request re-indexing on a few URLs) - Google re-crawls on
  its own schedule after that, re-indexing isn't instant.
- **Follow-up (same session)**: user shared more example URLs from the same 19-page list, then a separate
  batch of ~30 URLs under a *different* GSC status, "Crawled - currently not indexed" (9 city pages, 2 AI
  cluster pages, several blog posts). Investigated and ruled out any technical cause (no robots.txt block, no
  `noindex` tags, content isn't thin - checked actual word counts, some flagged posts are among the longest on
  the site). Concluded this is a normal indexing-priority/authority pattern for a newer domain with a large
  page count (148 posts + 45 cities + 11 AI pages), not a code bug - advised the user it's not urgent to
  "fix" and recommended letting it resolve naturally over weeks as the domain builds authority, revisiting
  only if the same pages are still stuck after ~4-6 weeks. Ran `deployment_agent` (PASS, no blockers) ahead of
  the user's planned redeploy to push the canonical fix live.

### Session 40 (Feb 2026) - Assessment results screen contrast fix (low-contrast text + bright orange removed)
- User reported (on Preview, confirmed via source review, not yet redeployed): the Business Technology
  Assessment results screen (homepage-embedded `sections/FreeAuditOffer.jsx`, `data-testid="assessment-results"`
  - not the separate `/cyber-risk-scorecard` page) had text that was hard to read, and asked to remove any
  bright orange text on that screen.
- **Fixed - low contrast**: `EfficiencyForecast.jsx`'s small "Sample estimate..." disclaimer note was
  `text-[#c0cfe0]/40` (light blue-gray at 40% opacity) at only 10px - genuinely low contrast on the dark card.
  Changed to full-opacity `text-[#c0cfe0]`.
- **Fixed - bright orange text (2 spots)**: `getScoreLabel()`'s mid-tier "Developing" score band (50-79%)
  used amber/orange `#f59e0b` for its status text/icons (ScoreRing label, 6-score grid cards, Top Gaps score
  numbers, Full Breakdown bar % labels) - changed to `#eab308` (clearly yellow/gold, not orange). Also the
  conditional lead-submission-error banner (only shows if the background lead save fails) used `#FF5722`
  (bright orange) - changed to `#ef4444` (red), matching the existing error-text convention already used
  elsewhere on the same results screen (e.g. the "Couldn't send that email" message).
- Verified via `testing_agent_v4` (iteration_40.json) - completed the full 6-category assessment + contact
  form end-to-end, confirmed via computed CSS color extraction that `rgb(234,179,8)` (#eab308) now appears
  everywhere the old amber did with zero `#f59e0b`/`#FF5722` orange remaining on the results screen, and all
  other text on that screen (score ring, forecast card, top gaps/opportunities, full breakdown, closing CTA)
  is legible. No regression in the intro/question/contact steps. One TEST_QA lead created during testing
  cleaned from Mongo afterward.
- **This is a Preview-only fix - requires a redeploy to reach production.**

### Session 41 (Feb 2026) - Fixed real root-cause contrast bug: "light-zone" sections rendering on wrong (dark/blue) background
- User sent a screenshot after Session 40's fix showing the `IntroStats.jsx` section ("The threat landscape
  has changed...") with dark navy text (#0f1d32/#3a5068) nearly unreadable against a medium-blue background -
  a different, more significant bug than the assessment-results contrast issue fixed in Session 40.
- **Root cause**: the homepage uses a single continuous scroll-based background gradient
  (`useScrollGradient`/`gradientStops` in `App.js`) applied to the outer page container, going from light
  blue `rgb(224,235,244)` at the top to near-black `rgb(2,8,18)` at the bottom, purely based on
  `window.scrollY / scrollHeight`. Most sections use `bg-transparent` so this gradient shows through, with a
  `light-zone` or `dark-cards` marker class used only for minor child-element styling (per `App.css`), NOT for
  controlling the section's own background. Two sections - `AIService.jsx` and `IntroStats.jsx` - are tagged
  `light-zone` (dark navy text, assuming a light backdrop) but sit deep enough in the page (~26%/~38% scroll
  depth) that the linear gradient has already progressed to a medium-saturated blue by then - producing dark
  text on a medium-blue background with poor contrast, exactly matching the screenshot. (Sections that
  legitimately need to stay dark/light regardless of scroll position, like `FreeAuditOffer`/`TrustIndicators`,
  already correctly use an explicit opaque background instead of relying on the gradient - `AIService`/
  `IntroStats` were the only 2 sections in the whole codebase using the `light-zone` marker without one.)
- **Fixed**: gave both sections an explicit opaque `bg-[#e0ebf4]` (matching the gradient's own lightest stop)
  instead of `bg-transparent`, so they're no longer dependent on scroll position for legibility.
- Verified visually via direct screenshots of both sections before/after - confirmed crisp, clearly readable
  dark text on a clean light background matching the design intent. Backend suite still 70/70 (no backend
  changes). Build compiles clean.
- **Preview-only fix - requires a redeploy to reach production**, same as Session 39/40's fixes.

### Session 42 (Feb 2026) - Static SEO prerendering (fixes Soft 404 root cause across the entire site)
- User reported a Google Search Console "Soft 404" issue on 3 blog post URLs. Investigation confirmed this is
  the true root cause behind ALL prior GSC issues this session (alternate canonical, soft 404, and likely
  contributing to "crawled - not indexed" too): this is a pure client-side-rendered React SPA with a single
  static `index.html`. A raw HTML fetch (no JS execution) - which is how a meaningful part of Google's
  indexing pipeline works - returns the HOMEPAGE's title/description/canonical for literally every route on
  the site (blog posts, city pages, industry pages, AI pages, service pages), since all per-page metadata is
  set via client-side `useEffect` after JS loads. My earlier canonical-tag fixes (Sessions 39-40) only take
  effect for crawlers that fully render JS and wait - not for the faster raw-HTML crawl pass, which is
  precisely the mismatch (URL claims to be article X, declared metadata says "homepage") that triggers "Soft
  404".
- Confirmed via Emergent Support that production hosting does **exact-file-lookup before SPA fallback**: a
  request to `/resources/some-slug` will serve `build/resources/some-slug/index.html` if it exists, before
  falling back to the generic root `build/index.html`. This unlocked a real fix.
- **Built `frontend/scripts/prerender.js`**, wired as a `postbuild` script in `package.json` (runs
  automatically after every `yarn build`, including on Emergent's deployment pipeline - no extra Emergent
  config needed). It:
  1. Enumerates all ~221 content routes: 8 static pages, 45 city pages (`cityData.js`), 4 industry pages
     (`industryData.js`), 5 service pages (`coreServicesData.js`), 11 AI pages (`aiPagesData.js`), and 148 blog
     posts (fetched live from `/api/blog`).
  2. Spins up a temporary local static server serving the fresh `build/` output with SPA fallback (mimicking
     production's un-prerendered behavior, so it crawls the *original* single-shell app).
  3. Uses `puppeteer-core` (added as a devDependency, `yarn add -D puppeteer-core@23` - v23 needed since the
     latest major requires Node >=22.12, this environment has Node 20) driving the existing system Chrome
     binary (no bundled Chromium download) to visit each route, wait for network-idle (letting the existing
     `useEffect`-based title/meta/canonical logic and data fetching complete), and capture the fully-rendered
     `document.documentElement.outerHTML`.
  4. Writes each route's snapshot to `build/<route>/index.html` (folder-style, matching the pattern Support
     confirmed), overwriting the root `build/index.html` only for `/`.
- **Hardened for deployment safety**: the script auto-detects a Chrome binary across common paths (or
  `PUPPETEER_EXECUTABLE_PATH` env override) with a top-level catch-all - if Chrome isn't available in the
  actual deployment build environment, or any other unexpected error occurs, it logs a warning and exits
  cleanly (exit code 0) rather than failing the build, so this SEO enhancement can never block a deployment;
  worst case, production silently falls back to the current (already-working) plain SPA behavior.
- Since `createRoot()` (not `hydrateRoot()`) is used in `src/index.js`, prerendered static markup is safely
  fully replaced by React on load with zero hydration-mismatch risk - real users get an instant correct
  initial paint, then full client-side interactivity exactly as before.
- Verified end-to-end: ran a full clean `yarn build` (which auto-triggers the postbuild prerender step) -
  221/221 routes rendered successfully in ~5.5 minutes total. Spot-checked a blog post, a city page, an AI
  page, and a service page's generated static HTML - each has the correct page-specific `<title>`,
  `<meta name="description">`, `<link rel="canonical">`, and full article/page body content baked in (no
  more "Loading..." placeholder), while still including the same hashed JS bundle `<script>` tag so
  client-side hydration/interactivity is unaffected. Homepage (`build/index.html`) still gets its own correct
  default metadata. Backend suite unaffected, still 70/70.
- **Preview-only build-time change - takes effect automatically on the next Production redeploy** (no manual
  step needed beyond the user clicking Deploy, since `postbuild` runs as part of the standard `yarn build`
  Emergent already runs).
- After redeploying, user can verify with `curl -I https://www.veracitytechmn.com/resources/<any-slug>` and
  check the returned HTML has the correct page-specific title/canonical, then use Search Console's "Validate
  Fix" on the Soft 404 / Alternate-canonical issues.
- **Follow-up (same session)**: confirmed the earlier-deferred "per-article LinkedIn/X social card" request
  is now solved as a side effect of prerendering - blog posts already set `og:title`/`og:image`/
  `og:description`/`twitter:*` dynamically via `useEffect` (category-level images), and since prerendering
  captures the DOM *after* that effect runs, the correct per-post image/title/description are now baked into
  the static file social crawlers fetch. Found and fixed one related gap while verifying: `og:url` and
  `twitter:url` were never updated per-post (always showed the homepage URL, even though `canonical` was
  correct) - added those to `BlogPost/index.jsx`'s existing og-tag update/reset arrays. Note: the same
  og:title/og:image/og:url gap likely still exists on `ServicePage`/`IndustryPage`/`ServiceAreaPage`/`AIPage`
  (they only update `canonical`+title+description, never og:*/twitter:* tags) - not fixed yet, flagged as a
  possible follow-up if the user wants social cards for those page types too.

### Session 43 (Feb 2026) - Extended og:title/og:image fix to service, AI, industry, and city pages
- Extended the same og:title/og:image/og:url/twitter:* fix to `ServicePage`, `AIPage`, `IndustryPage`, and
  `ServiceAreaPage` (city pages) at the user's request. `ServicePage`/`AIPage` already had a `heroImage` field
  per entry in their data files, reused directly. `IndustryPage` had no image field, so added a small
  `industryOgImages` slug->URL map (4 industries, fetched relevant stock photos via `image_selector_tool`:
  financial services, construction, manufacturing, healthcare/compliance). `cityData.js` has no per-city
  imagery (45 templated pages, deliberately no unique photography per earlier cost discipline), so city pages
  share one Minneapolis-St. Paul skyline image for `og:image` - still a major improvement over the previous
  homepage-image/title fallback. All 4 follow the same og:title/description/url/image + twitter:* update-on-
  mount/reset-on-unmount pattern as `BlogPost/index.jsx`.
- Verified via a full rebuild + prerender: og:title/og:image correctly baked into a sample service, AI,
  industry, and city page's static HTML (spot-checked all 4). Backend unaffected, still 70/70.

### Session 44 (Feb 2026) - CRITICAL FIX: prerendering didn't actually take effect on production - moved to committed static files instead of deploy-time generation
- User deployed Sessions 39-43's fixes, then got a new Search Console email: "Blocked - 403 Forbidden" (1
  page), "Crawled - not indexed" (same page), "Alternate canonical" (45 pages), "Pages with redirect" (62
  pages), and validation failed on everything except the 403 one.
- Investigated directly against production (`curl` against `www.veracitytechmn.com`, allowed - this is just
  a public HTTP request, not accessing the managed environment):
  - **Root cause found**: `curl`ing the exact reported HIPAA blog post's raw HTML on production still showed
    the generic homepage title/canonical - my Session 42 `postbuild` prerendering script had NOT actually
    taken effect. It depends on a Chrome/Chromium binary being present *in the production build environment
    at deploy time*, which this Preview container has (used for the screenshot tool) but which the actual
    production build server evidently does not - so the script's own graceful-skip hardening silently did
    exactly what it was designed to do (skip without breaking the build), just not what was actually needed.
  - "Pages with redirect" (62) and the underlying non-www->www 308 redirect were confirmed **working
    correctly and NOT an issue** - Google logging old/alternate non-www URLs correctly redirecting to the
    canonical www version is expected, not a defect.
  - "Blocked - 403 Forbidden": confirmed NOT reproducible from this agent's network (page loads 200 fine).
    Site is fronted by **Cloudflare** (visible in response headers) - most likely cause is Cloudflare's Bot
    Fight Mode / Security Level / a WAF rule blocking Googlebot's crawler specifically. This is **outside
    Emergent's platform and this agent's access** - the user needs to check their own Cloudflare dashboard
    (Security settings) to ensure Googlebot isn't being challenged/blocked. Flagged to user, not yet resolved
    (needs user's own Cloudflare-side action).
- **Fixed the prerendering reliability gap**: restructured `frontend/scripts/prerender.js` to write each
  route's rendered snapshot to **both** `build/<route>/index.html` (immediate effect on the current build)
  **and** `public/<route>/index.html` (skipping the homepage `/`, since `public/index.html` is CRA's special
  template file and must stay untouched). Since Create React App copies everything under `public/` verbatim
  into `build/` on every `yarn build` - with zero dependency on Puppeteer/Chrome being available at that
  time - the committed `public/<route>/index.html` files are now the **reliable, primary** mechanism; the
  `postbuild` Puppeteer step becomes an optional "refresh if Chrome happens to be available" bonus, not a
  requirement.
- **Verified the fix rigorously**: ran the crawler once here (Chrome confirmed available in Preview) to
  generate and commit ~220 static files into `frontend/public/` (~22MB added to the repo, one-time). Then, to
  prove the deploy-time dependency is truly gone, **physically renamed both `/usr/bin/google-chrome` and
  `/usr/bin/chromium` out of the way** and ran a completely fresh `yarn build` from scratch: the prerender
  script correctly logged "Browser was not found... SEO enhancement skipped" and the build still completed,
  AND `build/resources/hipaa-compliance-small-healthcare-practices/index.html` still had the fully correct
  post-specific title baked in - proving the committed `public/` files are what actually gets served,
  independent of Chrome availability. Restored both binaries afterward. Backend suite unaffected, still 70/70.
- **Important caveat for future work**: these ~220 static snapshots are now a point-in-time capture. If blog
  posts/cities/industries/AI pages/services are added or edited going forward, this crawl must be re-run and
  the updated `public/<route>/index.html` files re-committed - it is NOT automatic/self-updating in the
  reliable path (the optional `postbuild` refresh only helps on environments that happen to have Chrome,
  which production has now been shown not to). Any future agent adding/editing content in these categories
  should re-run `node scripts/prerender.js` (needs a prior `yarn build` to exist) and redeploy.
- **This requires another Production redeploy** to actually take effect this time - the committed `public/`
  files are the fix, so the next deploy's build should produce the correct static HTML at each route
  regardless of that build server's Chrome availability. User should re-run Search Console's "Validate Fix"
  afterward, and separately check their own Cloudflare dashboard for the 403/bot-blocking issue (unresolved,
  needs user action, not something this agent can access or fix).

## Backlog / Next Tasks

### Session 21 (Feb 2026) — AI page FAQ/CTA heading capitalization fix
- Fixed the lowercase, slug-derived heading bug the testing agent flagged:
  `AIPageFAQ.jsx`/`AIPageCTA.jsx` called `.toLowerCase()` on `page.name` (e.g. "AI Readiness
  Assessment"), which incorrectly lowercased the "AI" prefix too ("ai readiness assessment").
  `page.name` is already correctly cased in `aiPagesData.js` for all 11 AI pages, so both
  headings now just use `page.name` directly - "Common questions about AI Readiness
  Assessment" / "See where AI Readiness Assessment fits...". Verified live via Playwright text
  content extraction on `/ai-readiness-assessment`.
- Checked for the same pattern elsewhere (`IndustryPage/*`, `industryStructuredData.js`,
  `ProudPartners.jsx`) - all other `.toLowerCase()` usages are on plain industry names
  ("Financial Services", "Construction") with no embedded acronyms, so lowercasing reads
  naturally there and is not the same bug. No further changes needed.
- Search Console Recheck remains a manual action on the user's end (Google Search Console
  dashboard) - not something fixable from this codebase.

### Session 20 (Feb 2026) — Structural refactors executed (behavior-preserving, zero regressions)
- User approved executing the "structural refactor" items from the earlier code-quality report
  after production deployment. All 7 items completed as pure reorganization - no functional or
  visual changes intended or found:
  - **`CyberRiskScorecard/index.jsx`** (was 229 lines/complexity 34): extracted all state +
    business logic into a new `useScorecardFlow.js` custom hook; extracted `ScorecardNav.jsx` /
    `ScorecardFooter.jsx`. `index.jsx` is now a thin stage-based composition layer.
  - **`ScorecardResults.jsx`** (was 185 lines/complexity 22): split into
    `ScorecardScoreDisplay.jsx`, `ScorecardRisksAndRecs.jsx`, `ScorecardFollowUp.jsx`,
    `ScorecardEmailReport.jsx`.
  - **`BlogPost.jsx`** (was 269 lines/complexity 14): converted to a folder
    (`pages/BlogPost/index.jsx`) with `blogContentRenderer.jsx` (markdown→JSX, including the
    heading+list edge-case fix from an earlier session), `blogPostSchemas.js` (JSON-LD),
    `BlogPostNav.jsx`, `BlogPostFooter.jsx`, `BlogRelatedResources.jsx`. Old single file deleted.
  - **`lib/contentLinks.js` `industryForCity()`** (complexity 16): converted the 4-branch
    if/else keyword-matching chain into a data-driven `industryKeywordMap` array + `.find()`,
    identical output for identical input.
  - **`AIPage.jsx`** (was 225 lines): converted to a folder (`pages/AIPage/index.jsx`) with
    `aiPageSchemas.js` + `AIPageNav/Hero/AnswerBox/Framework/FAQ/CTA/Related/Footer.jsx`. Old
    single file deleted.
  - **`BusinessTechAssessment.jsx`** (was 205 lines): converted to a folder
    (`pages/BusinessTechAssessment/index.jsx`) with `businessTechAssessmentData.js` (moved
    `assessmentAreas`/`answerBoxes` out), `businessTechAssessmentSchemas.js`, and
    `BTANav/Hero/AreasGrid/AnswerBoxes/RelatedLinks/Footer.jsx`. Old single file deleted.
  - **Backend `server.py` `email_report()`** (was 62 lines/complexity 11): split into
    `_decode_and_validate_report_pdf()`, `_get_smtp_credentials()`,
    `_build_report_email_message()`, `_send_smtp_message()`; the route handler is now a
    4-line orchestrator with identical validation order/status codes.
  - All import paths (`./pages/BlogPost`, `./pages/AIPage`, `./pages/BusinessTechAssessment` in
    `App.js`) resolve transparently to the new folder `index.jsx` files - no route changes.
- **Verified**: compiled clean after each file group, screenshot-checked BlogPost/AIPage/BTA
  individually mid-refactor, full backend pytest suite (54/54) re-passed after the
  `email_report()` split, then a full `testing_agent_v4` regression pass (iteration_28.json)
  covering all 4 frontend flows + backend end-to-end - **100%/100%, zero regressions found**.
  Test leads created during testing cleaned from the `leads` collection afterward.
- Minor pre-existing (not-a-regression) cosmetic note from the testing agent: AI page FAQ
  section heading derives its industry name from the slug and renders lowercase (e.g. "Common
  questions about ai readiness assessment") rather than title-cased - not touched this session,
  candidate for a future polish pass if desired.

### Session 19 (Feb 2026) — Code quality report review (mostly false positives, 13 real key fixes applied)
- Reviewed an external code-quality report against actual code before changing anything (per
  user's approval of "safe fixes only, skip structural refactors"). Findings:
  - **XSS via `dangerouslySetInnerHTML` (20 flagged instances, 0 real issues)**: 17/20 are
    static `<script type="application/ld+json">` structured-data blocks (author-controlled
    JSON, not rendered as HTML - sanitizing them with an HTML sanitizer would corrupt the JSON
    and isn't a real XSS vector). The remaining 3 (`BlogPost.jsx` lines 84/96/111) already run
    through `formatInline()` → `DOMPurify.sanitize(html, { ALLOWED_TAGS: ["strong","em"] })`
    before rendering - already safe. No changes needed.
  - **React hook dependencies (7 flagged components, 0 real issues)**: every flagged "missing
    dependency" was either a React state setter (guaranteed stable, never needs to be a dep), a
    module-level constant/function (`DIFFICULTIES`, `rotatingWords`, `gradientStops`,
    `lerpColor`, `API`, `axios`), or a variable declared inside the effect/callback itself
    (`handleScroll`, `interval`, `scrollHeight`, `gameSection`, `inView`) - none of these can go
    stale. Existing dependency arrays were already correct. No changes made (adding these would
    have added noise or risked infinite re-render loops for no benefit).
  - **`is` vs `==` in tests (7 files flagged, 0 real issues)**: all instances are `assert x is
    True`/`is False` - this is the Pythonic, PEP 8-recommended way to compare against boolean
    singletons (pylint's own `singleton-comparison` rule flags `== True` as the anti-pattern,
    not `is True`). Left as-is; the report's general "is vs ==" advice doesn't apply to
    singleton comparisons.
  - **Array index as key (14 flagged, 13 real fixes applied + 2 were already using stable keys)**:
    fixed `BusinessTechAssessment.jsx` (2 spots), `AIPage.jsx` (2), `TrustIndicators.jsx` (2),
    `IntroStats.jsx`, `HowItWorks.jsx`, `ServiceAreasIndex.jsx` (inner industry-tag loop),
    `CyberRiskScorecard/ScorecardQuiz.jsx`, `TechMaturityTable.jsx`, and `BlogPost.jsx` (2 list
    spots) - all switched from `key={index}` to a stable field from the data (`.label`, `.q`,
    `.title`, `.num`, `.name`, or the item's own text). `CaseStudy.jsx` and the main
    `ServiceAreasIndex.jsx` city grid were already using `key={t.company}`/`key={city.slug}` -
    the report's line numbers didn't match the actual current code there.
- **Structural refactors** (splitting `CyberRiskScorecard`, `BlogPost`, `AIPage`,
  `BusinessTechAssessment`, backend `email_report()` into smaller pieces): explicitly skipped
  per user's decision - not bugs, just reorganizing already-working, already-tested code with
  real regression risk on a live revenue site for no user-facing benefit.
- Verified: frontend compiles clean, homepage/BTA/Scorecard screenshot smoke-tested (12-Areas
  grid, trust indicators render correctly with new keys), full backend suite still 54/54.

### Session 18 (Feb 2026) — GitHub Actions CI wired up + hardcoded-secret cleanup
- **Added `.github/workflows/backend-tests.yml`**: runs the full 54-test backend pytest suite
  automatically on every push/PR (user confirmed the repo is already linked to GitHub via
  "Save to GitHub"). Spins up a real MongoDB service container + a real running FastAPI
  instance, then runs `pytest tests/ -v`. Optional GitHub secrets (`ADMIN_API_KEY`,
  `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `NOTIFY_EMAIL`) enable full email-flow coverage; the
  one test that requires a real SMTP send skips gracefully if they're not configured, so the
  rest of the suite still runs green out of the box.
- **[Fixed] Real secret was hardcoded in 3 test files**: the actual production `ADMIN_API_KEY`
  value was hardcoded as a literal/fallback-default string in `test_leads_admin_security.py`,
  `test_leads_blog_regression.py`, and `test_security_audit.py` - about to become visible in a
  GitHub-hosted repo. All three now require `ADMIN_API_KEY` from the environment (loaded via
  `.env` locally, via the workflow's `env:`/secrets in CI) with no hardcoded fallback.
- **[Fixed] Hardcoded absolute path (`/app/backend/.env`) in test/conftest files** - caught by
  actually simulating a fresh checkout in `/tmp` with a fake `.env`, which is exactly what
  exposed both this bug and the one above (the sim showed the wrong `.env` being silently
  loaded, and stale rate-limit state leaking from the wrong Mongo DB). Now resolved relative to
  each test file's own location (`Path(__file__).resolve().parent.parent / ".env"`), portable
  to any checkout path including GitHub Actions' runner path.
- **Verified 3x**: (1) full real-Preview run, 54/54 pass; (2) simulated fresh checkout with NO
  SMTP secrets and a throwaway Mongo DB, 53 pass + 1 correctly skipped; (3) final real-Preview
  confirmation run, 54/54 pass again. Test artifacts and simulation databases cleaned up after
  each run.

### Session 17 (Feb 2026) — Test suite cleanup: stale slugs + cross-file quota isolation
- **Fixed 2 stale blog-slug tests**: `test_stats_and_blog.py` was still targeting
  `what-is-soc-2-compliance`/`what-is-cmmc-compliance`, the duplicate posts that were
  intentionally deleted back in Session 12 when their "In plain terms:" openers were merged
  into the real comprehensive posts. Repointed to the correct, live slugs
  (`soc-2-compliance-guide-small-business`, `cmmc-compliance-guide-defense-contractors`) -
  both verified live via curl to actually start with "In plain terms:".
- **Added cross-file rate-limit quota isolation**: new `backend/tests/conftest.py` with an
  autouse, module-scoped fixture that resets `lead_submission_log` + `rate_limit_global_log`
  before every test FILE runs. Several test files intentionally exhaust the 5/hour per-IP
  lead/report-email budget to prove the 429 behavior works - without this, that exhaustion
  leaked across files (all sharing the same test-runner IP within the same hour) and caused
  unrelated tests in later files to fail with 429 instead of their real expected result.
- **Fixed a genuinely stale admin-auth gap in `test_leads_blog_regression.py`**: two `GET
  /api/leads`/`GET /api/leads/count` calls predated the Session 6 admin-key requirement and
  never sent the `X-Admin-Key` header - added it, matching the pattern already used in
  `test_leads_admin_security.py`/`test_security_audit.py`.
- **Verified**: full `pytest tests/` run (54 tests, all 6 files) now passes 100% end-to-end,
  confirmed twice in a row with zero manual state pre-clearing between runs.

### Session 16 (Feb 2026) — Security audit + fix (mail-relay abuse vector)
- **Full security audit requested by user** (`security_audit_agent`) on the codebase deployed to
  Preview. Result: **FAIL - ACTION REQUIRED**, 1 HIGH finding, rest hardening-level.
- **[HIGH] Fixed - SEC-001, spoofable rate limit turned `/api/reports/email` into an open mail
  relay**: `_get_client_ip()` trusts the client-suppliable `X-Forwarded-For` header, so an
  attacker could rotate it per-request to get a fresh "IP" every time, completely bypassing the
  5/hour per-IP limiter on `/api/reports/email` - an endpoint that sends real outbound email
  through the company's Gmail account to an attacker-chosen recipient with an attacker-suppliable
  attachment (branded subject/body). Fixed with a new **tamper-proof site-wide cap**
  (`_check_global_rate_limit`, independent of any client-controlled header) on top of the
  existing per-IP guard - `GLOBAL_REPORT_EMAIL_LIMIT = 50/hour` for `/api/reports/email`,
  `GLOBAL_LEAD_SUBMIT_LIMIT = 200/hour` for `/api/leads` (same P3 hardening applied there too).
  New `rate_limit_global_log` Mongo collection with its own TTL index. Also gave `/api/leads`
  and `/api/reports/email` **independent per-IP buckets** (tagged by an `action` field) instead
  of one shared bucket, so exhausting one endpoint's quota no longer blocks the other.
- **[Hardening] Fixed - PDF magic-byte validation**: `/api/reports/email` now rejects any
  attachment whose decoded bytes don't start with `%PDF`, closing off the "arbitrary file to
  arbitrary recipient" file-dropper angle the audit noted alongside the relay risk.
- **[P3 hardening, noted but not changed]**: wildcard CORS (`CORS_ORIGINS=*`) - low actual risk
  since `allow_credentials=False` (no cookies anywhere in this app), left as-is to avoid breaking
  legitimate cross-domain access (prod + preview + future domains) for a low-severity finding.
  Rotating `SMTP_PASS`/`ADMIN_API_KEY` if ever shared is an owner action, not a code fix.
- **Verified via direct testing** (not full `testing_agent_v4` - backend-only, narrowly-scoped
  fix): live curl test proving 3 different spoofed `X-Forwarded-For` values all increment the
  SAME global counter (confirmed via direct Mongo inspection) rather than getting fresh per-IP
  quotas; PDF magic-byte rejection confirmed (400 for non-PDF payload); updated
  `backend/tests/test_reports_email.py` (added `test_non_pdf_attachment_rejected`, replaced the
  old test that asserted the *removed* shared-bucket behavior with
  `test_leads_rate_limit_does_not_block_reports_email` +
  `test_reports_email_has_its_own_independent_rate_limit`) - all 6 pass in isolation; existing
  `test_security_audit.py`/`test_leads_admin_security.py` (17 tests) still pass in isolation.
- **Known pre-existing test-suite limitation** (not a security issue, not touched): running ALL
  backend test files in one pytest session cumulatively exceeds the 5/hour per-IP lead quota
  (no shared setup fixture resets state between files) and 2 unrelated blog tests reference
  `what-is-soc-2-compliance`/`what-is-cmmc-compliance` slugs that were intentionally merged into
  their comprehensive counterparts back in Session 12 - test files were never updated to match.
  Neither is a regression from this session; flagged for a future test-suite cleanup pass if desired.

### Session 15 (Feb 2026) — Industry insight blurb brought to Cyber Risk Scorecard
- Moved `INDUSTRY_INSIGHTS` (the one-line "why this matters" note per industry) from
  `FreeAuditOffer.jsx` into the shared `lib/roiCalculator.js` alongside `INDUSTRY_OPTIONS` /
  `INDUSTRY_HOURLY_RATES` - single source of truth now used by both tools.
  `pages/CyberRiskScorecard/ScorecardIndustryStep.jsx` now shows the same tailored blurb
  (`data-testid="scorecard-industry-insight-note"`) right after an industry is selected, for
  consistency with the Assessment. Verified via Playwright `wait_for_selector` after clicking
  "Construction" on the scorecard's industry step.

### Session 14 (Feb 2026) — Follow-up lead alerts + industry insight blurb
- **Follow-Up Lead Alerts**: Cyber Risk Scorecard "Yes, follow up with me" leads (`source_page ==
  "cyber-risk-scorecard-followup"`) now get a distinct email subject line ("Follow-Up Requested:
  {company or name}") instead of the generic "New Audit Lead: {company}" - new
  `_build_lead_subject()` helper in `server.py`. Verified via a live curl POST + backend log
  confirming a real send with no errors.
- **Industry Insight Blurb**: right after picking an industry in the Business Technology
  Assessment (`FreeAuditOffer.jsx`), a one-line "why this matters" note appears
  (`data-testid="industry-insight-note"`) tailored per industry (all 5 known verticals +
  generic fallback for Other), via a new `INDUSTRY_INSIGHTS` map. Verified rendering via
  Playwright `wait_for_selector` after selecting an industry option.

### Session 13 (Feb 2026) — Assessment flow reorder + Cyber Scorecard industry-aware ROI + calendar removal
- **Fixed a build-breaking bug inherited from the previous session**: `FreeAuditOffer.jsx` had an
  unclosed `getSteps(answers)` function (missing closing brace) and the function was never invoked
  (component still referenced an undefined `steps` variable) — frontend failed to compile entirely.
  Fixed the brace, added `const steps = getSteps(answers);` in the component body.
- **Assessment flow reorder** (`FreeAuditOffer.jsx`): Business Context step now asks Industry
  question FIRST, Team Size SECOND, in that fixed order — matches the user's required flow.
  Selecting "Other" reveals a custom industry text input (`other-industry-input`); Next stays
  disabled until it's filled. Trimmed `INDUSTRY_SPECIFIC_QUESTIONS` from 5 industries down to the
  3 confirmed core verticals only (Financial Services, Construction, Manufacturing) — Healthcare
  and Professional Services now correctly skip straight to the universal questions with no
  tailored follow-up, per user's explicit choice.
- **Shared `INDUSTRY_OPTIONS` constant**: moved the industry name list into `lib/roiCalculator.js`
  (single source of truth, also exports `INDUSTRY_HOURLY_RATES`) so both the Assessment and the
  new Cyber Scorecard industry selector stay in sync.
- **Cyber Risk Scorecard — new Industry step**: new `pages/CyberRiskScorecard/ScorecardIndustryStep.jsx`
  inserted as a new `stage: "industry"` between the hero and the (unchanged) 12-question quiz —
  same 6 industry options + Other custom text field. Selected industry now drives the ROI hourly
  rate via `scorecardRoiCalculator.js`'s `calculateScorecardROI(pct, teamSize, manualHours, hourlyRate)`
  (4th param added, defaults to `DEFAULT_HOURLY_LABOR_COST` for safety), threaded through
  `ScorecardROI.jsx`, the results page ROI assumptions note (now names the industry + its actual
  $/hr), the downloadable PDF, and the emailed PDF report.
- **Removed the calendar/time-slot booking UI entirely** (user-requested simplification):
  deleted the old "Let's Walk Through This Together" day/time picker section, the unused
  `timeSlots` export from `cyberRiskScorecardData.js`, and all related `booked`/`bookSlot`/
  `selectedSlot`/`bookingError` state. Replaced with a simple Yes/No question — "Would you like
  someone from Veracity to follow up with you about these results?" — Yes reveals a lightweight
  contact form (name/email/phone/company) that posts a real lead (`source_page:
  "cyber-risk-scorecard-followup"`) and shows a confirmation state; No shows a polite decline
  message with no form. The existing separate "Email me my full report" flow is untouched.
- The 12 existing Cyber Risk Scorecard questions (`data/cyberRiskScorecardData.js`) are byte-for-byte
  unchanged, per user's explicit constraint.
- Tested via `testing_agent_v4` (iteration_27.json) — 100% pass, zero bugs. Verified live
  differential ROI math (Construction $955/mo vs Financial Services $1023/mo, identical
  team-size/manual-hours inputs, ratio exactly matches the $42/$45 rate difference). Test leads
  (TestCo, TestCo2, test@example.com, followup@example.com) cleaned from the `leads` collection
  after testing.

### Session 12 (Feb 2026) — Content dedup fix, industry ROI, PDF export parity, real email delivery
- **Content audit + fixed a self-introduced duplication bug**: discovered that "soc-2-compliance-guide-small-business" and "cmmc-compliance-guide-defense-contractors" (comprehensive guides) already existed in `server.py`'s BLOG_POSTS before Session 9 mistakenly assumed they were broken sitemap links and created shorter duplicate posts (`what-is-soc-2-compliance`, `what-is-cmmc-compliance`). Fixed by merging the "In plain terms:" plain-language opener into the original comprehensive posts, deleting the duplicates, and repointing all links (TrustIndicators, Compliance, sitemap.xml) to the originals. Also confirmed the `BlogPost.jsx` heading+list render fix (Session 11) resolved all 7 affected posts site-wide.
- **Industry-based ROI**: `lib/roiCalculator.js` now uses an `INDUSTRY_HOURLY_RATES` map (Construction $42, Financial Services $45, Manufacturing $38, Healthcare $40, Professional Services $48) keyed off the assessment's existing `industry` answer, instead of a flat $38/hr - verified with a live differential test producing genuinely different $ outputs per industry.
- **Scorecard PDF export parity**: extracted shared `lib/pdfReportHelpers.js` (branded header/score-block/ROI-block/list-section/footer) used by both `generateAssessmentPDF.js` and the new `generateScorecardPDF.js`, so the Cyber Risk Scorecard now has the same "Download Executive ROI & Readiness Report" capability as the Assessment.
- **Real email delivery for both PDF reports**: new `POST /api/reports/email` backend endpoint (EmailStr validation, base64 PDF attachment via MIMEApplication, shares the existing `check_lead_rate_limit` guard with `/leads`) - wired into a new "Email Me This Report" button on the Assessment results, and into the Cyber Risk Scorecard's pre-existing "Email me my full report" flow, which previously only captured a lead without actually sending anything (now genuinely emails a PDF attachment).
- Tested via `testing_agent_v4` (iteration_26.json) — 100% backend (4/4 pytest) and 100% frontend,
  zero bugs; confirmed real SMTP delivery and real shared rate-limiting end-to-end.

### Session 11 (Feb 2026) — Dynamic assessment ROI, executive PDF report, content render bug fix
- **Assessment ROI integration**: `FreeAuditOffer.jsx`'s "Operational Efficiency" step gained a new
  unscored follow-up question ("weekly_manual_hours" - hours/week/person on manual tasks) that
  feeds `lib/roiCalculator.js` (`calculateAssessmentROI`) alongside the existing `team_size`
  answer, scaled by the user's own automation-maturity gap - same pattern as the Scorecard's
  risk-scaled ROI.
- **Personalized Efficiency Forecast**: results page now shows a 2-column row - Overall Score ring
  next to a new `EfficiencyForecast.jsx` card (Annual Hours Reclaimed + Monthly Savings Forecast).
- **Executive PDF report**: "Download Executive ROI & Readiness Report" button generates a
  branded multi-section PDF client-side via `lib/generateAssessmentPDF.js` (newly installed
  `jspdf` package) - score, ROI math, top gaps/opportunities, next steps + contact info. No backend
  call needed.
- **ROI Analysis content**: new `sections/ROIAnalysisSection.jsx` (~280 words, 3 H4 sub-sections,
  personalized with the user's own forecast numbers) rendered below the results, above the final
  CTA.
- **Compliance.jsx DRY cleanup**: extracted a `ComplianceCard` sub-component, merged the two
  duplicated slice(0,3)/slice(3) render blocks into a single `.map()` - no visual/functional change.
- **TrustIndicators HIPAA/ISO/OSHA**: restructured into a `stats` row (4 unchanged) + a new
  "Certified & Compliant" `credentials` row (6 linked badges: SOC2, CMMC, AI+Automation, HIPAA,
  ISO 27001, OSHA).
- **Site-wide content-rendering bug found + fixed**: `BlogPost.jsx`'s markdown-to-JSX renderer
  merged a `## `/`### ` heading with any list items immediately following it on the next line
  (single `\n`, no blank line) into one broken block, rendering the whole thing as raw unformatted
  heading text (literal `**bold**` visible). This affected the HIPAA post (and likely other
  pre-existing posts with the same authoring pattern) - fixed by splitting the first line off as
  the heading and recursively rendering the remainder. Verified fixed on the HIPAA post and
  confirmed no regression on an already-correct post (CMMC).
- Tested via `testing_agent_v4` (iteration_25.json) — 100% frontend, zero bugs; dynamic ROI
  verified with two contrasting answer sets producing correctly scaled results; PDF download
  verified as a real, non-empty file.

### Session 10 (Feb 2026)
- **Real contrast/functionality bug fixed**: `IndustryFormSection.jsx` had a `bg-white` section
  wrapping a dark-themed card design with `text-white` labels/headings (invisible), AND both
  `IndustryFormSection.jsx` and `CityFormSection.jsx` had lead-capture `Input` fields with literal
  `bg-white ... text-white` (typed text was invisible on every industry/city page form — a real
  conversion-impacting bug, not just cosmetic). Fixed section bg to `bg-[#0f1d32]` and Input bg to
  `bg-white/5` across both files, matching the working pattern used elsewhere on the site.
- **Compliance section expanded to 6 linked cards**: added a new HIPAA Compliance card (previously
  didn't exist as a card) and "Learn more" links for ISO 27001 and OSHA, alongside the existing
  CMMC link. Wrote 2 new plain-language "What Is X?" blog posts to back these
  (`what-is-iso-27001`, `what-is-osha-digital-recordkeeping-compliance`); HIPAA links to the
  existing `hipaa-compliance-small-healthcare-practices` post. Added both new posts to sitemap.xml.
- **Combined Cyber Risk Scorecard + ROI Calculator** (user-requested, replacing a separate
  "promote ROI calculator" idea): `pages/CyberRiskScorecard/ScorecardROI.jsx` is a new section
  rendered directly in the scorecard results flow (between Top Risks/Recommendations and the
  booking calendar) — completing the 12-question quiz now shows BOTH the risk score AND a sample
  ROI estimate (2 sliders: Team Size, Manual Hours) where the automation-efficiency assumption
  scales with the user's own risk score (`0.35 + risk% × 0.25`), directly tying "higher risk =
  more to gain from fixing it." CTA scrolls down to the existing booking section and reinforces
  Veracity as "Minnesota's premier managed IT partner for growing businesses." Added a light
  cross-link from `/ai-roi-preview` to `/cyber-risk-scorecard`.
- Tested via `testing_agent_v4` (iteration_24.json) — 100% frontend, zero bugs, confirmed via
  actual typing into form fields and full quiz completion.

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

### Session 22 (Feb 2026) — Client-success image swap + leaked credential rotation
- **Homepage image replacement**: `sections/OurApproach.jsx` "Client Success" panel (right column
  of the "How We Deliver" section) now shows the user's uploaded branded infographic
  (`data-testid="client-success-image"`, replacing the old `data-testid="soc-image"` stock
  handshake photo). Since the new asset has its own baked-in captions/testimonials, switched
  `object-cover` → `object-contain` and removed the old text-overlay gradient/caption block.
  Verified: diff review, new image URL returns HTTP 200 (valid PNG), frontend compiles clean.
  Visual on-page confirmation blocked by a tool-side screenshot/Playwright bug this session
  (coroutine object returned from `scroll_into_view_if_needed`/`bounding_box` regardless of
  environment) — user should still eyeball `https://veracitytechmn.com` "How We Deliver" section
  once redeployed.
- **[SECURITY] Rotated leaked credentials**: a prior session had exposed the real `ADMIN_API_KEY`
  and Gmail `SMTP_PASS` app password in chat. Both rotated this session:
  - New `ADMIN_API_KEY` generated (`secrets.token_urlsafe(32)`), updated in Preview
    `backend/.env`. Verified: old key → 401, new key → 200, on both Preview and Production
    (`GET /api/leads` via curl with `X-Admin-Key`).
  - New Gmail app password (user-generated, revoked old one in their Google Account). Updated
    Preview `backend/.env` `SMTP_PASS`. Verified via a real test lead submission on Preview (log
    confirmed "Lead notification email sent", no error) and a second real test lead on
    **Production** (user confirmed receiving the notification email).
  - User updated the same two values in Production's Deploy → Environment Variables (redeployed)
    and was walked through where to find that screen (`support_agent`).
  - Test leads (`credrotationtest@example.com` on Preview, `TEST_ProdSMTPVerification /
    TEST_DoNotContact` on Production) — Preview one cleaned from Mongo; the Production one could
    not be cleaned (no DB access to Production) — clearly labeled "TEST_DoNotContact" for the
    user to ignore/manually delete if desired.
  - **Outstanding**: user still needs to update the same `ADMIN_API_KEY`/`SMTP_PASS` values in
    GitHub repo secrets (Settings → Secrets and variables → Actions) for the CI workflow
    (`.github/workflows/backend-tests.yml`) to keep working with the new credentials.

### Session 23 (Feb 2026) - Comprehensive SEO/AEO/GEO expansion, Phase 1 (net-new pages, zero cannibalization)
- User requested a full-site SEO/AEO/GEO audit and expansion ("most visible and authoritative provider in Minnesota" for
  Financial Services, Manufacturing, Construction, High-Compliance), with an explicit hard constraint: preserve every
  existing page/URL/schema/internal link, prefer enhancement over creation, never create competing pages for the same
  keywords. Audited the full site against the request before writing any code - found the 4 target industries, 45 city
  pages, 11-page AI cluster, BTA pillar page, Cyber Risk Scorecard, AI ROI Calculator, and 131+ resource articles already
  match the request closely. Found 3 genuine, zero-cannibalization-risk gaps and got user approval to build them as
  Phase 1 (further phases - resource content gaps, deeper industry technical content, technical SEO pass - deferred,
  user to confirm priority next):
  - **5 new dedicated Core Service pages** (`/services/managed-it-services`, `/services/cybersecurity-services`,
    `/services/disaster-recovery-business-continuity`, `/services/it-consulting-vcio`, `/services/compliance-services`)
    - previously the 5 homepage service cards in `CoreServices.jsx` had `link: null` and went nowhere, the single
    biggest structural SEO gap found. New `data/coreServicesData.js` + `pages/ServicePage/` (Hero, AnswerBox, Benefits,
    Details, IndustryExamples linking to the 4 real industry pages, FAQ, CTA, Related, Nav/Footer, Service+FAQPage+
    BreadcrumbList schema) - same folder/component pattern as the existing `AIPage`/`IndustryPage`. `CoreServices.jsx`
    cards are now real `<Link>`s with a "Learn more" arrow.
  - **New `/human-risk-simulation` SEO landing page** per user's exact content spec (what it is, why human behavior is
    the largest cyber risk, AI-driven phishing/social engineering, Awareness/Decision-Maker/Executive level overviews,
    common mistakes, why training fails, how to measure human risk, FAQ, CTA) - `data/humanRiskSimulationData.js` +
    `pages/HumanRiskSimulation/`. Per user's explicit architecture (Homepage Simulation -> dedicated page -> Assessment/
    Strategy Discussion): the homepage `CyberGame` section is **completely unchanged** except one new "Learn more about
    Human Risk Simulation" link; the dedicated page **reuses the exact same `<CyberGame/>` component** (DRY, verified
    fully playable end-to-end by the testing agent, not just visually present) inside its own educational content, with
    its own final CTA to the Business Technology Assessment + phone.
  - **New `/client-success` page** organized by industry per user's exact spec (Financial Services, Manufacturing,
    Construction, General MSP Success Stories) - reuses existing `data/industryTestimonials.js` `allTestimonials` +
    each industry's existing `testimonialIndices` mapping (no new/fabricated testimonials), General section shows the
    9 testimonials not already featured on an industry page, zero duplication verified. Homepage `CaseStudy.jsx`
    carousel unchanged except one new "View All Client Success Stories" link.
  - **Cross-linking**: new Footer "Services" column (5 services + Human Risk Simulation + Client Success, grid widened
    to `lg:grid-cols-5`), new desktop/mobile nav link "Human Risk" next to Risk Score/ROI Calculator, all 8 new URLs
    added to `sitemap.xml`. No existing footer/nav links, routes, or schema were removed or altered.
  - Tested via `testing_agent_v4` (iteration_29.json) - 100% pass, zero bugs, zero regressions on spot-checked
    pre-existing routes (AI cluster page, industry page, BTA, service area page, homepage sections incl. the CyberGame
    and CaseStudy carousel). Embedded Human Risk Simulation game confirmed fully playable (not just rendered) on the
    new dedicated page.
- **Deferred to next session (user to confirm priority)**: Phase 2 (Resource Center content gaps - Managed IT Pricing,
  MSP vs Break-Fix, Internal IT vs MSP, Co-Managed vs Fully Managed IT, Microsoft Copilot vs ChatGPT for Business),
  Phase 3 (deepen existing industry pages with OT/SCADA, Procore/Sage, jobsite connectivity specifics), Phase 4
  (technical SEO pass: breadcrumb UI everywhere, full metadata/internal-link audit).

### Session 24 (Feb 2026) - SEO/AEO/GEO expansion Phase 2: Resource Center content gaps
- Wrote the 5 missing Resource Center articles identified in the original audit, added to `backend/blog_data.py`
  `BLOG_POSTS_EXTENDED` (147 total posts now, zero duplicate slugs): `managed-it-pricing-guide-minnesota-businesses`,
  `msp-vs-break-fix-it-support`, `internal-it-vs-managed-service-provider`, `co-managed-it-vs-fully-managed-it`,
  `microsoft-copilot-vs-chatgpt-for-business`. Each follows the existing post format (direct-answer opener, ##
  headings, FAQ section with bolded inline Q&A pairs, closing italic CTA) - no new markdown syntax needed, matches
  what `blogContentRenderer.jsx` already supports.
- **Site-wide internal linking improvement**: the "Related Resources" block on every blog post (`BlogRelatedResources.jsx`,
  shared template across all 147 posts) previously linked its service card to the homepage `/#core-services` anchor.
  Added `categoryServiceMap` to `lib/contentLinks.js` (Managed IT/Cybersecurity/Business Continuity/Compliance/
  Financial Services/Manufacturing/AI & Automation -> their matching Phase 1 dedicated `/services/:slug` page, safe
  fallback to managed-it-services) so every post now links to a real, specific service page instead of a generic
  anchor - direct continuation of the original "improve internal linking" ask, applies automatically to all existing
  and future posts with zero risk (additive fields only, one link target changed).
  - Added the 5 new URLs to `sitemap.xml`'s curated featured-resources list, and updated `llms.txt` with new Core
    Services/Human Risk Simulation/Client Success sections, the 5 new article titles, and 4 new FAQ pairs matching
    the new comparison content (direct AEO/GEO citation value).
  - Tested via `testing_agent_v4` (iteration_30.json) - 100% pass (12/12 backend tests, all frontend flows), zero
    bugs. Confirmed the service-link change works correctly across 3 pre-existing posts of different categories, not
    just the 5 new ones. Only note: `/resources` index page has no search/category filter UI - pre-existing gap, out
    of Phase 2 scope, not a regression.
- **Remaining phases (user to confirm priority next)**: Phase 3 (deepen existing industry pages with OT/SCADA,
  Procore/Sage, jobsite connectivity specifics), Phase 4 (technical SEO pass: breadcrumb UI, full metadata/internal-
  link audit), plus the deferred "Service Page Visuals" enhancement (custom hero graphic per Core Service page).

### Session 25 (Feb 2026) - SEO/AEO/GEO expansion Phase 3: deeper industry-specific technical content
- Added a new "Technical Deep Dive" section to all 4 existing industry pages (`data/industryData.js` new `deepDive`
  array field per industry + new `pages/IndustryPage/IndustryDeepDive.jsx` component, rendered between the existing
  Compliance/Software and AI CTA sections - all pre-existing sections, challenges, compliance/software lists, and
  testimonials left completely untouched) covering the exact specific subtopics from the original request that were
  previously only summary-level or missing entirely:
  - Financial Services (4 items): SOC 2 Compliance, Vendor & Third-Party Risk Management, AI Governance for Advisory
    Firms, Business Continuity for Trading Operations
  - Construction (3 items): BIM Security & Model Data Protection, Procore & Sage Integration Security, Business
    Continuity for Active Job Sites
  - Manufacturing (3 items): ERP System Security, Industrial IoT Device Management, Network Segmentation Architecture
  - High-Compliance (3 items): PCI-DSS for Regulated Payment Processing, CMMC Level 2 Enclave Architecture, Multi-
    Framework Documentation Strategy
  - Added a matching 4th FAQ question to each industry page's existing `FAQPage` JSON-LD schema
    (`lib/industryStructuredData.js`), built dynamically from the new deepDive content, for direct AEO/GEO value.
  - **Bug caught and fixed mid-session**: the initial edit adding `deepDive` silently failed to apply to the
    Manufacturing industry object only, causing a hard React crash (blank page, "Cannot read properties of undefined
    (reading 'map')") on `/industries/manufacturing-it-support`. Caught via screenshot+console log inspection before
    handoff to testing, re-applied the edit, and verified fixed.
  - Tested via `testing_agent_v4` (iteration_31.json) - 100% pass, zero bugs, zero console errors on all 4 industry
    pages including manufacturing (crash fix independently re-verified by the testing agent), zero regressions on
    spot-checked homepage/Phase 1/Phase 2 pages.
- **Remaining phase (user to confirm priority next)**: Phase 4 (technical SEO pass: visible breadcrumb UI site-wide,
  full metadata/internal-link audit), plus previously deferred enhancements (Resources index search/filter, Service
  Page hero visuals).

### Session 26 (Feb 2026) - SEO/AEO/GEO expansion Phase 4 (final phase): technical SEO pass
- Added a shared, visible `components/Breadcrumbs.jsx` navigation trail (previously breadcrumbs only existed as
  invisible JSON-LD schema) to all 8 major page templates, matching each page's existing schema breadcrumb hierarchy
  exactly, replacing the old single "Back to Home"/"All Articles"/"All Service Areas" link in each hero:
  - Industry pages: Home > Industries > {Industry Name}
  - Service pages: Home > Services > {Service Name}
  - AI cluster pages: Home > Business Technology Assessment > {AI Page Name}
  - Blog posts: Home > Resources > {Article Title}
  - City/service-area pages: Home > Service Areas > IT Support in {City}
  - Business Technology Assessment, Human Risk Simulation, Client Success: Home > {Page Name} (single-level)
  - Files touched: `IndustryHero.jsx`, `ServiceHero.jsx`, `AIPageHero.jsx`, `CityHero.jsx`, `BTAHero.jsx`,
    `HRSHero.jsx`, `ClientSuccessHero.jsx`, `BlogPost/index.jsx`.
  - **Bug found by testing agent and fixed**: the "Industries"/"Services" mid-trail links (`/#industries`,
    `/#core-services`) navigated correctly but didn't scroll to the target homepage section (App.js's global
    `ScrollToTop` forced `scrollTo(0,0)` on every route change regardless of hash, and no hash-scroll handler existed
    anywhere). Fixed by making `ScrollToTop` hash-aware: if `location.hash` is present, `scrollIntoView({behavior:
    "smooth"})` on the matching element via `requestAnimationFrame`; otherwise falls back to the original
    scroll-to-top. Retested and confirmed working (iteration_33.json, 100% pass, scrollY verified >0 and landing on
    the correct section; normal no-hash navigation still correctly resets to scrollY=0).
  - Tested via `testing_agent_v4`: initial pass iteration_32.json (90%, one bug), retest iteration_33.json (100%,
    zero bugs) after the fix.
- **This completes all 4 phases of the original SEO/AEO/GEO expansion request.** Summary of the full initiative
  across sessions 23-26: 5 new Core Service pages, `/human-risk-simulation`, `/client-success` (Phase 1); 5 new
  Resource Center articles + site-wide internal-linking improvement on all 147 blog posts (Phase 2); deeper
  industry-specific technical content on all 4 industry pages (Phase 3); visible breadcrumb navigation site-wide
  (Phase 4) - all built as net-new/additive content with zero removal of existing pages, URLs, schema, or internal
  links, per the user's explicit preservation constraint.
- **Deferred enhancements (not part of the original SEO ask, suggested as follow-ups, none started)**: Resources
  index search/filter UI, per-Core-Service-page hero visuals, an industry comparison tool.

### Session 27 (Feb 2026) - Resources index search & category filter
- Added a live search bar (title+excerpt match, case-insensitive) and category filter chips to `pages/BlogIndex.jsx`
  (`/resources`, 147 articles) - categories derived dynamically via `useMemo` from the actual fetched post data (no
  hardcoded list to maintain), combined search+category filtering, result count, and an empty state with a "Clear
  filters" reset. Also swapped the old plain "Back to Home" link for the shared `Breadcrumbs` component (Home >
  Resources) for consistency with the Phase 4 rollout.
  - Tested via `testing_agent_v4` (iteration_34.json) - 100% pass, zero bugs, zero regressions (article card
    navigation, breadcrumb, sticky nav/footer all confirmed working).
- **All requested SEO/AEO/GEO phases (1-4) plus this enhancement are now complete.** Remaining deferred items from
  the backlog: Service Page hero visuals, an industry comparison tool.

### Session 28 (Feb 2026) - Distinct hero graphics per Core Service page
- Generated 5 unique, on-brand abstract tech illustrations (dark navy/glowing cyan, matching the site's visual
  language) via `image_generation_tool`, one per Core Service page topic: network/nodes (Managed IT), shield
  deflecting threat particles (Cybersecurity), circular recovery arrows around a database (Disaster Recovery),
  glowing staircase/roadmap (IT Consulting & vCIO), shield with checklist (Compliance).
  - Added `heroImage` URL field to each service object in `data/coreServicesData.js`.
  - Restructured `pages/ServicePage/ServiceHero.jsx` right column: image now displays above the existing stat card
    within the same bordered container, hero headline/subhead/CTA/breadcrumb unchanged.
  - Tested via `testing_agent_v4` (iteration_35.json) - 100% pass, all 5 images confirmed unique and topically
    correct, zero regressions on the rest of each service page.
- **All items from the last two rounds of "Next Action Items" backlog are now complete** except the Industry
  Comparison Tool (not started) and confirming GitHub Actions runs green (user-side check, not agent-actionable).

### Session 29 (Feb 2026) - Homepage hero visual refresh
- Generated a custom Minneapolis skyline + glowing cyan network-overlay hero background image (replacing a generic
  Unsplash stock photo) to match the visual language of the Core Service page hero graphics from the previous
  session, reinforcing both local (Minnesota) identity and AI/tech authority in one image.
  - `sections/HeroSection.jsx`: swapped `HERO_BG` URL, changed the flat dark overlay to a `bg-gradient-to-t`
    (darker at bottom for text contrast, lighter at top to let the skyline show through) - no other logic touched.
  - Tested via `testing_agent_v4` (iteration_36.json) - 100% pass, zero bugs, contrast/readability confirmed on both
    desktop and mobile, both CTAs and scroll indicator functional, zero regressions on the rest of the homepage.
- **Industry Comparison Tool**: user chose to hold off on this for now (paused, not started, still in backlog).
- **User confirmed GitHub Actions is running green** with the rotated secrets - CI/CD loop fully closed.

### Session 30 (Feb 2026) - Distinct hero graphics for all 11 AI cluster pages
- Extended the same hero-image treatment (image stacked above stat card in `grid-border-card`) from the Core Service
  pages to all 11 AI cluster pages, completing a fully consistent visual identity site-wide across every major page
  template (homepage, 5 services, 11 AI pages).
  - Generated 11 unique dark-navy/glowing-cyan abstract illustrations matching each page's specific concept:
    staircase+nodes (AI Readiness), network in hexagonal frame (Governance), radar scan with flagged risk points
    (Risk Assessment), shielded network core (Security Assessment), AI orb with layered access rings (Copilot
    Readiness), documents becoming circuit pathways (Policy Development), data streams through filter gates (Data
    Governance), scanning beam revealing hidden nodes (Shadow AI), interlocking gears with flowing nodes
    (Automation Consulting), winding path with milestones (Adoption Strategy), balanced scale with AI nodes
    (Responsible AI).
  - Added `heroImage` field to each of the 11 objects in `data/aiPagesData.js`; restructured
    `pages/AIPage/AIPageHero.jsx` right column identically to `ServiceHero.jsx`.
  - Tested via `testing_agent_v4` (iteration_37.json) - 100% pass, all 11 images confirmed unique (verified via
    distinct `src` + `naturalWidth`) and topically correct, zero regressions, zero console errors.
- **Visual consistency initiative is now complete**: homepage hero (session 29), 5 Core Service pages (session 28),
  and 11 AI cluster pages (this session) all share the same dark-navy/glowing-cyan custom illustration style instead
  of generic stock photos.

## Key API Endpoints
- `POST /api/leads` — captures form data (incl. new BTA/city/industry/blog funnel sources),
  stores in Mongo, fires SMTP email
- `GET /api/leads`, `GET /api/blog`, `GET /api/blog/:slug`
- `GET /api/stats/assessments-completed` — public, PII-free count used by the homepage social
  proof ticker

## Credentials
See `/app/memory/test_credentials.md` — no auth on this app (public marketing site); SMTP
Gmail App Password lives in backend `.env`, not modified this session.
