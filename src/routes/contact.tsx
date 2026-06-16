import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { VapiContactForm } from "@/components/VapiContactForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us Today — RideZone Motors" },
      { name: "description", content: "Visit our showroom or get in touch. Address, phone, email and directions." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <Layout>
      <PageHeader title="Get in Touch" subtitle="Visit our showroom or reach out — we love talking bikes." />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-3 md:px-8">
        {[
          { icon: MapPin, title: "Showroom", lines: ["42 MG Road, Brigade Plaza", "Bengaluru, KA 560001"] },
          { icon: Phone, title: "Call Us", lines: ["+91 98765 43210", "+91 80 4567 8901"] },
          { icon: Mail, title: "Email", lines: ["hello@ridezone.in", "sales@ridezone.in"] },
        ].map((c) => (
          <div key={c.title} className="rounded-xl border border-border bg-card p-6 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-red shadow-glow">
              <c.icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="mt-5 font-display text-2xl">{c.title}</h3>
            {c.lines.map((l) => (
              <p key={l} className="mt-1 text-sm text-muted-foreground">{l}</p>
            ))}
          </div>
        ))}
      </section>

      <VapiContactForm />

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        <div className="overflow-hidden rounded-2xl border border-border shadow-card">
          <iframe
            title="RideZone Motors showroom"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0935651193434!2d77.59456!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzUnNDAuNCJF!5e0!3m2!1sen!2sin!4v1700000000000"
            width="100%"
            height="450"
            style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg)" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 text-primary" />
          Open Mon–Sun • 9:30 AM – 8:30 PM
        </div>
      </section>
    </Layout>
  );
}
