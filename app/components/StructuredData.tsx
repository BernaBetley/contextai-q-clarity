import { siteConfig } from "../lib/site";

type JsonLdProps = {
  data: Record<string, unknown>;
};

export function JsonLd({ data }: JsonLdProps) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: new URL(siteConfig.logo, siteConfig.url).toString(),
    description: siteConfig.description,
    address: { "@type": "PostalAddress", addressCountry: "PT" },
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.contactEmail,
      contactType: "Sales",
      areaServed: "Worldwide",
    },
  };

  return <JsonLd data={schema} />;
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  };

  return <JsonLd data={schema} />;
}

type ServiceSchemaProps = {
  name: string;
  description: string;
  price?: string;
  priceCurrency?: string;
  url?: string;
};

export function ServiceSchema({ name, description, price, priceCurrency = "EUR", url }: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    provider: { "@type": "Organization", name: siteConfig.name },
    description,
    url: url ? new URL(url, siteConfig.url).toString() : siteConfig.url,
    offers: price ? { "@type": "Offer", price, priceCurrency } : undefined,
    areaServed: "Worldwide",
  };

  return <JsonLd data={schema} />;
}

type ArticleSchemaProps = {
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
};

export function ArticleSchema({ headline, description, url, datePublished, dateModified }: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: new URL(url, siteConfig.url).toString(),
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: new URL(siteConfig.logo, siteConfig.url).toString(),
      },
    },
    datePublished,
    dateModified: dateModified ?? datePublished,
  };

  return <JsonLd data={schema} />;
}

type FaqItem = {
  question: string;
  answer: string;
};

type FaqSchemaProps = {
  items: FaqItem[];
};

export function FaqSchema({ items }: FaqSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return <JsonLd data={schema} />;
}
