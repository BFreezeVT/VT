export function buildServiceSchema(svc) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.name,
    description: svc.metaDescription,
    url: `https://www.veracitytechmn.com/services/${svc.slug}`,
    provider: { "@type": "Organization", name: "Veracity Technologies", telephone: "+1-952-941-7333" },
    areaServed: { "@type": "State", name: "Minnesota" },
    serviceType: svc.name,
  };
}

export function buildBreadcrumbSchema(svc) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.veracitytechmn.com/" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://www.veracitytechmn.com/#core-services" },
      { "@type": "ListItem", position: 3, name: svc.name, item: `https://www.veracitytechmn.com/services/${svc.slug}` },
    ],
  };
}

export function buildFaqSchema(svc) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: svc.answerBoxQ, acceptedAnswer: { "@type": "Answer", text: svc.answerBoxA } },
      ...svc.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    ],
  };
}
