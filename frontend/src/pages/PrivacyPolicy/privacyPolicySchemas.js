export function buildBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.veracitytechmn.com/" },
      { "@type": "ListItem", position: 2, name: "Privacy Policy", item: "https://www.veracitytechmn.com/privacy-policy" },
    ],
  };
}

export function buildWebPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy | Veracity Technologies",
    description:
      "How Veracity Technologies collects, uses, and protects your personal information. Read what we collect through our website, how we use it, and how you can access or correct it.",
    url: "https://www.veracitytechmn.com/privacy-policy",
  };
}
