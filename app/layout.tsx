import "./globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import { Inter, Merriweather } from "next/font/google";

import { Analytics } from "./components/Analytics";
import { OrganizationSchema, WebSiteSchema } from "./components/StructuredData";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { env } from "./lib/env.server";
import { siteConfig } from "./lib/site";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-merriweather",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "ContextAIQ | Agentes Prova para PME",
    template: "%s | ContextAIQ",
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: "ContextAIQ | Agentes Prova para PME",
    description: siteConfig.description,
    locale: "pt_PT",
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ContextAIQ | Agentes Prova para PME",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ga4Id = env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

  return (
    <html lang="pt" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:shadow-md"
        >
          Saltar para o conteúdo
        </a>
        <OrganizationSchema />
        <WebSiteSchema />
        {ga4Id ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${ga4Id}', { anonymize_ip: true, send_page_view: false });
              `}
            </Script>
            <Suspense fallback={null}>
              <Analytics />
            </Suspense>
          </>
        ) : null}

        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main-content" className="flex-1 pt-16 md:pt-[4.25rem]">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
