// Old blog slugs containing literal periods (from unsanitized title-to-slug conversion, e.g. "vs.")
// -> new clean dash-only slugs (technical SEO cleanup, Aug 2026)
const legacyBlogRedirects = {
  "managed-it-vs.it-compliance-services-whats-the-difference-and-do-you-need-both":
    "managed-it-vs-it-compliance-services-whats-the-difference-and-do-you-need-both",
  "managed-ai-vs.diy-ai-why-letting-employees-figure-it-out-is-costing-you-more-than-you-think":
    "managed-ai-vs-diy-ai-why-letting-employees-figure-it-out-is-costing-you-more-than-you-think",
  "chatgpt-vs.microsoft-copilot-vs.private-ai-which-is-right-for-your-minneapolis-business":
    "chatgpt-vs-microsoft-copilot-vs-private-ai-which-is-right-for-your-minneapolis-business",
  "ai-tools-are-everywhere.heres-how-to-use-them-without-making-a-mess":
    "ai-tools-are-everywhere-heres-how-to-use-them-without-making-a-mess",
  "co-managed-vs.fully-managed-it-which-model-fits-your-business-best":
    "co-managed-vs-fully-managed-it-which-model-fits-your-business-best",
  "cyber-incident-in-st.paul-prompts-statewide-emergency":
    "cyber-incident-in-st-paul-prompts-statewide-emergency",
  "the-average-data-breach-now-costs-4.88-million-how-much-would-it-cost-you":
    "the-average-data-breach-now-costs-4-88-million-how-much-would-it-cost-you",
};

export default legacyBlogRedirects;
