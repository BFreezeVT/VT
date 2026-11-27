/* Routing Middleware: return a genuine HTTP 404 for unknown URLs instead of the
   SPA shell with HTTP 200 (soft 404). Known routes and static assets pass
   through untouched. Any failure inside this middleware fails open (the
   request continues to the app) so a middleware error can never take the
   site down.

   Platform convention (Vercel Routing Middleware): this file must be a
   default export, pass-through uses the next() helper from
   @vercel/functions, and it is wired explicitly in vercel.json via
   proxy.entrypoint. The previous version used the legacy Next.js named
   export and returned undefined for pass-through, so Vercel never ran it. */

import { next } from "@vercel/functions";

const STATIC_ROUTES = new Set([
  "/",
  "/service-areas",
  "/business-technology-assessment",
  "/resources",
  "/cyber-risk-scorecard",
  "/ai-roi-preview",
  "/human-risk-simulation",
  "/client-success",
  "/about",
  "/privacy-policy",
  "/careers",
  "/testimonials",
  "/2-free-hours",
  "/aspirin",
  "/free-network-assessment",
  "/initial-consultation",
  "/it-buyers-guide",
  "/cyber-security-tip-of-the-week",
  "/mastering-ai",
  "/maximizing-ai",
  "/cybersecurity-that-works",
  "/airia-request",
  "/contact",
  "/discovery-call",
]);

// Single-segment AI landing pages served by the /:aiSlug catch-all route.
const AI_SLUGS = new Set([
  "ai-readiness-assessment",
  "ai-governance",
  "ai-risk-assessment",
  "ai-security-assessment",
  "microsoft-copilot-readiness",
  "ai-policy-development",
  "ai-data-governance",
  "shadow-ai-risk-assessment",
  "ai-automation-consulting",
  "ai-adoption-strategy",
  "responsible-ai-consulting",
]);

// Two-segment dynamic routes: /service-areas/<slug>, /industries/<slug>,
// /services/<slug>, /resources/<slug>. Any single slug is allowed through;
// the app renders its own not-found state for an unknown slug.
const DYNAMIC_PREFIXES = ["/service-areas/", "/industries/", "/services/", "/resources/"];

function isKnownRoute(pathname) {
  if (STATIC_ROUTES.has(pathname)) return true;
  if (pathname === "/") return true;
  for (const prefix of DYNAMIC_PREFIXES) {
    if (pathname.startsWith(prefix)) {
      const slug = pathname.slice(prefix.length);
      // Exactly one non-empty segment, no further slashes.
      if (slug && !slug.includes("/")) return true;
    }
  }
  // Single-segment AI landing page.
  if (pathname.startsWith("/") && !pathname.slice(1).includes("/")) {
    return AI_SLUGS.has(pathname.slice(1));
  }
  return false;
}

function isStaticAsset(pathname) {
  const last = pathname.split("/").pop() || "";
  return last.includes(".");
}

const NOT_FOUND_HTML = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page Not Found | Veracity Technologies</title><meta name="robots" content="noindex"><style>body{margin:0;background:#0f1d32;color:#fff;font-family:system-ui,-apple-system,sans-serif}nav{background:rgba(0,59,113,.95);border-bottom:1px solid rgba(255,255,255,.1)}nav div{max-width:80rem;margin:0 auto;padding:0 1.5rem;height:4rem;display:flex;align-items:center;justify-content:space-between}a{color:#fff;text-decoration:none}main{min-height:70vh;display:flex;align-items:center;justify-content:center;padding:0 1.5rem;text-align:center}h1{font-size:1.5rem;margin:0 0 .75rem}.num{font-size:3.75rem;margin:0 0 1rem}p{color:#94a8be;font-size:.875rem;margin:0 0 2rem}.btn{display:inline-block;background:#fff;color:#1e6bb8;font-weight:600;padding:.75rem 1.5rem;border-radius:.125rem;margin:.25rem}.btn.alt{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.1)}footer{border-top:1px solid rgba(255,255,255,.1);padding:1.5rem;text-align:center;color:rgba(148,168,190,.6);font-size:.75rem}</style></head><body><nav><div><a href="/" style="font-weight:700;font-size:1.25rem">VERACITY<span style="color:#0077B3"> TECHNOLOGIES</span></a><a href="tel:9529417333" style="color:#94a8be;font-size:.875rem">(952) 941-7333</a></div></nav><main><div><p class="num">404</p><h1>Page Not Found</h1><p>This page doesn&rsquo;t exist or may have been moved. Let&rsquo;s get you back on track.</p><div><a class="btn" href="/">Back to Home</a><a class="btn alt" href="/service-areas">Service Areas</a><a class="btn alt" href="/resources">Resources</a></div></div></main><footer>Veracity Technologies. All rights reserved.</footer></body></html>`;

export default function middleware(request) {
  try {
    const url = new URL(request.url);
    let pathname = url.pathname;
    // Normalize a trailing slash (except the root) so /resources/ matches /resources.
    if (pathname.length > 1 && pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }
    // Let the API, static assets, and every known route continue to the app.
    if (pathname.startsWith("/api/")) return next();
    if (isStaticAsset(pathname)) return next();
    if (isKnownRoute(pathname)) return next();
    // Unknown path: genuine 404 with the not-found page.
    return new Response(NOT_FOUND_HTML, {
      status: 404,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  } catch (e) {
    // Fail open: never break the site because of a middleware error.
    return next();
  }
}
