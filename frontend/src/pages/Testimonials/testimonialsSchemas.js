export function buildBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.veracitytechmn.com/" },
      { "@type": "ListItem", position: 2, name: "Testimonials", item: "https://www.veracitytechmn.com/testimonials" },
    ],
  };
}

export function buildWebPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Testimonials | Veracity Technologies",
    description:
      "What Minnesota businesses say about Veracity Technologies. Read 20 client testimonials from financial services, construction, manufacturing, and high-compliance firms across the Twin Cities.",
    url: "https://www.veracitytechmn.com/testimonials",
  };
}
