import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, Mail } from "lucide-react";
import { SEO, WebPageSchema } from "@/components/layout/SEO";
import { FormEvent, useMemo, useState } from "react";
import { track } from "@/lib/analytics";

export default function Contact() {
  const contactEndpoint = (import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined) ?? "";

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string>("");

  const canPost = useMemo(() => Boolean(contactEndpoint), [contactEndpoint]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setStatus("sending");

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const company = String(form.get("company") ?? "");
    const email = String(form.get("email") ?? "");
    const subject = String(form.get("subject") ?? "ContextAI Q inquiry");
    const message = String(form.get("message") ?? "");

    track("contact_submit", { method: canPost ? "http" : "mailto" });

    if (canPost) {
      try {
        const res = await fetch(contactEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, company, email, subject, message }),
        });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        setStatus("sent");
        e.currentTarget.reset();
        return;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to send message.");
        setStatus("error");
        return;
      }
    }

    // Mailto fallback: opens user's mail client (works without backend).
    const to = "hello@contextaiq.com";
    const lines = [
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      "",
      message,
    ];
    const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = mailto;
    setStatus("sent");
  }

  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with ContextAI Q. Send a message or start your AI Visibility Audit."
        canonical="/contact"
      />
      <WebPageSchema
        title="Contact ContextAI Q"
        description="Contact information and inquiry form."
        url="/contact"
      />

      {/* Hero */}
      <section className="section-slide pt-24 md:pt-32">
        <div className="container-wide">
          <p className="eyebrow mb-4">Contact</p>
          <h1 className="mb-6 max-w-3xl">Let's talk</h1>
          <p className="lead max-w-2xl">
            Questions about AI visibility? Ready to start an audit? 
            We respond within one business day.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="section-slide">
        <div className="container-wide">
          <div className="grid-2-col">
            {/* Contact Form */}
            <div className="card-minimal">
              <h2 className="text-2xl mb-6">Send a message</h2>
              <form className="space-y-6" onSubmit={onSubmit}>
                <div className="grid-2-col">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" name="company" placeholder="Company name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="you@company.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" placeholder="What would you like to discuss?" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    name="message"
                    placeholder="Tell us about your situation and what you're looking to achieve."
                    rows={5}
                    required
                  />
                </div>
                <Button type="submit" variant="default" className="w-full" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send message"}
                  <ArrowRight size={16} />
                </Button>
              </form>
              {status === "sent" ? (
                <p className="text-small mt-4 text-center">Message initiated. If your mail client didn’t open, email `hello@contextaiq.com`.</p>
              ) : null}
              {status === "error" ? (
                <p className="text-small mt-4 text-center text-destructive">Failed to send: {error}</p>
              ) : null}
            </div>

            {/* Other Options */}
            <div className="space-y-8">
              {/* Email Direct */}
              <div className="card-minimal">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg mb-2">Email directly</h3>
                    <p className="text-muted-foreground mb-4">
                      Prefer email? Reach us directly at:
                    </p>
                    <a 
                      href="mailto:hello@contextaiq.com" 
                      className="text-foreground font-medium hover:text-muted-foreground transition-colors"
                    >
                      hello@contextaiq.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Start */}
              <div className="card-minimal bg-secondary/50">
                <h3 className="text-lg mb-2">Ready to start?</h3>
                <p className="text-muted-foreground mb-4">
                  Skip the call and purchase the €500 audit directly.
                </p>
                <Link to="/audit">
                  <Button variant="default">
                    Start audit now
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Response Commitment */}
      <section className="section-slide bg-secondary/30">
        <div className="container-wide text-center">
          <p className="eyebrow mb-4">Response Time</p>
          <h2 className="mb-4">Within one business day</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We aim to respond to all inquiries within one business day. 
            For urgent matters, please indicate in your message subject.
          </p>
        </div>
      </section>
    </>
  );
}
