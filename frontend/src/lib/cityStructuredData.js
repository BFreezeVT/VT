export function buildCityStructuredData(city) {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Veracity Technologies - ${city.name} IT Support`,
    description: city.description,
    url: `https://www.veracitytechmn.com/service-areas/${city.slug}`,
    telephone: "+1-952-941-7333",
    email: "info@veracitytech.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "5929 Baker Rd, Suite 420",
      addressLocality: city.name,
      addressRegion: city.state,
      postalCode: city.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: city.lat,
      longitude: city.lng,
    },
    areaServed: {
      "@type": "City",
      name: city.name,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    parentOrganization: { "@id": "https://www.veracitytechmn.com/#organization" },
  };

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.veracitytechmn.com/" },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://www.veracitytechmn.com/service-areas" },
      { "@type": "ListItem", position: 3, name: `IT Support in ${city.name}`, item: `https://www.veracitytechmn.com/service-areas/${city.slug}` },
    ],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Does Veracity Technologies provide IT support in ${city.name}, Minnesota?`,
        acceptedAnswer: { "@type": "Answer", text: `Yes. Veracity Technologies provides managed IT services, cybersecurity, AI security, and compliance management to businesses in ${city.name}, MN. We cover ${city.neighborhoods.join(", ")} and surrounding areas. Call (952) 941-7333 for a free audit.` },
      },
      {
        "@type": "Question",
        name: `What industries does Veracity serve in ${city.name}?`,
        acceptedAnswer: { "@type": "Answer", text: `In ${city.name}, we serve ${city.localIndustries.join(", ")}. Each engagement is tailored to the specific compliance requirements and operational needs of your industry.` },
      },
      {
        "@type": "Question",
        name: `What is the biggest IT challenge for businesses in ${city.name}?`,
        acceptedAnswer: { "@type": "Answer", text: city.localChallenge },
      },
      {
        "@type": "Question",
        name: `Does Veracity Technologies offer a Business Technology Assessment in ${city.name}?`,
        acceptedAnswer: { "@type": "Answer", text: `Yes. Veracity Technologies offers a free Business Technology Assessment to ${city.name} businesses, scoring technology infrastructure, cybersecurity readiness, compliance readiness, AI readiness, and automation maturity. Call (952) 941-7333 or visit veracitytechmn.com/business-technology-assessment to get started.` },
      },
      {
        "@type": "Question",
        name: `What AI readiness services does Veracity provide in ${city.name}?`,
        acceptedAnswer: { "@type": "Answer", text: `Veracity Technologies provides AI readiness assessments, AI governance frameworks, and Microsoft Copilot readiness reviews to ${city.name} organizations, helping them adopt AI safely without creating compliance or data exposure risk.` },
      },
    ],
  };

  return [localBusiness, breadcrumbList, faqPage];
}
