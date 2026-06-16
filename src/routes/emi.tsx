import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Calculator, CheckCircle2, Percent, Wallet } from "lucide-react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { formatPrice } from "@/data/products";

export const Route = createFileRoute("/emi")({
  head: () => ({
    meta: [
      { title: "EMI & Finance — RideZone Motors" },
      { name: "description", content: "Calculate your bike or scooter EMI instantly. Easy finance with zero down payment options." },
    ],
  }),
  component: EmiPage,
});

function EmiPage() {
  const [price, setPrice] = useState(150000);
  const [down, setDown] = useState(15000);
  const [rate, setRate] = useState(9.5);
  const [months, setMonths] = useState(36);

  const { emi, total, interest } = useMemo(() => {
    const principal = Math.max(price - down, 0);
    const r = rate / 12 / 100;
    const n = months;
    const e = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const t = e * n;
    return { emi: Math.round(e), total: Math.round(t), interest: Math.round(t - principal) };
  }, [price, down, rate, months]);

  return (
    <Layout>
      <PageHeader title="EMI & Finance" subtitle="Smart financing made simple. Calculate your monthly EMI in seconds." />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-5 md:px-8">

        <div className="md:col-span-3 rounded-2xl border border-border bg-card p-8 shadow-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-red">
              <Calculator className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="font-display text-3xl">EMI Calculator</h2>
          </div>

          <div className="mt-8 space-y-6">
            <SliderInput label="Bike Price" value={price} min={50000} max={500000} step={1000} setValue={setPrice} format={formatPrice} />
            <SliderInput label="Down Payment" value={down} min={0} max={price} step={1000} setValue={setDown} format={formatPrice} />
            <SliderInput label="Interest Rate" value={rate} min={5} max={18} step={0.1} setValue={setRate} format={(v) => `${v.toFixed(1)}%`} />
            <SliderInput label="Tenure (months)" value={months} min={6} max={60} step={6} setValue={setMonths} format={(v) => `${v} months`} />
          </div>
        </div>


        <div className="md:col-span-2 space-y-4">
          <div className="rounded-2xl bg-gradient-red p-8 shadow-glow">
            <div className="text-xs uppercase tracking-wider text-white/80">Monthly EMI</div>
            <div className="mt-2 font-display text-5xl text-white">{formatPrice(emi)}</div>
            <div className="mt-1 text-sm text-white/80">for {months} months</div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex justify-between py-2 text-sm">
              <span className="text-muted-foreground">Principal</span>
              <span className="font-semibold">{formatPrice(price - down)}</span>
            </div>
            <div className="flex justify-between border-t border-border py-2 text-sm">
              <span className="text-muted-foreground">Total Interest</span>
              <span className="font-semibold text-primary">{formatPrice(interest)}</span>
            </div>
            <div className="flex justify-between border-t border-border py-2 text-sm">
              <span className="text-muted-foreground">Total Payment</span>
              <span className="font-semibold">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        <h2 className="font-display text-4xl">Finance <span className="text-gradient-red">Options</span></h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { icon: Wallet, title: "Zero Down Payment", desc: "Drive home today with 0% down payment on select models. No upfront cost." },
            { icon: Percent, title: "Low Interest Rates", desc: "Starting at just 8.5% p.a. through our banking partners across India." },
            { icon: CheckCircle2, title: "Instant Approval", desc: "Get loan approval in under 30 minutes with minimal documentation." },
          ].map((o) => (
            <div key={o.title} className="rounded-xl border border-border bg-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <o.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-5 font-display text-2xl">{o.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{o.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

function SliderInput({
  label, value, min, max, step, setValue, format,
}: {
  label: string;
  value: number;
  min: number; max: number; step: number;
  setValue: (v: number) => void;
  format: (v: number) => string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-muted-foreground">{label}</label>
        <div className="rounded-md bg-input px-3 py-1 font-display text-lg text-primary">{format(value)}</div>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => setValue(parseFloat(e.target.value))}
        className="mt-3 w-full accent-primary"
      />
    </div>
  );
}
