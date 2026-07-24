export function buildIndustryStructuredData(industry) {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${industry.name} IT & Cybersecurity Services`,
    description: industry.description,
    url: `https://www.veracitytechmn.com/industries/${industry.slug}`,
    provider: {
      "@type": "Organization",
      name: "Veracity Technologies",
      telephone: "+1-952-941-7333",
    },
    areaServed: { "@type": "State", name: "Minnesota" },
    serviceType: `${industry.name} Managed IT & Cybersecurity`,
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: industry.metaTitle,
    url: `https://www.veracitytechmn.com/industries/${industry.slug}`,
    description: industry.metaDescription,
    isPartOf: { "@id": "https://www.veracitytechmn.com/#website" },
    publisher: { "@id": "https://www.veracitytechmn.com/#organization" },
  };

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.veracitytechmn.com/" },
      { "@type": "ListItem", position: 2, name: "Industries", item: "https://www.veracitytechmn.com/#industries" },
      { "@type": "ListItem", position: 3, name: `${industry.name} IT & Cybersecurity`, item: `https://www.veracitytechmn.com/industries/${industry.slug}` },
    ],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What cybersecurity services does Veracity provide for ${industry.name.toLowerCase()}?`,
        acceptedAnswer: { "@type": "Answer", text: `Veracity Technologies provides managed IT, cybersecurity, AI security, and compliance management specifically tailored to ${industry.name.toLowerCase()}. This includes ${industry.compliance.join(", ")} compliance, and support for ${industry.software.slice(0, 3).join(", ")} and other industry platforms.` },
      },
      {
        "@type": "Question",
        name: `What are the biggest cybersecurity threats facing ${industry.name.toLowerCase()}?`,
        acceptedAnswer: { "@type": "Answer", text: industry.challenges.map((c) => `${c.title}: ${c.desc}`).join(" ") },
      },
      {
        "@type": "Question",
        name: `Does Veracity Technologies offer a free cybersecurity audit for ${industry.name.toLowerCase()} firms?`,
        acceptedAnswer: { "@type": "Answer", text: `Yes. Veracity offers a free, non-invasive Technology & Cyber Risk Audit tailored to ${industry.name.toLowerCase()} that includes AI readiness assessment, network vulnerability scan, compliance gap analysis, and disaster recovery plan evaluation. Call (952) 941-7333 to schedule.` },
      },
    ],
  };

  return [service, webPage, breadcrumbList, faqPage];
}
