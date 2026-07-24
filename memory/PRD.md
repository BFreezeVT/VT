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

## Backlog / Next Tasks
- **P2 (known, pre-existing, not a regression)**: CoreServices section (and possibly a couple
  other early-homepage sections) have mild white-text-on-light-gradient contrast at their
  scroll position — pre-existing since original build, out of scope for this session per user's
  "update not overhaul" instruction. Worth a future pass if user wants visual polish.
- Deployment: previously passed deployment_agent health check; user was mid-way through
  GoDaddy DNS / Search Console setup for veracitytechmn.com — pick up from there if user returns
  to deployment.

## Key API Endpoints
- `POST /api/leads` — captures form data (incl. new BTA/city/industry/blog funnel sources),
  stores in Mongo, fires SMTP email
- `GET /api/leads`, `GET /api/blog`, `GET /api/blog/:slug`

## Credentials
See `/app/memory/test_credentials.md` — no auth on this app (public marketing site); SMTP
Gmail App Password lives in backend `.env`, not modified this session.
