// Optional gated "checklist" lead magnet for specific resource posts. Most posts have no entry
// here and getChecklistForPost() simply returns null - this is additive, not required per post.
export const BLOG_CHECKLISTS = {
  "cybersecurity-predictions-2027": {
    title: "Get the 2027 Cybersecurity Readiness Checklist",
    description: "A one-page, printable checklist of the action items from this article - organized by Identity & Access, Social Engineering, Infrastructure, and Zero Trust.",
    pdfTitle: "2027 Cybersecurity Readiness Checklist",
    sections: [
      {
        title: "Identity & Access Management",
        items: [
          "Enable multifactor authentication (MFA) across all critical systems",
          "Implement conditional access policies for cloud applications",
          "Deploy identity monitoring and privileged access management",
          "Run continuous employee security awareness training",
        ],
      },
      {
        title: "Social Engineering & Trusted Tools",
        items: [
          "Monitor for unusual activity inside everyday tools like Teams and Zoom",
          "Require secondary-channel verification for IT support requests",
          "Train employees on AI-generated phishing and impersonation tactics",
        ],
      },
      {
        title: "Infrastructure & Patch Management",
        items: [
          "Maintain a consistent patch management program for VPNs, firewalls, and routers",
          "Run regular vulnerability scans across internet-facing systems",
          "Enforce strong password and credential hygiene practices",
        ],
      },
      {
        title: "Zero Trust Readiness",
        items: [
          "Continuously verify user identities rather than trusting network location",
          "Limit administrative privileges to only what's necessary",
          "Enforce least-privilege access controls organization-wide",
          "Monitor and respond to abnormal account behavior",
        ],
      },
    ],
  },
};

export function getChecklistForPost(slug) {
  return BLOG_CHECKLISTS[slug] || null;
}
