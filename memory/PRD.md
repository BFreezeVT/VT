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

## Key API Endpoints
- `POST /api/leads` — captures form data (incl. new BTA/city/industry/blog funnel sources),
  stores in Mongo, fires SMTP email
- `GET /api/leads`, `GET /api/blog`, `GET /api/blog/:slug`
- `GET /api/stats/assessments-completed` — public, PII-free count used by the homepage social
  proof ticker

## Credentials
See `/app/memory/test_credentials.md` — no auth on this app (public marketing site); SMTP
Gmail App Password lives in backend `.env`, not modified this session.
