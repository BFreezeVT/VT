export function buildBreadcrumbSchema(pageName, slug) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.veracitytechmn.com/" },
      { "@type": "ListItem", position: 2, name: pageName, item: `https://www.veracitytechmn.com/${slug}` },
    ],
  };
}

export function buildWebPageSchema(title, description, slug) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `https://www.veracitytechmn.com/${slug}`,
    isPartOf: {
      "@type": "WebSite",
      name: "Veracity Technologies",
      url: "https://www.veracitytechmn.com/",
    },
    about: {
      "@type": "Organization",
      name: "Veracity Technologies",
      url: "https://www.veracitytechmn.com/",
      telephone: "+1-952-941-7333",
      address: {
        "@type": "PostalAddress",
        streetAddress: "5929 Baker Rd, Suite 420",
        addressLocality: "Minnetonka",
        addressRegion: "MN",
        postalCode: "55345",
        addressCountry: "US",
      },
    },
  };
}

export function buildBookSchema(title, description, slug, authors) {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: title,
    description,
    url: `https://www.veracitytechmn.com/${slug}`,
    author: authors.map((name) => ({ "@type": "Person", name })),
    publisher: {
      "@type": "Organization",
      name: "Veracity Technologies",
      url: "https://www.veracitytechmn.com/",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };
}
