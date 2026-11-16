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
   ready to approve. It does not merge or deploy without approval.

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
