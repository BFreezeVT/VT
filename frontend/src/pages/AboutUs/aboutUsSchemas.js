export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Veracity Technologies",
    description: "SOC 2 certified Managed Service Provider in Minnetonka, Minnesota. Since 1989, Veracity Technologies has helped Twin Cities small and midsize businesses in financial services, construction, manufacturing, and high-compliance industries secure, simplify, and modernize their technology.",
    url: "https://www.veracitytechmn.com/about",
    logo: "https://www.veracitytechmn.com/images/logo-circle-300.webp",
    foundingDate: "1989",
    telephone: "+1-952-941-7333",
    email: "info@veracitytechmn.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "5929 Baker Rd, Suite 420",
      addressLocality: "Minnetonka",
      addressRegion: "MN",
      postalCode: "55345",
      addressCountry: "US",
    },
    sameAs: [
      "https://www.linkedin.com/company/veracity-technologies/",
      "https://www.facebook.com/veracitytech",
      "https://www.youtube.com/@VeracityTechnologies",
    ],
  };
}

export function buildBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.veracitytechmn.com/" },
      { "@type": "ListItem", position: 2, name: "About Us", item: "https://www.veracitytechmn.com/about" },
    ],
  };
}

export function buildWebPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "About Us | Veracity Technologies",
    description: "Meet Veracity Technologies, a SOC 2 certified MSP in Minnetonka, MN. Since 1989, we have helped Twin Cities SMBs in financial services, construction, manufacturing, and high-compliance industries secure and simplify their technology.",
    url: "https://www.veracitytechmn.com/about",
  };
}
