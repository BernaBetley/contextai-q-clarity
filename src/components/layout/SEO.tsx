import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

export function SEO({
  title,
  description,
  canonical,
  type = "website",
  publishedTime,
  modifiedTime,
}: SEOProps) {
  const fullTitle = title === "ContextAI Q" ? title : `${title} | ContextAI Q`;
  const siteUrl = "https://contextaiq.com";
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    updateMeta("description", description);
    updateMeta("og:title", fullTitle, true);
    updateMeta("og:description", description, true);
    updateMeta("og:type", type, true);
    updateMeta("og:url", canonicalUrl, true);
    updateMeta("og:site_name", "ContextAI Q", true);
    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", fullTitle);
    updateMeta("twitter:description", description);

    if (type === "article") {
      if (publishedTime) {
        updateMeta("article:published_time", publishedTime, true);
      }
      if (modifiedTime) {
        updateMeta("article:modified_time", modifiedTime, true);
      }
    }

    // Update canonical link
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalUrl);
  }, [fullTitle, description, canonicalUrl, type, publishedTime, modifiedTime]);

  return null;
}

// JSON-LD schemas
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ContextAI Q",
    url: "https://contextaiq.com",
    logo: "https://contextaiq.com/contextaiq_logo_bw.png",
    description: "Making brands visible and accurately represented in AI-generated answers.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "PT",
    },
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ContextAI Q",
    url: "https://contextaiq.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://contextaiq.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Visibility Audit",
    provider: {
      "@type": "Organization",
      name: "ContextAI Q",
    },
    description: "Comprehensive audit measuring your brand's visibility and accuracy across major LLMs including ChatGPT, Claude, Gemini, and Perplexity.",
    offers: {
      "@type": "Offer",
      price: "500",
      priceCurrency: "EUR",
    },
    areaServed: "Worldwide",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface WebPageSchemaProps {
  title: string;
  description: string;
  url: string;
}

export function WebPageSchema({ title, description, url }: WebPageSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    url: `https://contextaiq.com${url}`,
    isPartOf: {
      "@type": "WebSite",
      name: "ContextAI Q",
      url: "https://contextaiq.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
