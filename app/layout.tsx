import "./globals.css";
import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const newsreader = Newsreader({
  subsets: ["latin"],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 pt-16 md:pt-20">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
