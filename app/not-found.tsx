import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-slide pt-24 md:pt-32">
      <div className="container-wide">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">404</p>
          <h1 className="mb-6">Page not found</h1>
          <p className="lead mb-10">The page you’re looking for doesn’t exist or has moved.</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-subtle transition hover:-translate-y-0.5"
          >
            Return home
          </Link>
        </div>
      </div>
    </section>
  );
}

