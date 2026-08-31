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
  aiPagesData.js (11 AI cluster pages), coreServicesData.js (5 services)
- `/app/frontend/src/lib/contentLinks.js` — shared internal-linking helpers (anchor rotation,
  industry/AI page mapping) used by city pages, industry pages, blog posts
- `/app/frontend/scripts/prerender.js` — postbuild Puppeteer static-HTML snapshot generator
  (221 routes) so crawlers get correct per-page title/canonical/OG without executing JS
- `/app/frontend/scripts/generate-sitemap.js` — postbuild sitemap.xml generator (added Aug 2026),
  derives all indexable URLs from the same data sources prerender.js uses + live `/api/blog`
- `/app/backend/server.py` — `/api/leads`, `/api/blog` endpoints + SMTP notification logic

## Detailed Session History
See `/app/memory/CHANGELOG.md` for the full session-by-session implementation log (Sessions 1-55+).

## Pending Work / Backlog
See `/app/memory/ROADMAP.md` for prioritized P0/P1/P2 remaining items.

## Key API Endpoints
- `POST /api/leads` — captures form data (incl. new BTA/city/industry/blog funnel sources),
  stores in Mongo, fires SMTP email
- `GET /api/leads`, `GET /api/blog`, `GET /api/blog/:slug`
- `GET /api/stats/assessments-completed` — public, PII-free count used by the homepage social
  proof ticker

## Credentials
See `/app/memory/test_credentials.md` — no auth on this app (public marketing site); SMTP
Gmail App Password lives in backend `.env`, not modified this session.
