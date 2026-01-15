import "./globals.css";
import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import Script from "next/script";
import { Analytics } from "./components/Analytics";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  title: {
    default: "ContextAI Q — AI Visibility Audit",
    template: "%s | ContextAI Q",
  },
  description:
    "ContextAI Q measures and improves how your brand appears in AI-generated answers. Start with a €500 fixed-scope AI Visibility Audit.",
  metadataBase: new URL("https://contextaiq.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "ContextAI Q",
    url: "https://contextaiq.com/",
    title: "ContextAI Q — AI Visibility Audit",
    description:
      "Measure and improve how your brand appears in AI-generated answers. Start with a €500 fixed-scope audit.",
    images: [{ url: "/contextaiq_logo_bw.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ContextAI Q — AI Visibility Audit",
    description:
      "Measure and improve how your brand appears in AI-generated answers. Start with a €500 fixed-scope audit.",
    images: ["/contextaiq_logo_bw.png"],
  },
  icons: {
    icon: [{ url: "/icon", type: "image/png" }],
    apple: [{ url: "/apple-icon", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ga4Id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
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
          <main className="flex-1 pt-16 md:pt-20">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
