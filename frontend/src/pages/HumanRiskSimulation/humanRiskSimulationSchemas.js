export function buildServiceSchema(data) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.name,
    description: data.answerBoxA,
    url: "https://www.veracitytechmn.com/human-risk-simulation",
    provider: { "@type": "Organization", name: "Veracity Technologies", telephone: "+1-952-941-7333" },
    areaServed: { "@type": "State", name: "Minnesota" },
    serviceType: "Human Risk Simulation",
  };
}

export function buildBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.veracitytechmn.com/" },
      { "@type": "ListItem", position: 2, name: "Human Risk Simulation", item: "https://www.veracitytechmn.com/human-risk-simulation" },
    ],
  };
}

export function buildFaqSchema(data) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: data.answerBoxQ, acceptedAnswer: { "@type": "Answer", text: data.answerBoxA } },
      ...data.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    ],
  };
}
