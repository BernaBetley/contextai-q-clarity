import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, Mail, Calendar } from "lucide-react";
import { SEO, WebPageSchema } from "@/components/layout/SEO";

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with ContextAI Q. Schedule a call, send a message, or start your AI Visibility Audit."
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
              <form className="space-y-6">
                <div className="grid-2-col">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="Company name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What would you like to discuss?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your situation and what you're looking to achieve."
                    rows={5}
                  />
                </div>
                <Button type="submit" variant="default" className="w-full">
                  Send message
                  <ArrowRight size={16} />
                </Button>
              </form>
              <p className="text-small mt-4 text-center">
                [Form submission placeholder - integrate with preferred backend]
              </p>
            </div>

            {/* Other Options */}
            <div className="space-y-8">
              {/* Schedule Call */}
              <div className="card-minimal">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg mb-2">Schedule a call</h3>
                    <p className="text-muted-foreground mb-4">
                      Book a 30-minute introductory call to discuss your AI visibility needs.
                    </p>
                    <Button variant="outline">
                      Open calendar
                      <ArrowRight size={16} />
                    </Button>
                    <p className="text-small mt-2">[Calendly embed placeholder]</p>
                  </div>
                </div>
              </div>

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
