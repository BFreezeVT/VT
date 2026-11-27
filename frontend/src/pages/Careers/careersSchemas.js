export function buildBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.veracitytechmn.com/" },
      { "@type": "ListItem", position: 2, name: "Careers", item: "https://www.veracitytechmn.com/careers" },
    ],
  };
}

export function buildWebPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Careers | Veracity Technologies",
    description:
      "Build your career at Veracity Technologies, a SOC 2 certified MSP in Minnetonka, MN. Competitive compensation, career advancement, and an exceptional work atmosphere for Twin Cities technology professionals.",
    url: "https://www.veracitytechmn.com/careers",
  };
}
