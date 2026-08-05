export function buildServiceSchema(page) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.name,
    description: page.metaDescription,
    url: `https://www.veracitytechmn.com/${page.slug}`,
    provider: { "@type": "Organization", name: "Veracity Technologies", telephone: "+1-952-941-7333" },
    areaServed: { "@type": "State", name: "Minnesota" },
    serviceType: page.name,
  };
}

export function buildBreadcrumbSchema(page) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.veracitytechmn.com/" },
      { "@type": "ListItem", position: 2, name: "Business Technology Assessment", item: "https://www.veracitytechmn.com/business-technology-assessment" },
      { "@type": "ListItem", position: 3, name: page.name, item: `https://www.veracitytechmn.com/${page.slug}` },
    ],
  };
}

export function buildFaqSchema(page) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: page.answerBoxQ, acceptedAnswer: { "@type": "Answer", text: page.answerBoxA } },
      ...page.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    ],
  };
}
