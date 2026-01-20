import "./globals.css";
import type { Metadata } from "next";
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
    default: "ContextAI Q — AI Visibility Audit",
    template: "%s | ContextAI Q",
  },
  description: siteConfig.description,
  icons: {
    icon: "/contextaiq_logo_bw.png",
    shortcut: "/contextaiq_logo_bw.png",
    apple: "/contextaiq_logo_bw.png",
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: "ContextAI Q — AI Visibility Audit",
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ContextAI Q — AI Visibility Audit",
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
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:shadow-md"
        >
          Skip to content
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
            <Analytics />
          </>
        ) : null}

        <div className="min-h-screen flex flex-col">
          <Header />
          <main id="main-content" className="flex-1 pt-16 md:pt-20">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
