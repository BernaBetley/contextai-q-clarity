/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/audit", destination: "/prova/visibilidade", permanent: true },
      { source: "/contact", destination: "/contacto", permanent: true },
      { source: "/about", destination: "/sobre", permanent: true },
      { source: "/method", destination: "/metodo", permanent: true },
      { source: "/how-it-works", destination: "/metodo", permanent: true },
      { source: "/services", destination: "/prova", permanent: true },
      { source: "/privacy", destination: "/privacidade", permanent: true },
      { source: "/terms", destination: "/termos", permanent: true },
      { source: "/deliverables", destination: "/metodo", permanent: true },
      { source: "/measurement", destination: "/metodo", permanent: true },
      { source: "/resources", destination: "/prova/visibilidade", permanent: true },
      { source: "/resources/:slug", destination: "/prova/visibilidade", permanent: true },
      { source: "/signals", destination: "/prova/visibilidade", permanent: true },
      { source: "/signals/:slug", destination: "/prova/visibilidade", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
