import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ContextAI Q · Audit Engine",
  description: "AI Visibility Audit automation engine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
