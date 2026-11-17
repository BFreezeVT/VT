# Maintenance loop — veracitytechmn.com (BFreezeVT/VT)

Emergent-built site: React 19 frontend (`frontend/`, yarn) + FastAPI backend
(`backend/`, pip), deployed on Vercel (`vercel.json`).

## Source of truth

GitHub is the source of truth. Emergent is for building new features — build
there, sync to GitHub, and let the checks below guard the merge. Do not edit
in Emergent and GitHub at the same time on the same files, or the two copies
will drift.

## What runs weekly

1. **Dependabot** (`.github/dependabot.yml`) — every Monday ~9am Central,
   opens PRs for npm (`/frontend`), pip (`/backend`), and GitHub Actions
   updates. PRs only. Nothing auto-merges, nothing auto-deploys.
2. **Weekly Maintenance Check** — every Monday, runs `pip-audit` on
   `backend/requirements.txt` and `yarn audit` on the frontend, and opens a
   GitHub issue labelled `maintenance` with the results.
3. **Muse weekly agent check** — a scheduled Muse run each Monday reviews the
   Dependabot PRs and the weekly maintenance issue, checks for outdated
   packages / CVEs / broken links, and reports back in chat with the PRs
   ready to approve. It does not merge or deploy without approval. It also
   runs the sync, discoverability and security checks in the section below.

## Guardrails (always on PRs)

- **Frontend Build** — the React frontend must build on every PR touching `frontend/`.
- **Backend Tests** (`.github/workflows/backend-tests.yml`) — the existing
  pytest suite runs against MongoDB on every push/PR to `main`/`master`.

## Rules for updates

- Patch and minor updates: review the Dependabot PR, check CI is green, merge.
- Major-version updates (React, FastAPI, Mongo driver, etc.): separate PR,
  read the changelog / breaking changes first, run the full build + tests.
- Security fixes: high/critical first, in their own PR, tests green.
- Never commit secrets or `.env` files. Secrets live in GitHub Secrets /
  Vercel env vars, never in the repo.
- Back up the database before any migration or schema change.
- If Emergent and GitHub disagree, GitHub wins — re-sync from Emergent
  only after confirming which copy is current.

## Sync, discoverability & security (added 2026-11-16)

The weekly loop also guards that the frontend and backend stay in sync, that
search engines and AI engines can find the site, and that the site stays
secure. These are checked by the Muse weekly agent check every Monday, not by
a GitHub workflow.

### Frontend/backend sync
- Live `/api/blog` post count matches the repo (`backend/blog_data.py` +
  `backend/server.py` BLOG_POSTS). If they differ, the deploy is behind or
  the backend is serving stale code.
- The newest post's slug appears in live `/sitemap.xml` and its page returns
  200 with prerendered content (not an empty SPA shell).
- Homepage and `/resources` return 200. Apex `veracitytechmn.com` 308s to
  `www.veracitytechmn.com` (canonical www).

### Discoverability (SEO / AEO / GEO)
- `/robots.txt` is live, allows Googlebot, Bingbot, GPTBot, ClaudeBot,
  PerplexityBot and other AI crawlers, disallows `/api/`, and points to the
  sitemap.
- `/sitemap.xml` is live and regenerated at build time from the live backend
  (`frontend/scripts/generate-sitemap.js`); every indexable page, including
  all blog posts, must be in it.
- `/llms.txt` is live and lists the 10 latest blog posts. Every new blog post
  PR appends the post to `llms.txt` (see the content engine playbook).
- New blog posts are pinged to IndexNow (Bing/Yandex) on publish; the key
  file is `frontend/public/7549ec4f781d2ea6a3a04fedd4c161f4.txt` and the ping
  goes to `https://api.indexnow.org/indexnow` with the post URL.
- Bing Webmaster Tools: the site must be claimed there for Bing coverage
  reporting (no `BingSiteAuth.xml` in the repo yet; claiming is a manual
  step). Google Search Console coverage is already set up.

### Security
- Security headers on live responses: HSTS, X-Content-Type-Options nosniff,
  X-Frame-Options SAMEORIGIN, Referrer-Policy, Permissions-Policy.
  Frontend headers come from `vercel.json`; API headers come from the
  `add_security_headers` middleware in `backend/server.py`.
- `CORS_ORIGINS` must be set explicitly in Vercel env vars (the backend
  defaults to `*` when it is unset; credentials are off, but explicit
  origins are the rule).
- Dependabot + pip-audit/yarn audit results, reviewed weekly as before.
- Never commit secrets or `.env` files.
