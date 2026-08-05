export function buildBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.veracitytechmn.com/" },
      { "@type": "ListItem", position: 2, name: "Client Success Stories", item: "https://www.veracitytechmn.com/client-success" },
    ],
  };
}

export function buildWebPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Client Success Stories | Veracity Technologies",
    description: "Real client success stories from Veracity Technologies' managed IT and cybersecurity partnerships across financial services, manufacturing, construction, and other Minnesota industries.",
    url: "https://www.veracitytechmn.com/client-success",
  };
}
