export function buildServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Business Technology Assessment",
    description: "A comprehensive assessment evaluating technology maturity, cybersecurity posture, compliance readiness, AI readiness, operational efficiency, automation opportunities, and business risk.",
    url: "https://www.veracitytechmn.com/business-technology-assessment",
    provider: { "@type": "Organization", name: "Veracity Technologies", telephone: "+1-952-941-7333" },
    areaServed: { "@type": "State", name: "Minnesota" },
    serviceType: "Business Technology Assessment",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}

export function buildBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.veracitytechmn.com/" },
      { "@type": "ListItem", position: 2, name: "Business Technology Assessment", item: "https://www.veracitytechmn.com/business-technology-assessment" },
    ],
  };
}

export function buildFaqSchema(answerBoxes) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: answerBoxes.map((a) => ({ "@type": "Question", name: a.q, acceptedAnswer: { "@type": "Answer", text: a.a } })),
  };
}
