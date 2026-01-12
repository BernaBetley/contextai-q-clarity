import "./globals.css";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";

export const metadata = {
  title: "ContextAI Q",
  description: "AI visibility advisory.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
