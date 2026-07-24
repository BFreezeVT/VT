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

## Backlog / Next Tasks
- **P1**: Scrape full article content for the 131 migrated blog posts (currently excerpt-only)
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
