import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { products } from "@/data/products";
import { triggerCustomerCall } from "@/lib/api/twilio.functions";


export const Route = createFileRoute("/test-ride")({
  head: () => ({
    meta: [
      { title: "Book a Test Ride — RideZone Motors" },
      { name: "description", content: "Book a free test ride at RideZone Motors. Choose your bike, pick a date, and ride." },
    ],
  }),
  component: TestRidePage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile"),
  email: z.string().trim().email("Invalid email").max(120),
  model: z.string().min(1, "Select a model"),
  date: z.string().min(1, "Pick a date"),
});

function TestRidePage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", model: "", date: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [callError, setCallError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = schema.safeParse(form);
    if (!res.success) {
      const errs: Record<string, string> = {};
      res.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setCallError(null);
    setSubmitting(true);
    try {
      await triggerCustomerCall({ data: { phone: form.phone, name: form.name, model: form.model } });
    } catch (err) {
      console.error(err);
      setCallError("We couldn't place the call right now, but your booking is saved. Our team will reach out.");
    } finally {
      setSubmitting(false);
      setDone(true);
    }
  };


  return (
    <Layout>
      <PageHeader title="Book a Test Ride" subtitle="Ride before you buy. Free, no commitment, in your city." />

      <section className="mx-auto max-w-3xl px-4 py-16 md:px-8">
        {done ? (
          <div className="rounded-2xl border border-primary/30 bg-card p-10 text-center shadow-glow">
            <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
            <h2 className="mt-4 font-display text-4xl">Booking Confirmed!</h2>
            <p className="mt-3 text-muted-foreground">
              Thanks {form.name.split(" ")[0]} — {callError ? callError : `we're calling you now on +91 ${form.phone} to confirm your test ride for the ${form.model}.`}
            </p>

            <button
              onClick={() => { setDone(false); setForm({ name: "", phone: "", email: "", model: "", date: "" }); }}
              className="mt-6 rounded-md bg-gradient-red px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
            >
              Book Another Ride
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-8 shadow-card md:p-10">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Full Name" error={errors.name}>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" placeholder="Rahul Sharma" maxLength={80} />
              </Field>
              <Field label="Phone Number" error={errors.phone}>
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" placeholder="9876543210" maxLength={10} />
              </Field>
              <Field label="Email" error={errors.email}>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" placeholder="you@email.com" maxLength={120} />
              </Field>
              <Field label="Preferred Date" error={errors.date}>
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input" min={new Date().toISOString().split("T")[0]} />
              </Field>
              <div className="md:col-span-2">
                <Field label="Bike / Scooter Model" error={errors.model}>
                  <select value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} className="input">
                    <option value="">Select a model</option>
                    {products.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
                  </select>
                </Field>
              </div>
            </div>
            <button type="submit" disabled={submitting} className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gradient-red px-6 py-4 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-70">
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitting ? "Placing your call…" : "Confirm Test Ride Booking"}
            </button>

          </form>
        )}
      </section>

      <style>{`
        .input { width:100%; background:var(--input); border:1px solid var(--border); border-radius:0.5rem; padding:0.75rem 1rem; font-size:0.875rem; color:var(--foreground); outline:none; transition:border-color .2s; }
        .input:focus { border-color:var(--primary); }
      `}</style>
    </Layout>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
