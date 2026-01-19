import { TrackedLink } from "./components/TrackedLink";

export default function NotFound() {
  return (
    <section className="section-slide pt-24 md:pt-32">
      <div className="container-wide">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">404</p>
          <h1 className="mb-6">Page not found</h1>
          <p className="lead mb-10">The page you’re looking for doesn’t exist or has moved.</p>
          <TrackedLink
            href="/"
            className="btn btn-primary btn-sm"
            eventName="cta_click"
            eventParams={{ location: "404", cta: "Return home" }}
          >
            Return home
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}

