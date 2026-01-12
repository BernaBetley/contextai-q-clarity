import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
